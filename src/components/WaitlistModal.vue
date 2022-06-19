<script setup>
import { ref } from 'vue'
import { joinSportWaitlist, joinCryptoWaitlist, joinStreamerWaitlist } from '../services/join_waitlist';

const props = defineProps({
    show: Boolean,
    product: String
})

const emit = defineEmits(['close'])

const fullname = ref('')
const email = ref('')
const sport = ref('')

const callJoinWaitlist = (product) => {
    switch(product){
        case 'Crypto':
            // joinCryptoWaitlis(email, fullname) To Complete
            break
        case 'Streamer':
            // joinStreamerWaitlist(email, fullname, { 'Sport': sport })
            break
        case 'Sport':
            joinSportWaitlist(email.value, fullname.value, sport.value)
            break
        default:
            joinSportWaitlist(email.value, fullname.value)
    }

    emit('close')
}

</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="fixed top-0 left-0 w-full h-full z-50 px-4" style="background-color: rgba(0,0,0,0.5)">
            <div
                class="relative flex flex-col min-w-0 break-words w-3/4 lg:w-6/12 shadow-lg rounded-lg bg-white px-4 m-auto mt-6"
            >
                <div class="flex-auto p-5 lg:p-10">
                <h4 class="text-2xl font-semibold">Wait list</h4>
                <p
                    class="leading-relaxed mt-1 mb-4 text-gray-600"
                >We are launching soon. Get in the waisting list to be one of the first ones to get it.</p>
                <div class="relative w-full mb-3 mt-8">
                    <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="full-name"
                    >Full Name</label>
                    <input
                    type="text"
                    class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring-2 focus:shadow-outline w-full"
                    placeholder="Full Name"
                    v-model="fullname"
                    >
                </div>
                <div class="relative w-full mb-3">
                    <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="email"
                    >Email</label>
                    <input
                    type="email"
                    class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring-2 focus:shadow-outline w-full"
                    placeholder="Email"
                    v-model="email"
                    >
                </div>
                <div class="relative w-full mb-3">
                    <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="message"
                    >Sport</label>
                    <div class="flex flex-row items-center">
                        <div class="mx-2">
                            <input type="radio" id="Football" value="Football" v-model="sport" />
                            <label for="football" class="px-1">Football</label>
                        </div>
                        
                        <div class="mx-2">
                            <input type="radio" id="Soccer" value="Soccer" v-model="sport" />
                            <label for="soccer" class="px-1">Soccer</label>
                        </div>

                        <div class="mx-2">
                            <input type="radio" id="Basketball" value="Basketball" v-model="sport" />
                            <label for="basketball" class="px-1">Basketball</label>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-6">
                    <button
                    class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style="transition: all 0.15s ease 0s;"
                    @click="callJoinWaitlist(product)"
                    >Join Waitlist</button>
                </div>
                </div>
            </div>
        </div>
    </Transition>
</template>