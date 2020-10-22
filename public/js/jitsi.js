//
function newAPI() {
    // Client window size
    const navbar_height = document.querySelector('.navbar').clientHeight
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    // API configure
    let api
    let domain = "meet.jit.si"
    let options = {
        roomName: "jijijitsitsitsi",
        width: vw,
        height: vh - navbar_height,
        parentNode: document.querySelector('#meet')
    }

    // Initialize APE
    api = new JitsiMeetExternalAPI(domain, options)
}

//
$('#meeting_reload').click(function () {
    api.dispose()
    newAPI()
})

//
$(document).ready(function () {
    newAPI()
})