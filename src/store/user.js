import { defineStore } from 'pinia'
import { isStockInWatchlist } from '../config/user'
import { computed } from 'vue'
import useDeviceStore from './device'

export default defineStore('user', {
    state: () => ({
        name: 'Miguel',
        email: '',
        phone: '',
        deviceId: '',
        logged: false,
        premium: false,
        watchlist: []
    }),
    actions: {

        setWatchlist(watchlist) {
            this.watchlist = watchlist
        },

        logIn(name, email, deviceId){
            this.name = name
            this.email = email
            this.deviceId = deviceId
            this.logged = false
        },

        logOut() {
            const deviceStore = useDeviceStore()

            // Reset all user related stores
            this.$reset()
            deviceStore.$reset()
        }
    },
    getters: {
        isStockInWatchlist(state){
            return (stock) => this.watchlist.includes(stock)
        },
        getName: (state) => {
            return (args) => state.name
        }
    }
})