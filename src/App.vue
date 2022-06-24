<script setup>
import { ref, computed } from 'vue'
import SportsPage from './pages/Sports.vue'
import CryptoPage from './pages/Crypto.vue'
import StreamingPage from './pages/Streaming.vue'
import DashboardPage from './pages/Dashboard.vue'
import Navbar from './components/Navbar.vue'

const pages = {
  '/sports': SportsPage,
  '/crypto': CryptoPage,
  '/streaming': StreamingPage,
  '/dashboard': DashboardPage
}
const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
})

const currentPage = computed(() => {
  return pages[currentPath.value.slice(1)] || pages['/dashboard'];
})
</script>

<template>
  <main>
    <Navbar v-if="false" />
    <component :is="currentPage" />
  </main>
</template>

<style>

</style>
