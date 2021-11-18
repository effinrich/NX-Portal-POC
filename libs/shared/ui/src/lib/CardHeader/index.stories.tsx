import { Meta, Story } from '@storybook/react'

import { CardHeader, CardHeaderProps } from './index'

export default {
  component: CardHeader,
  title: 'CardHeader'
} as Meta

const Template: Story<CardHeaderProps> = args => <CardHeader {...args} />

export const Primary = Template.bind({})
Primary.args = {
  title: ''
}
