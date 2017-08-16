const Hemera 		=	require("nats-hemera")
const Nats 			= 	require("hemera-testsuite/natsStub")
const ActStub		= 	require("hemera-testsuite/actStub")
const Code 			= 	require("code")
const expect 		= 	Code.expect
var resultArray		=	{"game":"bf4","plat":"pc","name":"m4jes","tag":"BPt","score":16724643,"timePlayed":1476950};

  it("testPlayernformation", function (done) {
	describe("Math", function () {
			const nats 		= 	new Nats()
			const hemera 	= 	new Hemera(nats, {
				logLevel	:		 "info"
			})
		const actStub		= 	new ActStub(hemera)

		hemera.ready(function () {
		  hemera.add({
			topic: "api",
			cmd: "playerInfo"
		  }, function (args, cb) {
			this.act({ topic: "api", cmd: "playerInfo"}, function (err, resp) {
			})
		  })

		  // stub act calls
		  actStub.stub({ topic: "api", cmd: "playerInfo" }, null, resultArray)
		  
		  hemera.act({
				topic: "api",
				cmd: "playerInfo",
		   }, function(err, result) {
				expect(err).to.be.not.exists()
				expect(result).to.be.equals(resultArray)
				done()
		  })
		})
	  })
})

    
