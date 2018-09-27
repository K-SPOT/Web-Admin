import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://13.209.35.110:3000',
  timeout: 30000
})

const tokenKey = 'KSPOT_ACCESS_TOKEN'
const MESSAGE_200 = 'Success'

export const loginActions = {
  postAccessToken ({ commit }, payload) {
    instance.post('/user/kakao/signin', payload).then(response => {
      if (response.data.message === MESSAGE_200) {
        commit('signInSuccess', response.data.data)
        console.log(response.data.message)
        axios.defaults.headers['authorization'] = response.data.data.authorization
      }
    }).catch(error => {
      console.log(error.message)
    })
  }
}

export const channelActions = {
  registerChannel ({ commit }, payload) {
    axios.defaults.headers['authorization'] = localStorage.getItem(tokenKey)
    instance.post('/channel', payload).then(response => {
      console.log('reponse 들어옴')
      if (response.data.message === MESSAGE_200) {
        alert(payload.get('kor_name') + ' 채널이 등록되었습니다.') // 되는지 체크 필요
      }
    }).catch(error => {
      alert(error.message)
    })
  },
  deleteChannel ({ commit }, channel_id) {
    axios.defaults.headers['authorization'] = localStorage.getItem(tokenKey)
    instance.delete(`/channel/${channel_id}`).then(response => {
      if(response.data.message === MESSAGE_200) {
        alert('선택하신 채널이 성공적으로 삭제되었습니다.')
      }
    }).catch(error => {
      alert(error.message)
    })
  },
  editChannel ({ commit }, channel_id) {
    axios.defaults.headers['authorization'] = localStorage.getItem(tokenKey)
    instance.get(`/channel/${channel_id}/edit`).then(response => {
      if(response.data.message === MESSAGE_200) {
        commit('getEditChannelSuccess', response.data.data)
        alert('채널 정보 불러오기 성공')
      }
    }).catch(error => {
      alert(error.message)
    })
  },
  updateChannel ({ commit }, payload) {
    axios.defaults.headers['authorization'] = localStorage.getItem(tokenKey)
    instance.post('/channel/edit', payload).then(response => {
      if(response.data.message === MESSAGE_200) {
        alert(payload.get('kor_name') + ' 채널이 성공적으로 수정되었습니다.')
        location.reload()
      }
    }).catch(error => {
      alert(error.message)
    })
  }
}

export const spotActions = {
  getChannels ({ commit }) {
    axios.defaults.headers['authorization'] = localStorage.getItem(tokenKey)
    instance.defaults.headers['flag'] = 0
    instance.get('/channel/list').then(response => {
      if(response.data.message === MESSAGE_200) {
        commit('getChannelSuccess', response.data.data)
      }
    }).catch(error => {
      console.log(error.message)
    })
  },
  registerSpot ({ commit }, payload) {
    axios.defaults.headers['authorization'] = localStorage.getItem(tokenKey)
    instance.post('/spot', payload).then(response => {
      if(response.data.message === MESSAGE_200) {
        alert(payload.get('name') + ' 스팟이 등록되었습니다.')
      }
    }).catch(error => {
      alert(error.message)
    })
  },
  deleteSpot ({ commit }, spot_id) {
    axios.defaults.headers['authorization'] = localStorage.getItem(tokenKey)
    instance.delete(`/spot/${spot_id}`).then(response => {
      if(response.data.message === MESSAGE_200) {
        alert('선택하신 채널이 성공적으로 삭제되었습니다.')
      }
    }).catch(error => {
      alert(error.message)
    })
  },
  editSpot ({ commit }, spot_id) {
    axios.defaults.headers['authorization'] = localStorage.getItem(tokenKey)
    instance.get(`/spot/${spot_id}/AllInfo`).then(response => {
      if(response.data.message === MESSAGE_200) {
        commit('getEditSpotSuccess', response.data.data)
        alert('채널 정보 불러오기 성공')
      }
    }).catch(error => {
      alert(error.message)
    })
  },
  updateSpot ({ commit }, payload) {
    axios.defaults.headers['authorization'] = localStorage.getItem(tokenKey)
    instance.post('/spot/edit', payload).then(response => {
      if(response.data.message === MESSAGE_200) {
        alert(payload.name + ' 스팟이 성공적으로 수정되었습니다.')
        location.reload()
      }
    }).catch(error => {
      alert(error.message)
    })
  }
}

export const themeActions = {
  registerTheme ({ commit }, payload) {
    axios.defaults.headers['authorization'] = localStorage.getItem(tokenKey)
    instance.post('/theme', payload).then(response => {
      if(response.data.message === MESSAGE_200) {
        commit('registerThemeSuccess', response.data.data)
        alert(payload.title + ' 테마가 등록되었습니다.')
      }
    }).catch(error => {
      alert(error.message)
    })
  },
  getSpotList ({ commit }) {
    axios.defaults.headers['authorization'] = localStorage.getItem(tokenKey)
    instance.get('/spot/list').then(response => {
      if(response.data.message === MESSAGE_200) {
        commit('spotListSuccess', response.data.data)
      }
    }).catch(error => {
      alert(error.message)
    })
  },
  registerContents ({ commit }, payload) {
    axios.defaults.headers['authorization'] = localStorage.getItem(tokenKey)
    instance.post('/theme/contents', payload).then(response => {
      if(response.data.message === MESSAGE_200) {
        alert(payload.get('title') + ' 컨텐츠가 테마에 등록되었습니다.')
      }
    }).catch(error => {
      alert(error.message)
    })
  }
}