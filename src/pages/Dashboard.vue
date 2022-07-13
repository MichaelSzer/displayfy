<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { updateSettings } from '../services/settings_service'
import { colorToRGB } from '../config/colors'
import { authenticateFromLocal, logout } from '../lib/awsClients'
import FrameColorSelector from '../components/CustomizeSection/FrameColorSelector.vue'
import BackgroundColorSelector from '../components/CustomizeSection/BackgroundColorSelector.vue'
import LayoutSelector from '../components/CustomizeSection/LayoutSelector.vue'
import YourStocks from './Dashboard/YourStocks.vue'
import useUserStore from '../store/user'
import useDeviceStore from '../store/device'

const router = useRouter()
const route = useRoute()

const userStore = useUserStore()
const deviceStore = useDeviceStore()

const goToBrowseStocks = () => {
    router.push('/browse-stocks')
}

const changeFrameColor = (color) => {
    
    updateSettings(user.device, color, colorToRGB(color), 'framecolor', () => {})
}

const changeBackgroundColor = (color) => {
    
    updateSettings(user.device, color, colorToRGB(color), 'backgroundcolor', () => {})
}

const changeLayout = (layout) => {
    
    updateSettings(user.device, layout, {}, ('layout/' + layout.toLowerCase()), () => {})
}

const handleLogOut = () => {
    logout()
    router.push('/login')
}

onMounted(() => {

    if ( !userStore.logged )
        // Try to log in from local storage
        authenticateFromLocal(() => {}, handleLogOut)
})


</script>

<template>
    <div class="root">
        <!-- Title -->
        <div id="DisplayFyDiv">
            <p @click="handleLogOut" class="ml-auto mr-8 mb-2 text-black" style="cursor: pointer;">Sign Out</p>
            <h1 id="DisplayFyText">🔮🤟🦄DisplayFy🧠🔥💸</h1>
            <div style="height:2px;width:60%;background-color: rgb(200, 200, 200);" ></div>
            <h3 id="DashboardWelcome">{{userStore.name + "'s Dashboard"}}</h3>
        </div>
        <!-- Stocks -->
        <p id="style" class="ml-4 my-4 display-6">Stocks</p>
        <YourStocks :stocks="userStore.watchlist" :device="userStore.deviceId" :stocks-per-page="5"/>
        <div class="text-center"><button @click="goToBrowseStocks" type="button" id="go-to-browse-stocks" class="fs-5 border-1 rounded-md py-1 px-4 border-black">{{'Browse Stocks 🔎'}}</button></div>
        <!-- Customize -->
        <p id="style" class="ml-4 my-4 display-6">Style</p>
        <FrameColorSelector :color="deviceStore.style.colors.frame" @change-color="changeFrameColor" />
        <BackgroundColorSelector :color="deviceStore.style.colors.background" @change-color="changeBackgroundColor" />
        <LayoutSelector :layout="deviceStore.style.layout" @change-layout="changeLayout" />
    </div>
</template>

<style>
#DashboardWelcome {
    margin-top: 0.5em;
    font-size: x-large;
}

#DisplayFyDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1em;
}

#DisplayFyText {
    font-size: xxx-large;
}

#go-to-browse-stocks:hover {
    background-color: gray;
}

.sign {
    color: black;
    font-size: x-large;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
}

.root {
    width: 100%;
    background-color: rgb(255, 255, 255);
}

.containerPC {
    display: flex;
    flex-direction: row;
    justify-self: center;
    width: 100%;
    margin-top: 1%;
    justify-content: space-between;
    align-items: flex-start;
    background-color: aliceblue;
}

.listTitle {
    font-weight: lighter;
    font-size: 2em;
    padding: 0.5em;
}


.list {
    background-color: rgb(250, 250, 250);
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stock {
    background-color: rgb(250, 250, 250);
    margin: 0.3em;
    padding-left: 0.2em;
    padding-right: 0.2em;
    width: 95%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    border-color: rgb(206, 206, 206);
    border-width: thin;
    border-bottom: thin;
    border-right: thin;
    border-left: thin;
}

.stock:hover {
    background-color: rgb(240, 239, 239);
    cursor: pointer;
}

.p:hover {
    text-decoration: none;
    cursor: pointer;
}
</style>