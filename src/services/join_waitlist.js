import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { ddbDocClient } from '../lib/ddbDocClient.js'
import { sendNotificationNewCustomer } from './sns_message_waitlist.js'

const joinWaitlist = async (email, name, product, additionalData = {}) => {

    const params = {
        TableName: 'Waitlist',
        Item: {
            'Email': email,
            'Name': name,
            'Product': product,
            ...additionalData
        }
    }

    console.log("Item", params.Item)

    try {
        const data = await ddbDocClient.send( new PutCommand (params) )
        sendNotificationNewCustomer(name)
        return data
    } catch (err) {
        console.log("Error", err)
    }
}

export const joinSportWaitlist = async (email, name, sport) => {
    await joinWaitlist(email, name, 'Sport', { 'Sport': sport })
}

export const joinCryptoWaitlist = async (email, name) => {
    await joinWaitlist(email, name, 'Crypto', {})
}

export const joinStreamerWaitlist = async (email, name) => {
    await joinWaitlist(email, name, 'Streamer', {})
}

//joinWaitlist("michaelszer@gmail.com", "Miguel", "Crypto", { "Coins": [ "ETH", "BTC", "SHIB" ], "Cost": 299.99 }) // Test 