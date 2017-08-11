'use strict'

const Hp = require('hemera-plugin')

exports.plugin = Hp(function hemeraTest (options, next) {
  const hemera = this
  const topic = 'test'

  hemera.add({
    topic,
    cmd: 'add'
  }, (req, cb) => {
    cb(null, req.a + req.b)
  }) 
  
  next()
})

exports.options = {}

exports.attributes = {
  pkg: require('./package.json')
}
