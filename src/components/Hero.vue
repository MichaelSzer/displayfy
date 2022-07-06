<script setup>
const props = defineProps({
    title: String,
    description: String,
    backgroundColor: String
})

</script>

<template>
    <section>
  <div
    class="relative pt-16 pb-32 flex content-center items-center justify-center"
    style="min-height: 75vh; background-color: black;"
  >
    <img id="hero-image"
      class="absolute top-0 w-full h-full bg-center bg-cover shadow"
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
  </div>
  </section>
</template>

<style>
#hero-image {
    max-width: 100%;
    height: 100%;
}
</style>