import { DynamoDB, IotData } from 'aws-sdk'
import { setSettings, getSettings } from '../config/user'

const TABLE_NAME = 'Settings'

export const fetchSettings = (deviceId) => {
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
            setSettings(
                data.Item.Style.Layout,
                data.Item.Style.Colors.Frame,
                data.Item.Style.Colors.Background
            )
        }        
    })
}

export const updateSettings = (deviceId, value, colorRGB, config, onSuccess) => {
    const settings = getSettings()
    let iotParams;

    console.log(config)

    if ( config.includes('framecolor') ){
        settings.style.colors.frame = value
        iotParams = {   topic: 'devices/' + deviceId + '/config/' + config,
                        payload: JSON.stringify(colorRGB) }
    } else if ( config.includes('backgroundcolor') ){
        settings.style.colors.background = value
        iotParams = {   topic: 'devices/' + deviceId + '/config/' + config,
                        payload: JSON.stringify(colorRGB) }
    } else if ( config.includes('layout') ){
        settings.style.layout = value
        iotParams = {   topic: 'devices/' + deviceId + '/config/' + config,
                        payload: JSON.stringify({}) }
    } else return

    settings.style.colors.background = settings.style.colors.background ? settings.style.colors.background : 'Black';
    settings.style.colors.frame = settings.style.colors.frame ? settings.style.colors.frame : 'White';
    settings.style.layout = settings.style.layout ? settings.style.layout : 'Modern';

    const params = {
        TableName: 'Settings',
        Key: {
            'DeviceId': deviceId
        },
        AttributeUpdates: {
            Style: {
                 Value: {
                    'Layout': settings.style.layout,
                    'Colors': {
                        'Background': settings.style.colors.background,
                        'Frame': settings.style.colors.frame 
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
        
        setSettings(settings.style.layout, settings.style.colors.frame, settings.style.colors.background)
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