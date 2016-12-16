var bodyParser = require('body-parser')
var express = require('express')
var app = express()
var port = 1337



app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json())
var miniAPI = require('./mini-api.js').init(app)
require('./gulpfile.js').watch()

app.use(express.static('www'))
console.log('listen', port)
app.listen(port)