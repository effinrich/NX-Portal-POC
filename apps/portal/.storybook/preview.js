import { useEffect } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  ChakraProvider,
  extendTheme,
  Flex,
  IconButton,
  // theme,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'
import { DocsContainer, DocsPage } from '@storybook/addon-docs'
import { addParameters, StoryContext } from '@storybook/react'
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

  const theme = extendTheme({
    direction: dir,
    colors: {
      brand: {
        50: '#E5EFFF',
        100: '#B8D3FF',
        200: '#8AB7FF',
        300: '#5C9BFF',
        400: '#2E7EFF',
        500: '#0062FF',
        600: '#004ECC',
        700: '#003B99',
        800: '#002766',
        900: '#001433'
      }
    }
  })

  return (
    <Router>
      <ChakraProvider theme={theme}>
        <div dir={dir} id="story-wrapper">
          <ColorModeToggleBar />
          <StoryFn />
        </div>
      </ChakraProvider>
    </Router>
  )
}

addParameters({
  actions: { argTypesRegex: '^on.*' },
  dependencies: {
    // display only dependencies/dependents that have a story in storybook
    // by default this is false
    withStoriesOnly: true,

    // completely hide a dependency/dependents block if it has no elements
    // by default this is false
    hideEmpty: true
  },
  docs: {
    container: DocsContainer,
    page: DocsPage
  }
})

export const decorators = [withChakra, withPerformance]
