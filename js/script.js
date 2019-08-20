// const player1Username = prompt("Pick a username");
// const player2Username = prompt("Pick a username");

/*
OBJECTS
*/

let player1 = {
  name: "player1",
  health: 100,
  position: {
    x:0,
    y:0,
  },
  weaponType: "",
};

let player2 = {
  name: "player2",
  health: 100,
  position: {
    x: 0,
    y: 0,
  },
  weaponType: "",
};

let activePlayer = player1;

const weapons = [
  {
    name:"sword",
    power: "20",
    img:"",
  },
  {
    name:"ax",
    power: "15",
    img:"",
  },
  {
    name:"bow and arrow",
    power: "30",
    img:"",
  },
  {
    name:"spear",
    power: "25",
    img:"",
  }
];

/*
FUNCTIONS
*/
//Creates the grid with the class name on grid items for styles
function gridCreator() {
  for(let x = 1; x < 11; x++){ //creates the rows
    for(let y = 1; y < 11; y++){ //creates the columns
      $('.grid-container').append('<div class="grid-item" data-x="'+x+'" data-y="'+y+'">square '+x+', '+y+'</div>')
    }
  }
}
gridCreator();

function randomNum(){
  return Math.floor(Math.random() * (11 - 1) + 1);
}

//Generates a random color.
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
//Creates a barrier at a random square
function createBarrier() {
  let coordinates = {
    x: randomNum(),
    y: randomNum()
  };
  let hasBarrier = $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).hasClass("barrier");
  //If square with generated coordinates already has a class of barrier
  if (hasBarrier){
    return createBarrier();
  } else {
    //ELSE add a class of barrier to $this square
      $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).addClass('barrier taken')
    }
}
//Is a loop that takes the createBarrier() function and loops it 12 times to make 12 barriers on the grid
function placeBarriers(){
  for(let i = 0; i < 12; i++) {
    createBarrier();
  }
}
placeBarriers();

function placePlayer(player){
  let coordinates = {
    x: randomNum(),
    y: randomNum()
  };
  let isOccupied = $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).hasClass("barrier");
  if (isOccupied){
    console.log("Barrier in the way of placing player");
    return placePlayer(player);
  } else {
    //ELSE add a class of player1 or 2 to $this square
      $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).addClass(player["name"]).addClass("taken");
      player["position"].x = coordinates.x;
      player["position"].y = coordinates.y;
    }
}
placePlayer(player1);
placePlayer(player2);

//Function that places weapons:
function createWeapon(weapon) {
  let coordinates = {
    x: randomNum(),
    y: randomNum()
  };
  let hasWeapon = $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).hasClass("weapon");
  let isTaken = $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).hasClass("taken");
  //If square with generated coordinates already has a class of barrier
  if (isTaken || hasWeapon){
    return createWeapon(weapon);
  } else {
    //ELSE add a class of 'weapon' and 'taken' to $this square and also adds a random color.
      $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).addClass("weapon").addClass('taken').css('backgroundColor', getRandomColor());
    }
}

//Is a loop that takes the createWeapon() function and loops it 4 times to place 4 weapons on the grid.
function placeWeapon(){
  for(let i = 0; i < weapons.length; i++) {
    createWeapon(weapons[i].name);
  }
}
placeWeapon();

//Function to check if the player can move
function canPlayerMove($this) {
  let within3Spaces = isWithin3Spaces($this);
  let thereABarrier = isThereABarrier($this);
  console.log("Is it within 3 spaces?: ", within3Spaces, "Is there a barrier?: ", thereABarrier);
//Function to move player
if (thereABarrier === false && within3Spaces === true){
      $('.player1').removeClass('player1');
      activePlayer.position.x = $($this).attr('data-x');
      activePlayer.position.y = $($this).attr('data-y');
      $($this).addClass('player1');
      console.log("X: " + activePlayer.position.x + ", " + "Y: " + activePlayer.position.y);
    }
}

//Function: did they click within 3 spaces?
function isWithin3Spaces($this) {
  let activePlayerPositionX = activePlayer.position.x;
  let activePlayerPositionY = activePlayer.position.y;
  let squarePositionX = $($this).attr('data-x');
  let squarePositionY = $($this).attr('data-y');
  let positionXDiff = Math.abs(activePlayerPositionX - parseInt(squarePositionX));
  let positionYDiff = Math.abs(activePlayerPositionY - parseInt(squarePositionY));

  // If player clicked a spot with x < x+3 or y < y+3 (TRUE/FALSE), move player along the x or y axis to that grid item.
  if (positionXDiff <= 3 && squarePositionY == activePlayerPositionY) {
    console.log("It's within 3 spaces on the X scale!");
    return true;
  } else if (positionYDiff <= 3 && squarePositionX == activePlayerPositionX ) {
    console.log("It's within 3 spaces on the Y scale!");
    return true;
  } else {
  // Else alert("You can only move 3 spaces at a time")
    alert("You can't move more than 3 spaces away and you can't move diagonally");
  }
}
//Function to check if the spot has a barriers
function isThereABarrier($this) {
  //If event.target has a class of barrier, alert("Can't move there! There's a barrier")
  let yesBarrier = $($this).hasClass("barrier");
  console.log("Is there a barrier?: ", yesBarrier);
  if (yesBarrier) {
    console.log("if statement");
    alert("Can't move there! There's a barrier");
    return true;
  }
  //Else move player
  else {
    return false;
  }
}

/*
EVENT LISTENERS
*/
$(function() {
  $('.grid-container').on('click', '.grid-item', function() {
    let tempArray = [];
    let activePlayerPositionX = activePlayer.position.x;
    let activePlayerPositionY = activePlayer.position.y;
    let squarePositionX = parseInt($(event.target).attr('data-x'));
    let squarePositionY = parseInt($(event.target).attr('data-y'));
    let position = {
      x: 0,
      y: 0,
    };
    //If player's x position = square's x position then console.log("moving across y")
    if( activePlayerPositionX === squarePositionX ) {
      console.log("moving across y");
      if(activePlayerPositionY < squarePositionY){
        console.log("It's going into the moving right if statement!");
        for (let i = activePlayerPositionY; i < squarePositionY; i++) {
          console.log("It'a going into the for loop!");
          position.x = activePlayerPositionX;
          position.y = i + 1; // +1 for moving right
          tempArray.push(position);
          console.log(position);
        }
        console.log("tempArray: ", tempArray);
      } else if (activePlayerPositionY > squarePositionY) {
          console.log("It's going into the moving left if statement!");
          for (let i = squarePositionY; i < activePlayerPositionY; i++) {
            console.log("It'a going into the for loop!");
            position.x = activePlayerPositionX;
            position.y = i - 1; // -1 for moving left
            tempArray.push(position);
          }
          console.log("tempArray: ", tempArray);
      }
    //If player's y position = square's y position then console.log("moving across x")
    } else if (activePlayerPositionY === squarePositionY) {
        console.log("moving across x");
        if(activePlayerPositionX < squarePositionX) {
          console.log("It's going into the moving down if statement!");
          for (let i = activePlayerPositionX; i < squarePositionX; i++) {
            console.log("It'a going into the for loop!");
            position.x = i + 1; // +1 for moving down
            position.y = activePlayerPositionY;
            tempArray.push(position);
          }
          console.log("tempArray: ", tempArray);
        } else if (activePlayerPositionX > squarePositionX) {
            console.log("It's going into the moving up if statement!");
            for (let i = squarePositionX; i < activePlayerPositionX; i++) {
              console.log("It'a going into the for loop!");
              position.x = i - 1; // -1 for moving up
              position.y = activePlayerPositionY;
              tempArray.push(position);
            }
            console.log("tempArray: ", tempArray);
        }
    };
    // console.log("tempArray: ", tempArray);
    let $this = event.target;
    canPlayerMove($this);
  });
});


/*GAME MECHANICS OF USER
WHEN it is the user's turn
  IF user presses keypress up,
    move 1 tile space up,
  IF user presses keypress down,
    move 1 tile space down,
  IF user presses keypress right,
    move 1 tile space right,
  IF user presses keypress left,
    move 1 tile space left,
    ELSE,
      start timer for response.
*/

/*PICKING UP WEAPONS
WHEN user moves over a weapon
  IF user has a weapon already,
    replace with the new weapon,
    drop old weapon into the tile.
*/

/*BATTLING
  WHEN user hits 0 HP,
    display pop-up message saying the game is over.
  IF NPC has 0 HP,
    display pop-up message saying congratulations.
*/


// class Player {
//   constructor(x, y, username, health, isTurn){
//     $this.x = x;
//     $this.y = y;
//     $this.username = username;
//     $this.health = health;
//     $this.isTurn = isTurn;
//   }
// };
// //How to incorporate isTurn below as a parameter in the new player objects.
// const player1 = new Player ($('.player1').attr('data-x'), $('.player1').attr('data-y'), playerUsername, playerHealth);
// const player2 = new Player ($('.player2').attr('data-x'), $('.player2').attr('data-y'), "NPC", playerHealth);
//
// class Weapon {
//   constructor(x, y, type, damagePossible, isPickedUp){
//     $this.x = x;
//     $this.y = y;
//     $this.type = type;
//     $this.damagePossible = damagePossible;
//     $this.isPickedUp = isPickedUp;
//   }
// };
// How to incorporate x/y and the isPickedUp below as parameters in the new objects.
// const weapon1 = new Weapon (x, y, "sword", 30, );
// const weapon2 = new Weapon (x, y, "ax", 20, );
// const weapon3 = new Weapon (x, y, "bow and arrow", 15, );
// const weapon4 = new Weapon (x, y, "spear", 10, );


//NOTES
// $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).addClass('barrier taken');//ES6 string literal
// $(["data-x=" + coordinates.x]["data-y=" + coordinates.y]).addClass('barrier taken');
