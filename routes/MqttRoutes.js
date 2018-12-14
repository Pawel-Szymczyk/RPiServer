'use strict';

exports.plugin = {
    name: 'MqttRoutes',
    version: '1.0.0',
    register: async function (server, options) {

        // Create a route for example
        const mqttClient = server.plugins['hapi-mqtt'].client;

        server.route( {
            method: 'POST',
            path: '/devices/light',
            handler: async (request, h) => {
            
                var object = {
                    state: request.payload.state
                };
        
                var jsonData = JSON.stringify(object);

                try {

                    // Subscribe and publish message to a device.
                    await mqttClient.subscribe('devices/light', function (err) {
                        if(!err) {
                            mqttClient.publish('devices/light', jsonData);
                        }
                    });

                    // Wait for response from a device.
                    await mqttClient.on('message', function (topic, message) {
                       // console.log(message.toString());
                    });   

                }
                catch (err) { 
                    return Boom.internal('Internal MQTT error',err); 
                }

                return object;
            }
        });


        const publishToMqtt = async function (topic, message) {

            return await mqttClient.publish(topic, message)
        }

        const subscribeToMqtt = async function  (topic) {
            return await mqttClient.subscribe(topic);
        }



        server.route( {
            method: 'POST',
            path: '/devices/rgb/update',
            handler: async (request, h) => {
            
                var object = {
                    state: request.payload.state,
                    option: request.payload.option,
                    numOfLeds: request.payload.numOfLeds,
                    red: request.payload.red,
                    green: request.payload.green,
                    blue: request.payload.blue
                };
        
                var jsonData = JSON.stringify(object);

                try {
                   await mqttClient.publish('devices/rgb', jsonData);

                }
                catch (err) {
                    return Boom.internal('Internal MQTT error',err); 
                }

                return object;
            }
        });

        server.route( {
            method: 'POST',
            path: '/devices/rollet',
            handler: async (request, h) => {
            
                var object = {
                    state: request.payload.state,
                    action: request.payload.action
                };
        
                var jsonData = JSON.stringify(object);

                try {

                    // Subscribe and publish message to a device.
                    await mqttClient.subscribe('/devices/rollet/update', function (err) {
                        if(!err) {
                            mqttClient.publish('/devices/rollet/update', jsonData);
                        }
                    });

                    // Wait for response from a device.
                    await mqttClient.on('message', function (topic, message) {
                        console.log(message.toString());
                    });   

                }
                catch (err) { 
                    return Boom.internal('Internal MQTT error',err); 
                }

                return object;
            }
        });


     }
};