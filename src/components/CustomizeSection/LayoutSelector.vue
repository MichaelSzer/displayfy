<script setup>
const props = defineProps({
    layout: String
})

const emit = defineEmits(['changeLayout']);

const changeLayout = (layout) => {
    
    //console.log(layout)
    emit('changeLayout', layout)
}
</script>

<template>
    <div class="container pb-2 my-5 shadow border border-1">
        <p :class="{ 'fs-4': true, 'text-black': true }">Layout</p>
        <div class="d-flex flex-row justify-around">
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="frameOptions" id="modernFrame" value="Modern Frame" :checked="layout === 'Modern'" @click="changeLayout('Modern')" />
                <label class="form-check-label" for="modernFrame">Modern</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="frameOptions" id="threeFrame" value="Three Frame" :checked="layout === 'Three'" @click="changeLayout('Three')" />
                <label class="form-check-label" for="threeFrame">Three</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="frameOptions" id="simpleFrame" :checked="layout === 'Simple'" @click="changeLayout('Simple')" />
                <label class="form-check-label" for="simpleFrame">Simple</label>
            </div>
        </div>
    </div>
</template>

<style>

</style>