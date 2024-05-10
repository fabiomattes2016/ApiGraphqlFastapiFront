<template>
  <h2>Login</h2>

  <form @submit.prevent="login">
    <input type="text" placeholder="Seu usuário" v-model="user.username" />
    <input type="password" placeholder="Sua senha" v-model="user.password" />

    <button type="submit">Login</button>
  </form>
</template>

<script setup>
import http from '@/services/http.js'
import { useAuth } from '@/stores/auth.js'
import { reactive } from 'vue'

const auth = useAuth()

const user = reactive({
  username: '',
  password: ''
})

async function login() {
  try {
    let bodyContent = `username=${user.username}&password=${user.password}`

    const { data } = await http.post('/auth', bodyContent)

    auth.setToken(data.access_token)
    auth.setUser(data.user)
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss"></style>

