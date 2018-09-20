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