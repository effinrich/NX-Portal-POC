import { BoxProps } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { Card } from '../Card'

import { CardContent } from './index'

export default {
  component: CardContent,
  title: 'CardContent'
} as Meta

const Template: Story<BoxProps> = args => (
  <Card>
    <CardContent {...args}>
      Dolore officia irure cillum qui laboris officia pariatur commodo voluptate
      velit fugiat aliqua anim id. Nisi Lorem do deserunt qui laborum occaecat
      nisi aliquip fugiat officia culpa eu. Quis elit excepteur magna laboris
      cupidatat commodo culpa aute est magna nostrud ullamco. Ullamco dolore
      sint amet consequat non sunt non duis nostrud eu consectetur reprehenderit
      minim.
    </CardContent>
  </Card>
)

export const Default = Template.bind({})
