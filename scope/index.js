var express = require('express')
var app = express()

var miniAPI = require('./mini-api.js').init(app)
require('./gulpfile.js').watch()

app.use(express.static('www'))
app.listen(1337)