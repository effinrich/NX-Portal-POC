import { useState } from 'react'
import { Stack } from '@chakra-ui/react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import styled from 'styled-components'

const StyledAutocomplete = styled.div`
  label {
    display: none;
  }
`
export interface Item {
  label: string
  value: string
}

export interface AutocompleteProps {
  options: Array<Item>
}

export const Autocomplete = ({ options }: AutocompleteProps) => {
  const [pickerItems, setPickerItems] = useState(options)
  const [selectedItems, setSelectedItems] = useState<Item[]>([])

  const handleCreateItem = (item: Item) => {
    setPickerItems(curr => [...curr, item])
    setSelectedItems(curr => [...curr, item])
  }

  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems)
    }
  }

  return (
    <StyledAutocomplete>
      <Stack direction="column">
        <CUIAutoComplete
          label="Choose preferred work locations"
          placeholder="Type a Country"
          onCreateItem={handleCreateItem}
          items={pickerItems}
          selectedItems={selectedItems}
          onSelectedItemsChange={changes =>
            handleSelectedItemsChange(changes.selectedItems)
          }
        />
      </Stack>
    </StyledAutocomplete>
  )
}

export default Autocomplete
