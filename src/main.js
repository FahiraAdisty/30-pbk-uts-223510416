import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import { Quasar } from 'quasar'
import 'quasar/src/css/index.sass'

createApp(App)
  .use(router)
  .use(pinia)
  .use(Quasar, { plugins: {} })  // Quasar plugin options
  .mount('#app')
