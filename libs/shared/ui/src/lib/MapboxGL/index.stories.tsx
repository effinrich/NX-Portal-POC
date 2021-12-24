import { configPHC } from '@phc/shared-utils'
import { Meta, Story } from '@storybook/react'

import MapboxGL, { MapboxGLProps } from './index'

const mapboxToken = configPHC.mapboxToken

export default {
  component: MapboxGL,
  title: 'Mapbox/MapboxGL'
} as Meta

const Template: Story<MapboxGLProps> = args => (
  <MapboxGL mapboxToken={mapboxToken} {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
