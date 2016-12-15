var express = require('express')
var app = express()

var miniAPI = require('./mini-api.js').init(app)
require('./gulpfile.js').watch()

app.use(express.static('www'))
var port = 1337
console.log('listen', port)
app.listen(port)