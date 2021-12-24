import * as React from 'react'
import { Flex, FlexProps, Heading, useColorModeValue } from '@chakra-ui/react'

export interface CardHeaderProps extends FlexProps {
  title: string
  action: React.ReactNode
}

export const CardHeader = ({
  title,
  action,
  ...flexProps
}: CardHeaderProps) => {
  const color = useColorModeValue('gray.800', 'white')
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      {...flexProps}
      pb={2}
    >
      <Heading
        size="md"
        color={color}
        fontWeight="semibold"
        letterSpacing="tight"
        marginEnd="6"
      >
        {title}
      </Heading>
      {action}
    </Flex>
  )
}

export default CardHeader
