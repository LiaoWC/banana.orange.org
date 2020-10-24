$(function () {

    // white Board
    var draw_queue = [];

    var canvas = document.getElementsByClassName('whiteboard')[0];
    var colors = document.getElementsByClassName('color');
    var line_width_input = document.getElementById('line-width')
    var context = canvas.getContext('2d');

    var current = {
        color: 'black'
    };
    var drawing = false;

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

    //Touch support for mobile devices
    canvas.addEventListener('touchstart', onMouseDown, false);
    canvas.addEventListener('touchend', onMouseUp, false);
    canvas.addEventListener('touchcancel', onMouseUp, false);
    canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

    for (var i = 0; i < colors.length; i++) {
        colors[i].addEventListener('click', onColorUpdate, false);
    }


    socket.on('drawing', onDrawingEvent);

    window.addEventListener('resize', onResize, false);
    onResize();


    function drawLine(x0, y0, x1, y1, color, emit, inQueue = false) {

        let canvas_box = canvas.getBoundingClientRect();

        x0 -= canvas_box.x;
        x1 -= canvas_box.x;
        y0 -= canvas_box.y;
        y1 -= canvas_box.y;

        console.log(canvas.width, canvas.height);

        context.beginPath();
        context.fillStyle = color;
        context.arc(x0, y0, line_width_input.value, 0, 2 * Math.PI);
        context.fill();
        context.lineWidth = line_width_input.value * 2;
        context.beginPath();
        context.strokeStyle = color;
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.stroke();
        //context.moveTo(x0, y0);
        //context.lineTo(x1, y1);
        //context.strokeStyle = color;
        //context.lineWidth = 2;
        //context.stroke();
        //context.closePath();

        var w = canvas.width;
        var h = canvas.height;

        if (!inQueue)
            draw_queue.push({
                x0: x0 / w,
                y0: y0 / h,
                x1: x1 / w,
                y1: y1 / h,
                color: color
            })


        if (!emit) { return; }

        socket.emit('drawing', {
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color: color,
            room_name: args['room_name']
        });
    }

    function onMouseDown(e) {
        drawing = true;
        current.x = e.clientX || e.touches[0].clientX;
        current.y = e.clientY || e.touches[0].clientY;
    }

    function onMouseUp(e) {
        if (!drawing) { return; }
        drawing = false;
        drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
    }

    function onMouseMove(e) {
        if (!drawing) { return; }
        drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
        current.x = e.clientX || e.touches[0].clientX;
        current.y = e.clientY || e.touches[0].clientY;
    }

    function onColorUpdate(e) {
        current.color = window.getComputedStyle(e.target, null).getPropertyValue('background-color');  //.style.backgroundColor//.className.split(' ')[1];
        //current.color = $(e.target).css('background-color', $(this).val());
        console.log(current.color)
    }

    // limit the number of events per second
    function throttle(callback, delay) {
        var previousCall = new Date().getTime();
        return function () {
            var time = new Date().getTime();

            if ((time - previousCall) >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    }

    function onDrawingEvent(data) {
        let canvas_box = canvas.getBoundingClientRect();

        var w = canvas.width;
        var h = canvas.height;
        drawLine(data.x0 * w + canvas_box.x, data.y0 * h + canvas_box.y, data.x1 * w + canvas_box.x, data.y1 * h + canvas_box.y, data.color);

    }

    // make the canvas fill its parent
    function onResize() {
        console.log('onResize')
        canvas_style = window.getComputedStyle(canvas)
        canvas.width = canvas_style.width.split('.')[0].replace('px', '')
        canvas.height = canvas_style.height.split('.')[0].replace('px', '')
        //console.log(canvas.width, canvas.height);
        //canvas.width = window.innerWidth;
        //canvas.height = window.innerHeight;
        let canvas_box = canvas.getBoundingClientRect();

        var w = canvas.width;
        var h = canvas.height;
        for (var i = 0; i < draw_queue.length; i++) {
            drawLine(
                draw_queue[i].x0 * w + canvas_box.x,
                draw_queue[i].y0 * h + canvas_box.y,
                draw_queue[i].x1 * w + canvas_box.x,
                draw_queue[i].y1 * h + canvas_box.y,
                draw_queue[i].color,
                false,
                true
            );
        }
    }
    window.onResize = onResize


    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    window.clearCanvas = clearCanvas


    function save_canvas() {
        var dataurl = canvas.toDataURL()
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/fileupload/screenshot", true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send("room_name=" + args['room_name'] + "&" + "IMAGEDATA=" + dataurl.toString());


    }
    window.save_canvas = save_canvas

    $("#colour").change(function (event) {
        console.log($(this).val());
        current.color = $(this).val()
        $("#color_front").css('background-color', $(this).val());
    });

    $("#color_front").click(function (event) {
        $("#colour").click();
    });


});

