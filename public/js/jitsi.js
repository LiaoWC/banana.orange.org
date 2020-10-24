//const { default: Canvas2Image } = require("./Canvas2Image");
var db = require('../database/database')


var groupname = ".";
var api
//
function newAPI() {
    // Client window size
    const navbar_height = document.querySelector('.navbar').clientHeight
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    // API configure
    let domain = "meet.jit.si"
    let options = {
        roomName: username,
        width: vw,
        height: vh - navbar_height,
        parentNode: document.querySelector('#meet')
    }

    // Initialize APE
    api = new JitsiMeetExternalAPI(domain, options)
}

//
$('#meeting_reload').click(function () {
    api.dispose() 
    newAPI()
})

$('#screenshot').click(function (){
   // console.log(api);
    api.captureLargeVideoScreenshot().then(dataURL => {
        try{
            console.log(dataURL.dataURL)
            /*
            // dataURL 存入資料庫
            date_ = string(Date.now())
            let sql = 'INSERT INTO screenshot(group,date,dataURL) VALUES(?,?,?)'
            let params = [groupname, date_, dataURL.dataURL]
            console.log(params)
            db.run(sql, params, (err) => {
                    if (err) {
                        console.log(err.message)
                        res.json(FAIL_MSG)
                    } else {
                        res.json(SUC_MSG)
                    }
                }
            )
            */
            /* 
            // 尋找圖片
            var im = document.createElement("img");
            im.src = dataURL.dataURL;
            document.body.appendChild(im);
            */
        }
        catch{
            console.log('no screen getable');
        }
        //var image_ = Canvas2Image.saveAsPNG(dataURL,true);
        //console.log(image_)
    });
})

$('#get_pic').click(function(){
    let a = localStorage.getItem("imgdata");
    console.log(a);
    var image = new Image();
    image.src = a;
    document.body.appendChild(image);
})

//
$(document).ready(function () {
    newAPI()
})
