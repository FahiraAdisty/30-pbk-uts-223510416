<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li @click="setActiveComponent('Todos')">Todos</li>
          <li @click="setActiveComponent('Post')">Post</li>
        </ul>
      </nav>
    </header>

    <div v-if="activeComponent === 'Todos'">
      <h1>Daftar Kegiatan</h1>
      <input type="text" v-model="newKegiatan" placeholder="Masukkan kegiatan baru" />
      <button @click="tambahKegiatan">Tambah</button>
      <button @click="toggleFilter">Filter</button>

      <ul>
        <li v-for="(kegiatan, index) in filteredKegiatanList" :key="index">
          <input type="checkbox" v-model="kegiatanList[index].selesai" />
          <span :class="{ selesai: kegiatanList[index].selesai }">{{ kegiatan.nama }}</span>
          <button @click="batalkanKegiatan(index)">Batal</button>
        </li>
      </ul>
    </div>

    <div v-if="activeComponent === 'Post'">
      <h1>Daftar Post</h1>
      <select v-model="selectedUserId" @change="fetchPosts">
        <option value="" disabled>Pilih User</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>

      <ul>
        <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, onMounted, computed } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const activeComponent = ref('Todos')

    // Data dan fungsi untuk fitur Todos
    const kegiatanList = ref([
      { nama: 'Belajar TypeScript', selesai: false },
      { nama: 'Menyelesaikan tugas', selesai: false },
      { nama: 'Membeli bahan makanan', selesai: true }
    ])
    const newKegiatan = ref('')
    const filterAktif = ref(false)

    const tambahKegiatan = () => {
      if (newKegiatan.value) {
        kegiatanList.value.push({ nama: newKegiatan.value, selesai: false })
        newKegiatan.value = ''
      }
    }

    const batalkanKegiatan = (index) => {
      kegiatanList.value.splice(index, 1)
    }

    const toggleFilter = () => {
      filterAktif.value = !filterAktif.value
    }

    const filteredKegiatanList = computed(() => {
      if (filterAktif.value) {
        return kegiatanList.value.filter(kegiatan => !kegiatan.selesai)
      }
      return kegiatanList.value
    })

    // Data dan fungsi untuk fitur Post
    const users = ref([])
    const posts = ref([])
    const selectedUserId = ref(null)

    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        users.value = await response.json()
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    const fetchPosts = async () => {
      if (selectedUserId.value !== null) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId.value}`)
          posts.value = await response.json()
        } catch (error) {
          console.error('Error fetching posts:', error)
        }
      }
    }

    const setActiveComponent = (component) => {
      activeComponent.value = component
    }

    onMounted(fetchUsers)

    return {
      activeComponent,
      kegiatanList,
      newKegiatan,
      tambahKegiatan,
      batalkanKegiatan,
      users,
      posts,
      selectedUserId,
      fetchPosts,
      setActiveComponent,
      filterAktif,
      toggleFilter,
      filteredKegiatanList
    }
  }
})
</script>

<style scoped>
body {
  font-family: sans-serif;
}

#app {
  margin: 20px;
}

header {
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
}

nav ul {
  display: flex;
  list-style: none;
  padding: 0;
}

nav li {
  margin-right: 20px;
  cursor: pointer;
}

input[type='text'] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type='checkbox'] {
  margin-right: 10px;
}

.selesai {
  text-decoration: line-through;
  color: #888;
}
</style>
