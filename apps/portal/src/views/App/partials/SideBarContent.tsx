import React, { ReactNode, ReactText } from 'react'
import { IconType } from 'react-icons'
import {
  FiCompass,
  FiHome,
  FiSettings,
  FiTrendingUp,
  FiUser
} from 'react-icons/fi'
import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Image,
  useColorModeValue
} from '@chakra-ui/react'
import styled from 'styled-components'

import logo from '../../../assets/logo.png'

import NavItem from './NavItem'

interface LinkItemProps {
  name: string
  icon: IconType
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Users', icon: FiUser },
  { name: 'Settings', icon: FiSettings }
]

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SideBarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box>
          <Image src={logo} maxW="105" height="auto" ml="8" mt="2" />
        </Box>

        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem
          to={`/${link.name.toLowerCase()}`}
          key={link.name}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

export default SideBarContent
