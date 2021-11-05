import { Meta, Story } from '@storybook/react'

import { ProtectedRoute, ProtectedRouteProps } from './'

export default {
  component: ProtectedRoute,
  title: 'ProtectedRoute'
} as Meta

const Template: Story<ProtectedRouteProps> = args => (
  <ProtectedRoute {...args} />
)

const ProtectedComponent = () => {
  return <div>I'm a protected component!</div>
}

export const Primary = Template.bind({})
Primary.args = {
  component: ProtectedComponent
}
