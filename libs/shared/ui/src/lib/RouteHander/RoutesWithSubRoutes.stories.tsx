import { Meta, Story } from '@storybook/react'

import { RoutesWithSubRoutes } from './RoutesWithSubRoutes'

export default {
  component: RoutesWithSubRoutes,
  title: 'RoutesWithSubRoutes'
} as Meta

const Template: Story = args => <RoutesWithSubRoutes {...args} />

export const Primary = Template.bind({})
Primary.args = {}
