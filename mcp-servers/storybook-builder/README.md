# Storybook Builder MCP

A Model Context Protocol (MCP) server that automates Storybook component creation with interaction tests, UI tests, and MDX documentation for React components.

## Features

- **Complete Component Scaffolding**: Create React components with all necessary files in one command
- **Storybook Integration**: Automatically generate Storybook stories with interaction tests
- **UI Testing**: Generate Jest/Testing Library tests with accessibility checks
- **Documentation**: Create MDX documentation for components
- **File Watching**: Automatically detect new components and generate missing files
- **Component Analysis**: Analyze existing components to check for missing files

## Installation

1. Install dependencies:
```bash
cd mcp-servers/storybook-builder
npm install
```

2. Build the server:
```bash
npm run build
```

## Configuration

Add the MCP server to your Claude Code configuration file:

**For Claude Desktop** (`~/Library/Application Support/Claude/claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "storybook-builder": {
      "command": "node",
      "args": ["/path/to/NX-Portal-POC/mcp-servers/storybook-builder/dist/index.js"],
      "env": {}
    }
  }
}
```

**For Claude Code CLI** (`.claude/config.json`):
```json
{
  "mcpServers": {
    "storybook-builder": {
      "command": "node",
      "args": ["./mcp-servers/storybook-builder/dist/index.js"],
      "env": {}
    }
  }
}
```

## Available Tools

### 1. create_component

Creates a complete React component with all files:
- Component file (`index.tsx`)
- Storybook stories with interaction tests (`index.stories.tsx`)
- UI/unit tests (`index.spec.tsx`)
- MDX documentation (`index.mdx`)

**Parameters:**
- `componentName` (required): Component name in PascalCase (e.g., "Button", "UserCard")
- `description` (optional): Component description
- `useChakraUI` (optional): Use Chakra UI components (default: true)
- `directory` (optional): Subdirectory within `libs/shared/ui/src/lib`

**Example:**
```
Create a new Button component
```

Claude will use the MCP to:
```typescript
create_component({
  componentName: "Button",
  description: "A reusable button component",
  useChakraUI: true
})
```

### 2. generate_storybook_tests

Generates or updates Storybook stories with interaction tests for an existing component.

**Parameters:**
- `componentPath` (required): Path to the component file
- `withInteractions` (optional): Include interaction tests (default: true)

**Example:**
```
Generate Storybook tests for libs/shared/ui/src/lib/Card/index.tsx
```

### 3. generate_ui_tests

Generates UI/unit tests for an existing component.

**Parameters:**
- `componentPath` (required): Path to the component file
- `withAccessibilityTests` (optional): Include accessibility tests with jest-axe (default: true)

**Example:**
```
Generate UI tests for libs/shared/ui/src/lib/Card/index.tsx
```

### 4. generate_documentation

Generates MDX documentation for an existing component.

**Parameters:**
- `componentPath` (required): Path to the component file
- `description` (optional): Component description
- `usage` (optional): Usage example code

**Example:**
```
Generate documentation for libs/shared/ui/src/lib/Card/index.tsx
```

### 5. watch_ui_directory

Starts/stops watching the UI directory for new components and automatically generates missing files.

**Parameters:**
- `action` (required): "start", "stop", or "status"
- `uiDirectory` (optional): UI directory to watch (default: `libs/shared/ui/src/lib`)

**Example:**
```
Start watching the UI directory for new components
```

When a new component is detected, the watcher will automatically generate:
- Storybook stories (if missing)
- UI tests (if missing)
- MDX documentation (if missing)

### 6. analyze_component

Analyzes a component and returns information about it.

**Parameters:**
- `componentPath` (required): Path to the component file

**Example:**
```
Analyze the Card component
```

Returns:
- Component name
- Path
- Whether it has stories, tests, and docs
- Extracted props (if available)

## Usage Examples

### Creating a New Component

```
Create a new UserProfile component with Chakra UI that displays user information
```

This will generate:
```
libs/shared/ui/src/lib/UserProfile/
  ├── index.tsx           # Component implementation
  ├── index.stories.tsx   # Storybook stories with interaction tests
  ├── index.spec.tsx      # UI tests with accessibility checks
  └── index.mdx           # MDX documentation
```

### Auto-Generating Files for Existing Components

```
Start watching the UI directory
```

Now when you create a component file:
```typescript
// libs/shared/ui/src/lib/NewComponent/index.tsx
export const NewComponent = () => {
  return <div>Hello</div>
}
```

The MCP will automatically generate the stories, tests, and docs files.

### Adding Tests to Existing Component

```
Generate Storybook interaction tests for libs/shared/ui/src/lib/Card/index.tsx
```

## File Templates

### Component Template

The generated component uses:
- Chakra UI by default (can be disabled)
- TypeScript with proper prop types
- Functional component pattern
- Props interface extending BoxProps

### Stories Template

Includes:
- Component metadata
- Default story
- Interaction tests using @storybook/testing-library
- Accessibility addon integration

### Tests Template

Includes:
- Basic render test
- Accessibility tests with jest-axe
- Testing Library setup
- Placeholder for additional tests

### Documentation Template

Includes:
- Component description
- Usage examples
- Props table (ArgsTable)
- Accessibility notes
- Links to stories

## Development

### Watch Mode
```bash
npm run watch
```

### Build
```bash
npm run build
```

### Start Server
```bash
npm start
```

## Project Structure

```
mcp-servers/storybook-builder/
├── src/
│   ├── index.ts                    # Main MCP server
│   ├── templates/
│   │   ├── component.ts            # Component template generator
│   │   ├── stories.ts              # Stories template generator
│   │   ├── tests.ts                # Tests template generator
│   │   └── docs.ts                 # Docs template generator
│   └── utils/
│       ├── component-analyzer.ts   # Component analysis utilities
│       └── file-watcher.ts         # File watching functionality
├── package.json
├── tsconfig.json
└── README.md
```

## Integration with NX Workspace

This MCP server is designed to work with the NX monorepo structure:
- Components are created in `libs/shared/ui/src/lib/`
- Follows the existing component structure pattern
- Uses the same testing and Storybook configuration
- Compatible with Chakra UI theme

## Troubleshooting

### MCP Server Not Starting

1. Ensure dependencies are installed: `npm install`
2. Build the server: `npm run build`
3. Check the path in your MCP configuration

### File Watcher Not Detecting Files

1. Check the `uiDirectory` parameter
2. Ensure the directory exists
3. Verify file permissions

### Generated Files Not Matching Project Style

The templates can be customized by editing the files in `src/templates/`.

## License

MIT
