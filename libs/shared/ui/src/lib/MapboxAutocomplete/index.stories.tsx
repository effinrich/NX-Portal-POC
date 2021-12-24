import { Meta, Story } from '@storybook/react'

import MapboxAutocomplete from './index'

export default {
  component: MapboxAutocomplete,
  title: 'Mapbox/MapboxAutocomplete'
} as Meta

const Template: Story = args => <MapboxAutocomplete {...args} />

export const Default = Template.bind({})
Default.args = {}
