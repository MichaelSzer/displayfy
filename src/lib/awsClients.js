import { AuthenticationDetails, CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js'
import * as AWS from 'aws-sdk'
import { setUser } from '../config/user'
import { fetchWatchlist } from '../services/watchlist_service'

export const REGION = 'us-east-1'

const Username = "mikeszerman@gmail.com"
const Password = "T3stT3st"

const USER_POOL_ID = "us-east-1_TGvJqUHQF"
const IDENTITY_POOL_ID = "us-east-1:cbcfe970-406d-43a2-b1a3-3f60c0924701"
const APP_CLIENT_ID = "7qg9leb1mgho2dl876bci93ava"

const authenticationDetails = new AuthenticationDetails({
    Username: Username,
    Password: Password
})

const userPool = new CognitoUserPool({
    UserPoolId: USER_POOL_ID,
    ClientId: APP_CLIENT_ID
})

const cognitoUser = new CognitoUser({
    Username: Username,
    Pool: userPool
})

AWS.config = {
    region: REGION,
    credentials: new AWS.CognitoIdentityCredentials({ IdentityPoolId: IDENTITY_POOL_ID })
}

let onSuccess = (res) => {
    
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IDENTITY_POOL_ID,
        Logins: {
            ['cognito-idp.' + REGION +'.amazonaws.com/' + USER_POOL_ID]: res.getIdToken().getJwtToken()
        }
    })

    AWS.config.credentials.expired = true;

    setUser(res.idToken.payload.name, res.idToken.payload.email, ['TSLA'])
    fetchWatchlist('000001')

    console.log(res)
}

onSuccess.bind(this)

cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess,
    onFailure: (err) => {
        alert(err)
    }
})

// To import the script and load AWS credentials
export const load = () => {};