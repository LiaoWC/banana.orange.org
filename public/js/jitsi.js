//const { default: Canvas2Image } = require("./Canvas2Image");

var groupname;
var api
//
function newAPI() {
    // Client window size
    const navbar_height = document.querySelector('.navbar').clientHeight
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    var meet_container_size = document.getElementById("meet").getBoundingClientRect()

    // API configure
    let domain = "meet.jit.si"
    let options = {
        roomName: groupname,
        //width: vw,
        width: meet_container_size.width,
        height: meet_container_size.height,
        //height: vh - navbar_height,
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

$('#screenshot').click(function () {
    // console.log(api);
    api.captureLargeVideoScreenshot().then(dataURL => {
        try {
            //console.log(dataURL.dataURL.length)
            //console.log(dataURL.dataURL)

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/fileupload/screenshot", true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send("room_name=" + groupname + "&" + "IMAGEDATA=" + dataURL.dataURL.toString());

            /* 
            // 尋找圖片
            var im = document.createElement("img");
            im.src = dataURL.dataURL;
            document.body.appendChild(im);
            */
        }
        catch {
            console.log('no screen getable');
        }
        //var image_ = Canvas2Image.saveAsPNG(dataURL,true);
        //console.log(image_)
    });
})

$('#get_pic').click(function () {
    let a = localStorage.getItem("imgdata");
    console.log(a);
    var image = new Image();
    image.src = a;
    document.body.appendChild(image);
})

//
$(document).ready(function () {
    groupname = args['room_name']
    newAPI()
})
