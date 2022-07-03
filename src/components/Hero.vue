<script setup>
const props = defineProps({
    title: String,
    description: String
})
</script>

<template>
    <section>
  <div
    class="relative pt-16 pb-32 flex content-center items-center justify-center"
    style="min-height: 75vh; background-color: black;"
  >
    <img id="hero-image"
      class="absolute top-0 w-full h-full bg-center bg-cover"
      src="/src/assets/tsla.jpg"
    >
    <div class="container relative mx-auto">
      <div class="items-center flex flex-wrap">
        <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <h1 class="text-white font-serif font-semibold text-5xl">{{title}}</h1>
            <p
              class="mt-4 text-lg text-gray-300"
            >{{description}}</p>
        </div>
      </div>
    </div>
    <div
      class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
      style="height: 70px; transform: translateZ(0px);"
    >
      <svg
        class="absolute bottom-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        version="1.1"
        viewBox="0 0 2560 100"
        x="0"
        y="0"
      >
        <polygon class="text-white fill-current" points="2560 0 2560 100 0 100"></polygon>
      </svg>
    </div>
  </div>
  </section>
</template>

<style>
#hero-image {
    max-width: 100%;
    height: 100%;
}
</style>