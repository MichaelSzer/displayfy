<script setup>
import {ref,computed} from 'vue'
import { removeWatchlist } from '../../services/watchlist_service'
import LeftArrow from '../../components/icons/LeftArrow.vue'
import RightArrow from '../../components/icons/RightArrow.vue'
import DashCircle from '../../components/icons/DashCircle.vue'

const emits = defineEmits(['refresh']) 

const props = defineProps({
    stocks: Array,
    device: String,
    stocksPerPage: Number
})

const page = ref(1)
const totalPages = ref(1)

const previousPage = () => {
    page.value = page.value === 1 ? totalPages.value : page.value - 1
}

const nextPage = () => {
    page.value = page.value === totalPages.value ? 1 : page.value + 1
}

const getStocksPage = computed(() => {
    totalPages.value = Math.ceil(props.stocks.length / props.stocksPerPage)
    page.value = page.value > totalPages.value ? 1 : page.value
    return props.stocks.slice( props.stocksPerPage * (page.value - 1), props.stocksPerPage * (page.value))
})
</script>

<template>
    <div class="border border-black rounded-lg mx-auto my-4 p-4 shadow" style="width: 90%; max-width: 600px;">
        <!-- Page Navigation -->
        <div class="d-flex flex-row justify-center align-items-center">
            <LeftArrow @click="previousPage" />
            <p>{{`${page} / ${totalPages}`}}</p>
            <RightArrow @click="nextPage" />
        </div>
        <div class="border my-1 mx-auto w-48"></div>
        <div  class="mt-2 overflow-hidden">
            <!-- List Item -->
            <p v-if="stocks.length === 0">No stocks saved. Browse some stocks to save them.</p>
            <div v-else class="h-12 d-flex flex-row align-items-center pr-4" v-for="quote in getStocksPage" :key="quote">
                <p>{{quote}}</p>
                <DashCircle @click="removeWatchlist(device, quote, () => {})" class="ml-auto" />
            </div>
        </div>
    </div>
</template>

<style scoped>
p {
    margin-left: 1em;
    margin-right: 1em;
    margin-bottom: 0em;
}
</style>