import { Meta, Story } from '@storybook/react'

import { AuthButton } from '.'

export default {
  component: AuthButton,
  title: 'AuthButton'
} as Meta

const Template: Story = args => <AuthButton {...args} />

export const Primary = Template.bind({})
Primary.args = {}
