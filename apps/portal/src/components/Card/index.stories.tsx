import { GoPencil } from 'react-icons/go'
import { Button, Icon, Stack } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CardContent } from '../CardContent/index'
import { CardHeader } from '../CardHeader/index'

import { Card } from './index'

export default {
  title: 'Card',
  component: Card,
  subcomponents: { CardContent, CardHeader } //👈 Adds the ListItem component as a subcomponent
} as ComponentMeta<typeof Card>

export const Empty: ComponentStory<typeof Card> = args => <Card {...args} />

export const WithContent: ComponentStory<typeof Card> = args => (
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

export const WithHeader: ComponentStory<typeof Card> = args => (
  <Card>
    <CardHeader
      title="This is a card title"
      action={
        <Button
          size="sm"
          variant="outline"
          leftIcon={<Icon as={GoPencil} color="gray.400" marginStart="-1" />}
        >
          Edit
        </Button>
      }
      {...args}
    >
      This is the Card Header
    </CardHeader>
  </Card>
)

export const WithHeaderAndContent: ComponentStory<typeof Card> = args => (
  <Card>
    <Stack spacing={2}>
      <CardHeader
        title="This is a card title"
        action={
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Icon as={GoPencil} color="gray.400" marginStart="-1" />}
          >
            Edit
          </Button>
        }
        {...args}
      >
        This is the Card Header
      </CardHeader>
      <CardContent {...args}>
        Dolore officia irure cillum qui laboris officia pariatur commodo
        voluptate velit fugiat aliqua anim id. Nisi Lorem do deserunt qui
        laborum occaecat nisi aliquip fugiat officia culpa eu. Quis elit
        excepteur magna laboris cupidatat commodo culpa aute est magna nostrud
        ullamco. Ullamco dolore sint amet consequat non sunt non duis nostrud eu
        consectetur reprehenderit minim.
      </CardContent>
    </Stack>
  </Card>
)
