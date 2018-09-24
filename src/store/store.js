import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import { userGetters, spotGetters } from './getters'
import { loginMutations, spotMutations } from './mutations'
import { loginActions, channelActions, spotActions } from './actions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    // login
    kakaoAccessToken: null,
    user_id: null,
    openLoginPopUp: true,
    channels: null
  },
  getters: Object.assign({}, userGetters, spotGetters),
  mutations: Object.assign({}, loginMutations, spotMutations),
  actions: Object.assign({}, loginActions, channelActions, spotActions),
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
        setItem: (key, value) =>
          Cookies.set(key, value, { expires: 3, secure: false }), // secure같은 경우는 https일 경우에만 true로 만든다.
        removeItem: key => Cookies.remove(key)
      },
      reducer: state => ({
        kakaoAccessToken: state.kakaoAccessToken,
        user_id: state.user_id,
        openLoginPopUp: state.openLoginPopUp
      })
    })
  ]
})