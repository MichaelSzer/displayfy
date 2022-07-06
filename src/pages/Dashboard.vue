<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getSettings, getUser, setSettings } from '../config/user'
import { getStocks } from '../config/stocks'
import { useRouter, useRoute } from 'vue-router'
import { addWatchlist, removeWatchlist } from '../services/watchlist_service'
import { updateSettings } from '../services/settings_service'
import { colorToRGB } from '../config/colors'
import { authenticateFromLocal, logout } from '../lib/awsClients'
import FrameColorSelector from '../components/CustomizeSection/FrameColorSelector.vue'
import BackgroundColorSelector from '../components/CustomizeSection/BackgroundColorSelector.vue'
import LayoutSelector from '../components/CustomizeSection/LayoutSelector.vue'

const router = useRouter()
const route = useRoute()

const user = reactive(getUser())
const settings = reactive(getSettings())
const stocks = ref(getStocks())

const refresh = () => { 
    // We can't do 'user = getUser()'. user would lose reactivity
    user.email = getUser().email
    user.name = getUser().name

    // For non-primative data types we need to create a new instance if not vuejs doesn't updates. This is done inside getUser() and getSettings()
    user.watchlist = [...getUser().watchlist]
    settings.style = getSettings().style
}

const isInWatchlist = (stock) => {
    // Check if the stock is in the Watchlist
    return user.watchlist.includes(stock)
}

const changeFrameColor = (color) => {
    
    updateSettings('000001', color, colorToRGB(color), 'framecolor', refresh)
}

const changeBackgroundColor = (color) => {
    
    updateSettings('000001', color, colorToRGB(color), 'backgroundcolor', refresh)
}

const changeLayout = (layout) => {
    
    updateSettings('000001', layout, {}, ('layout/' + layout.toLowerCase()), refresh)
}

const handleLogOut = () => {
    logout()
    router.push('/login')
}

onMounted(() => {

    if ( getUser().name === '-' )
        // Try to log in form local storage
        authenticateFromLocal(refresh, handleLogOut)
    else
        refresh()
})


</script>

<template>
    <div class="root">
        <!-- Title -->
        <div id="DisplayFyDiv">
            <p @click="handleLogOut" class="ml-auto mr-8 mb-2 text-black" style="cursor: pointer;">Sign Out</p>
            <h1 id="DisplayFyText">🔮🤟🦄DisplayFy🧠🔥💸</h1>
            <div style="height:2px;width:60%;background-color: rgb(200, 200, 200);" ></div>
            <h3 id="DashboardWelcome">{{user.name + "'s Dashboard"}}</h3>
        </div>
        <!-- Stocks -->
        <div class="containerPC">
            <div style="flex: 0.2;"></div>
            <ul class="list">
                <span class="listTitle">Available Stocks</span>
                <li class="stock" v-for="stock in stocks" @click="isInWatchlist(stock)?removeWatchlist('000001',stock,refresh):addWatchlist('000001',stock, refresh)">
                    <p>{{stock}}</p>
                    <div v-if="isInWatchlist(stock)" class="sign" style="padding-left: 0.15em;">{{'-'}}</div>
                    <div v-else class="sign">{{'+'}}</div>
                </li>
            </ul>
            <div style="flex: 0.2;"></div>
            <ul class="list">
                <span class="listTitle">Watchlist</span>
                <li class="stock" v-for="stock in user.watchlist" @click="removeWatchlist('000001',stock,refresh)">
                    {{stock}}
                    <div class="sign" style="padding-left: 0.15em;">{{'-'}}</div>
                </li>
            </ul>    
            <div style="flex: 0.2;"></div>
        </div>
        <!-- Customize -->
        <FrameColorSelector :color="settings.style.colors.frame" @change-color="changeFrameColor" />
        <BackgroundColorSelector :color="settings.style.colors.background" @change-color="changeBackgroundColor" />
        <LayoutSelector :layout="settings.style.layout" @change-layout="changeLayout" />
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