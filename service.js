'use strict'
const Hemera = require('nats-hemera')
const example = require('./index')
var request = require('request');
const nats = require('nats').connect({
    url: 'nats://54.72.169.243:4222',
    user: 'admin',
    pass: 'MZ1VTQ39960mQWu1'
})
var data,
    parsedData,
    resultObject;
const hemera = new Hemera(nats, {
    logLevel: 'info'
})

// how to load the plugin
hemera.use(example)

hemera.ready(() => {
    // how to call the endpont exposed by the plugin. This can be called from any service

    // call a service method
    hemera.act({
        topic: "api",
        cmd: "playerInfo",
        timeout$: 40000
    }, function(err, res) {
        hemera.log.info("playerInfo: ", res)
    })

})
