<script setup>
import { RouterView, useRouter } from 'vue-router'
import { useUserinfoStore } from '../stores/userinfo';
const userinfo = useUserinfoStore()
const router = useRouter()
const logout = ()=>{
  userinfo.clear()
  router.push({name:"login"})
}
</script>

<template>
  <h3>{{ userinfo.name }}</h3>
  <p @click="logout">退出登录</p>
  <RouterView />
</template>