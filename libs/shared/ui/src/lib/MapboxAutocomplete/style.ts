import styled from 'styled-components'

export interface MapboxAutocompleteInputProps {
  isTyping?: boolean
}

export default styled.div`
  margin: 0 auto;
`

export const MapboxAutocompleteInput = styled.input<MapboxAutocompleteInputProps>`
  outline: 2px solid rgb(0 0 0 / 0%);
  width: 100%;
  /* background: white; */
  border: 1px solid;
  border-color: inherit;
  background: inherit;
  padding: 10px 20px;
  border-radius: 10px;
  position: relative;
  display: grid;
  justify-self: center;
  &:focus {
    outline: none;
    border-radius: ${props => props.isTyping && '10px 10px 0px 0px'};
  }
`

export const MapboxAutocompleteSuggestionWrapper = styled.div`
  background: white;
  position: absolute;
  width: 100%;
  max-width: 950px;
  z-index: 999999;
  border-radius: 0px 0px 10px 10px;
  border: 1px solid;
  border-top: none;
  border-color: inherit;
  box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.1),
    0 1px 2px 0px rgba(0, 0, 0, 0.06);

  /* border-radius: 0px 0px 10px 10px; */
`

export const MapboxAutocompleteSuggestionOuter = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 10px 20px;
  &:hover,
  &:focus {
    background: #b8d3ff;
  }
`

export const MapboxAutocompleteSuggestion = styled.p`
  cursor: pointer;
  width: 100%;
`
