$(document).ready(function () {

    // $(window).bind('beforeunload', function () {
    // console.log('It is going to be refreshed')
    $.get('/user/list',
        {}, 'json')
        .done((data) => {
            console.log('Get data from database...')
            console.log(data)
            let user_list = []
            data['data'].forEach(element => {
                let username = element['username']

                user_list.push(username)
            });
            user_list.forEach(element => {
                $("#modalCart > div > div > div.modal-body > table > tbody").append(
                    `
                    <tr>
                        <th scope='row'>Online</th>
                        <td>${element}</td> 
                        <td> 

                        <i class='fas fa-sms'</i>
                            
                        </td>
                    </tr>
                    `
                )

            }

            )

        })






})
