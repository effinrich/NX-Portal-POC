import { Meta, Story } from '@storybook/react'

import { Nav } from './'

export default {
  component: Nav,
  title: 'Nav'
} as Meta

const Template: Story = args => <Nav {...args} />

export const Primary = Template.bind({})
Primary.args = {
  component: ''
}
