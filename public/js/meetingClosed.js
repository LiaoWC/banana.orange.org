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
    var file_container = document.getElementById('card_region')
    //file_container.innerHTML = ""

    files.forEach(file => {
        var filebox = document.createElement('div')
        filebox.classList.add("col", "mb-4")
        var filebox_2 = document.createElement('div')
        filebox_2.classList.add("card", "h-60")
        var filebox_3 = document.createElement('div')
        filebox_3.classList.add("view", "overlay")

        var img = document.createElement('img')
        img.classList.add("img", "card-img-top")
        img.src = '/img/file/file.png'


        if (file.slice(-3) == 'png')
            img.src = `/img/${args['room_name']}/${file}`;

        var a = document.createElement('a')
        var asub = document.createElement('div')
        asub.classList.add("mask", "rgba-white-slight")
        a.appendChild(asub)
        a.href = `/img/${args['room_name']}/${file}`


        var filebox_4 = document.createElement('div')
        filebox_4.classList.add("card-body")

        var h4 = document.createElement('h4')
        h4.classList.add("card-title")
        h4.innerText = file

        var btn = document.createElement('button')
        btn.classList.add("btn", "btn-light-blue", "btn-md")
        btn.type = 'button'
        btn.innerText = "Download"
        btn.onclick = () => {
            window.open(`/img/${args['room_name']}/${file}`)
        };

        filebox_3.appendChild(img)
        filebox_3.appendChild(a)
        filebox_4.appendChild(h4)
        filebox_4.appendChild(btn)
        filebox_2.appendChild(filebox_3)
        filebox_2.appendChild(filebox_4)
        filebox.appendChild(filebox_2)



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

