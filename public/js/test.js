function get_users(){
    $.getJSON('/user/list',function (data){
        console.log(data)
    })
}

