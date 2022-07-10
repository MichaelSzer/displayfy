<script setup>
import {ref, computed} from 'vue'
import { getStocks } from '../../config/stocks'
import { isStockInWatchlist, getUser } from '../../config/user'
import PlusCircle from '../../components/icons/PlusCircle.vue'
import CheckCircle2 from '../../components/icons/CheckCircle2.vue'
import { addWatchlist, removeWatchlist } from '../../services/watchlist_service'
import StocksSearchIconMobile from '../../components/icons/StocksSearchIconMobile.vue'
import StocksSearchIconDesktop from '../../components/icons/StocksSearchIconDesktop.vue'

const category = ref('All')
const search = ref('')
const keyStockList = ref(0)

const changeCategory = (newCategory) => {
    category.value = newCategory
}

const forceRerenderStocksList = () => {
    keyStockList.value++
}

const filterStocks = computed(() => {
    let stocks 
    if ( category.value === 'All' ) stocks = getStocks()
    else stocks = getStocks().filter((stock) => (stock.category.includes(category.value)) )

    // The search filter could be improved by creating sub-arrays with each added character in the input avoiding having to iterate through all the stocks.
    return stocks.filter( (stock) => stock.quote.toLowerCase().includes( search.value.toLowerCase() ) )
})

// Check if it is mobile
const isMobileDevice = /Mobi/i.test(window.navigator.userAgent)
console.log('isMobile', isMobileDevice)
</script>

<template>
    <div class="border border-black rounded-lg mx-auto my-4 p-4 shadow" style="width: 90%; max-width: 600px;">
        <input v-model="search" type="search" class="form-control" placeholder="Search..." />
        <div class="d-flex flex-row flex-wrap text-gray-500">
            <button @click="changeCategory('All')" :class="{ 'text-black': category === 'All', 'font-medium': category === 'All' }">All</button>
            <button @click="changeCategory('Technology')" :class="{ 'text-black': category === 'Technology', 'font-medium': category === 'Technology' }">Technology</button>
            <button @click="changeCategory('Finance')" :class="{ 'text-black': category === 'Finance', 'font-medium': category === 'Finance' }">Finance</button>
            <button @click="changeCategory('Biotech')" :class="{ 'text-black': category === 'Biotech', 'font-medium': category === 'Biotech' }">Biotech</button>
        </div>
        <div class="border my-2"></div>
        <div :key="keyStockList" class="overflow-y-auto max-h-96" style="">
            <!-- List Item -->
            <div class="h-12 d-flex flex-row align-items-center pr-4" v-for="({quote}) in filterStocks" :key="quote">
                <p>{{quote}}</p>
                <StocksSearchIconMobile v-if="isMobileDevice" @not-in-watchlist-click="(callback) => addWatchlist(getUser().device, quote, callback)" @in-watchlist-click="(callback) => removeWatchlist(getUser().device, quote, callback)" :in-watchlist="isStockInWatchlist(quote)" class="ml-auto" />
                <StocksSearchIconDesktop v-else @not-in-watchlist-click="(callback) => addWatchlist(getUser().device, quote, callback)" @in-watchlist-click="(callback) => removeWatchlist(getUser().device, quote, callback)" :in-watchlist="isStockInWatchlist(quote)" class="ml-auto" />
            </div>
        </div>
    </div>
</template>

<style scoped>
p {
    margin-top: 0.75em;
}

button {
    margin-left: 1em;
    margin-right: 1em;
    margin-top: 1em;
}
</style>