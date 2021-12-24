import { useQuery } from 'react-query'
import { configPHC, useAxiosApi } from '@phc/shared-utils'

export function useGetLocation(location) {
  const axios = useAxiosApi()

  return useQuery(['location', location], async () => {
    try {
      return axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${configPHC.mapboxToken}`
        )
        .then(res => res.data)
    } catch (error) {
      return error
    }
  })
}
