$(document).ready(function () {


    var data_list = [{
        todo_id: 1,
        state: 0,
        content: "Human Interest Form",
        deadline_date: 1222, 
        time_to_finish: 2512,
    },
    {
        todoId: 1,
        state: 0,
        content: "cassa m",
        deadline_date: 5645, 
        time_to_finish: 6874,
    },
    ];. If your find your db has something wrong, suggest you delete it and re

    // $(window).bind('beforeunload', function () {
    // console.log('It is going to be refreshed')
    $.get('/api/todos/get_all',
        {}, 'json')
        .done((data) => {
            console.log('Get data from database...')
            console.log(data)
            data.forEach(element => {
                let todoId = parseInt(element['todoId'])
                // let userId = parseInt(element['userId'])
                let state = parseInt(element['state'])
                let content = element['content']
                let deadline = element['deadline']
                let deadline_date = deadline.substr(0, 4)
                let time_to_finish = deadline.substr(4)
                
                let temp = {
                    todoId: todoId,
                    state: state,
                    content: content,
                    deadline_date: deadline_date,
                    time_to_finish: time_to_finish,
                }
                console.log(temp)
                data_list.push(temp)
                console.log(data_list)
            });
            data_list.forEach(element => {
                $("table tbody").append(
                    `<tr><td><span><i class="fa fa-trash"></i> </span>${element['content']}</td><td>${element['time_to_finish']}</td><td>${element['deadline_date']}</td></tr>`)
            });
        }
       
        )
        .fail(function () {
            console.log("error");
        })

        


    $(".cool-list").on("click", "button", function (e) {

        let types = [];
        $("#form-test > input").each(function () {
            types.push($(this).val());
            $(this).val("");
        });

        console.log(types);
        $("table tbody").append(
            // '<tr><td><span><i class="fa fa-trash"></i> </span>' + types[0] + '</td><td>' + types[1] + '</td><td>' + types[2] + '</td></tr>';
            `<tr><td><span><i class="fa fa-trash"></i> </span>${types[0]}</td><td>${types[1]}</td><td>${types[2]}</td></tr>`)

        $.post('/api/todos/create',
            { 'state': 0, 'content': 'hola', 'deadline_date': '1022', 'time_to_finish': '1822' }, 'json')
            .done((data) => {
                console.log(data)
            })
            .fail(function () {
                console.log("error");

            });



    })
})