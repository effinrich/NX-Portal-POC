import { Meta, Story } from '@storybook/react'

import { MapboxGL, MapboxGLProps } from './index'

export default {
  component: MapboxGL,
  title: 'Maps/MapboxGL'
} as Meta

const Template: Story<MapboxGLProps> = args => <MapboxGL {...args} />

export const Primary = Template.bind({})
Primary.args = {}
