var socket = io()
var axios = require('axios')

function updateRooms(rooms, old_rooms) {
    var keys = Object.keys(rooms)
    var old_keys = Object.keys(old_rooms)

    var list_element = document.getElementsByClassName('list-group')[0]
    var old_list_element = document.getElementsByClassName('old-list-group')[0]
    list_element.innerHTML = ""
    old_list_element.innerHTML = ""

    for (let i = 0; i < keys.length; i++) {
        room = rooms[keys[i]]
        console.log(keys[i], old_keys.find(e => e == keys[i]))
        if (old_keys.find(e => e == keys[i]) != undefined)
            continue;
        var sample_element = document.createElement('a')
        sample_element.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "list-group-item-action")
        sample_element.innerText = room.room_name
        sample_element.href = "/meeting" + "?" + `room_name=${room.room_name}`
        var sample_span = document.createElement('span')
        sample_span.classList.add("badge", "badge-primary", "badge-pill");
        sample_span.innerText = room.person_num
        sample_element.appendChild(sample_span);
        list_element.appendChild(sample_element)
    }

    for (let i = 0; i < old_keys.length; i++) {
        room = old_rooms[old_keys[i]]
        var sample_element = document.createElement('a')
        sample_element.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "list-group-item-action")
        sample_element.innerText = room.room_name
        sample_element.href = "/meeting/closed" + "?" + `room_name=${room.room_name}`
        var sample_span = document.createElement('span')
        sample_span.classList.add("badge", "badge-primary", "badge-pill");
        sample_span.innerText = room.person_num
        sample_element.appendChild(sample_span);
        old_list_element.appendChild(sample_element)
    }
}

function add_room() {
    var room_name = prompt("Please enter room name:", "");


    if (room_name == "" || room_name == null)
        return
    socket.emit('add room', room_name);
}

$(function () {
    socket.emit('get room', 1)

    socket.on('get room ok', (data) => {
        console.log(data)
        updateRooms(data.rooms, data.old_rooms)
    });

    socket.on('add room ok', (data) => {
        updateRooms(data.rooms, data.old_rooms)

    });
});

