import { createRouter, createWebHistory } from 'vue-router'
import Album from '../views/Album.vue'
import PhotoDetail from '../views/PhotoDetail.vue'

const routes = [
  {
    path: '/album',
    name: 'Album',
    component: Album
  },
  {
    path: '/albums/:photoId',
    name: 'PhotoDetail',
    component: PhotoDetail,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
