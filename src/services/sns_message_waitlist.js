import * as AWS from 'aws-sdk'

const PHONE_NUMBER = "+17868672044"

export const sendNotificationNewCustomer = async (name) => {
    
    try {
        // Setup Message
        const messageParams = {
            PhoneNumber: PHONE_NUMBER,
            Message: "+1 | " + name + " has joined the waitlist. Congrats!"
        }

        await new AWS.SNS({apiVersion: '2010-03-31'}).publish(messageParams).promise()
    } catch(err) {
        console.log("Error sending notification", err)
    }
}