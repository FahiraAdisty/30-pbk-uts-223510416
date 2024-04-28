<template>
  <div id="app">
    <h2>Daftar Kegiatan</h2>

    <input type="text" v-model="newKegiatan" placeholder="Masukkan kegiatan baru" />
    <button @click="tambahKegiatan">Add</button>

    <ul>
      <li v-for="(kegiatan, index) in kegiatanList" :key="index">
        <input
          type="checkbox"
          v-model="kegiatanList[index].selesai"
          @change="ceklistKegiatan(index)"
        />
        <span class="kegiatan" :class="{ selesai: kegiatan.selesai }">{{ kegiatan.nama }}</span>
        <button @click="batalkanKegiatan(index)">Cancel</button>
      </li>
    </ul>

    <button @click="tampilkanBelumSelesai">Tampilkan List yang Belum Selesai</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Kegiatan {
  nama: string
  selesai: boolean
}

export default defineComponent({
  name: 'App',

  data() {
    return {
      kegiatanList: [
        { nama: 'Belajar TypeScript', selesai: false },
        { nama: 'Menyelesaikan tugas', selesai: false },
        { nama: 'Membeli bahan makanan', selesai: true }
      ] as Kegiatan[],
      newKegiatan: ''
    }
  },

  methods: {
    tambahKegiatan() {
      if (this.newKegiatan) {
        this.kegiatanList.push({ nama: this.newKegiatan, selesai: false })
        this.newKegiatan = ''
      }
    },
    ceklistKegiatan(index: number) {
      this.kegiatanList[index].selesai = !this.kegiatanList[index].selesai
    },
    batalkanKegiatan(index: number) {
      this.kegiatanList.splice(index, 1)
    },
    tampilkanBelumSelesai() {
      this.kegiatanList = this.kegiatanList.filter((kegiatan) => !kegiatan.selesai)
    }
  }
})
</script>

<style scoped>
/* style.css */
body {
  font-family: sans-serif;
}

#app {
  margin: 20px;
  padding: 20px;
  border: 1px solid #fd007e;
  border-radius: 5px;
  width: 300px;
}

input[type='text'] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #fd007e;
  border-radius: 5px;
}

button {
  padding: 5px;
  margin-bottom: 5%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #da139e;
  color: #fff;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

input[type='checkbox'] {
  margin-right: 10px;
}

.kegiatan {
  padding: 5px;
  border: 1px solid #fd007e;
  border-radius: 5px;
}

.selesai {
  text-decoration: line-through;
  color: #ff00d9;
}
</style>
