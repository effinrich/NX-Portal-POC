# Storybook Builder MCP - Usage Examples

This document provides practical examples of using the Storybook Builder MCP server.

## Quick Start

After installing and configuring the MCP server (see README.md), you can use it through Claude by simply describing what you want to do.

## Example 1: Creating a New Component

**Prompt:**
```
Create a new Button component with Chakra UI that supports different sizes and variants
```

**What happens:**
The MCP will:
1. Create `libs/shared/ui/src/lib/Button/index.tsx` with the component
2. Create `libs/shared/ui/src/lib/Button/index.stories.tsx` with stories and interaction tests
3. Create `libs/shared/ui/src/lib/Button/index.spec.tsx` with UI tests
4. Create `libs/shared/ui/src/lib/Button/index.mdx` with documentation

**Example Component Created:**
```typescript
// libs/shared/ui/src/lib/Button/index.tsx
import { FC } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

export interface ButtonProps extends BoxProps {
  // Add your props here
}

export const Button: FC<ButtonProps> = (props) => {
  return (
    <Box {...props}>
      {/* Button content */}
    </Box>
  )
}

export default Button
```

## Example 2: Auto-Generating Files for New Components

**Setup:**
```
Start watching the UI directory for new components
```

**Then create a component manually:**
```typescript
// libs/shared/ui/src/lib/Avatar/index.tsx
import { FC } from 'react'
import { Avatar as ChakraAvatar, AvatarProps } from '@chakra-ui/react'

export const Avatar: FC<AvatarProps> = (props) => {
  return <ChakraAvatar {...props} />
}

export default Avatar
```

**What happens:**
The MCP file watcher will automatically detect the new component and generate:
- `index.stories.tsx` (if missing)
- `index.spec.tsx` (if missing)
- `index.mdx` (if missing)

**Stop watching:**
```
Stop watching the UI directory
```

## Example 3: Adding Tests to Existing Component

**Prompt:**
```
Generate Storybook interaction tests for libs/shared/ui/src/lib/Card/index.tsx
```

**Generated Stories File:**
```typescript
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Card } from '.'

export default {
  title: 'Card',
  component: Card,
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />

export const Default = Template.bind({})
Default.args = {
  // Add default args here
}

export const WithInteractions = Template.bind({})
WithInteractions.args = {
  ...Default.args,
}

WithInteractions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // Add your interaction tests here
  // Example:
  // const button = await canvas.getByRole('button')
  // await userEvent.click(button)
  // await expect(canvas.getByText('Clicked')).toBeInTheDocument()
}
```

## Example 4: Generating Documentation

**Prompt:**
```
Generate MDX documentation for libs/shared/ui/src/lib/Card/index.tsx with a description "A flexible card component for displaying content" and usage example
```

**Generated MDX File:**
```mdx
import { Meta, Story, Canvas, ArgsTable } from '@storybook/addon-docs'
import { Card } from './index'

<Meta title="Card" component={Card} />

# Card

A flexible card component for displaying content

## Usage

\`\`\`tsx
import { Card } from '@shared/ui'

<Card />
\`\`\`

## Props

<ArgsTable of={Card} />

## Examples

### Default

<Canvas>
  <Story id="card--default" />
</Canvas>

## Accessibility

This component follows WAI-ARIA guidelines and is keyboard accessible.

## Notes

- Ensure proper contrast ratios for accessibility
- Test with screen readers
- Verify keyboard navigation
```

## Example 5: Analyzing a Component

**Prompt:**
```
Analyze the Card component to see what files it has
```

**Response:**
```json
{
  "name": "Card",
  "path": "/home/user/NX-Portal-POC/libs/shared/ui/src/lib/Card/index.tsx",
  "hasStories": true,
  "hasTests": false,
  "hasDocs": false,
  "props": ["bg", "maxWidth", "mx", "p", "borderRadius", "borderWidth", "borderColor", "shadow"]
}
```

This tells you:
- Component name: `Card`
- Has Storybook stories: ✅
- Has tests: ❌ (missing)
- Has documentation: ❌ (missing)
- Props extracted from the component

## Example 6: Creating a Complex Form Component

**Prompt:**
```
Create a new LoginForm component with email and password fields, validation, and submit handling
```

**What happens:**
The MCP creates the scaffolding, then you can customize:

```typescript
// The generated index.tsx provides the structure
import { FC } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

export interface LoginFormProps extends BoxProps {
  // Add your props here
  onSubmit?: (email: string, password: string) => void
}

export const LoginForm: FC<LoginFormProps> = (props) => {
  return (
    <Box {...props}>
      {/* LoginForm content */}
    </Box>
  )
}

export default LoginForm
```

You can then enhance it with the actual form logic while the stories and tests are already set up.

## Example 7: Batch Component Generation

**Prompt:**
```
Create the following components:
1. Header component for the navigation
2. Footer component for the page footer
3. Sidebar component for navigation menu
```

The MCP will create all three components with their respective stories, tests, and docs.

## Example 8: Checking Watcher Status

**Prompt:**
```
What's the status of the file watcher?
```

**Response:**
```
File watcher status: Running
Watching: /home/user/NX-Portal-POC/libs/shared/ui/src/lib
```

## Example 9: Creating a Component in a Subdirectory

**Prompt:**
```
Create a TextInput component in the Forms subdirectory
```

**What happens:**
Component will be created at:
```
libs/shared/ui/src/lib/Forms/TextInput/
  ├── index.tsx
  ├── index.stories.tsx
  ├── index.spec.tsx
  └── index.mdx
```

## Tips and Best Practices

### 1. Use the File Watcher During Development
Start the watcher when you're actively developing components:
```
Start watching the UI directory
```

Then create components manually and let the MCP auto-generate the supporting files.

### 2. Generate Tests After Implementation
First create the component and implement its functionality, then:
```
Generate Storybook tests and UI tests for MyComponent
```

### 3. Keep Documentation Updated
After modifying a component:
```
Regenerate documentation for MyComponent with updated description
```

### 4. Analyze Before Generating
Check what files exist before generating:
```
Analyze the MyComponent component
```

### 5. Customize Templates
The templates in `mcp-servers/storybook-builder/src/templates/` can be modified to match your project's coding style and requirements.

## Troubleshooting Common Issues

### Issue: Component Not Detected by Watcher
**Solution:** Ensure the file is named `index.tsx` and located in `libs/shared/ui/src/lib/ComponentName/`

### Issue: Generated Tests Don't Match Project Style
**Solution:** Modify the templates in `src/templates/tests.ts` to match your preferred testing patterns

### Issue: Stories Not Appearing in Storybook
**Solution:**
1. Check the stories file is in the correct location
2. Run `npm run storybook` to rebuild
3. Verify the component name matches the file structure

## Next Steps

- Customize the templates to match your project's needs
- Add custom test scenarios to the generated test files
- Enhance the MDX documentation with more examples
- Configure the watcher to ignore certain directories if needed
