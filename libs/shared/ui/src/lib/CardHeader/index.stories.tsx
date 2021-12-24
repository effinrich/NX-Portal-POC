import { GoPencil } from 'react-icons/go'
import { Button, Icon } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { Card } from '../Card'

import { CardHeader, CardHeaderProps } from './index'

export default {
  component: CardHeader,
  title: 'CardHeader'
} as Meta

const Template: Story<CardHeaderProps> = args => (
  <Card>
    <CardHeader {...args} />
  </Card>
)

export const Default = Template.bind({})
Default.args = {
  title: 'Title'
}

export const WithLongTitle = Template.bind({})
WithLongTitle.args = {
  title: 'This is a long title'
}

export const WithTitleAndAction = Template.bind({})
WithTitleAndAction.args = {
  title: 'This is a header with action',
  action: (
    <Button
      size="sm"
      variant="outline"
      leftIcon={<Icon as={GoPencil} color="gray.400" marginStart="-1" />}
    >
      Edit
    </Button>
  )
}
