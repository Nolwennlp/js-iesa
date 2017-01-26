// * Created by Nolwenn on 19/01/2017.

$(function () {

    // worker
    var worker = new Worker("js/worker.js");

    // le sprite du player
    var player = $('.player');

    // Map

    var map = [];
    for( var i=0; i<32; i++){
        map.push([]);
        for ( var n=0; n<32; n++){
            map[i].push(Math.round(Math.random()) );
        }

    }

    // Display map

     for ( var i=0; i<32; i++ ){

         $('.map').append('<div class="row"></div>');
         for( var j=0; j<32; j++){

             switch (map[i][j]) {
                 case 0:

                        $('.row').eq( i ).append('<div class="lava"></div>');
                        break;
                 case 1:

                     $('.row').eq( i ).append('<div class="rock"></div>');
                     break;
             }

         }

     }

    // event trigger pour alimenter le worker
    $("#viewport").on('keydown keyup mousemove', function (e) {
        // une demande de deplacement
        var moveRequest = {
            top: 0,
            left: 0,
            jump:0
        };

        if ([27, 37, 38, 39, 40].indexOf(e.which) != -1) {
            switch (e.which) { // ou e.keyCode
                 // LEFT
                case 37:
                    moveRequest.left = (e.type == "keydown") ? 1 : 0;
                    player.css("background-position-y","141px");
                    break;
                 // TOP
                case 38:
                    moveRequest.top = (e.type == "keydown") ? 1 : 0;
                    player.css("background-position-y","47px");
                    break;
                 // RIGHT
                case 39:
                    moveRequest.left = (e.type == "keydown") ? -1 : 0;
                    player.css("background-position-y","94px");
                    break;
                 // BOTTOM
                case 40:
                    moveRequest.top = (e.type == "keydown") ? -1 : 0;
                    player.css("background-position-y","188px");
                    break;
                  // SPACE
                case 13:
                    moveRequest.jump = (e.type == "keydown") ? 1 : 2;
                    break;

            }
        }
        /*if (e.type == "mousemove") {
            moveRequest.left = (e.offsetX > player.position().left) ? -1 : 1;
            moveRequest.top = (e.offsetY > player.position().top) ? -1 : 1;
        }*/
        worker.postMessage( moveRequest );
    });



    // event trigger sur les messages du worker
    worker.onmessage = function(event) {
        player.css('transform', 'translate(' + event.data.left + 'px,' + event.data.top + 'px)');
    };


});