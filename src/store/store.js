import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import { userGetters, spotGetters, themeGetters, channelGetters } from './getters'
import { loginMutations, spotMutations, themeMutations, channelMutations } from './mutations'
import { loginActions, channelActions, spotActions, themeActions } from './actions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    // login
    kakaoAccessToken: null,
    user_id: null,
    openLoginPopUp: true,
    // channel
    channels: null,
    channel_edit: null,
    // theme
    themeId: null,
    spotList: []
  },
  getters: Object.assign({}, userGetters, spotGetters, themeGetters, channelGetters),
  mutations: Object.assign({}, loginMutations, spotMutations, themeMutations, channelMutations),
  actions: Object.assign({}, loginActions, channelActions, spotActions, themeActions),
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