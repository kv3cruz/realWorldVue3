import axios from 'axios'

const apiClient = axios.create({
   baseURL: 'https://my-json-server.typicode.com/kv3cruz/realWorldVue3',
   withCredentials: false,
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
   }
})

export default {
   getEvents() {
      return apiClient.get('/events')
   }
}
