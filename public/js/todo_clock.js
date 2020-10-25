$(document).ready(function () {
    // var alert = $("#alertme");
    var count = parseInt($("#num1").html());
    var preCount = count;
    var times = 0;
    var clickStop = 0;
    var startOrStop = 0;
    var breaktime = parseInt($("#num2").html());
    console.log(count);
    // $("#reset").hide();



    $("#add5Clock").click(function () {
        count += 5;
        $("#num1").html(count);

    });
    $("#minus5Clock").click(function () {
        if (count > 5) {
            count -= 5;
            $("#num1").html(count);
        }


    });
    $("#stop").click(function () {
        clickStop = 1;
        startOrStop = 0;
        times = 0;
        count = preCount;
        $("#num1").html(preCount);
        clearInterval(counter)
        return;

    });

    $("#add5Break").click(function () {
        breaktime += 5;
        $("#num2").html(breaktime);

    });
    $("#minus5Break").click(function () {
        if (breaktime > 5) {
            breaktime -= 5;
            $("#num2").html(breaktime);
        }


    });
    $("#start").click(function () {
        if (times == 0) {
            times++;
            preCount = count;
        }
        if (startOrStop == 0) {
            startOrStop = 1;
        } else {
            startOrStop = 0;
        }

        var counter = setInterval(timer, 1000);

        function timer() {
            if (count <= 0 || clickStop == 1 || startOrStop == 0) {
                clearInterval(counter)

                clickStop = 0;
                $("#num1").html(count);
                return;
            }
            count -= 1;

            $("#num1").html(count);
        }
    }



    );



    
    //Click X to delete

    // $("input[type='text'").keypress(function (e) {
    //     if (e.which === 13) {
    //         var todotext = $(this).val();
    //         $(this).val("");
    //         $("ul").append("<li><span><i class='fa fa-trash'></i> </span> " + todotext + "</li>");
    //         $("ul").append("<li><span><i class='fa fa-trash'></i> </span> " + todotext + "</li>");

    //     }

    // });



    var data_list = [
    // {
    //     todoId: 1,
    //     state: 0,
    //     content: "cassa m",
    //     deadline_date: 5645,
    //     time_to_finish: 6874,
    // }
    ]

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
                    `<tr id=${'n'+toString(element['todoId'])})><td><span><i class="fa fa-trash"></i> </span>${element['content']}</td><td>${element['time_to_finish']}</td><td>${element['deadline_date']}</td></tr>`)
            });
        }
       
        )
        .fail(function () {
            console.log("error");
        })
    // });
    $("table tbody tr td").on("click", "span", function (e) {
        $(this).parent().parent().fadeOut(500);
        $(this).parent().parent().remove();
        console.log("ddd")
        console.log($(this).parent().parent().attr("id"))
        // $.post('/api/todos/delete',
        // {
        //     'todo_id':$(this).parent().parent()
        // })
        e.stopPropagation();
    });
    $("table tbody").on("click", "tr", function () {
        $(this).toggleClass("complete");
    });    
    $(".cool-list").on("click", "button", function (e) {

        let types = [];
        $("#form-test > input").each(function () {
            types.push($(this).val());
            $(this).val("");
        });
        // let temp = {
        //     state: state,
        //     content: content,
        //     deadline: deadline_date,
        //     time_to_finish: time_to_finish,
        // }
        console.log(types);
        $("table tbody").append(
            // '<tr><td><span><i class="fa fa-trash"></i> </span>' + types[0] + '</td><td>' + types[1] + '</td><td>' + types[2] + '</td></tr>';
            `<tr><td><span><i class="fa fa-trash"></i> </span>${types[0]}</td><td>${types[1]}</td><td>${types[2]}</td></tr>`
            );
        // console.log("milk")
        $.post('/api/todos/create',
            { 'state':0 ,'content': types[0], 'deadline_date': types[1], 'time_to_finish': types[2] }, 'json')
            .done((data) => {
        
                console.log("create...!" + data)
            })
            .fail(function () {
                console.log("error");

            });

        

    })

})