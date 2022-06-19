<script setup>
import { ref } from 'vue';
import Features from './Features.vue';

const list1 = ["International Matches", "Major Leagues: NFL, NBA, MLS", "Set Recurrent Matches"]
const list2 = ["Easy & Fast to Setup", "Customize Style & Colors", "Starting Countdown"]

</script>

<template>
  <section class="relative py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="items-center flex flex-wrap">
        <div class="w-full md:w-4/12 ml-auto mr-auto px-4 py-2 bg-gray-300 rounded-lg">
          <img
            alt="..."
            class="max-w-full rounded-lg shadow-lg"
            src="../assets/match-selection-preview.png"
          >
        </div>
        <Features descriptionHead="Follow any match" descriptionBody="DisplayFy can sync up with matches all around the world with our cutting edge technology. You can choose within a broad variety of matches at your own pace." :list="list1" />
      </div>
    </div>
    <div class="container mx-auto px-4 mt-16">
      <div class="items-center flex flex-wrap">
        <Features descriptionHead="Fully Customizable" descriptionBody="DisplayFy can be customized to give it a unique style for you. It is integrated with our website so you can control it from any device." :list="list2" />
        <div class="w-full md:w-4/12 ml-auto mr-auto px-4 py-2 bg-gray-300 rounded-lg">
          <img
            alt="..."
            class="max-w-full rounded-lg shadow-lg"
            src="../assets/match-selection-preview.png"
          >
        </div>
      </div>
    </div>
  </section>
</template>