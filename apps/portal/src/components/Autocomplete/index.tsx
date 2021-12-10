import React from 'react'
import { Stack } from '@chakra-ui/react'
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList
} from '@choc-ui/chakra-autocomplete'

export const Autocomplete = () => {
  const countries = [
    'nigeria',
    'japan',
    'india',
    'united states',
    'south korea'
  ]
  return (
    <Stack direction="column">
      <AutoComplete openOnFocus onChange={vals => console.log(vals)}>
        <AutoCompleteInput placeholder="Search locations..." variant="filled" />
        {/* {({ tags }) =>
            tags.map((tag, tid) => (
              <AutoCompleteTag
                key={tid}
                label={tag.label}
                onRemove={tag.onRemove}
              />
            ))
          }
        </AutoCompleteInput> */}
        <AutoCompleteList>
          {countries.map((country, cid) => (
            <AutoCompleteItem
              key={`option-${cid}`}
              value={country}
              textTransform="capitalize"
              _selected={{ bg: 'whiteAlpha.50' }}
              _focus={{ bg: 'whiteAlpha.100' }}
            >
              {country}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </Stack>
  )
}

export default Autocomplete
