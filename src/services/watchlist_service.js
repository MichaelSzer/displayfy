import { DynamoDB } from 'aws-sdk'
import { setWatchlist, getUser } from '../config/user'

const TABLE_NAME = 'Watchlist'

export const fetchWatchlist = (deviceId) => {

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
            setWatchlist(data.Item.Stocks)
        }        
    })
}

export const addWatchlist = (deviceId, stock, onSuccess) => {
    let watchlist = getUser().watchlist;
    watchlist.push(stock)

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

        setWatchlist(watchlist)
        onSuccess()
    })
}

export const removeWatchlist = (deviceId, stock, onSuccess) => {
    let watchlist = getUser().watchlist;
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
        
        setWatchlist(watchlist)
        onSuccess()
    })
}