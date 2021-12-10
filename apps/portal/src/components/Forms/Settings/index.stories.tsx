import { Meta, Story } from '@storybook/react'

import { SettingsForm, SettingsFormProps } from './index'

export default {
  component: SettingsForm,
  title: 'Formik/SettingsForm'
} as Meta

// export const SettingsFormStory = () => (
//   <>
//     <p>
//       This is an entire 'Form'. It has several Fields that are descendants of an
//       overall Formik component. There is no need to supply a withFormik
//       decorator here
//     </p>
//     <SettingsForm onModalClose={() => {}} />
//   </>
// )

const Template: Story<SettingsFormProps> = args => <SettingsForm {...args} />

export const SettingsFormStory = Template.bind({})
SettingsFormStory.args = {}
