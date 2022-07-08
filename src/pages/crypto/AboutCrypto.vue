<script setup>
import BSCard from '../../components/BSCard.vue'
</script>

<template>
    <div class="d-flex flex-row justify-center align-items-center p-5 shadow bg-white text-black">
        <div class="ml-3">
            <p class="fs-3">See the stocks all the time. Pick any ticker with a few clicks. Customize it however you want to.</p>
        </div>
    </div>
    <img src="@/assets/display/about-3.jpg" style="width: 100%; max-width: 830px; margin: auto;" />
    <div class="container-fluid shadow bg-white py-4 mb-3" style="padding-left: 15%; padding-right: 15%;">
        <h2 class="pb-2 border-bottom">Features</h2>
        <div class="row py-3 row-cols-md-3">
            <div class="col-md d-flex align-items-start">
                <div>

                </div>
                <div>
                    <h2>All Stocks</h2>
                    <p>You can follow any stock from all the major stocks exchanges such as NSYE & Nasdaq.</p>
                </div>
            </div>
            <div class="col-md d-flex align-items-start">
                <div>

                </div>
                <div>
                    <h2>Real-Time Data</h2>
                    <p>The display is updated every 10 seconds making you the first to know.</p>
                </div>
            </div>
            <div class="col-md d-flex align-items-start">
                <div>

                </div>
                <div>
                    <h2>Customize</h2>
                    <p>Give your display a unique look with our customization platform.</p>
                </div>
            </div>
        </div>
        <div class="row py-3 row-cols-md-3">
            <div class="col-md d-flex align-items-start">
                <div>

                </div>
                <div>
                    <h2>Weekly Upgrades</h2>
                    <p>We are constantly improving the display. You will be receiving the latest upgrades weekly every time our smart team of engineers craft something new.</p>
                </div>
            </div>
            <div class="col-md d-flex align-items-start">
                <div>

                </div>
                <div>
                    <h2>Friendly Website</h2>
                    <p>Control the display from a intuitive and easy to use website.</p>
                </div>
            </div>
            <div class="col-md d-flex align-items-start">
                <div>

                </div>
                <div>
                    <h2>24/7 Support</h2>
                    <p>Any question you can message us at any time & we will reach back to you as soon as possible.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid d-flex flex-row justify-around flex-wrap ">
        <BSCard title="Modern Layout" alt="Modern Layout" description="See the stocks' price & daily change from far away." image="modern" />
        <BSCard title="Three Layout" alt="Three Layout" description="Three stocks at a time constantly rotating for investors with a diversified portfolio." image="three" />
        <BSCard title="Simple Layout" alt="Simple Layout" description="For minimalist." image="simple" />
    </div>
    <div style="height: 3vh;"></div>
    <div class="container bg-white shadow rounded-4 border-1 overflow-hidden d-flex flex-row justify-center align-items-center" style="padding-left: 0px; max-width: 1000px;">
            <img class="w-50" src="@/assets/displayfy-dashboard-preview.png" :alt="'Website with Dashboard'"/>
            <div class="w-50 pl-4">
                <h4>Website</h4>
                <p>Control the stocks, background & colors all from our website.</p>
            </div>
    </div>
    <div style="height: 3vh;"></div>
    <div class="container-liquid d-flex flex-row justify-center shadow bg-white py-3">
        <div class="d-block text-center">
            <h2 class="mb-3" style="font-weight: bold; font-family: 'Caveat'; font-size: 4em;">DisplayFy</h2>
            <img src="@/assets/display/product.png" style="width: 100%; max-width: 600px; margin: auto;" />
            <div style="margin: auto; width: fit-content;">
                <ul class="fs-5 text-left pr-4">
                    <li>&#8226; Smart Display with 64x32 resolution. Includes power supply & frame.</li>
                    <li>&#8226; Website to customize & operate your display from any PC or mobile phone.</li>
                    <li>&#8226; Access to real-time stock markets.</li>
                    <li>&#8226; Weekly upgrades with new features.</li>
                    <li>&#8226; 24/7 real-time support.</li>
                </ul>
            </div>
            <button type="button" data-bs-toggle="modal" data-bs-target="#contact-us-modal" class="btn btn-primary mt-3 fs-4" style="min-width: 200px;">
                Contact Us
            </button>
        </div>
    </div>
    <div style="height: 3vh;"></div>
</template>

<style>
p {
    font-size: large;
}
</style>