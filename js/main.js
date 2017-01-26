// * Created by Nolwenn on 19/01/2017.

$(function () {

    // worker
    var worker = new Worker("js/worker.js");

    // le sprite du player
    var player = $('.player');


    // event trigger pour alimenter le worker
    $("#viewport").on('keydown keyup mousemove', function (e) {
        // une demande de deplacement
        var moveRequest = {
            top: 0,
            left: 0
        };

        if ([37, 38, 39, 40].indexOf(e.which) != -1) {
            switch (e.which) { // ou e.keyCode
                case 37:
                    moveRequest.left = (e.type == "keydown") ? 1 : 0;
                    break;
                case 38:
                    moveRequest.top = (e.type == "keydown") ? 1 : 0;
                    break;
                case 39:
                    moveRequest.left = (e.type == "keydown") ? -1 : 0;
                    break;
                case 40:
                    moveRequest.top = (e.type == "keydown") ? -1 : 0;
                    break;
            }
        }
        if (e.type == "mousemove") {
            moveRequest.left = (e.offsetX > player.position().left) ? -1 : 1;
            moveRequest.top = (e.offsetY > player.position().top) ? -1 : 1;
        }
        worker.postMessage( moveRequest );
    });



    // event trigger sur les messages du worker
    worker.onMessage = function(event) {
        console.log("worker returned : " , event.data);
        player.css('transform', 'translate(' + event.data.left + 'px,' + event.data.top + 'px)');
    };


});