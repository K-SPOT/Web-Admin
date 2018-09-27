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

export const spotGetters = {
  getChannelsData (state) {
    return state.channels
  },
  getSpotEdit (state) {
    return state.spot_edit
  }
}

export const themeGetters = {
  getThemeId (state) {
    return state.themeId
  },
  getSpotList (state) {
    return state.spotList
  }
}

export const channelGetters = {
  getChannelEdit (state) {
    return state.channel_edit
  }
}