import { Meta, Story } from '@storybook/react'

import { UserProfile } from './index'

export default {
  component: UserProfile,
  title: 'UserProfile'
} as Meta

const Template: Story = args => <UserProfile user={{}} {...args} />

export const Primary = Template.bind({})
Primary.args = {}
