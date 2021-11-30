import axios from 'axios'

export const axiosApi = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosApi
