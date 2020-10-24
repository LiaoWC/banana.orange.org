function getHaveAssignedButNotCompleted() {
    $.get('/task_assignment/not_be_completed', {}, 'json')
        .done((data) => {

            $('#not_be_completed_display_table').text('')


            let str = `
                <table id="not_be_completed_display_table" class="table pl-0 pr-0">
                <h3>Not be completed</h3>
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
                        <td>${obj.content}</td>                        
                        <td>${obj.collaborators}</td>
                        <td>${obj.deadline}</td>
                    </tr>
                `
            }

            str += `</tbody></table>`

            $('#not_be_completed_display_table').append(str)

            // clickAssignAutoRenew()

        })
        .fail((err) => {
            console.log(err)
        })
}


$(document).ready(function () {
    getHaveAssignedButNotCompleted()
    // clickAssignAutoRenew()
})
// function clickAssignAutoRenew(){
//     $('button#taskAssignmentAssignBtn').click(getHaveAssignedButNotCompleted())
// }


//  class="<!--badge badge-light mr-2>" href="#">i class="fas fa-check"></i></a>