import { BoxProps } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { CardContent } from './index'

export default {
  component: CardContent,
  title: 'CardContent'
} as Meta

const Template: Story<BoxProps> = args => <CardContent {...args} />

export const Primary = Template.bind({})
Primary.args = {
  title: ''
}
