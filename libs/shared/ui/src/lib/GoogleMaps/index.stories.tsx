import { Meta, Story } from '@storybook/react'

import GoogleMapComponent, { GoogleMapProps } from './index'

export default {
  component: GoogleMapComponent,
  title: 'GoogleMaps/GoogleMapComponent'
} as Meta

const Template: Story<GoogleMapProps> = args => <GoogleMapComponent {...args} />

export const Primary = Template.bind({})
Primary.args = {}
