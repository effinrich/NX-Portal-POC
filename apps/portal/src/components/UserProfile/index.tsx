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
import { Loader } from '../Loader'
import { UserAvatar } from '../UserAvatar'

export const UserProfile = ({ user }) => {
  const colorMode = useColorModeValue('gray.100', 'gray.800')

  if (!user) return <Loader size="xl" />

  return (
    <Box as="section" bg={colorMode}>
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
