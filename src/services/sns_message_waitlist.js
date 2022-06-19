import { PublishCommand } from '@aws-sdk/client-sns'
import { snsClient } from "../lib/awsClients"

const PHONE_NUMBER = "+17868672044"

export const sendNotificationNewCustomer = async (name) => {
    
    try {
        // Setup Message
        const messageParam = {
            PhoneNumber: PHONE_NUMBER,
            Message: "+1 | " + name + " has joined the waitlist. Congrats!"
        }
        
        const data = await snsClient.send( new PublishCommand(messageParam) );
    } catch(err) {
        console.log("Error sending notification", err)
    }
}