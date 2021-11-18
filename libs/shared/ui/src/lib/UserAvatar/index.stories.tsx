import { Meta, Story } from '@storybook/react'

import { UserAvatar, UserAvatarProps } from './index'

export default {
  component: UserAvatar,
  title: 'UserAvatar'
} as Meta

const Template: Story<UserAvatarProps> = args => <UserAvatar {...args} />

export const Primary = Template.bind({})
Primary.args = {
  isVerified: false
}
