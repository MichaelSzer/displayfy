import { GetCommand } from "@aws-sdk/lib-dynamodb"
import { ddbDocClient } from "./ddbDocClient.js"

const params = {
    TableName: "Music",

    Key: {
        'Artist': "No One You Know",
        'SongTitle': "Call Me Today"
    }
}

export const run = async () => {
    try {
        const data = await ddbDocClient.send( new GetCommand(params) )
        console.log("Success", data.Item)
        return data
    } catch (error) {
        console.log("Error", error)
    }
}

run();