import { DynamoDB, IotData } from 'aws-sdk'
import useDeviceStore from '../store/device'
import cloneDeep from 'lodash.clonedeep'

const TABLE_NAME = 'Settings'

export const fetchSettings = (deviceId) => {

    const deviceStore = useDeviceStore()

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

        //console.log('data', data.Item)
        if(data.Item.Style !== undefined){
            deviceStore.setStyle(
                data.Item.Style.Layout,
                data.Item.Style.Colors.Frame,
                data.Item.Style.Colors.Background
            )
        }        
    })
}

export const updateSettings = (deviceId, value, colorRGB, config, onSuccess) => {

    const deviceStore = useDeviceStore()
    const style = cloneDeep( deviceStore.style )
    let iotParams

    if ( config.includes('framecolor') ){
        style.colors.frame = value
        iotParams = {   topic: 'devices/' + deviceId + '/config/' + config,
                        payload: JSON.stringify(colorRGB) }
    } else if ( config.includes('backgroundcolor') ){
        style.colors.background = value
        iotParams = {   topic: 'devices/' + deviceId + '/config/' + config,
        payload: JSON.stringify(colorRGB) }
    } else if ( config.includes('layout') ){
        style.layout = value
        iotParams = {   topic: 'devices/' + deviceId + '/config/' + config,
        payload: JSON.stringify({}) }
    } else return
    
    console.log(iotParams)

    const params = {
        TableName: 'Settings',
        Key: {
            'DeviceId': deviceId
        },
        AttributeUpdates: {
            Style: {
                 Value: {
                    'Layout': style.layout,
                    'Colors': {
                        'Background': style.colors.background,
                        'Frame': style.colors.frame 
                    }
                },
                Action: 'PUT'
            }
        }
    }

    // Add to DynamoDB
    const docClient = new DynamoDB.DocumentClient({apiVersion: '2012-08-10'})
    docClient.update(params, (err, data) => {
        if(err){
            console.log('error', err)            
            return
        }
        
        deviceStore.setStyle(style.layout, style.colors.frame, style.colors.background)
        onSuccess()

        // Publish a message to IoT broker.        
        const iotDataClient = new IotData({ endpoint: 'ajotwaqg3w5p0-ats.iot.us-east-1.amazonaws.com', apiVersion: '2015-05-28' })
        iotDataClient.publish(iotParams, (err, data) => {
            if(err){
                console.log('error', err)
                return
            }
        })
    })
}