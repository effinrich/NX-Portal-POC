import { Meta, Story } from '@storybook/react'

import { LogoutButton } from './index'

export default {
  component: LogoutButton,
  title: 'LogoutButton'
} as Meta

const Template: Story = args => <LogoutButton {...args} />

export const Primary = Template.bind({})
Primary.args = {}
