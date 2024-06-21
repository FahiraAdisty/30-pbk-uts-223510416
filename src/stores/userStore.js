import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: []
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        this.users = await response.json()
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
  }
})
