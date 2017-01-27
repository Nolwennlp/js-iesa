//* Created by Nolwenn on 19/01/2017.
// L'interface Worker  représente une tâche de fond qui peut facilement être créée et peut envoyer des messages en retour à son créateur. //

class Entity {

    constructor(className, posX, posY) {
        this.class = className;
        this.position = [posX, posY];
        this.id = "Entity" + Math.round(Math.random() * 65000);
    }

    set position(position) {
        this.x = position[0];
        this.y = position[1];
    }

    get position() {
        return ([this.x, this.y]);
    }

    set bearing(bearing) {
        this.orientation = bearing;
    }
    get bearing() {
        return (this.orientation);
    }

}

//  Création du player

let player = new Entity('player', 0, 0);
let bot1 = new Entity('ennemy', 0, 0);
let bot2 = new Entity('ennemy', 0, 0);

// Demande de positionnement / déplacement
let moveRequest  = {
    top: 0,
    left:0
};

let currentWorld = {
    map : [],
    player : player,
    listEnnemies : [bot1, bot2 ]
};

for( var i=0; i<10; i++){
    currentWorld.map.push([]);
    for ( var n=0; n<10; n++){
        currentWorld.map[i].push(Math.round(Math.random()) );
    }

}

// ENEMIES

let simulMoveRequest = {
    top: 0,
    left: 0
};



// le tick

 onmessage = function(event) {
    moveRequest = event.data;
};

let gameTick = function () {
    console.log(currentWorld, moveRequest);
    let nextX = currentWorld.player.position[0] - moveRequest.left;
    let nextY = currentWorld.player.position[1] - moveRequest.top;

    if (moveRequest.left > 0){
        currentWorld.player.bearing = "left";
    }
    if (moveRequest.left < 0){
        currentWorld.player.bearing = "right";
    }
    if (moveRequest.top < 0){
        currentWorld.player.bearing = "bottom";
    }
    if (moveRequest.top > 0){
        currentWorld.player.bearing = "top";
    }


    currentWorld.player.position = [nextX, nextY];

    // ENNEMY

    for( let i=0; i<currentWorld.listEnnemies.length; i++){

        simulMoveRequest.left = Math.floor(Math.random() *3) -1;
        simulMoveRequest.top = Math.floor(Math.random() *3) -1;

        let nextX = currentWorld.listEnnemies[i].position[0] - simulMoveRequest.left;
        let nextY = currentWorld.listEnnemies[i].position[1] - simulMoveRequest.top;

        currentWorld.listEnnemies[i].position = [nextX, nextY];
    }

    postMessage(currentWorld);

    moveRequest  = {
        top: 0,
        left:0
    };



};


self.setInterval(gameTick, 100); // le setInterval du worker car on ne peut pas faire Window.setInterval