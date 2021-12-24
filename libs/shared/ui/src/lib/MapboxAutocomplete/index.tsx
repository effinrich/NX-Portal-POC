import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useAutocompleteInput } from './hooks/use-autocomplete-input'
import StyledMapboxAutocomplete, {
  MapboxAutocompleteInput,
  MapboxAutocompleteSuggestion,
  MapboxAutocompleteSuggestionOuter,
  MapboxAutocompleteSuggestionWrapper
} from './style'

export function MapboxAutocomplete() {
  const address = useAutocompleteInput('')
  const history = useHistory()

  // const handleSuggestionClick = () => history.push(`/location/${locationId}`)

  useEffect(() => {
    if (address.selectedResult) {
      // console.log(address.selectedResult.context[0].text)
      const locationId = address.selectedResult.context[0].text
      history.push(`/location/${locationId}`)
    }
  }, [address.selectedResult, history])

  return (
    <StyledMapboxAutocomplete>
      <MapboxAutocompleteInput
        placeholder="Address"
        {...address}
        isTyping={address.value !== ''}
      />
      {address.suggestions?.length > 0 && (
        <MapboxAutocompleteSuggestionWrapper>
          {address.suggestions.map((suggestion, index) => {
            return (
              <MapboxAutocompleteSuggestionOuter key={index}>
                <MapboxAutocompleteSuggestion
                  onClick={() => {
                    console.log('selectedResult = ', suggestion)
                    address.setValue(suggestion.place_name)
                    address.setSelectedResult(suggestion)
                    address.setSuggestions([])
                  }}
                >
                  {suggestion.place_name}
                </MapboxAutocompleteSuggestion>
              </MapboxAutocompleteSuggestionOuter>
            )
          })}
        </MapboxAutocompleteSuggestionWrapper>
      )}
    </StyledMapboxAutocomplete>
  )
}

export default MapboxAutocomplete
