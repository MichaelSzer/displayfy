<script setup>
import {ref,onMounted} from 'vue'
import { useRouter } from 'vue-router'
import { authenticate, authenticateFromLocal } from '../lib/awsClients'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const router = useRouter()

const onFailure = (err) => {
    
    error.value = err.message
    loading.value = false
}

const onSuccess = () => {

    console.log('Login onSuccess()')
    loading.value = false
    error.value = ''
    router.push('/dashboard')
}

const submitInfo = () => {

    var form = document.getElementsByClassName('needs-validation')[0];
    if(form.checkValidity()){
        loading.value = true;
        authenticate(email.value, password.value, onSuccess, onFailure)        
    }
}

onMounted(() => {
    authenticateFromLocal(onSuccess, () => {})
})

</script>
<template>
    <div class="d-flex flex-column justify-start align-items-center min-h-screen background-login">
        <p class="display-1 my-5 text-white" style="font-family: Caveat, sans-serif; text-shadow: 2px 2px 6px black;">DisplayFy</p>
        
        <form class="needs-validation shadow text-center p-3 pt-0 border rounded-lg" style="min-width: 350px; max-width: 350px; background-color: aliceblue;" novalidate>
            <div v-if="loading" class="spinner-border text-primary mt-3" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <section v-else>
                <h5 class="modal-title py-3">Sign In</h5>
                <p class="text-danger">{{error}}</p>
                <div class="input-group mb-3">
                    <input v-model="email" type="email" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="Email" required>
                    <div class="invalid-feedback text-left">Please enter your email.</div>
                </div>
                <div class="input-group mb-3">
                    <input v-model="password" type="password" minlength="8" maxlength="12" class="form-control" placeholder="********" aria-label="Phone Number" aria-describedby="Phone Number" required>
                    <div class="invalid-feedback text-left">Please enter your password.</div>
                </div>
                <button type="submit" @click="submitInfo" class="btn bg-primary text-white" style="min-width: 150px;" >
                    Submit
                </button>
            </section>
        </form>
    </div>
</template>

<style>
#app {
    min-height: 100vh;
    background-color: white;
}
.background-login {
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2) ), 
        url("https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_12/3279436/200322-new-york-stock-exchange-coronavirus-cs-1144a.jpg")
}
</style>