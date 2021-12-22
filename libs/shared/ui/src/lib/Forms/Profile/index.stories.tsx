import { Meta, Story } from '@storybook/react'

import { ProfileForm, ProfileFormProps } from './index'

export default {
  component: ProfileForm,
  title: 'Formik/ProfileForm'
} as Meta

// export const ProfileFormStory = () => (
//   <>
//     <p>
//       This is an entire 'Form'. It has several Fields that are descendants of an
//       overall Formik component. There is no need to supply a withFormik
//       decorator here
//     </p>
//     <ProfileForm onModalClose={() => {}} />
//   </>
// )

const Template: Story<ProfileFormProps> = args => <ProfileForm {...args} />

export const ProfileFormStory = Template.bind({})
ProfileFormStory.args = {
  onModalClose: () => {}
}
