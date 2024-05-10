import { ref } from 'vue'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import http from '@/services/http.js'

export const useAuth = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'))
  const user = ref(JSON.parse(localStorage.getItem('user')))

  function setToken(tokenValue) {
    localStorage.setItem('token', tokenValue)
    token.value = tokenValue
  }

  function setUser(userValue) {
    localStorage.setItem('user', JSON.stringify(userValue))
    user.value = userValue
  }

  function isAuthenticated() {
    return token.value && user.value
  }

  const fullName = computed(() => {
    return user.value.full_name
  })

  async function checkToken() {
    try {
      const tokenAuth = token.value
      const { data } = await http.get(`/token/verify/?token=${tokenAuth}`)

      return data
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return {
    token,
    user,
    setToken,
    setUser,
    checkToken,
    isAuthenticated,
    fullName
  }
})
