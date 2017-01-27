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

var currentWorld = {
    map : [],
    player : player
};

for( var i=0; i<10; i++){
    currentWorld.map.push([]);
    for ( var n=0; n<10; n++){
        currentWorld.map[i].push(Math.round(Math.random()) );
    }

};


// le tick

var onmessage = function(event) {
    moveRequest = event.data;
};



var gameTick = function () {
    var nextY = currentWorld.player.top - (moveRequest.top * 50);
    var nextX = currentWorld.player.left - (moveRequest.left * 50);
    currentWorld.player.top = nextY;
    currentWorld.player.left = nextX;
    postMessage(currentWorld);

    moveRequest  = {
        top: 0,
        left:0
    };
};


self.setInterval(gameTick, 200); // le setInterval du worker car on ne peut pas faire Window.setInterval