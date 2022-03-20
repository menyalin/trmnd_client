import api from '@/api'
const ACCESS_TOKEN = 'accessToken'

class AuthService {
  async login(payload) {
    const { data } = await api.post('/login', payload)
    localStorage.setItem(ACCESS_TOKEN, data.accessToken)
    return data
  }
  async registration(payload) {
    const { data } = await api.post('/registration', payload)
    localStorage.setItem(ACCESS_TOKEN, data.accessToken)
    return data
  }
  async logout() {
    const { data } = await api.post('/logout')
    localStorage.removeItem(ACCESS_TOKEN)
    return data
  }
  checkAuth() {
    return new Promise(async (resolve, reject) => {
      if (localStorage.getItem(ACCESS_TOKEN)) {
        api
          .post('/refresh')
          .then((res) => resolve(res))
          .catch((e) => reject(e))
      } else {
        resolve(null)
      }
    })
  }
}

export default new AuthService()
