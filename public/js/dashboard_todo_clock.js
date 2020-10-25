$(document).ready(function () {

    // $(window).bind('beforeunload', function () {
    // console.log('It is going to be refreshed')
    $.get('/api/todos/get_all',
        {}, 'json')
        .done((data) => {
            console.log('Get data from database...')
            console.log(data)
            let data_list = []
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
                $("#container > div > table > tbody").append(
                    `<tr><td><span><i class="fa fa-trash"></i> </span>${element['content']}</td><td>${element['time_to_finish']}</td><td>${element['deadline_date']}</td></tr>`)
            });
        }

        )
        .fail(function () {
            console.log("error");
        })


        $(".fa-code").click(function(e) {
            window.location.href = "../todo_clock";
        
        });
})
