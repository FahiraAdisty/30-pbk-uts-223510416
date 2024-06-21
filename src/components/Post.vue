<template>
  <div class="post-container">
    <h1 class="page-title">Daftar Post</h1>
    <div class="select-container">
      <select v-model="selectedUserId" @change="fetchPosts">
        <option value="" disabled>Pilih Pengguna</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
    </div>

    <div v-if="users.length > 0 && selectedUserId !== null" class="post-list">
      <template v-if="postsLoading">
        <p class="loading-message">Memuat...</p>
      </template>
      <template v-else>
        <div v-if="posts.length > 0">
          <div v-for="post in posts" :key="post.id" class="post-card">
            <h2 class="post-title">{{ post.title }}</h2>
            <p class="post-body">{{ post.body }}</p>
          </div>
        </div>
        <div v-else>
          <p class="no-posts-message">Tidak ada postingan untuk pengguna ini.</p>
        </div>
      </template>
    </div>
    <div v-else-if="users.length === 0">
      <p class="no-posts-message">Memuat...</p>
    </div>
    <div v-else>
      <p class="no-posts-message">Pilih pengguna untuk melihat daftar postingannya.</p>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useUserStore } from '../stores/userStore'

export default {
  name: 'Post',
  setup() {
    const userStore = useUserStore()
    const posts = ref([])
    const selectedUserId = ref(null)
    const postsLoading = ref(false)

    const fetchPosts = async () => {
      if (selectedUserId.value !== null) {
        postsLoading.value = true;
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId.value}`)
          posts.value = await response.json()
        } catch (error) {
          console.error('Error fetching posts:', error)
        } finally {
          postsLoading.value = false;
        }
      }
    }

    // Watch for changes in selectedUserId and fetch posts accordingly
    watch(selectedUserId, () => {
      if (selectedUserId.value !== null) {
        fetchPosts()
      } else {
        posts.value = [] // Clear posts if no user is selected
      }
    })

    // Prefetch users data
    userStore.fetchUsers()

    return {
      users: userStore.users,
      posts,
      selectedUserId,
      fetchPosts,
      postsLoading
    }
  }
}
</script>

<style scoped>
.post-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.select-container {
  margin-bottom: 20px;
  text-align: center;
}

.post-list {
  margin-top: 20px;
}

.post-card {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.post-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.post-body {
  font-size: 14px;
  line-height: 1.6;
}

.loading-message {
  text-align: center;
  margin-top: 20px;
  font-style: italic;
  color: #888;
}

.no-posts-message {
  text-align: center;
  margin-top: 20px;
  font-style: italic;
  color: #888;
}
</style>
