var express = require("express");
var multer  = require('multer');
var fs = require("fs");

var upload = multer({ dest: 'uploads/' });
var app = express();

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/get-file-size", upload.any(), function (req, res, next) {
    var byteSize = req.files[0].size;
    fs.unlink(req.files[0].path, function (err) {
        if (err) throw err;
    });
    res.end(JSON.stringify({
        size: byteSize
    }));
});


app.listen(process.env.PORT || 8080);
