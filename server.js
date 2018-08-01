var express = require('express');
var app = express();
const path = require('path');

app.use(express.static('build'));
app.listen(process.env.PORT || 8080);
