function getHaveCompletedNotChecked() {
    $.get('/task_assignment/wait_for_checked', {}, 'json')
        .done((data) => {

            $('#wait_checked_display_table').text('')


            let str = `
                <table id="wait_checked_display_table" class="table pl-0 pr-0">
                <h3>Not yet checked</h3>
                <thead>
                    <tr>
                        <th scope="col">Task You assigned</th>
                        <th scope="col">Collaborator</th>
                        <th scope="col">Deadline</th>                      
                    </tr>    
                </thead>                
                <tbody>
            `

            for (let obj of data) {
                str += `
                    <tr id="${obj.taskId}">
                        <td><a class="badge badge-light" href="/task_assignment/finish/${taskId}"><i class="fas fa-check"></i></a>${obj.content}</td>                        
                        <td>${obj.collaborators}</td>
                        <td>${obj.deadline}</td>
                    </tr>
                `
            }

            str += `</tbody></table>`

            $('#wait_checked_display_table').append(str)

            // clickAssignAutoRenew()

        })
        .fail((err) => {
            console.log(err)
        })
}


$(document).ready(function () {
    getHaveCompletedNotChecked()
    // clickAssignAutoRenew()
})
// function clickAssignAutoRenew(){
//     $('button#taskAssignmentAssignBtn').click(getHaveAssignedButNotCompleted())
// }


// <a class="badge badge-light mr-2>" href="#">i class="fas fa-check"></i></a>