import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';

export interface ComponentInfo {
  name: string;
  path: string;
  hasStories: boolean;
  hasTests: boolean;
  hasDocs: boolean;
  props?: string[];
}

/**
 * Analyzes a component file and extracts information about it
 */
export async function analyzeComponent(componentPath: string): Promise<ComponentInfo> {
  const dir = dirname(componentPath);
  const componentName = extractComponentName(componentPath);

  const info: ComponentInfo = {
    name: componentName,
    path: componentPath,
    hasStories: existsSync(join(dir, 'index.stories.tsx')) || existsSync(join(dir, `${componentName}.stories.tsx`)),
    hasTests: existsSync(join(dir, 'index.spec.tsx')) || existsSync(join(dir, `${componentName}.spec.tsx`)),
    hasDocs: existsSync(join(dir, 'index.mdx')) || existsSync(join(dir, `${componentName}.mdx`)),
  };

  // Try to extract props from component
  try {
    const content = await readFile(componentPath, 'utf-8');
    info.props = extractPropsFromContent(content);
  } catch (error) {
    // Ignore errors
  }

  return info;
}

/**
 * Extracts component name from file path
 */
export function extractComponentName(filePath: string): string {
  const parts = filePath.split('/');

  // If it's index.tsx, use parent directory name
  if (parts[parts.length - 1] === 'index.tsx') {
    return parts[parts.length - 2];
  }

  // Otherwise, use filename without extension
  const filename = parts[parts.length - 1];
  return filename.replace(/\.(tsx|ts|jsx|js)$/, '');
}

/**
 * Extracts prop names from component content
 */
function extractPropsFromContent(content: string): string[] {
  const props: string[] = [];

  // Match interface/type definitions
  const interfaceMatch = content.match(/interface\s+\w+Props\s*\{([^}]+)\}/);
  const typeMatch = content.match(/type\s+\w+Props\s*=\s*\{([^}]+)\}/);

  const propsContent = interfaceMatch?.[1] || typeMatch?.[1];

  if (propsContent) {
    // Extract prop names (simple extraction, may need refinement)
    const propMatches = propsContent.matchAll(/(\w+)\s*[?:]?\s*:/g);
    for (const match of propMatches) {
      if (match[1] && match[1] !== 'extends') {
        props.push(match[1]);
      }
    }
  }

  return props;
}

/**
 * Checks if a path is a component file
 */
export function isComponentFile(filePath: string): boolean {
  return (
    (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) &&
    !filePath.includes('.stories.') &&
    !filePath.includes('.spec.') &&
    !filePath.includes('.test.') &&
    (filePath.endsWith('index.tsx') || filePath.endsWith('index.jsx') || /\/[A-Z]/.test(filePath))
  );
}
