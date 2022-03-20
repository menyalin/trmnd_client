import AuthService from './auth.service.js'

export const authPlugin = (store) => {
  store.dispatch('initAuthState')
}

export const AuthModule = {
  state: {
    user: null,
    loggedIn: false,
    authChecked: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.loggedIn = true
    },
    logout(state) {
      state.user = {}
      state.loggedIn = false
    },
    setAuthChecked(state, payload) {
      state.authChecked = payload
    },
  },
  actions: {
    initAuthState({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await AuthService.checkAuth()
          if (data) {
            commit('setUser', data.user)
          }
          commit('setAppLoading', false)
          commit('setAuthChecked', true)
          resolve()
        } catch (e) {
          commit('setAppLoading', false)
          commit('setAuthChecked', true)
          resolve()
        }
      })
    },

    async signIn({ commit }, { name, password }) {
      try {
        const { user } = await AuthService.login({ name, password })
        commit('setUser', user)
        return { user, status: 'success' }
      } catch (e) {
        return { status: 'error', message: e.response?.data }
      }
    },
    async signUp({ commit }, { name, password }) {
      try {
        const { user } = await AuthService.registration({ name, password })
        commit('setUser', user)
        return { user, status: 'success' }
      } catch (e) {
        return { status: 'error', message: e.response?.data }
      }
    },

    async logout({ commit }) {
      try {
        await AuthService.logout()
        commit('logout')
      } catch (e) {}
    },
  },
  getters: {
    user: ({ user }) => user,
    loggedIn: ({ loggedIn }) => loggedIn,
    authChecked: ({ authChecked }) => authChecked,
  },
}
