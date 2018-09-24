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
  }
}

export const spotActions = {
  getChannels ({ commit }) {
    axios.defaults.headers['authorization'] = localStorage.getItem(tokenKey)
    instance.defaults.headers['flag'] = 0
    instance('/channel/list').then(response => {
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
  }
}