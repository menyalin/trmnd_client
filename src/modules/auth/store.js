import { Auth, Hub } from 'aws-amplify'

const _authListener = (store) => (data) => {
  console.log('authListener', data)
  if (data.payload?.event === 'signIn') store.dispatch('initAuthState')
  if (data.payload?.event === 'signOut') store.commit('setUser', null)
  if (data.payload?.event === 'tokenRefresh') console.log('m: refresh token')
  if (data.payload?.event === 'tokenRefresh_failure')
    console.log('m: refresh token failure')
}

export const authPlugin = (store) => {
  Hub.listen('auth', _authListener(store))
  store.dispatch('initAuthState')
}

export const AuthModule = {
  state: {
    user: null,
  },
  mutations: {
    initAuthModule() {
      console.log('initModule')
    },
    setUser(state, payload) {
      state.user = payload
    },
  },
  actions: {
    async initAuthState({ commit }) {
      try {
        const user = await Auth.currentAuthenticatedUser()
        if (!user?.signInUserSession) {
          console.log('ошибка')
          return null
        }
        commit('setUser', {
          username: user.username,
          atributes: user.attributes,
        })
      } catch (e) {
        console.log('e:', e)
      }
    },
    async signOut() {
      await Auth.signOut()
    },
    async signIn({ commit }, { email, password }) {
      try {
        const user = await Auth.signIn(email, password)
        commit('setUser', user)
        return { user, status: 'success' }
      } catch (e) {
        console.log('signIn error:', e)
        return { status: 'error', message: e.message }
      }
    },
    async signUp({ commit }, { name, email, password }) {
      try {
        const { user } = await Auth.signUp({
          username: email,
          password,
          attributes: {
            email,
            name,
          },
        })
        commit('setUser', user)
        return { user, status: 'success' }
      } catch (e) {
        console.log('signUp error:', e)
        return { status: 'error', message: e.message }
      }
    },
    async confirmSignUp({ commit }, { username, code }) {
      try {
        await Auth.confirmSignUp(username, code)
        return { status: 'ok' }
      } catch (e) {
        console.log('confirmSignUp error:', e)
      }
    },
  },
  getters: {
    user: ({ user }) => user,
  },
}
