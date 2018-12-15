'use strict';

const Hapi = require('hapi');
const Boom = require('boom');
var rp = require('request-promise');

const server = Hapi.server({
    port: 3000,
    host: '192.168.0.15'
});

const mqttOpts = {
    brokerUrl: 'mqtt://192.168.0.15:8080',
    opts: {
        username: 'MosquittoAdmin',
        password: '9Mosq1TT0pSw'
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