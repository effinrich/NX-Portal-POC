import { GoCalendar, GoGlobe, GoPencil } from 'react-icons/go'
import {
  Box,
  Button,
  HStack,
  Icon,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  Wrap
} from '@chakra-ui/react'

import { Card } from '../Card'
import { CardContent } from '../CardContent'
import { CardHeader } from '../CardHeader'
import { UserAvatar } from '../UserAvatar'

type User = {
  name?: string
  picture?: string
  given_name?: string
  family_name?: string
  nickname?: string
  locale?: string
  updated_at?: string
  email?: string
  email_verified?: boolean
  sub?: string
}

export interface UserProfileProps {
  user: User
  onModalOpen: () => void
}

export const UserProfile = ({ user, onModalOpen }: UserProfileProps) => {
  const colorMode = useColorModeValue('gray.50', 'gray.800')
  return (
    <Box as="section" py="12" bg={colorMode}>
      <Card>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '4', md: '10' }}
        >
          <UserAvatar name={`${user.name}`} src={`${user.picture}`} />
          <CardContent>
            <CardHeader
              title={`${user.name}`}
              action={
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onModalOpen}
                  leftIcon={
                    <Icon as={GoPencil} color="gray.400" marginStart="-1" />
                  }
                >
                  Edit
                </Button>
              }
            />
            <Text mt="1" fontWeight="medium">
              Software Engineer
            </Text>
            <Stack spacing="1" mt="2">
              <HStack fontSize="sm">
                <Icon as={GoGlobe} color="gray.500" />
                <Text>Los Angeles, CA</Text>
              </HStack>
              <HStack fontSize="sm">
                <Icon as={GoCalendar} color="gray.500" />
                <Text>October, 2021</Text>
              </HStack>
            </Stack>

            <Text fontWeight="semibold" mt="8" mb="2">
              Interests
            </Text>
            <Wrap shouldWrapChildren>
              <Tag>Component Driven Development</Tag>
              <Tag>Collborative Workflows</Tag>
              <Tag>React</Tag>
              <Tag>Call of Duty</Tag>
            </Wrap>
          </CardContent>
        </Stack>
      </Card>
    </Box>
  )
}

export default UserProfile
