var bodyParser = require('body-parser')
var express = require('express')
var app = express()

require('./gulpfile.js').build()
require('./gulpfile.js').watch()
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json())

var miniAPI = require('./mini-api.js').init(app)

app.use(express.static('www'))
app.use('/foo', express.static('www/index.html'))
app.use('/foo/:id', express.static('www/index.html'))
app.use('/error', express.static('www/index.html'))

var port = 1337
console.log('listen', port)
app.listen(port)