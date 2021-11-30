import { Meta, Story } from '@storybook/react'

import { UserProfile } from './index'

const mockUser = {
  given_name: 'Rich',
  family_name: 'Tillman',
  nickname: 'rich',
  name: 'Rich Tillman',
  picture:
    'https://lh3.googleusercontent.com/a-/AOh14Gge9s8slfrdnSqWb_dSqCHaRvzbKTXZH8mre-DI=s96-c',
  locale: 'en',
  updated_at: '2021-11-26T09:38:41.111Z',
  email: 'rich@phc.health',
  email_verified: true,
  sub: 'google-oauth2|103199869425702592134'
}

export default {
  component: UserProfile,
  title: 'UserProfile'
} as Meta

const Template: Story = args => <UserProfile user={mockUser} {...args} />

export const Primary = Template.bind({})
Primary.args = {
  user: mockUser
}
