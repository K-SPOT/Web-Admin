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