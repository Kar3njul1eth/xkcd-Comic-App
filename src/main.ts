import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useComicStore } from './stores/comiStore';

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia();

app.use(pinia)
useComicStore();

app.mount('#app')
