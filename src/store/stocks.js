import { defineStore } from 'pinia'
import stocks from '../config/stocks'

export default defineStore('stocks', {
    state: () => ({
        stocks: stocks.map((stock) => ({
            ...stock,
            price: '',
            dailyChange: '',
            dailyPercentageChange: ''
        }))
    }),
    getters: {
        getStocksByCategory: (state) => {
            return (category) => state.stocks.filter( (stock) => stock.category.includes(category) )
        }
    },
    actions: {
        setStock(target, {price, dailyChange, dailyPercentageChange}) {
            
            for(const stock of this.stocks){

                if (stock.quote === target){
                    stock.price = price
                    stock.dailyChange = dailyChange
                    stock.dailyPercentageChange = dailyPercentageChange
                }
            }
        }
    }
})