<script setup>

const props = defineProps({
    title: String,
    description: String,
    backgroundColor: String,
    background: String
})

</script>

<template>
    <section>
  <div
    class="relative pt-16 pb-32 flex content-center items-center justify-center overflow-hidden"
    style="min-height: 75vh; background-color: black;"
  >
    <div id="hero-image"
      class="absolute top-0 w-full h-full bg-center bg-cover shadow"
    ></div>
    <div class="container relative mx-auto">
      <div class="items-center flex flex-wrap">
        <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <h1 class="text-white font-serif font-semibold text-5xl" style="font-family: 'Caveat';">{{title}}</h1>
            <p
              class="text-lg text-gray-300"
            >{{description}}</p>
        </div>
      </div>
    </div>
  </div>
  </section>
</template>

<style>
#hero-image {
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url('https://displayfy.co/assets/hero-3.jpg');
    background-position-x: 75%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}
</style>