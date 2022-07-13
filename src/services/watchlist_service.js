import { DynamoDB, IotData } from 'aws-sdk'
import useUserStore from '../store/user'
import cloneDeep from 'lodash.clonedeep'

const TABLE_NAME = 'Watchlist'

export const fetchWatchlist = (deviceId) => {

    const userStore = useUserStore()

    const params = {
        TableName: TABLE_NAME,
        Key: { 'DeviceId': deviceId }
    }

    const docClient = new DynamoDB.DocumentClient({apiVersion: '2012-08-10'})
    docClient.get(params, (err, data) => {
        if(err){
            console.log('error', err)
            return
        }

        //console.log('data', data)
        if(data.Item.Stocks !== undefined){
            userStore.setWatchlist(data.Item.Stocks)
        }        
    })
}

// 1. Add stock to DynamoDB Watchlist 2. Update dashboard 3. Notify devices with MQTT
export const addWatchlist = (deviceId, stock, onSuccess) => {

    const userStore = useUserStore()

    let watchlist = cloneDeep(userStore.watchlist);
    watchlist.push(stock)

    const params = {
        TableName: 'Watchlist',
        Item: {
            'DeviceId': deviceId,
            'Stocks': watchlist
        }
    }

    // Add to DynamoDB
    const docClient = new DynamoDB.DocumentClient({apiVersion: '2012-08-10'})
    docClient.put(params, (err, data) => {
        if(err){
            console.log('error', err)
            return
        }
        
        userStore.setWatchlist(watchlist)
        onSuccess()

        // Publish a message to IoT broker.
        const params = {
            topic: 'devices/' + deviceId + '/stocks/add/' + stock,
            payload: JSON.stringify({})
        }
        
        const iotDataClient = new IotData({ endpoint: 'ajotwaqg3w5p0-ats.iot.us-east-1.amazonaws.com', apiVersion: '2015-05-28' })
        iotDataClient.publish(params, (err, data) => {
            if(err){
                console.log('error', err)
                return
            }
        })
    })
}

export const removeWatchlist = (deviceId, stock, onSuccess) => {

    const userStore = useUserStore()
    
    let watchlist = userStore.watchlist;
    watchlist.splice(watchlist.indexOf(stock), 1)

    const params = {
        TableName: 'Watchlist',
        Item: {
            'DeviceId': deviceId,
            'Stocks': watchlist
        }
    }

    const docClient = new DynamoDB.DocumentClient({apiVersion: '2012-08-10'})
    docClient.put(params, (err, data) => {
        if(err){
            console.log('error', err)
            return
        }
        
        userStore.setWatchlist(watchlist)
        onSuccess()

        // Publish a message to IoT broker.
        const params = {
            topic: 'devices/' + deviceId + '/stocks/remove/' + stock,
            payload: JSON.stringify({})
        }
        
        const iotDataClient = new IotData({ endpoint: 'ajotwaqg3w5p0-ats.iot.us-east-1.amazonaws.com', apiVersion: '2015-05-28' })
        iotDataClient.publish(params, (err, data) => {
            if(err){
                console.log('error', err)
                return
            }
        })
    })
}