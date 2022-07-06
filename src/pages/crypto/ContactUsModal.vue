<script setup>
import {ref} from 'vue'
import { joinCryptoWaitlist } from '../../services/join_waitlist';
import { Modal } from 'bootstrap'
import { useRouter } from 'vue-router';

const fullname = ref('')
const email = ref('')
const phone = ref('')

const router = useRouter()

const submitInfo = () => {
    var form = document.getElementsByClassName('needs-validation')[0];

    //console.log('form validity: ', form.checkValidity())
    //console.log('fullname: ', fullname.value)
    //console.log('email: ', email.value)
    //console.log('phone: ', phone.value)

    if(form.checkValidity())
        joinCryptoWaitlist(email.value, fullname.value, phone.value, onSuccess)
}

const onSuccess = () => {

    // Hide Modal
    const modal = document.getElementById('contact-us-modal')
    Modal.getInstance(modal).hide()

    // Redirect to Thank You page
    router.push('/thank-you')
}

const phoneChanged = (event) => {
    phone.value = event.target.value

    if ( phone.value.length === 3 )
        phone.value = phone.value + '-'
    else if ( phone.value.length === 7 )
        phone.value = phone.value + '-'

    console.log(phone.value)
}

// Form Validation Crash Course https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
</script>

<template>
    <div class="modal" tabindex="-1" id="contact-us-modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <form class="needs-validation" novalidate>
                    <div class="modal-header">
                        <h5 class="modal-title">Contact Us Form</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <div class="input-group mb-3">
                            <input v-model="fullname" type="text" class="form-control" placeholder="Full Name" aria-label="Full Name" aria-describedby="Full Name" required>
                            <div class="invalid-feedback text-left">Please enter your full name.</div>
                        </div>
                        <div class="input-group mb-3">
                            <input v-model="email" type="email" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="Email" required>
                            <div class="invalid-feedback text-left">Please enter your email.</div>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">+1</span>
                            <input :value="phone" @input="phoneChanged" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" minlength="12" maxlength="12" class="form-control" placeholder="786-867-2044" aria-label="Phone Number" aria-describedby="Phone Number" required>
                            <div class="invalid-feedback text-left">Please enter your phone number e.g. 350-867-2044.</div>
                        </div>
                        <button type="submit" @click="submitInfo" class="btn bg-primary text-white" style="min-width: 150px;" >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
.valid {
    border-color: green;
}

.invalid {
    border-color: red;
}
</style>