import { addons } from '@storybook/addons'
import { create } from '@storybook/theming/create'

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'PHC UI Library'
    // brandImage: 'https://place-hold.it/350x150'
  })
})
