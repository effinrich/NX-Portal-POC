export interface DocsTemplateOptions {
  componentName: string;
  description?: string;
  usage?: string;
  props?: string[];
}

export function generateDocsTemplate(options: DocsTemplateOptions): string {
  const { componentName, description = '', usage = '', props = [] } = options;

  return `import { Meta, Story, Canvas, ArgsTable } from '@storybook/addon-docs'
import { ${componentName} } from './index'

<Meta title="${componentName}" component={${componentName}} />

# ${componentName}

${description || `A reusable ${componentName} component.`}

## Usage

\`\`\`tsx
${usage || `import { ${componentName} } from '@shared/ui'

<${componentName} />
`}\`\`\`

## Props

<ArgsTable of={${componentName}} />

## Examples

### Default

<Canvas>
  <Story id="${componentName.toLowerCase()}--default" />
</Canvas>

${props.length > 0 ? `## Available Props\n\n${props.map(prop => `- **${prop}**`).join('\n')}` : ''}

## Accessibility

This component follows WAI-ARIA guidelines and is keyboard accessible.

## Notes

- Ensure proper contrast ratios for accessibility
- Test with screen readers
- Verify keyboard navigation
`;
}
