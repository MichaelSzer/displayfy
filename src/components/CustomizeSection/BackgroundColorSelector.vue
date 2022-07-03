<script setup>
const props = defineProps({
    color: String
})

const emit = defineEmits(['changeColor']);

const colors = {
    Black: '#000000',
    White: '#ffffff',
    Purple: '#ab47bc',
    Yellow: '#ffee58',
    Blue: '#42a5f5',
    Brown: '#8d6e63'
}

const changeColor = (color) => {
    emit('changeColor', color)
}
</script>

<template>
    <div class="container pb-2 my-3 shadow border border-1" :style="{ 'background-color': colors[color] }">
        <p :class="{ 'fs-4': true, 'text-white': !(color === 'default' || color === 'White' || color === 'Yellow'), 'text-black': (color === 'White' || color === 'Yellow') }">Background Color</p>
        <div class="list-group list-group-horizontal text-center">
            <button v-on:click="changeColor('Black')" class="list-group-item list-group-item-action" :class="{ active: color == 'Black' }">Black</button>
            <button v-on:click="changeColor('White')" class="list-group-item list-group-item-action" :class="{ active: color == 'White' }">White</button>
            <button v-on:click="changeColor('Purple')" class="list-group-item list-group-item-action" :class="{ active: color == 'Purple' }">Purple</button>
            <button v-on:click="changeColor('Yellow')" class="list-group-item list-group-item-action" :class="{ active: color == 'Yellow' }">Yellow</button>
            <button v-on:click="changeColor('Blue')" class="list-group-item list-group-item-action" :class="{ active: color == 'Blue' }">Blue</button>
            <button v-on:click="changeColor('Brown')" class="list-group-item list-group-item-action" :class="{ active: color == 'Brown' }">Brown</button>
        </div>
    </div>
</template>

// Fixed this below, not working. 
<style>
.active {
    background-color: #80cbc4;
    border-color: #80cbc4;
}
</style>