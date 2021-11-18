import { Meta, Story } from '@storybook/react'

import { RouteHandler } from './index'

export default {
  component: RouteHandler,
  title: 'RouteHandler'
} as Meta

const Template: Story = args => <RouteHandler routes={{}} {...args} />

export const Primary = Template.bind({})
Primary.args = {}
