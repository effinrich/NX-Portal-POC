import { Meta, Story } from '@storybook/react'

import { Loader, LoaderProps } from './index'

export default {
  component: Loader,
  title: 'Loader'
} as Meta

const Template: Story<LoaderProps> = args => <Loader {...args} />

export const Default = Template.bind({})
Default.args = {
  size: 'md'
}
