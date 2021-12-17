import { ComponentMeta, ComponentStory, Meta, Story } from '@storybook/react'

import { Modal } from './index'

export default {
  title: 'Modal',
  component: Modal
} as ComponentMeta<typeof Modal>

const Base: ComponentStory<typeof Modal> = args => <Modal {...args} />

// const WithContent: ComponentStory<typeof Card> = args => (
//   <CardContent {...args}>
//     Dolore officia irure cillum qui laboris officia pariatur commodo voluptate
//     velit fugiat aliqua anim id. Nisi Lorem do deserunt qui laborum occaecat
//     nisi aliquip fugiat officia culpa eu. Quis elit excepteur magna laboris
//     cupidatat commodo culpa aute est magna nostrud ullamco. Ullamco dolore sint
//     amet consequat non sunt non duis nostrud eu consectetur reprehenderit minim.
//   </CardContent>
// )

// const WithHeader: ComponentStory<typeof Card> = args => (
//   <CardHeader {...args}>This is the Card Header</CardHeader>
// )

// const Template: Story<BoxProps> = args => <Card {...args} />

// export const Primary = Template.bind({})
// Primary.args = {
//   title: ''
// }
