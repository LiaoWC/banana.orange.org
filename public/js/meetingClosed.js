console.log("test")
var args = {}
var url = location.href;

if (url.indexOf('?') != -1) {
    var arr = url.split('?')[1].split('&');

    for (i = 0; i < arr.length; i++)
        args[arr[i].split('=')[0]] = arr[i].split('=')[1]
}

if (args['room_name'] == undefined)
    window.location.href = "/meeting/control";

console.log('Roomname: ' + args['room_name'])


var socket = io()

function updateFiles(files) {
    var file_container = document.getElementById('files_container')

    files.forEach(file => {
        var filebox = document.createElement('div')
        filebox.innerHTML = file
        file_container.appendChild(filebox)
    });

}

$(function () {
    $("#title").text(args['room_name'] + " : Meeting Files")

    socket.emit('get files', {
        room_name: args['room_name']
    })

    socket.on('get files ok', (data) => {
        console.log(data)
        updateFiles(data.files)
    });

});

