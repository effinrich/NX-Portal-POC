import { Meta, Story } from '@storybook/react'

import { LoginButton } from './index'

export default {
  component: LoginButton,
  title: 'LoginButton'
} as Meta

const Template: Story = args => <LoginButton {...args} />

export const Primary = Template.bind({})
Primary.args = {}
