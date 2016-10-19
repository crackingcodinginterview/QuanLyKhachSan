var path = require('path');
var express = require("express");
var argv = require('yargs').argv;
var app = express();
var port = process.env.PORT || (argv.port || 8008);
var dir = argv.dir || '/';
var assetPath = path.join(__dirname, dir);

GLOBAL.ROOTPATH = assetPath;
app.set('port', port);
app.use(express.static(assetPath));

app.get('*', function (req, res){
    res.sendFile(assetPath + "index.html");
});

app.listen(app.get('port'), function (){
    console.log('Express server listening on port ' + app.get('port'));
});

process.on('uncaughtException', function (err){
    if (err) {
        console.error('uncaughtException: ' + err.message);
        console.error(err.stack);
    }
});