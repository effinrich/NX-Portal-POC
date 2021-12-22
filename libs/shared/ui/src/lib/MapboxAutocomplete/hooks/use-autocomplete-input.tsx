import { useState } from 'react'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { configPHC, useAxiosApi } from '@phc/shared-utils'

export interface ResultsProps {
  features?: any
}

type IResult = {
  id: string
  context: Record<string, unknown>[]
}

export const useAutocompleteInput = (initialValue = '') => {
  const axios = useAxiosApi()
  const [value, setValue] = useState(initialValue)
  const [suggestions, setSuggestions] = useState([])
  const [selectedResult, setSelectedResult] = useState<IResult>()

  const handleChange = async event => {
    setValue(event.target.value)

    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=${configPHC.mapboxToken}&autocomplete=true`
      const response = await axios.get(endpoint)
      const results: ResultsProps = await response.data
      setSuggestions(results?.features)
    } catch (error) {
      console.log('Error fetching data, ', error)
    }
  }

  return {
    value,
    onChange: handleChange,
    setValue,
    setSelectedResult,
    selectedResult,
    suggestions,
    setSuggestions
  }
}

export default useAutocompleteInput
