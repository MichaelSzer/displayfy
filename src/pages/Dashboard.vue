<script setup>
import { ref, reactive } from 'vue'
import { getUser } from '../config/user'
import { getStocks } from '../config/stocks'
import { useRouter, useRoute } from 'vue-router'
import { addWatchlist, removeWatchlist } from '../services/watchlist_service'

const router = useRouter()
const route = useRoute()

const user = reactive(getUser())
const stocks = ref(getStocks())

const refreshUser = () => { 
    // We can't do 'user = getUser()'. user would lose reactivity
    user.email = getUser().email
    user.name = getUser().name
    // For non-primative data types we need to create a new instance if not vuejs doesn't updates
    user.watchlist = [ ...getUser().watchlist ]
}

const isInWatchlist = (stock) => {
    // Check if the stock is in the Watchlist
    return user.watchlist.includes(stock)
}

const stockAvailableClicked = (stock) => {
    const i = user.value.watchlist.indexOf(stock)
    console.log(i)
    if ( i !== -1 )
        user.watchlist.splice(i, 1)
    else
        user.watchlist.push(stock)
}

setTimeout(refreshUser, 3000)

</script>

<template>
    <div class="root">
        <div id="DisplayFyDiv">
            <h1 id="DisplayFyText">🔮🤟🦄DisplayFy🧠🔥💸</h1>
            <div style="height:2px;width:60%;background-color: rgb(200, 200, 200);" ></div>
            <h3 id="DashboardWelcome">{{user.name + "'s Dashboard"}}</h3>
        </div>
        <div class="containerPC">
            <div style="flex: 0.2;"></div>
            <ul class="list">
                <span class="listTitle">Available Stocks</span>
                <li class="stock" v-for="stock in stocks" @click="isInWatchlist(stock)?removeWatchlist('000001',stock,refreshUser):addWatchlist('000001',stock, refreshUser)">
                    <p>{{stock}}</p>
                    <div v-if="isInWatchlist(stock)" class="sign" style="padding-left: 0.15em;">{{'-'}}</div>
                    <div v-else class="sign">{{'+'}}</div>
                </li>
            </ul>
            <div style="flex: 0.2;"></div>
            <ul class="list">
                <span class="listTitle">Watchlist</span>
                <li class="stock" v-for="stock in user.watchlist" @click="removeWatchlist('000001',stock,refreshUser)">
                    {{stock}}
                    <div class="sign" style="padding-left: 0.15em;">{{'-'}}</div>
                </li>
            </ul>    
            <div style="flex: 0.2;"></div>
        </div>
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
    position: fixed;
    width: 100%;
    height: 100%;
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
</style>