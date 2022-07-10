<script setup>
import {ref} from 'vue'
const hover = ref(false)

const test = () => {
    console.log('test')
}
</script>

<template>
    <svg id="svgCheckCirckle2" @click="test" @mouseover="hover = true" @mouseleave="hover = false" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
        <path v-if="!hover" d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
        <path v-else d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path v-if="!hover" d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
        <path v-else d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
    </svg>
</template>

<style>

#svgCheckCirckle2 {
    cursor: pointer;
    font-size: 1.4em;
}

#svgCheckCirckle2:hover {
    cursor: pointer;
    font-size: 1.3em;
}

#svgCheckCirckle2 path {
    fill: grey
}

#svgCheckCirckle2:hover path {
    fill: red
}


</style>