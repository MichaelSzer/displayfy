<script setup>
const props = defineProps({
    descriptionHead: String,
    descriptionBody: String,
    list: Array
})

</script>

<template>
    <div class="w-full md:w-5/12 ml-auto mr-auto px-4">
        <div class="md:pr-12">
            <div
                class="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300"
            >
                <i class="fas fa-rocket text-xl"></i>
            </div>
            <h3 class="text-3xl font-semibold">{{descriptionHead}}</h3>
            <p v-if="descriptionBody !== undefined"
                class="mt-4 text-lg leading-relaxed text-gray-600"
            >{{descriptionBody}}</p>
            <ul v-if="list.length > 0" class="list-none mt-6">
                <li v-for="feature of list" class="py-2">
                    <div class="flex items-center">
                        <div>
                        <span
                            class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"
                        >
                            <i class="fas fa-fingerprint"></i>
                        </span>
                        </div>
                        <div>
                            <h4 class="text-gray-600">{{feature}}</h4>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>