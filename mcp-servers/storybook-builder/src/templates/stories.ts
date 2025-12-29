export interface StoriesTemplateOptions {
  componentName: string;
  componentPath?: string;
  withInteractions?: boolean;
  description?: string;
}

export function generateStoriesTemplate(options: StoriesTemplateOptions): string {
  const { componentName, componentPath = '.', withInteractions = true, description = '' } = options;

  return `import { ComponentMeta, ComponentStory } from '@storybook/react'
${withInteractions ? `import { within, userEvent } from '@storybook/testing-library'\nimport { expect } from '@storybook/jest'\n` : ''}
import { ${componentName} } from '${componentPath}'

export default {
  title: '${componentName}',
  component: ${componentName},
  ${description ? `parameters: {\n    docs: {\n      description: {\n        component: '${description}'\n      }\n    }\n  },` : ''}
} as ComponentMeta<typeof ${componentName}>

const Template: ComponentStory<typeof ${componentName}> = (args) => <${componentName} {...args} />

export const Default = Template.bind({})
Default.args = {
  // Add default args here
}
${withInteractions ? `
export const WithInteractions = Template.bind({})
WithInteractions.args = {
  ...Default.args,
}

WithInteractions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // Add your interaction tests here
  // Example:
  // const button = await canvas.getByRole('button')
  // await userEvent.click(button)
  // await expect(canvas.getByText('Clicked')).toBeInTheDocument()
}
` : ''}`;
}
