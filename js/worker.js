//* Created by Nolwenn on 19/01/2017.
// L'interface Worker  représente une tâche de fond qui peut facilement être créée et peut envoyer des messages en retour à son créateur. //


//  Position de base du player //

var player  = {
    top: 0,
    left:0
};

// Demande de positionnement / déplacement //
var moveRequest  = {
    top: 0,
    left:0
};


// le tick

var onMessage = function(event) {
    console.log(event.data);
    moveRequest = event.data
};



var gameTick = function () {
    var nextY = player.top - (moveRequest.top * 50);
    var nextX = player.left - (moveRequest.left * 50);
    player.top = nextY;
    player.left = nextX;
    postMessage(player);

    moveRequest  = {
        top: 0,
        left:0
    };
};


self.setInterval(gameTick, 150); // le setInterval du worker car on ne peut pas faire Window.setInterval