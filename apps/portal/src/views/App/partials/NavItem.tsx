import { ReactText } from 'react'
import IconType from 'react-icons'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Flex, FlexProps, Icon, Link } from '@chakra-ui/react'

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactText
  to?: string
  href?: string
}

const NavItem = ({
  href,
  to = '/',
  icon,
  children,

  ...rest
}: NavItemProps) => {
  return (
    <Link
      as={RouterLink}
      href={href}
      to={to}
      style={{ textDecoration: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: '#191c28',
          color: 'white'
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white'
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

export default NavItem
