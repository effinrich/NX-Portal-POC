import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  useToast,
  VStack
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

export interface ProfileFormProps {
  onModalClose: () => void
}

const validationSchema = Yup.object({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
})

export const ProfileForm = ({ onModalClose }: ProfileFormProps) => {
  const toast = useToast()

  return (
    <Box>
      <Formik
        initialValues={{ firstname: '', lastname: '', password: '0' }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          toast({
            title: 'Submitted!',
            status: 'success',
            duration: 3000,
            isClosable: true
          })
        }}
      >
        {props => (
          <Form>
            <VStack>
              <Field name="firstname">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.firstname && form.touched.firstname}
                  >
                    <Input type="text" placeholder="First name" {...field} />
                    <FormErrorMessage>{form.errors.firstname}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="lastname">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.lastname && form.touched.lastname}
                  >
                    <Input type="text" placeholder="Last name" {...field} />
                    <FormErrorMessage>{form.errors.lastname}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="lastname">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <Input type="password" placeholder="Password" {...field} />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Stack direction={['column', 'row']} spacing={4} w="100%" pt={4}>
                <Button
                  colorScheme="brand"
                  isFullWidth
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  onClick={onModalClose}
                  variant="outline"
                  colorScheme="red"
                  isFullWidth
                >
                  Cancel
                </Button>
              </Stack>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default ProfileForm
