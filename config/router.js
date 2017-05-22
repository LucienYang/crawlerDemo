const Index = require("../src/controllers/main")

module.exports = function(app){
	app.get("/", Index.getLatestNews)
}