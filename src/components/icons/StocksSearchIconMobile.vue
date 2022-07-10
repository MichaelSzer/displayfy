<script setup>
import {ref, onBeforeMount} from 'vue'
const emits = defineEmits(['inWatchlistClick', 'notInWatchlistClick'])
const props = defineProps({
    inWatchlist: Boolean
})
const hover = ref(false)
const inWatchlist = ref(false)
const disabled = ref(false)

onBeforeMount(() => {
    inWatchlist.value = props.inWatchlist
})

const toggleWatchlist = () => {
    inWatchlist.value = !inWatchlist.value
}

const inWatchlistClick = () => {
    if(disabled.value) return

    disabled.value = true
    setTimeout(() => { 
        disabled.value = false,
        hover.value = false
    }, 1000)
    emits('inWatchlistClick', toggleWatchlist)
}

const notInWatchlistClick = () => {
    if(disabled.value) return
    
    disabled.value = true
    setTimeout(() => { 
        disabled.value = false,
        hover.value = false
    }, 1000)
    emits('notInWatchlistClick', toggleWatchlist)
}
</script>

<template>
    <svg v-if="inWatchlist" id="svgCheckCirckle2" @touchstart="inWatchlistClick" @click="inWatchlistClick" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
        <path v-if="!hover" d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
        <path v-else d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path v-if="!hover" d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
        <path v-else d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
    </svg>
    <svg v-else id="svgPlusCircle" @touchstart="notInWatchlistClick" @click="notInWatchlistClick" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>
</template>

<style scoped>
#svgPlusCircle {
    font-size: 1.25em;
    margin-right: 0.07em;
}

#svgPlusCircle path {
    fill: grey;
}

#svgCheckCirckle2 {
    cursor: pointer;
    font-size: 1.4em;
}

#svgCheckCirckle2 path {
    fill: grey
}
</style>