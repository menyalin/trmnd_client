import axios from 'axios'

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.VUE_APP_API_URL,
})
api.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'accessToken'
    )}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
api.interceptors.response.use(
  function (config) {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        console.log('get refresh token')
        const response = await axios.post(
          `${process.env.VUE_APP_API_URL}/refresh`,
          {},
          { withCredentials: true }
        )
        localStorage.setItem('accessToken', response.data.accessToken)
        return api.request(originalRequest)
      } catch (e) {
        console.log('unauthorized')
      }
    }
    throw error
  }
)
export default api
