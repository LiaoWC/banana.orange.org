$(document).ready(function () {
    $.get('/api/todo_num',{},'json')
        .done((data)=>{
            console.log("todonum suc")
            $('a.badge_count').text(data['count'])
        })
    })
