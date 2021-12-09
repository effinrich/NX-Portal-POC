import axios from 'axios'

export const axiosApi = axios.create({
  baseURL: 'https://rest.pluto.thepublichealthco.com/blocking',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosApi
