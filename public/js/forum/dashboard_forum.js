$(document).ready(function () {
    $.getJSON('/forum/newest')
        .done((json) => {
            let posts_string = `
            <ul class='list-group list-group-flush' style='color:black'>`
            for (let obj of json) {
                posts_string += `
                    <li class='list-group-item'>
                        <a  href="/forum/${obj.postId}">${obj.title}</a>
                        ${obj.date}
                    </li>`
            }
            posts_string+=`</ul>`
            $('#dashboard_forum_ul').append(posts_string)
        })
        .fail(() => {
            console.log('FAIL')
        })
})