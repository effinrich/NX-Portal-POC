// import { expect } from '@storybook/jest'
import { Meta, Story } from '@storybook/react'

// import { userEvent, waitFor, within } from '@storybook/testing-library'
import { AuthButton } from '.'

export default {
  component: AuthButton,
  title: 'Auth-0/AuthButton',
  argTypes: {
    onClick: { action: true }
  }
} as Meta

const Template: Story = args => <AuthButton {...args} />

export const Primary = Template.bind({})
Primary.args = {}
