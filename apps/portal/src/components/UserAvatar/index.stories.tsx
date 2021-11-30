import { Meta, Story } from '@storybook/react'

import { UserAvatar, UserAvatarProps } from './index'

export default {
  component: UserAvatar,
  title: 'UserAvatar'
} as Meta

const Template: Story<UserAvatarProps> = args => <UserAvatar {...args} />

export const NoImage = Template.bind({})
NoImage.args = {
  isVerified: false,
  name: 'Test Name'
}

export const WithImage = Template.bind({})
WithImage.args = {
  isVerified: false,
  name: 'Test Name',
  src: 'https://lh3.googleusercontent.com/a-/AOh14Gge9s8slfrdnSqWb_dSqCHaRvzbKTXZH8mre-DI=s96-c'
}
