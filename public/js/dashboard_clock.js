$(document).ready(function () {
    // var alert = $("#alertme");
    var count = parseInt($("#num1").html());

    console.log("haha");
    console.log(count);


    count++;
    var counter = setInterval(timer, 1000);

    function timer() {
        if (count >1000) {
            clearInterval(counter)
            $("#num1").html(count);
            return;
        }
        count += 1;

        $("#num1").html(count);
    }
})