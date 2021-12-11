import { Meta, Story } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import LoginButton, { LoginButtonProps } from '.'

export default {
  component: LoginButton,
  title: 'Auth-0/LoginButton'
  // argTypes: {
  //   onClick: { action: 'clicked' }
  // }
} as Meta

const Template: Story<LoginButtonProps> = args => <LoginButton {...args} />

export const Default = Template.bind({})
Default.play = async ({ canvasElement }) => {
  // Starts querying the component from it's root element
  const canvas = within(canvasElement)
  // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
  await userEvent.click(canvas.getByTestId('login-button'))
}
