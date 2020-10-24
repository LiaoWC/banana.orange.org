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

let sidenav_status = true;

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("room-list-btn").style.marginLeft = "190px";
    setTimeout(onResize, 600);
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("room-list-btn").style.marginLeft = "10px";
    setTimeout(onResize, 600);
}

function OpenorClose() {

    if (sidenav_status)
        openNav()
    else
        closeNav()

    sidenav_status = !sidenav_status;
}

