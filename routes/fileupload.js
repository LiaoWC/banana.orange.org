var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');


router.get('/test_file', function (req, res, next) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<form action="/fileupload" method="post" enctype="multipart/form-data" accept-charset=utf-8>');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
});

router.post('/', function (req, res, next) {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        res.write('File uploaded');
        res.end();
    });
});



module.exports = router;
