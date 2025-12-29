export interface ComponentTemplateOptions {
  componentName: string;
  props?: string;
  description?: string;
  useChakraUI?: boolean;
}

export function generateComponentTemplate(options: ComponentTemplateOptions): string {
  const { componentName, props = '', description = '' } = options;

  const propsInterface = props || `${componentName}Props`;
  const hasProps = props !== 'none';

  return `import { FC } from 'react'
${options.useChakraUI !== false ? "import { Box, BoxProps } from '@chakra-ui/react'\n" : ''}
${description ? `/**\n * ${description}\n */\n` : ''}export interface ${propsInterface}${options.useChakraUI !== false ? ' extends BoxProps' : ''} {
  // Add your props here
}

export const ${componentName}: FC<${propsInterface}> = (${hasProps ? 'props' : ''}) => {
  return (
    ${options.useChakraUI !== false ? `<Box {...props}>\n      {/* ${componentName} content */}\n    </Box>` : `<div>\n      {/* ${componentName} content */}\n    </div>`}
  )
}

export default ${componentName}
`;
}
