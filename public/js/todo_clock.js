$(document).ready(function() {
    // var alert = $("#alertme");
    var count = parseInt($("#num1").html());
    var preCount = count;
    var times = 0;
    var clickStop = 0;
    var startOrStop = 0;
    var breaktime = parseInt($("#num2").html());
    console.log(count);
    // $("#reset").hide();

    $("#add5Clock").click(function() {
        count += 5;
        $("#num1").html(count);

    });
    $("#minus5Clock").click(function() {
        if (count > 5) {
            count -= 5;
            $("#num1").html(count);
        }


    });
    $("#stop").click(function() {
        clickStop = 1;
        startOrStop = 0;
        times = 0;
        count = preCount;
        $("#num1").html(preCount);
        clearInterval(counter)
        return;

    });

    $("#add5Break").click(function() {
        breaktime += 5;
        $("#num2").html(breaktime);

    });
    $("#minus5Break").click(function() {
        if (breaktime > 5) {
            breaktime -= 5;
            $("#num2").html(breaktime);
        }


    });
    $("#start").click(function() {
            if (times == 0) {
                times++;
                preCount = count;
            }
            if (startOrStop == 0) {
                startOrStop = 1;
            } else {
                startOrStop = 0;
            }

            var counter = setInterval(timer, 1000);

            function timer() {
                if (count <= 0 || clickStop == 1 || startOrStop == 0) {
                    clearInterval(counter)

                    clickStop = 0;
                    $("#num1").html(count);
                    return;
                }
                count -= 1;

                $("#num1").html(count);
            }
        }



    );
    $("ul").on("click", "li", function() {
        $(this).toggleClass("complete");
    });

    //Click X to delete
    $("ul").on("click", "span", function(e) {
        $(this).parent().fadeOut(500);
        $(this).remove();
        console.log("ddd")
        e.stopPropagation();
    });
    $("table tbody").on("click", "tr", function() {
        $(this).toggleClass("complete");
    });
    $("tr").on("click", "span", function(e) {
        $(this).parent().parent().fadeOut(500);
        $(this).remove();
        console.log("ddd")
        e.stopPropagation();
    });
    $("input[type='text'").keypress(function(e) {
        if (e.which === 13) {
            var todotext = $(this).val();
            $(this).val("");
            $("ul").append("<li><span><i class='fa fa-trash'></i> </span> " + todotext + "</li>");
            $("ul").append("<li><span><i class='fa fa-trash'></i> </span> " + todotext + "</li>");

        }

    });

    $(".fa-cat").click(function(e) {
        $("input[type='text'").fadeToggle();

    });

    $(".cool-list").on("click", "button", function(e) {
        types = [];
        $("input[type='text']").each(function() {
            types.push($(this).val());
            $(this).val("");
        });
        console.log(types);
        $("table tbody").append(
            '<tr><td><span><i class="fa fa-trash"></i> </span>' + types[0] + '</td><td>' + types[1] + '</td><td>' + types[2] + '</td></tr>');
    });

});