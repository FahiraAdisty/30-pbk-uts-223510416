<template>
  <div class="todos-container">
    <h1 class="page-title">Daftar Kegiatan</h1>
    <div class="input-container">
      <input type="text" v-model="newKegiatan" placeholder="Masukkan kegiatan baru" class="input-field" />
      <button @click="tambahKegiatan" class="btn">Tambah</button>
      <button @click="toggleFilter" class="btn">Filter</button>
    </div>

    <ul class="todos-list">
      <li v-for="(kegiatan, index) in filteredKegiatanList" :key="index" class="todo-item">
        <input type="checkbox" v-model="kegiatan.selesai" class="checkbox" />
        <span :class="{ selesai: kegiatan.selesai }" class="todo-name">{{ kegiatan.nama }}</span>
        <button @click="batalkanKegiatan(index)" class="btn">Batal</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'Todos',
  setup() {
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

    return {
      kegiatanList,
      newKegiatan,
      tambahKegiatan,
      batalkanKegiatan,
      toggleFilter,
      filteredKegiatanList
    }
  }
}
</script>

<style scoped>
.todos-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: left;
}

.input-container {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.input-field {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.btn {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
}

.todos-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.checkbox {
  margin-right: 10px;
}

.todo-name {
  flex: 1;
  font-size: 16px;
}

.selesai {
  text-decoration: line-through;
  color: #888;
}
</style>
