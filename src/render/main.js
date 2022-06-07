import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import 'normalize.css' // css初始化

const app = createApp(App)
app.use(store)
app.use(router)

app.mount('#app')

