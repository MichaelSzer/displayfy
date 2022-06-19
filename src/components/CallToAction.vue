<script setup>
import { ref } from 'vue'
import WaitlistModal from './WaitlistModal.vue'

const showModal = ref(false)
</script>

<template>
    <section class="relative bg-white py-2">
        <div class="flex flex-col items-center">
            <h3 class="font-serif font-semibold text-5xl">DisplayFy</h3>
            <div class="max-w-2xl mt-8">
                <img src="../assets/scoreboard.webp" class="object-scale-down" />
            </div>
            <p class="mt-12 mb-4 text-4xl">
                $199.99
            </p>
            <ul>
                <li>{{"&bull;&nbsp;&nbsp; Smart Display with the power supply."}}</li>
                <li>{{"&bull;&nbsp;&nbsp; Includes a 3 months premium subscription."}}</li>
            </ul>
            <button
                class="bg-gray-900 text-white active:bg-gray-700 text-xl font-bold uppercase px-6 py-3 mt-8 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 self-center"
                type="button"
                @click="showModal = true">
                Order Now
            </button>
        </div>
    </section>
    <Teleport to="body">
        <WaitlistModal :show="showModal" product="Sport" @close="showModal = false" />
    </Teleport>
</template>