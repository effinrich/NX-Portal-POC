#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { mkdir, writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { FileWatcher } from './utils/file-watcher.js';
import { analyzeComponent, isComponentFile } from './utils/component-analyzer.js';
import { generateComponentTemplate } from './templates/component.js';
import { generateStoriesTemplate } from './templates/stories.js';
import { generateTestsTemplate } from './templates/tests.js';
import { generateDocsTemplate } from './templates/docs.js';

// Default UI directory path (relative to project root)
const DEFAULT_UI_DIR = 'libs/shared/ui/src/lib';

// Global file watcher instance
let fileWatcher: FileWatcher | null = null;

// Project root directory
const PROJECT_ROOT = resolve(process.cwd(), '../..');

/**
 * Main MCP Server for Storybook Component Builder
 */
class StorybookBuilderServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'storybook-builder',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      if (fileWatcher) {
        await fileWatcher.stop();
      }
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const tools: Tool[] = [
        {
          name: 'create_component',
          description: 'Creates a complete React component with Storybook stories, interaction tests, UI tests, and MDX documentation',
          inputSchema: {
            type: 'object',
            properties: {
              componentName: {
                type: 'string',
                description: 'Name of the component (PascalCase)',
              },
              description: {
                type: 'string',
                description: 'Description of the component',
              },
              useChakraUI: {
                type: 'boolean',
                description: 'Whether to use Chakra UI (default: true)',
                default: true,
              },
              directory: {
                type: 'string',
                description: `Directory path relative to ${DEFAULT_UI_DIR} (optional)`,
              },
            },
            required: ['componentName'],
          },
        },
        {
          name: 'generate_storybook_tests',
          description: 'Generates or updates Storybook stories with interaction tests for an existing component',
          inputSchema: {
            type: 'object',
            properties: {
              componentPath: {
                type: 'string',
                description: 'Path to the component file',
              },
              withInteractions: {
                type: 'boolean',
                description: 'Include interaction tests (default: true)',
                default: true,
              },
            },
            required: ['componentPath'],
          },
        },
        {
          name: 'generate_ui_tests',
          description: 'Generates UI/unit tests for an existing component',
          inputSchema: {
            type: 'object',
            properties: {
              componentPath: {
                type: 'string',
                description: 'Path to the component file',
              },
              withAccessibilityTests: {
                type: 'boolean',
                description: 'Include accessibility tests (default: true)',
                default: true,
              },
            },
            required: ['componentPath'],
          },
        },
        {
          name: 'generate_documentation',
          description: 'Generates MDX documentation for an existing component',
          inputSchema: {
            type: 'object',
            properties: {
              componentPath: {
                type: 'string',
                description: 'Path to the component file',
              },
              description: {
                type: 'string',
                description: 'Component description',
              },
              usage: {
                type: 'string',
                description: 'Usage example code',
              },
            },
            required: ['componentPath'],
          },
        },
        {
          name: 'watch_ui_directory',
          description: 'Starts/stops watching the UI directory for new components and auto-generates missing files',
          inputSchema: {
            type: 'object',
            properties: {
              action: {
                type: 'string',
                enum: ['start', 'stop', 'status'],
                description: 'Action to perform (start, stop, or status)',
              },
              uiDirectory: {
                type: 'string',
                description: `UI directory to watch (default: ${DEFAULT_UI_DIR})`,
              },
            },
            required: ['action'],
          },
        },
        {
          name: 'analyze_component',
          description: 'Analyzes a component and returns information about it',
          inputSchema: {
            type: 'object',
            properties: {
              componentPath: {
                type: 'string',
                description: 'Path to the component file',
              },
            },
            required: ['componentPath'],
          },
        },
      ];

      return { tools };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'create_component':
            return await this.handleCreateComponent(args);
          case 'generate_storybook_tests':
            return await this.handleGenerateStorybookTests(args);
          case 'generate_ui_tests':
            return await this.handleGenerateUITests(args);
          case 'generate_documentation':
            return await this.handleGenerateDocumentation(args);
          case 'watch_ui_directory':
            return await this.handleWatchDirectory(args);
          case 'analyze_component':
            return await this.handleAnalyzeComponent(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${errorMessage}`,
            },
          ],
        };
      }
    });
  }

  private async handleCreateComponent(args: any) {
    const { componentName, description = '', useChakraUI = true, directory = '' } = args;

    // Validate component name
    if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
      throw new Error('Component name must be in PascalCase (e.g., MyComponent)');
    }

    // Determine component directory
    const componentDir = directory
      ? join(PROJECT_ROOT, DEFAULT_UI_DIR, directory, componentName)
      : join(PROJECT_ROOT, DEFAULT_UI_DIR, componentName);

    // Check if component already exists
    if (existsSync(componentDir)) {
      throw new Error(`Component directory already exists: ${componentDir}`);
    }

    // Create directory
    await mkdir(componentDir, { recursive: true });

    const files: { path: string; content: string }[] = [];

    // Generate component file
    const componentContent = generateComponentTemplate({
      componentName,
      description,
      useChakraUI,
    });
    const componentPath = join(componentDir, 'index.tsx');
    await writeFile(componentPath, componentContent);
    files.push({ path: componentPath, content: componentContent });

    // Generate stories file
    const storiesContent = generateStoriesTemplate({
      componentName,
      withInteractions: true,
      description,
    });
    const storiesPath = join(componentDir, 'index.stories.tsx');
    await writeFile(storiesPath, storiesContent);
    files.push({ path: storiesPath, content: storiesContent });

    // Generate tests file
    const testsContent = generateTestsTemplate({
      componentName,
      withAccessibilityTests: true,
    });
    const testsPath = join(componentDir, 'index.spec.tsx');
    await writeFile(testsPath, testsContent);
    files.push({ path: testsPath, content: testsContent });

    // Generate docs file
    const docsContent = generateDocsTemplate({
      componentName,
      description,
    });
    const docsPath = join(componentDir, 'index.mdx');
    await writeFile(docsPath, docsContent);
    files.push({ path: docsPath, content: docsContent });

    return {
      content: [
        {
          type: 'text',
          text: `Successfully created ${componentName} component at ${componentDir}\n\nCreated files:\n${files.map(f => `- ${f.path}`).join('\n')}`,
        },
      ],
    };
  }

  private async handleGenerateStorybookTests(args: any) {
    const { componentPath, withInteractions = true } = args;

    const fullPath = resolve(PROJECT_ROOT, componentPath);

    if (!existsSync(fullPath)) {
      throw new Error(`Component file not found: ${fullPath}`);
    }

    const info = await analyzeComponent(fullPath);
    const dir = dirname(fullPath);

    const storiesContent = generateStoriesTemplate({
      componentName: info.name,
      withInteractions,
    });

    const storiesPath = join(dir, 'index.stories.tsx');
    await writeFile(storiesPath, storiesContent);

    return {
      content: [
        {
          type: 'text',
          text: `Successfully generated Storybook ${withInteractions ? 'stories with interaction tests' : 'stories'} at ${storiesPath}`,
        },
      ],
    };
  }

  private async handleGenerateUITests(args: any) {
    const { componentPath, withAccessibilityTests = true } = args;

    const fullPath = resolve(PROJECT_ROOT, componentPath);

    if (!existsSync(fullPath)) {
      throw new Error(`Component file not found: ${fullPath}`);
    }

    const info = await analyzeComponent(fullPath);
    const dir = dirname(fullPath);

    const testsContent = generateTestsTemplate({
      componentName: info.name,
      withAccessibilityTests,
    });

    const testsPath = join(dir, 'index.spec.tsx');
    await writeFile(testsPath, testsContent);

    return {
      content: [
        {
          type: 'text',
          text: `Successfully generated UI tests at ${testsPath}`,
        },
      ],
    };
  }

  private async handleGenerateDocumentation(args: any) {
    const { componentPath, description = '', usage = '' } = args;

    const fullPath = resolve(PROJECT_ROOT, componentPath);

    if (!existsSync(fullPath)) {
      throw new Error(`Component file not found: ${fullPath}`);
    }

    const info = await analyzeComponent(fullPath);
    const dir = dirname(fullPath);

    const docsContent = generateDocsTemplate({
      componentName: info.name,
      description,
      usage,
      props: info.props,
    });

    const docsPath = join(dir, 'index.mdx');
    await writeFile(docsPath, docsContent);

    return {
      content: [
        {
          type: 'text',
          text: `Successfully generated documentation at ${docsPath}`,
        },
      ],
    };
  }

  private async handleWatchDirectory(args: any) {
    const { action, uiDirectory = DEFAULT_UI_DIR } = args;

    const fullUiDir = resolve(PROJECT_ROOT, uiDirectory);

    switch (action) {
      case 'start':
        if (fileWatcher?.isWatching()) {
          return {
            content: [
              {
                type: 'text',
                text: 'File watcher is already running',
              },
            ],
          };
        }

        fileWatcher = new FileWatcher({
          uiDirectory: fullUiDir,
          onComponentCreated: async (componentPath) => {
            console.error(`[Auto-generate] Processing new component: ${componentPath}`);
            const info = await analyzeComponent(componentPath);
            const dir = dirname(componentPath);

            const tasks: string[] = [];

            // Generate missing files
            if (!info.hasStories) {
              const storiesContent = generateStoriesTemplate({
                componentName: info.name,
                withInteractions: true,
              });
              await writeFile(join(dir, 'index.stories.tsx'), storiesContent);
              tasks.push('Storybook stories');
            }

            if (!info.hasTests) {
              const testsContent = generateTestsTemplate({
                componentName: info.name,
                withAccessibilityTests: true,
              });
              await writeFile(join(dir, 'index.spec.tsx'), testsContent);
              tasks.push('UI tests');
            }

            if (!info.hasDocs) {
              const docsContent = generateDocsTemplate({
                componentName: info.name,
                props: info.props,
              });
              await writeFile(join(dir, 'index.mdx'), docsContent);
              tasks.push('MDX documentation');
            }

            if (tasks.length > 0) {
              console.error(`[Auto-generate] Generated: ${tasks.join(', ')}`);
            }
          },
        });

        fileWatcher.start();

        return {
          content: [
            {
              type: 'text',
              text: `Started watching ${fullUiDir} for new components`,
            },
          ],
        };

      case 'stop':
        if (!fileWatcher) {
          return {
            content: [
              {
                type: 'text',
                text: 'File watcher is not running',
              },
            ],
          };
        }

        await fileWatcher.stop();
        fileWatcher = null;

        return {
          content: [
            {
              type: 'text',
              text: 'Stopped watching UI directory',
            },
          ],
        };

      case 'status':
        const isWatching = fileWatcher?.isWatching() ?? false;
        return {
          content: [
            {
              type: 'text',
              text: `File watcher status: ${isWatching ? 'Running' : 'Stopped'}${isWatching ? `\nWatching: ${fullUiDir}` : ''}`,
            },
          ],
        };

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  }

  private async handleAnalyzeComponent(args: any) {
    const { componentPath } = args;

    const fullPath = resolve(PROJECT_ROOT, componentPath);

    if (!existsSync(fullPath)) {
      throw new Error(`Component file not found: ${fullPath}`);
    }

    const info = await analyzeComponent(fullPath);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(info, null, 2),
        },
      ],
    };
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Storybook Builder MCP server running on stdio');
  }
}

// Start the server
const server = new StorybookBuilderServer();
server.run().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
