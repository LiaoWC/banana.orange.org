var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');
var mv = require('mv');
var axios = require('axios')




router.get('/test_file', function (req, res, next) {

    res.render('file_test', { title: 'file_test' })
    console.log(fs.readdirSync('./savedFiles/'))
    /*
    fs.readdirSync('./savedFiles/').forEach(file => {
        console.log(file);
    });
    */
});

router.get('/file_list', function (req, res, next) {
    console.log(req.url)

    var args = {}
    var url = req.url

    if (url.indexOf('?') != -1) {
        var arr = url.split('?')[1].split('&');

        for (i = 0; i < arr.length; i++)
            args[arr[i].split('=')[0]] = arr[i].split('=')[1]
    }
    console.log(args['room'])
    var roompath = './savedFiles/' + args['room'] + "/";
    if (args['room'] == 'all')
        roompath = './savedFiles/'
    var filelist = fs.readdirSync(roompath)

    console.log(filelist)

    axios.post('https://65651a0eda8e.ngrok.io/response', { 'type': 'file_list', 'content': filelist })
        .then((response) => {
            //console.log(response)
        })
        .catch((error) => {
            //console.log(error)
        })
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

router.post('/screenshot', function (req, res, next) {
    console.log('screenshot')

    var imgData = req.body.IMAGEDATA;
    var room_name = req.body.room_name

    var date = new Date();
    var filename = (date.getMonth() + 1) + "" + date.getDate() + "" + date.getHours() + "" + date.getMinutes() + "-" + date.getSeconds() + "" + date.getMilliseconds()


    var base64Data = imgData.replace(/^data:image\/png+;base64,/, "").replace(/ /g, '+');
    fs.writeFile("./savedFiles/" + room_name + "/" + filename + ".png", base64Data, 'base64', function (err) {
        console.log(err);
    });

});





module.exports = router;
