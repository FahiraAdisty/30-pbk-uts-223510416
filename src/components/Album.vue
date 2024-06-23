<template>
  <div class="album-container">
    <h1 class="page-title">Album Foto</h1>

    <div class="select-container">
      <select v-model="selectedUserId" @change="fetchPhotos" class="select-user">
        <option value="" disabled>Pilih Pengguna</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
    </div>

    <div v-if="users.length > 0 && selectedUserId !== null" class="album-content">
      <div v-if="photosLoading">
        <p class="loading-message">Memuat...</p>
      </div>
      <template v-else>
        <div v-if="photos.length > 0" class="album-grid">
          <div v-for="(photo, index) in photos" :key="index" class="photo-item" @click="openPhoto(photo.id)">
            <img :src="photo.thumbnailUrl" :alt="'Photo ' + index" class="photo-thumbnail">
          </div>
        </div>
        <div v-else>
          <p class="no-photos-message">Tidak ada foto untuk pengguna ini.</p>
        </div>
      </template>
    </div>
    <div v-else-if="users.length === 0">
      <p class="no-photos-message">Memuat...</p>
    </div>
    <div v-else>
      <p class="no-photos-message">Pilih pengguna untuk melihat album foto.</p>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

export default {
  name: 'Album',
  setup() {
    const userStore = useUserStore()
    const photos = ref([])
    const selectedUserId = ref(null)
    const photosLoading = ref(false)
    const router = useRouter()

    const fetchPhotos = async () => {
      if (selectedUserId.value !== null) {
        photosLoading.value = true;
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${selectedUserId.value}`)
          photos.value = await response.json()
        } catch (error) {
          console.error('Error fetching photos:', error)
        } finally {
          photosLoading.value = false;
        }
      }
    }

    watch(selectedUserId, () => {
      if (selectedUserId.value !== null) {
        fetchPhotos()
      } else {
        photos.value = [] 
      }
    })

    userStore.fetchUsers()

    const openPhoto = (photoId) => {
      router.push(`/albums/${photoId}`)
    }

    return {
      users: userStore.users,
      photos,
      selectedUserId,
      fetchPhotos,
      openPhoto,
      photosLoading
    }
  }
}
</script>

<style scoped>
.album-container {
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
  text-align: left;
  margin-bottom: 20px;
}

.select-user {
  width: 200px;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.album-content {
  margin-top: 20px;
}

.album-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.photo-item {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.photo-thumbnail {
  width: 100%;
  height: auto;
  border-radius: 5px;
  transition: transform 0.2s ease;
}

.photo-thumbnail:hover {
  transform: scale(1.05);
}

.loading-message,
.no-photos-message {
  text-align: center;
  margin-top: 20px;
  font-style: italic;
  color: #888;
}
</style>
