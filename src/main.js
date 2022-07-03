import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import SportsPage from './pages/Sports.vue'
import CryptoPage from './pages/Crypto.vue'
import StreamingPage from './pages/Streaming.vue'
import DashboardPage from './pages/Dashboard.vue'

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const routes = [
    { path: '/sports', component: SportsPage },
    { path: '/crypto', component: CryptoPage },
    { path: '/dashboard', component: DashboardPage },
    { path: '/', component: CryptoPage },
    { path: '/streaming', component: StreamingPage }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

createApp(App).use(router).mount('#app')