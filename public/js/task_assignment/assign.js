$('button#taskAssignmentAssignBtn').click(function () {
    // Assume user doesn't type wrong information.
    let names_string = $('#taskAssignmentAssignNames').val()
    let task = $('#taskAssingmentAssignTaskTextarea').val()
    let deadline = $('#taskAssignmentAssignDeadline').val()

    // Make name_string into a array.
    // let names_arr = names_string.split(' ')
    // console.log(names_arr)
    $.post('/task_assignment/assign_new_version', {"names_string": names_string, "task": task,"deadline":deadline},'json')
        .done(function (){
            console.log("Assign successfully!")
            getHaveAssignedButNotCompleted()
        })
        .fail(()=>{
            console.log('Assign failed.')
        })
})