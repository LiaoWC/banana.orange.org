var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');
var mv = require('mv');



router.get('/test_file', function (req, res, next) {
    res.render('file_test', { title: 'file_test' })
});

router.post('/', function (req, res, next) {

    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        let fileName = files.filetoupload.name,
            tmpPath = files.filetoupload.path,
            newPath = './savedFiles/' + fileName;

        // 將檔案從暫存位置移到 savedFiles 資料夾
        mv(tmpPath, newPath, function (err) {
            if (err) throw err;
            res.render('file_test', { title: 'file_test' })
        });

        // 將已上傳的檔案新增到 list
        //let objText = `{"name":"${musicName}","fileName":"${fileName}"},`;
        //fs.appendFileSync('./data/fileList.txt', objText);
        console.log(`file: [${fileName}] has been saved in '${newPath}'`);
    });
});



module.exports = router;
