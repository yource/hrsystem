import { defineStore } from 'pinia'

var defaultStore = {
  id: "",
  name: ""
}

export const useUserinfoStore = defineStore('userinfo', {
  state: () => (JSON.parse(JSON.stringify(defaultStore))),
  getters: {
    logined: (state) => !!state.id
  },
  actions: {
    clear() {
      this.$patch(JSON.parse(JSON.stringify(defaultStore)))
    }
  },
  persist: {
    storage: sessionStorage,
  },
})
