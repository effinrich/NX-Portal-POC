import { useAutocompleteInput } from './hooks/use-autocomplete-input'
import StyledMapboxAutocomplete, {
  MapboxAutocompleteInput,
  MapboxAutocompleteSuggestion,
  MapboxAutocompleteSuggestionWrapper
} from './style'

export function MapboxAutocomplete() {
  const address = useAutocompleteInput('')

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
              <MapboxAutocompleteSuggestion
                key={index}
                onClick={() => {
                  console.log('selectedResult = ', suggestion)
                  address.setValue(suggestion.place_name)
                  address.setSelectedResult(suggestion)
                  address.setSuggestions([])
                }}
              >
                {suggestion.place_name}
              </MapboxAutocompleteSuggestion>
            )
          })}
        </MapboxAutocompleteSuggestionWrapper>
      )}
    </StyledMapboxAutocomplete>
  )
}

export default MapboxAutocomplete
