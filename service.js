'use strict'
const Hemera            =           require('nats-hemera')
const example           =           require('./index')
var request             =           require('request');
const nats              =           require('nats').connect({url:'nats://54.72.169.243:4222',user:'admin',pass:'MZ1VTQ39960mQWu1'})
var data,
        parsedData,
        resultObject;
const hemera            =           new Hemera(nats, {
                                            logLevel: 'info'
                                        })

// how to load the plugin
hemera.use(example)

hemera.ready(() => {
    // how to call the endpont exposed by the plugin. This can be called from any service

  // call a service method
    hemera.act({
            topic: "api",
            cmd: "playerInfo"
        },
        function(err, res) {
            hemera.log.info("playerInfo: ", res)
    })

    // Register a service method
    hemera.add({
        topic: 'api',
        cmd: 'playerInfo'
    },(req,cb) => {
        request('https://api.bf4stats.com/api/playerInfo?plat=pc&name='+req.name+'&output=js', function (error, response, body) {
            if(error){
                    console.log('error');
            }else {
                      var splitByEqual          =   body.split("=")[1];
                      var myJSON                =   splitByEqual.substring(0, splitByEqual.length - 1); //remove last character(;)

                      var splitByCurley         =   myJSON.split("{")[2];
                      var splitByRank           =   splitByCurley.split("rank")[0]//split by rank // 1
                      var splitByCurley2        =   myJSON.split("{")[4];
                      var splitByDoubleCurly    =   splitByCurley2.split("} },")[1];
                      var splitByStats          =   splitByDoubleCurly.split("stats:")[0]; // 2

                      var combined              =   splitByRank+splitByStats;
                      var splitByComma          =   combined.split(",");
                  var result                    =   {
                                                        "game"          : splitByComma[1].toString().split(":")[1],
                                                        "plat"          : splitByComma[2].toString().split(":")[1],
                                                        "name"          : splitByComma[3].toString().split(":")[1],
                                                        "tag"           : splitByComma[4].toString().split(":")[1],
                                                        "score"         : splitByComma[12].toString().split(":")[1],
                                                        "timePlayed"    : splitByComma[13].toString().split(":")[1],
                                                    };


                      resultObject                  =   result
                      console.log(resultObject);
            }
        })
        cb(null, {
            result:  resultObject
      })

      })

})
