import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity"
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity"
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { SNSClient } from '@aws-sdk/client-sns'

export const REGION = "us-east-1"
const IDENTITY_POOL_ID = "us-east-1:cbcfe970-406d-43a2-b1a3-3f60c0924701"

// Create credentials to access AWS resource
const credentials = new fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: IDENTITY_POOL_ID
})

export const ddbClient = new DynamoDBClient({ 
    region: REGION, 
    credentials
})

export const snsClient = new SNSClient({ 
    region: REGION, 
    credentials
})