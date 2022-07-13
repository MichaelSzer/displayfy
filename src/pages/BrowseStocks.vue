<script setup>
import { onMounted, ref } from 'vue'
import StocksSearch from './BrowseStocks/StocksSearch.vue'
import { useRouter } from 'vue-router'
import { authenticateFromLocal } from '../lib/awsClients'
import useUserStore from '../store/user'

const userStore = useUserStore()

const router = useRouter()
const keyStocksSearch = ref(0)

const goToDashboard = () => {
    router.push('/dashboard')
}

const goToLogin = () => {
    router.push('/login')
}

// Could we replace it with watch() ? https://vuejs.org/api/options-state.html#watch
const forceRerender = () => {
    keyStocksSearch.value++
}

onMounted(() => {

    if ( !userStore.logged )
        authenticateFromLocal(forceRerender, goToLogin)
})
</script>

<template>
    <div class="bg-white h-screen">
        <!-- Section Title -->
        <p id="browse-stocks" class="p-5 pb-1 display-6">Browse Stocks</p>
        <!-- Go back buttons -->
        <div class="container-liquid d-flex flex-row align-items-center mt-2">
            <button @click="goToDashboard" type="button" id="return-browse-stocks" class="fs-5 ml-12 border-1 rounded-md py-1 px-4 border-black">{{'Return to Dashboard'}}</button>
            <button @click="goToDashboard" type="button" class="fs-5 btn-close btn-close-black ml-auto mr-5" aria-label="Close"></button>
        </div>
        <!-- Search -->
        <StocksSearch />
    </div>
</template>

<style>
#return-browse-stocks:hover {
    background-color: lightgrey;
}
</style>