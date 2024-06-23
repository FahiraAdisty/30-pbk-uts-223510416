<template>
    <div class="photo-detail-overlay">
      <div class="photo-detail-container">
        <h1 class="page-title">Detail Foto</h1>
        <div v-if="photo" class="photo-detail-content">
          <img :src="photo.url" :alt="photo.title" class="photo-fullsize">
          <p class="photo-title">{{ photo.title }}</p>
          <button @click="closePhoto" class="close-button">Tutup</button>
        </div>
        <div v-else>
          <p class="loading-message">Memuat...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, watch } from 'vue'
  import { useRouter } from 'vue-router'
  
  export default {
    name: 'PhotoDetail',
    props: {
      photoId: {
        type: Number,
        required: true
      }
    },
    setup(props) {
      const photo = ref(null)
      const router = useRouter()
  
      const fetchPhoto = async () => {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${props.photoId}`)
          photo.value = await response.json()
        } catch (error) {
          console.error('Error fetching photo:', error)
        }
      }
  
      watch(() => props.photoId, fetchPhoto)
  
      onMounted(fetchPhoto)
  
      const closePhoto = () => {
        router.push('/album')
      }
  
      return {
        photo,
        closePhoto
      }
    }
  }
  </script>
  
  <style scoped>
  .photo-detail-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .photo-detail-container {
    max-width: 800px;
    width: 100%;
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  
  .page-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .photo-detail-content {
    text-align: center;
  }
  
  .photo-fullsize {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .photo-title {
    margin-top: 20px;
    font-size: 18px;
  }
  
  .loading-message {
    text-align: center;
    margin-top: 20px;
    font-style: italic;
    color: #888;
  }
  
  .close-button {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
  }
  </style>
  