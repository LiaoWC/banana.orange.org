
function updateRooms(rooms) {
    var keys = Object.keys(rooms)
    var list_element = document.getElementsByClassName('list-group')[0]
    list_element.innerHTML = ""

    for (let i = 0; i < keys.length; i++) {
        room = rooms[keys[i]]
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
}

$(function () {
    if (args['room_name'] != undefined)
        socket.emit('enter room', { room_name: args['room_name'] })

    socket.on('enter room failed', () => {
        window.location.href = "/meeting/control";
    });

    socket.emit('get room', 1)

    socket.on('get room ok', (data) => {
        updateRooms(data)
    });

    socket.on('add room ok', (data) => {
        updateRooms(data)
    });

    function add_room() {
        var room_name = prompt("Please enter room name:", "");
        if (room_name == "" || room_name == null)
            return
        socket.emit('add room', room_name);
    }
    window.add_room = add_room
});

