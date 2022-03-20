import Vue from 'vue'
import Vuex from 'vuex'
import { AuthModule } from '@/modules/auth/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appLoading: true,
  },
  mutations: {
    setAppLoading(state, payload) {
      state.appLoading = payload
    },
  },
  actions: {},
  getters: {
    appLoading: ({ appLoading }) => appLoading,
  },
  modules: {
    AuthModule,
  },
})
