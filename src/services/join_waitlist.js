import { DynamoDB } from 'aws-sdk'
import { sendNotificationNewCustomer } from './sns_message_waitlist.js'

const joinWaitlist = async (email, name, product, onSuccess = () => {}, additionalData = {}) => {

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
        if(err){
            console.log('error', err)
            return
        }

        onSuccess()
        sendNotificationNewCustomer(name)
    })
}

export const joinSportWaitlist = async (email, name, sport, onSuccess = () => {}) => {
    await joinWaitlist(email, name, 'Sport', onSuccess, { 'Sport': sport })
}

export const joinCryptoWaitlist = async (email, name, phone, onSuccess = () => {}) => {
    await joinWaitlist(email, name, 'Crypto', onSuccess, { Phone: phone })
}

export const joinStreamerWaitlist = async (email, name, onSuccess = () => {}) => {
    await joinWaitlist(email, name, 'Streamer', onSuccess, {})
}

//joinWaitlist("michaelszer@gmail.com", "Miguel", "Crypto", { "Coins": [ "ETH", "BTC", "SHIB" ], "Cost": 299.99 }) // Test 