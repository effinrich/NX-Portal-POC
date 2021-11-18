import { BoxProps } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { Card } from './index'

export default {
  component: Card,
  title: 'Card'
} as Meta

const Template: Story<BoxProps> = args => <Card {...args} />

export const Primary = Template.bind({})
Primary.args = {
  title: ''
}
