import { AuthenticationDetails, CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js'
import * as AWS from 'aws-sdk'
import { setUser } from '../config/user'
import useUserStore from '../store/user'
import { fetchWatchlist } from '../services/watchlist_service'
import { fetchSettings } from '../services/settings_service'

export const REGION = 'us-east-1'

//const Username = "mikeszerman@gmail.com"
//const Password = "M1gu3l1t0"

const USER_POOL_ID = "us-east-1_TGvJqUHQF"
const IDENTITY_POOL_ID = "us-east-1:cbcfe970-406d-43a2-b1a3-3f60c0924701"
const APP_CLIENT_ID = "7qg9leb1mgho2dl876bci93ava"

const userPool = new CognitoUserPool({
    UserPoolId: USER_POOL_ID,
    ClientId: APP_CLIENT_ID,
    Storage: localStorage
})

let cognitoUser

AWS.config.update({
    region: REGION,
    credentials: new AWS.CognitoIdentityCredentials({ IdentityPoolId: IDENTITY_POOL_ID })
})

let onSuccess = (res, callback) => {

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IDENTITY_POOL_ID,
        Logins: {
            ['cognito-idp.' + REGION +'.amazonaws.com/' + USER_POOL_ID]: res.getIdToken().getJwtToken()
        }
    })

    AWS.config.credentials.expired = true;

    let name, email, device

    // Retrieve user attributes
    cognitoUser.getUserAttributes((err,res) => {
        if(err) {
            console.log('err', err.message)
            return
        }

        for(const attribute of res){

            if(attribute.getName() == 'custom:device')
                device = attribute.getValue()
            else if(attribute.getName() == 'name')
                name = attribute.getValue()
            else if(attribute.getName() == 'email')
                email = attribute.getValue()
        }

        const userStore = useUserStore()

        userStore.logIn(name, email, device)

        fetchWatchlist(device)
        fetchSettings(device)
    })

    // Attach Policy to created authenticated user
    const params = {
        policyName: 'displayfy-website-policy',
        target: AWS.config.credentials.identityId
    }
    
    const iotClient = new AWS.Iot({apiVersion: '2015-05-28'})
    iotClient.attachPolicy(params, (err, data) => {
        if(err){
            console.log('error', err)
            return
        }
    })
    
    callback()
}

onSuccess.bind(this)

export const authenticateFromLocal = (onSuccessCallback, onFailureCallback) => {

    const userStore = useUserStore()
    cognitoUser = userPool.getCurrentUser()
    if(cognitoUser === undefined || cognitoUser === null) {

        userStore.logOut()
        onFailureCallback()
        return
    }

    cognitoUser.getSession((err, session) => {
        if(err){
            console.log('Error', err.message)
            userStore.logOut()
            onFailureCallback()
            return
        }

        onSuccess(session, onSuccessCallback)
    })
}

export const logout = () => {
    
    const userStore = useUserStore()

    userStore.logOut()
    if(cognitoUser) cognitoUser.signOut()
}

export const authenticate = (email, password, onSuccessCallback, onFailureCallback) => {

    cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
        Storage: localStorage
    })

    const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password
    })

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (res) => {
            onSuccess(res, onSuccessCallback)
        },
        onFailure: (err) => {
            onFailureCallback(err)
        }
    })
}

// To import the script and load AWS credentials
export const load = () => {};