'use strict';

const Hapi = require('hapi');
const Boom = require('boom');
var rp = require('request-promise');

// get config file...
const config = require('./config/config.json');

const server = Hapi.server({
    port: config.server.port,
    host: config.server.host
});

const mqttOpts = {
    brokerUrl: config.mqtt.url,
    opts: {
        username: config.mqtt.username,
        password: config.mqtt.password
    }
};

const init = async () => {

    await server.register
    (
        [
            {
                plugin: require('hapi-pino'),
                options: {
                    prettyPrint: false,
                    logEvents: ['response', 'onPostStart']
                }
            }, 
            {
                plugin: require('hapi-mqtt'),
                options: mqttOpts
            },

            // routes here...
            require('./server/routes/MqttRoutes'),
            require('./server/routes/HerokuRoutes'),
        ]
    );

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();