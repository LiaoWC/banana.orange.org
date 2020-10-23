console.log("test")

let sidenav_status = true;

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("room-list-btn").style.marginLeft = "190px";
    setTimeout(onResize, 600);

    console.log('call onResize')
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("room-list-btn").style.marginLeft = "10px";
    setTimeout(onResize, 600);
}

function OpenorClose() {

    if (sidenav_status)
        openNav()
    else
        closeNav()

    sidenav_status = !sidenav_status;
}

