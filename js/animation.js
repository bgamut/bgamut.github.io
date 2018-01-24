$(document).ready(function () {
    var slider = $(".gallery");
    var count = $(".gallery section").children().length;
    var height = count * 100;
    slider.css("height", height + "%");
    $(".gallery .info:first").insertAfter(".gallery .info:last");
    var body = $("body");
    var arrow = $(".nav-arrow");
    var info = $(".gallery .info");
    function fade() {
        body.animate({
            backgroundColor: "white"
        }, 7000, function () {
            body.css("backgroundColor", "black");
        });
    };   
    fade();
    function move() {
        slider.animate({
            marginTop: "-" + 200 + "vh"
        }, 1200, function () {
            $(".gallery .info:first").insertAfter(".gallery .info:last");
            slider.css("margin-top", "-" + 100 + "vh");
        });
    };
    /*
    function moveDown() {
        slider.animate({
            marginBottom: "-" + 200 + "vh"
        }, 1200, function () {
            $(".gallery .info:last").insertBefore(".gallery .info:first");
            slider.css("margin-bottom", "-" + 100 + "vh");
        });
    };
    */
    function autoplay() {
        i = setInterval(function () {
            move();
        }, 7777);
    };
    move();
    autoplay()
    var next = $(".nav-arrow");
    next.on("click", function () {
        move();
        clearInterval(i);
        autoplay();
    });
    $(function () {
        $(".gallery").swipe({
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
           
                if (direction == "up") {
                    move();
                    clearInterval(i);
                    autoplay();
                }
                /*
                else if(direction=="down"){
                    moveDown();
                }
                */
            }
        });
    });
    function readDeviceOrientation() {
        switch (window.orientation) {
            case 0:
                info.css("transform", "translateY(-28px);");
                /*arrow.css("transform", "translateY(-75px);");*/
            case 90:
                break;
            case 180:
                break;
            case 270:
                break;
        }
    }
    readDeviceOrientation();
});

