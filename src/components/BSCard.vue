<script setup>
const props = defineProps({
    image: String,
    title: String,
    description: String,
    alt: String
})
</script>

<template>
    <div class="card shadow rounded-4 border-1 mx-5 my-7" style="min-width: 350px;width:350px;">
        <img v-if="image === 'simple'" class="card-img-top" src="@/assets/display/simple-layout.jpg" :alt="alt"/>
        <img v-else-if="image === 'three'" class="card-img-top" src="@/assets/display/three-layout.jpg" :alt="alt"/>
        <img v-else-if="image === 'modern'" class="card-img-top" src="@/assets/display/modern-layout.jpg" :alt="alt"/>
        <div class="card-body">
            <h4 class="card-title">{{title}}</h4>
            <p class="card-text">{{description}}</p>
        </div>
    </div>
</template>