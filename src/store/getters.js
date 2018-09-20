export const userGetters = {
  getKakaoAccessToken (state) {
    console.log('kakaotoken 넘겨줌')
    return state.kakaoAccessToken
  },
  getOpenLoginPopUp (state) {
    return state.openLoginPopUp
  },
  getUserId (state) {
    return state.user_id
  }
}