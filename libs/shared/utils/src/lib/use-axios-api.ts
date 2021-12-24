import { useEffect, useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Axios, { AxiosRequestConfig } from 'axios'

import { configPHC } from './configPHC'
// export const axiosApiInstance = Axios.create({
//   baseURL: 'https://rest.pluto.thepublichealthco.com/blocking',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

// axiosApiInstance.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     const token = isBrowser ? localStorage.getItem(AUTH_TOKEN_KEY) : null
//     const authHeaders = token ? { Authorization: `Bearer ${token}` } : {}
//     return {
//       baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
//       ...config,
//       headers: {
//         ...authHeaders,
//         ...config.headers
//       }
//     }
//   },
//   error => Promise.reject(error)
// )

// axiosApiInstance.interceptors.response.use((response: AxiosResponse) => {
//   if (response.headers['x-total-count']) {
//     return {
//       content: response.data,
//       totalItems: response?.headers['x-total-count']
//     }
//   }
//   return response.data
// })

// export default axiosApiInstance

export const useAxiosApi = () => {
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0()

  const axiosApiInstance = Axios.create({
    baseURL: 'https://rest.pluto.thepublichealthco.com/blocking',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const axios = useRef(axiosApiInstance)

  useEffect(() => {
    const currentAPI = axios.current
    const requestInterceptorId = currentAPI.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        const token = await getAccessTokenSilently({
          audience: `${configPHC.auth0Audience}`,
          scope: 'read:users,root:read'
        })
        config.headers.authorization = `Bearer ${token}`
        config.cancelToken = Axios.CancelToken.source().token
        return config
      }
    )
    const responseInterceptorId = currentAPI.interceptors.response.use(
      null,
      async error => {
        if (error.config && error.response && error.response.status === 401) {
          await loginWithRedirect({
            redirect_uri: window.location.origin
          })
        }

        return Promise.reject(error)
      }
    )
    return () => {
      currentAPI.interceptors.request.eject(requestInterceptorId)
      currentAPI.interceptors.response.eject(responseInterceptorId)
    }
  })
  return axios.current
}

export default useAxiosApi
