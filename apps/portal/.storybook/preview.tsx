import { useEffect } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  ChakraProvider,
  extendTheme,
  Flex,
  IconButton,
  theme,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'
import { StoryContext } from '@storybook/react'
import { withPerformance } from 'storybook-addon-performance'

/**
 * Add global context for RTL-LTR switching
 */
export const globalTypes = {
  direction: {
    name: 'Direction',
    description: 'Direction for layout',
    defaultValue: 'LTR',
    toolbar: {
      icon: 'globe',
      items: ['LTR', 'RTL']
    }
  }
}

const ColorModeToggleBar = () => {
  const { toggleColorMode } = useColorMode()
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const nextMode = useColorModeValue('dark', 'light')

  return (
    <Flex justify="flex-end" mb={4}>
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${nextMode} mode`}
        variant="ghost"
        color="current"
        marginLeft="2"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
      />
    </Flex>
  )
}

// eslint-disable-next-line @typescript-eslint/ban-types
const withChakra = (StoryFn: Function, context: StoryContext) => {
  const { direction } = context.globals
  const dir = direction.toLowerCase()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.documentElement.dir = dir
  }, [dir])

  return (
    <Router>
      <ChakraProvider theme={extendTheme({ direction: dir })}>
        <div dir={dir} id="story-wrapper" style={{ minHeight: '100vh' }}>
          <ColorModeToggleBar />
          <StoryFn />
        </div>
      </ChakraProvider>
    </Router>
  )
}

export const decorators = [withChakra, withPerformance]
