
/*
STep 1 create grid
step 2 place rocks/walls 12-9 squares, unable to be on the tile
step 3 randomly place 4 weapons in the grid
step 4 place players randomly, 2 human players
USE COLORS FIRST TO REPRESENT PLAYERS/WEAPONS

get familiar with:
CSS grid - CSS TRicks
double for loop structure for generating the 100 tiles
  each outer loop creates each column
  iterate inside each column to create each row

Use JS, CSS grid and flexbox
grid is numbered, add 1-3 to the player's position.
*/

//Creates the grid with the class name on grid items for styles
function gridCreator() {
  for(let d = 1; d < 11; d++){ //creates the rows
    for(let e = 1; e < 11; e++){ //creates the columns
      $('.grid-container').append('<div class="grid-item" data-x="'+d+'" data-y="'+e+'">square '+d+', '+e+'</div>')
    }
  }
}
gridCreator();

function randomNum(){
  return Math.floor(Math.random() * (11 - 1) + 1);
}

//Creates a barrier at a random square
function createBarrier() {
  let coordinates = {
    x: randomNum(),
    y: randomNum()
  };
  let hasBarrier = $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).hasClass("barrier");
  console.log(hasBarrier);
  //If square with generated coordinates already has a class of barrier
  if (hasBarrier){
    return createBarrier();
  } else {
    //ELSE add a class of barrier to this square
      $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).addClass('barrier taken')
    }
}

 // $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).addClass('barrier taken');//ES6 string literal
 // $(["data-x=" + coordinates.x]["data-y=" + coordinates.y]).addClass('barrier taken');

//Is a loop that takes the createBarrier() function and loops it 12 times to make 12 barriers on the grid
function placeBarriers(){
  for(let i = 0; i < 12; i++) {
    createBarrier();
  }
}
placeBarriers();

function placePlayer(player){
  console.log(player);
  let coordinates = {
    x: randomNum(),
    y: randomNum()
  };
  let isOccupied = $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).hasClass("barrier");
  console.log(isOccupied);
  if (isOccupied){
    return placePlayer();
  } else {
    //ELSE add a class of barrier to this square
      $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).addClass(player).addClass(taken);
    }
}
placePlayer("player1");
placePlayer("player2");


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
