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
    //ELSE add a class of barrier to this square
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
    return placePlayer();
  } else {
    //ELSE add a class of barrier to this square
      $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).addClass(player).addClass("taken");
    }
}
placePlayer("player1");
placePlayer("player2");

//Function that places weapons:
function createWeapon() {
  let coordinates = {
    x: randomNum(),
    y: randomNum()
  };
  let hasWeapon = $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).hasClass("weapon");
  let isTaken = $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).hasClass("taken");
  console.log(isTaken, hasWeapon);
  //If square with generated coordinates already has a class of barrier
  if (isTaken || hasWeapon){
    return createWeapon();
  } else {
    //ELSE add a class of 'barrier' and 'taken' to this square and also adds a random color.
      $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).addClass('weapon taken').css('backgroundColor', getRandomColor());
    }
}
createWeapon();

//Is a loop that takes the createWeapon() function and loops it 4 times to place 4 weapons on the grid.
function placeWeapon(){
  for(let i = 0; i < 3; i++) {
    createWeapon();
  }
}
placeWeapon();


const playerUsername = prompt("Pick a username");
const playerHealth = 100;


/*
OBJECTS
*/
class Player {
  constructor(x, y, username, health, isTurn){
    this.x = x;
    this.y = y;
    this.username = username;
    this.health = health;
    this.isTurn = isTurn;
  }
};
//How to incorporate isTurn below as a parameter in the new player objects.
const player1 = new Player ($('.player1').attr('data-x'), $('.player1').attr('data-y'), playerUsername, playerHealth);
const player2 = new Player ($('.player2').attr('data-x'), $('.player2').attr('data-y'), "NPC", playerHealth);

class Weapon {
  constructor(x, y, type, damagePossible, isPickedUp){
    this.x = x;
    this.y = y;
    this.type = type;
    this.damagePossible = damagePossible;
    this.isPickedUp = isPickedUp;
  }
};
//How to incorporate x/y and the isPickedUp below as parameters in the new objects.
// const weapon1 = new Weapon (x, y, "sword", 30, );
// const weapon2 = new Weapon (x, y, "ax", 20, );
// const weapon3 = new Weapon (x, y, "bow and arrow", 15, );
// const weapon4 = new Weapon (x, y, "spear", 10, );


/*
EVENT LISTENERS
*/

//Will not listen to the x < x+3 portion
$('.grid-container').on('click', '.grid-item', function(event) {
    let x = $(event.target).attr("data-x");
    console.log(x);
    let y = $(event.target).attr("data-y");
    if( x < x + 3 && $(event.target).attr('class') !== 'taken') {
      $('.player1').removeClass('player1', 'taken');
      $(event.target).addClass('player1', 'taken');
    } else {
      alert("You can't move that many spaces!");
    }
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

//NOTES
// $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).addClass('barrier taken');//ES6 string literal
// $(["data-x=" + coordinates.x]["data-y=" + coordinates.y]).addClass('barrier taken');
