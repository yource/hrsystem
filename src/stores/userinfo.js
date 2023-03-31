import { defineStore } from 'pinia'

const defaultState = {
  id:"",
  name:""
}

export const useUserinfoStore = defineStore('userinfo', {
  state: () => (JSON.parse(JSON.stringify(defaultState))),
  getters: {},
  actions: {},
})

