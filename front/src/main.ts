import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vue3GoogleLogin, {
    clientId: (import.meta as any).env.VITE_GOOGLE_CLIENT_ID,
})

app.mount('#app')
