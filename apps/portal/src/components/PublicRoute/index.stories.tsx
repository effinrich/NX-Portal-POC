import { Meta, Story } from '@storybook/react'

import { PublicRoute, PublicRouteProps } from './'

export default {
  component: PublicRoute,
  title: 'ProtectedRoute'
} as Meta

const Template: Story<PublicRouteProps> = args => (
  <PublicRoute children={undefined} isAuthenticated={undefined} {...args} />
)

const PublicComponent = () => {
  return <div>I'm a public component!</div>
}

export const Primary = Template.bind({})
Primary.args = {
  component: PublicComponent
}
