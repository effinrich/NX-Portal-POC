import { BoxProps } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory, Meta, Story } from '@storybook/react'

import { CardContent } from '../CardContent/index'
import { CardHeader } from '../CardHeader/index'

import { Card } from './index'

export default {
  title: 'Card',
  component: Card,
  subcomponents: { CardContent, CardHeader } //👈 Adds the ListItem component as a subcomponent
} as ComponentMeta<typeof Card>

const Base: ComponentStory<typeof Card> = args => <Card {...args} />

const WithContent: ComponentStory<typeof Card> = args => (
  <CardContent {...args}>
    Dolore officia irure cillum qui laboris officia pariatur commodo voluptate
    velit fugiat aliqua anim id. Nisi Lorem do deserunt qui laborum occaecat
    nisi aliquip fugiat officia culpa eu. Quis elit excepteur magna laboris
    cupidatat commodo culpa aute est magna nostrud ullamco. Ullamco dolore sint
    amet consequat non sunt non duis nostrud eu consectetur reprehenderit minim.
  </CardContent>
)

const WithHeader: ComponentStory<typeof Card> = args => (
  <CardHeader {...args}>This is the Card Header</CardHeader>
)

// const Template: Story<BoxProps> = args => <Card {...args} />

// export const Primary = Template.bind({})
// Primary.args = {
//   title: ''
// }
