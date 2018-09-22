(function () {

    var $zo;
    var socket = io();
    var dist = 10.0;
    var alphaOffset = null;

    $(window).on('touchmove.noScroll', function (e) {
        e.preventDefault();
    });

    $(function () {
        $zo = $("#zo");
        window.addEventListener("deviceorientation", deviceorientationHandler);
    });


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
    function deviceorientationHandler(event) {
        if (alphaOffset == null){
            alphaOffset = event.alpha;
        }
        //ジャイロセンサー情報取得
        // X軸
        var beta = event.beta;
        // Y軸
        var gamma = event.gamma;
        // Z軸
        var alpha = (event.alpha + 360 - alphaOffset) % 360;
        var html = "";
        html += "X回転 : " + beta + "<br>";
        html += "Y回転 : " + gamma + "<br>";
        html += 'Z回転 : ' + alpha + "<br>";
        html += 'Distance : ' + dist;
        socket.emit('params', {
            "beta": beta,
            "gamma": gamma,
            "alpha": alpha,
            "dist": dist
        });
        $("#debug").html(html);

        $zo.css({
            "-webkit-transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + (180 + alpha) + "deg)",
            "transform": "rotateX(" + (180 + beta) + "deg) rotateY(" + (180 + gamma) + "deg) rotateZ(" + (180 + alpha) + "deg)"
        })
    }
})();