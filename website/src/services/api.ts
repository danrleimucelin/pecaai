import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_URL_API || 'http://localhost:3333/api'
  // withCredentials: true
})

axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config
  },
  error => {
    // Do something with request error
    console.error(error)
    // return Promise.reject(error)
    return error
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    // Do something with response data
    return response
  },
  error => {
    // Do something with response error
    console.error(error)
    // return Promise.reject(error)
    return error
  }
)

export default api
