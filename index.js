'use strict'

const Hp				= 	require('hemera-plugin')
var request 			= 	require('request');
exports.plugin 			= 	Hp(function hemeraTest (options, next) {
	const hemera 		= 	this
	const topic 		= 	'test'
	var data,
		parsedData,
		resultObject,
	    result,
	    myNewObject;
	
	// Register a service method
	hemera.add({
		topic: 'api',
		cmd: 'playerInfo'
	},(req,cb) => {
		request('https://api.bf4stats.com/api/playerInfo?plat=pc&name=m4jes&output=json', function (error, response, body) {
			if(error){
					console.log('error');
			}else {
						 result = JSON.parse(body);
						 myNewObject 		= 	{
								game			: 	result.player.game,
								plat			: 	result.player.plat,
								name			:	result.player.name,
								tag				:	result.player.tag,
								score			: 	result.player.score,
								timePlayed		: 	result.player.timePlayed,
						}								
						cb(null,  myNewObject)						
			}
		})
	  }) 
  next()
})

exports.options = {}

exports.attributes = {
  pkg: require('./package.json')
}
