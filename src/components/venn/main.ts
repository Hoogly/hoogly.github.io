import './assets/main.css'

import { createApp } from 'vue'
import { VueFire } from 'vuefire'
import App from './App.vue'
import routes from './routes'
import { firebaseApp } from './firebase'
import { createRouter, createWebHistory } from 'vue-router'

if (!import.meta.env.SSR) {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  createApp(App).use(router).mount('#venn');
}