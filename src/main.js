import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import SportsPage from './pages/Sports.vue'
import CryptoPage from './pages/Crypto.vue'
import StreamingPage from './pages/Streaming.vue'
import DashboardPage from './pages/Dashboard.vue'
import ThankYouPage from './pages/ThankYou.vue'
import LoginPage from './pages/Login.vue'

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// https://getbootstrap.com/docs/4.0/components/forms/?#validation
// Example starter JavaScript for disabling form submissions if there are invalid fields

(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

const routes = [
    { path: '/sports', component: SportsPage },
    { path: '/crypto', component: CryptoPage },
    { path: '/dashboard', component: DashboardPage },
    { path: '/', component: LoginPage },
    { path: '/streaming', component: StreamingPage },
    { path: '/thank-you', component: ThankYouPage },
    { path: '/login', component: LoginPage }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

createApp(App).use(router).mount('#app')