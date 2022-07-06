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
        <img class="card-img-top" :src="image" :alt="alt"/>
        <div class="card-body">
            <h4 class="card-title">{{title}}</h4>
            <p class="card-text">{{description}}</p>
        </div>
    </div>
</template>