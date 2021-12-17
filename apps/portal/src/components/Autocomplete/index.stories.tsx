import { Meta, Story } from '@storybook/react'

import { Autocomplete, AutocompleteProps } from './index'

export default {
  component: Autocomplete,
  title: 'Autocomplete'
} as Meta

const Template: Story<AutocompleteProps> = args => <Autocomplete {...args} />

export const Default = Template.bind({})
Default.args = {
  options: [
    { value: 'ghana', label: 'Ghana' },
    { value: 'nigeria', label: 'Nigeria' },
    { value: 'kenya', label: 'Kenya' },
    { value: 'southAfrica', label: 'South Africa' },
    { value: 'unitedStates', label: 'United States' },
    { value: 'canada', label: 'Canada' },
    { value: 'germany', label: 'Germany' }
  ]
}
