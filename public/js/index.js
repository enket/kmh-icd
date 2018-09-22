(function () {

    var $zo;
    var socket = io();
    var dist = 10.0;
    var alphaOffset = null;
    var pointPrevious = {
        "pointX": 0.0,
        "pointY": 0.0
    }
    var pointNow = {
        "pointX": 0.0,
        "pointY": 0.0
    }
    function noscroll() {
        window.scrollTo( 0, 0 );
    }
    //$('body').bind('touchmove', function(e){e.preventDefault()});
    $(window).on('touchmove.noScroll', function (e) {
        e.preventDefault();
    });

    function initialize() {
        // Register an event listener to call the resizeCanvas() function
        // each time the window is resized.

        // Draw canvas border for the first time.

    }


    $(function () {
        $zo = $("#zo");

        // add listener to disable scroll
        window.addEventListener('scroll', noscroll);

        //window.addEventListener("deviceorientation", deviceorientationHandler);
         var el = document.getElementsByTagName("canvas")[0];
        // var ctx = el.getContext("2d");
        // ctx.width = window.innerWidth;
        // ctx.height = window.innerHeight;

        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        var canvasOffset = $("#canvas").offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        el.addEventListener("touchstart", handleStart, false);
        //el.addEventListener("touchend", handleEnd, false);
        el.addEventListener("touchmove", handleMove, false);
        socket.on('draw2', function (msg) {
            //console.log("hahahahhahahhahh");
            var el = document.getElementsByTagName("canvas")[0];
            var ctx = el.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(msg.PreX, msg.PreY);
            ctx.lineTo(msg.NowX, msg.NowY);
            ctx.stroke();
        });
    });

    function handleStart(evt) {

        console.log("touchstart.");
        var el = document.getElementsByTagName("canvas")[0];
        var ctx = el.getContext("2d");
        var touches = evt.changedTouches;
        pointPrevious.pointX = touches[0].pageX;
        pointPrevious.pointY = touches[0].pageY;
        socket.emit('draw', {
            "touchX": touches[0].pageX,
            "touchY": touches[0].pageY
        });
    }

    function handleMove(evt) {
        var el = document.getElementsByTagName("canvas")[0];
        var ctx = el.getContext("2d");
        var touches = evt.changedTouches;
        evt.preventDefault();
        for (var i = 0; i < touches.length; i++) {
            pointNow.pointX = touches[i].pageX;
            pointNow.pointY = touches[i].pageY;

            socket.emit('draw', {
                "PreX": pointPrevious.pointX,
                "PreY": pointPrevious.pointY,
                "NowX": pointNow.pointX,
                "NowY": pointNow.pointY
            });
            pointPrevious.pointX = pointNow.pointX;
            pointPrevious.pointY = pointNow.pointY;

        }
    }

    $(function () {
        $('#slider').slider({
            min: 10,
            max: 50,
            slide: function (event, handle) {
                dist = handle.value;
                console.log(handle.value);
            }
        });
    });

    /**
     *
     * @param event
     */

})();