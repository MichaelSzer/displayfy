import { DynamoDB } from 'aws-sdk'
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

    const docClient = new DynamoDB.DocumentClient({apiVersion: '2012-08-10'})
    docClient.put(params, (err, data) => {
        if(err)
            console.log('error', err)
    })
    sendNotificationNewCustomer(name)
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