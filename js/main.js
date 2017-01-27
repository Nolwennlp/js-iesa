// * Created by Nolwenn on 19/01/2017.

$(function () {

    // worker
    var worker = new Worker("js/worker.js");

    var player = $('.player');

    // event trigger pour alimenter le worker
    $("#viewport").on('keydown keyup mousemove', function (e) {
        // une demande de deplacement
        var moveRequest = {
            top: 0,
            left: 0
        };

        if ([27, 37, 38, 39, 40].indexOf(e.which) != -1) {
            switch (e.which) { // ou e.keyCode
                 // LEFT
                case 37:
                    moveRequest.left = (e.type == "keydown") ? 1 : 0;
                    break;
                 // TOP
                case 38:
                    moveRequest.top = (e.type == "keydown") ? 1 : 0;
                    break;
                 // RIGHT
                case 39:
                    moveRequest.left = (e.type == "keydown") ? -1 : 0;
                    break;
                 // BOTTOM
                case 40:
                    moveRequest.top = (e.type == "keydown") ? -1 : 0;
                    break;
                  // SPACE
                case 13:
                    moveRequest.top = (e.type == "keydown") ? 1 : 0;
                    break;

            }
        }
        /*
            if (e.type == "mousemove") {
            moveRequest.left = (e.offsetX > $(".player").first().position().left) ? -1 : 1;
            moveRequest.top = (e.offsetY > $(".player").first().position().top) ? -1 : 1;
        }*/

        worker.postMessage( moveRequest );
    });



    // event trigger sur les messages du worker
    worker.onmessage = function(event) {
        console.log("worker returned : " , event.data);
        var currentWorld = event.data;
        if($("#"+ currentWorld.player.id).length == 0){
            $('#map').append($('<div id="'+ currentWorld.player.id +'" class="'+ currentWorld.player.class +'">'));
        }

        if($("#"+ currentWorld.listEnnemies[0].id).length == 0){
            $('#map').append($('<div id="'+ currentWorld.listEnnemies[0].id +'" class="'+ currentWorld.listEnnemies[0].class +'">'));
        }
        if($("#"+ currentWorld.listEnnemies[1].id).length == 0){
            $('#map').append($('<div id="'+ currentWorld.listEnnemies[1].id +'" class="'+ currentWorld.listEnnemies[1].class +'">'));
        }


        // Display map
        $('.row').remove();
        for ( var i=0; i<10; i++ ) {
            $('.map').append('<div class="row"></div>');
            for (var j = 0; j <10; j++) {
                switch (event.data.map[i][j]) {
                    case 0:
                        $('.row').eq(i).append('<div class="lava"></div>');
                        break;
                    case 1:
                        $('.row').eq(i).append('<div class="rock"></div>');
                        break;
                }

            }

        }

        $("#"+ currentWorld.player.id).removeClass('top bottom left right');
        $("#"+ currentWorld.player.id).css('transform', 'translate(' + currentWorld.player.x*32 + 'px,' + currentWorld.player.y*32 + 'px)');
        $("#"+ currentWorld.player.id).addClass(currentWorld.player.orientation);
        $("#"+ currentWorld.listEnnemies[0].id).css('transform', 'translate(' + currentWorld.listEnnemies[0].x*32 + 'px,' + currentWorld.listEnnemies[0].y*32 + 'px)');
        $("#"+ currentWorld.listEnnemies[1].id).css('transform', 'translate(' + currentWorld.listEnnemies[1].x*32 + 'px,' + currentWorld.listEnnemies[1].y*32 + 'px)');

    };

    worker.onerror = function(error) {
        console.error("Worker error: " + error.message + "\n");
        throw error;
    };

});