$('#taskAssignmentAssignBtn').click(function () {
    // Assume user doesn't type wrong information.
    let names_string = $('#taskAssignmentAssignNames').val()
    let task = $('#taskAssingmentAssignTaskTextarea').val()
    console.log(names_string, task)

    // Make name_string into a array.
    let names = names_string.split(' ')

    $.post('/task_assignment/assign', {names: names, task: task},'json')
        .done(function (){
            console.log("Assign successfully!")
        })
        .fail((err)=>{
            console.log('Assign failed.')
        })
})