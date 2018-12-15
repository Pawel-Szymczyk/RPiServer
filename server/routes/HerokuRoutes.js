'use strict';

// this route connects with cloud server Heroku...
// use this to for example: send notifications (?)

exports.plugin = {
    name: 'HerokuRoutes',
    version: '1.0.0',
    register: async function (server, options) {

        // Create a route for example
        //const mqttClient = server.plugins['hapi-mqtt'].client;


        server.route({
            method: 'GET',
            path:'/RPiHerokuRequest',
            handler: (req, res) =>
                rp
                .get('https://powerful-atoll-10760.herokuapp.com/Pawel')
                .on('data', function(data) {
                    // res('data:' + data);
                    return "works";
                })
            
        });

        



     }
};