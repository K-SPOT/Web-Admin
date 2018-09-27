import router from '../router/index'
import { store } from '../store/store'

const tokenKey = 'KSPOT_ACCESS_TOKEN'

export const loginMutations = {
  signInSuccess (state, payload) {
    state.kakaoAccessToken = payload.authorization
    state.user_id = payload.id
    state.openLoginPopUp = !state.openLoginPopUp
    localStorage.setItem(tokenKey, state.kakaoAccessToken)
  },
  logout (state) {
    localStorage.removeItem(tokenKey)
    state.kakaoAccessToken = null
    state.user_id = null
    router.push('/')
    state.openLoginPopUp = true
  }
}

export const spotMutations = {
  getChannelSuccess (state, payload) {
    state.channels = payload
  },
  getEditSpotSuccess (state, payload) {
    state.spot_edit = payload
  }
}

export const themeMutations = {
  registerThemeSuccess (state, payload) {
    state.themeId = payload.theme_id
  },
  spotListSuccess (state, payload) {
    state.spotList = payload
  }
}

export const channelMutations = {
  getEditChannelSuccess (state, payload) {
    state.channel_edit = payload
  }
}