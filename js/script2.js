$('#winnerSection').hide(); //Hide the Winner section until the end of the game
$('.pyro').hide(); //Hide the fireworks until the end of the game

/*
OBJECTS
*/

let gameSetup = {
  player1: {
    name: "player1",
    displayName: "Player 1",
    health: 100,
    position: {
      x:0,
      y:0,
    },
    weaponType: "Pencil",
    weaponDamage: 5,
    weaponImage:"../images/pencil.png",
  },

  player2: {
    name: "player2",
    displayName: "Player 2",
    health: 100,
    position: {
      x:0,
      y:0,
    },
    weaponType: "Pencil",
    weaponDamage: 5,
    weaponImage:"../images/pencil.png",
  },

  weapons: [
    {
      weaponType:"Sword",
      power: 20,
      img:"../images/sword.png",
      weapon_url: "url('../images/sword.png')",
    },
    {
      weaponType:"Ax",
      power: 15,
      img:"../images/axe.png",
      weapon_url: "url('../images/axe.png')",

    },
    {
      weaponType:"Archery",
      power: 30,
      img:"../images/archery.png",
      weapon_url: "url('../images/archery.png')",
    },
    {
      weaponType:"Spear",
      power: 25,
      img:"../images/spear.png",
      weapon_url: "url('../images/spear.png')",
    }
  ],

  //Creates the grid with the class name on grid items for styles
  gridCreator: function() {
    for(let x = 1; x < 11; x++){ //creates the rows
      for(let y = 1; y < 11; y++){ //creates the columns
        $('.grid-container').append('<div class="grid-item" data-x="'+x+'" data-y="'+y+'"></div>')
        //square '+x+', '+y+'   Add this between the div tags on the above line to see the coordinates again
      }
    }
  },

  randomNum: function() {
    return Math.floor(Math.random() * (11 - 1) + 1);
  },

  //Creates a barrier at a random square
  createBarrier: function() {
    let coordinates = {
      x: this.randomNum(),
      y: this.randomNum()
    };
    let hasBarrier = $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).hasClass("barrier");
    //If square with generated coordinates already has a class of barrier
    if (hasBarrier){
      return this.createBarrier();
    } else {
      //ELSE add a class of barrier to eventTarget square
        $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).addClass('barrier taken')
      }
  },

  placeBarriers: function() {
    for(let i = 0; i < 12; i++) {
      this.createBarrier();
    }
  },
  //Function that places weapons:
  createWeapon: function(weapon) {
    let coordinates = {
      x: this.randomNum(),
      y: this.randomNum()
    };
    let hasWeapon = $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).hasClass("weapon");
    let isTaken = $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).hasClass("taken");
    //If square with generated coordinates already has a class of barrier
    if (isTaken || hasWeapon){
      return this.createWeapon(weapon);
    } else {
      //ELSE add a class of 'weapon' and 'taken' to eventTarget square and also adds a random color.
        $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).addClass("weapon").addClass('taken').attr('data-weaponType', weapon.weaponType).attr('data-weaponDamage', weapon.power).attr('data-img', weapon.img).attr('data-weapon_url', weapon.weapon_url);
      }
  },

  //Is a loop that takes the createWeapon() function and loops it 4 times to place 4 weapons on the grid.
  placeWeapons: function() {
    for(let i = 0; i < gameSetup.weapons.length; i++) {
      this.createWeapon(gameSetup.weapons[i]);
    }
  },

  placePlayer: function(player) {
    let coordinates = {
      x: this.randomNum(),
      y: this.randomNum()
    };
    let isOccupied = $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).hasClass("barrier");
    let isAlsoOccupied = $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).hasClass("taken");
    if (isOccupied){
      console.log("Barrier in the way of placing player");
      return this.placePlayer(player);
    } else if (isAlsoOccupied) {
        return this.placePlayer(player);
    } else {
      //ELSE add a class of player1 or 2 to eventTarget square
        $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).addClass(player["name"]).addClass("taken");
        player["position"].x = coordinates.x;
        player["position"].y = coordinates.y;
      }
  }
} //End of gameSetup Object

let activePlayer = gameSetup.player1;
gameSetup.gridCreator();



// let player1 = {
//   name: "player1",
//   displayName: "Player 1",
//   health: 100,
//   position: {
//     x:0,
//     y:0,
//   },
//   weaponType: "Pencil",
//   weaponDamage: 5,
//   weaponImage:"../images/pencil.png",
// };

// let player2 = {
//   name: "player2",
//   displayName: "Player 2",
//   health: 100,
//   position: {
//     x:0,
//     y:0,
//   },
//   weaponType: "Pencil",
//   weaponDamage: 5,
//   weaponImage:"../images/pencil.png",
// };

// let activePlayer = player1;

// const weapons = [
//   {
//     weaponType:"Sword",
//     power: 20,
//     img:"../images/sword.png",
//     weapon_url: "url('C:/Users/nicol/Documents/GitHub/Project_6_game/images/sword.png')",
//   },
//   {
//     weaponType:"Ax",
//     power: 15,
//     img:"../images/axe.png",
//     weapon_url: "url('C:/Users/nicol/Documents/GitHub/Project_6_game/images/axe.png')",
//
//   },
//   {
//     weaponType:"Archery",
//     power: 30,
//     img:"../images/archery.png",
//     weapon_url: "url('C:/Users/nicol/Documents/GitHub/Project_6_game/images/archery.png')",
//   },
//   {
//     weaponType:"Spear",
//     power: 25,
//     img:"../images/spear.png",
//     weapon_url: "url('C:/Users/nicol/Documents/GitHub/Project_6_game/images/spear.png')",
//   }
// ];

/*
FUNCTIONS
*/
// //Creates the grid with the class name on grid items for styles
// const gridCreator = () => {
//   for(let x = 1; x < 11; x++){ //creates the rows
//     for(let y = 1; y < 11; y++){ //creates the columns
//       $('.grid-container').append('<div class="grid-item" data-x="'+x+'" data-y="'+y+'"></div>')
//       //square '+x+', '+y+'   Add this between the div tags on the above line to see the coordinates again
//     }
//   }
// }
// gridCreator();

// const randomNum = () => {
//   return Math.floor(Math.random() * (11 - 1) + 1);
// }


// //Creates a barrier at a random square
// const createBarrier = () => {
//   let coordinates = {
//     x: randomNum(),
//     y: randomNum()
//   };
//   let hasBarrier = $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).hasClass("barrier");
//   //If square with generated coordinates already has a class of barrier
//   if (hasBarrier){
//     return createBarrier();
//   } else {
//     //ELSE add a class of barrier to eventTarget square
//       $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).addClass('barrier taken')
//     }
// }
//Is a loop that takes the createBarrier() function and loops it 12 times to make 12 barriers on the grid
// const placeBarriers = () => {
//   for(let i = 0; i < 12; i++) {
//     createBarrier();
//   }
// }


// //Function that places weapons:
// const createWeapon= (weapon) => {
//   let coordinates = {
//     x: randomNum(),
//     y: randomNum()
//   };
//   let hasWeapon = $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).hasClass("weapon");
//   let isTaken = $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).hasClass("taken");
//   //If square with generated coordinates already has a class of barrier
//   if (isTaken || hasWeapon){
//     return createWeapon(weapon);
//   } else {
//     //ELSE add a class of 'weapon' and 'taken' to eventTarget square and also adds a random color.
//       $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).addClass("weapon").addClass('taken').attr('data-weaponType', weapon.weaponType).attr('data-weaponDamage', weapon.power).attr('data-img', weapon.img).attr('data-weapon_url', weapon.weapon_url);
//     }
// }

// //Is a loop that takes the createWeapon() function and loops it 4 times to place 4 weapons on the grid.
// const placeWeapons = () => {
//   for(let i = 0; i < weapons.length; i++) {
//     createWeapon(weapons[i]);
//   }
// }


// const placePlayer = (player) => {
//   let coordinates = {
//     x: randomNum(),
//     y: randomNum()
//   };
//   let isOccupied = $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).hasClass("barrier");
//   let isAlsoOccupied = $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).hasClass("taken");
//   if (isOccupied){
//     console.log("Barrier in the way of placing player");
//     return placePlayer(player);
//   } else if (isAlsoOccupied) {
//       return placePlayer(player);
//   } else {
//     //ELSE add a class of player1 or 2 to eventTarget square
//       $(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`).addClass(player["name"]).addClass("taken");
//       player["position"].x = coordinates.x;
//       player["position"].y = coordinates.y;
//     }
// }

//Player Movement
const createTempArray = (eventTarget) => {
let activePlayerPositionX = parseInt(activePlayer.position.x);
let activePlayerPositionY = parseInt(activePlayer.position.y);
  let squarePositionX = parseInt($(eventTarget).attr('data-x'));
  let squarePositionY = parseInt($(eventTarget).attr('data-y'));
  // console.log('activePlayerPositionX,activePlayerPositionY', typeof activePlayerPositionX,activePlayerPositionY);
  let tempArray = [];

  if( activePlayerPositionX === squarePositionX ) {
    if(activePlayerPositionY < squarePositionY){

      for (let i = activePlayerPositionY; i < squarePositionY; i++) {
        let position = {};
        position.x = activePlayerPositionX;
        position.y = i + 1; // +1 for moving right
        tempArray.push(position);
      }
        return tempArray
    } else if (activePlayerPositionY > squarePositionY) {
        for (let k = activePlayerPositionY; k > squarePositionY; k--) {
          let position = {};
          position.x = activePlayerPositionX;
          position.y = k - 1; // -1 for moving left
          tempArray.push(position);
        }
          return tempArray
    }
    //Moving across Y
  } else if (activePlayerPositionY === squarePositionY) {
      if(activePlayerPositionX < squarePositionX) {
        for (let l = activePlayerPositionX; l < squarePositionX; l++) {
          let position = {};
          position.x = l + 1; // +1 for moving down
          position.y = activePlayerPositionY;
          tempArray.push(position);
        }
          return tempArray
      } else if (activePlayerPositionX > squarePositionX) {
          for (let m = squarePositionX; m < activePlayerPositionX; m++) {
            let position = {};
            position.x = m + 1;
            position.y = activePlayerPositionY;
            tempArray.push(position);
          }
            return tempArray
      }
  };
}

const canPlayerMove = (eventTarget, tempArray) => {
  // console.log('tempArray', tempArray);
  let within3Spaces = isWithin3Spaces(eventTarget);
  let thereABarrier = isThereABarrier(eventTarget);
  let barrierBetween = barrierCheck(tempArray);

  if(within3Spaces && !thereABarrier && barrierBetween) {

    return true;
  } else {
    return false;
  }
}

let activePlayer_Highlight = () => {
  if(activePlayer == gameSetup.player1) {
    $('#infoBox_player1').css('box-shadow', '1px 1px 5px 5px rgba(8,128,46,1)');
    $('#turnText1').show();
    $('#infoBox_player2').css('box-shadow', 'none');
    $('#turnText2').hide();
  } else {
    $('#infoBox_player2').css('box-shadow', '1px 1px 5px 5px rgba(194,25,25,1)');
    $('#turnText2').show();
    $('#infoBox_player1').css('box-shadow', 'none');
    $('#turnText1').hide();
  }
}
activePlayer_Highlight();

const movePlayer = (eventTarget) => {
  let isItMoving = canPlayerMove(eventTarget, createTempArray(eventTarget));
  let canPlayerReallyMove = createTempArray(eventTarget);
  if(isItMoving && activePlayer == gameSetup.player1) {
    $('.player1').removeClass('player1');
    activePlayer.position.x = $(eventTarget).attr('data-x');
    activePlayer.position.y = $(eventTarget).attr('data-y');
    $(eventTarget).addClass('player1');
  } else if (isItMoving && activePlayer == gameSetup.player2) {
    $('.player2').removeClass('player2');
    activePlayer.position.x = $(eventTarget).attr('data-x');
    activePlayer.position.y = $(eventTarget).attr('data-y');
    $(eventTarget).addClass('player2');
  }
  weaponPickUp(eventTarget);
  canTheyFight();
  fightMode(eventTarget);
}

//Function: did they click within 3 spaces?
const isWithin3Spaces = (eventTarget) => {
  let activePlayerPositionX = activePlayer.position.x;
  let activePlayerPositionY = activePlayer.position.y;
  let squarePositionX = $(eventTarget).attr('data-x');
  let squarePositionY = $(eventTarget).attr('data-y');
  let positionXDiff = Math.abs(activePlayerPositionX - parseInt(squarePositionX));
  let positionYDiff = Math.abs(activePlayerPositionY - parseInt(squarePositionY));


  if (positionXDiff <= 3 && squarePositionY == activePlayerPositionY) {
    // console.log("It's within 3 spaces on the X scale!");
    return true;
  } else if (positionYDiff <= 3 && squarePositionX == activePlayerPositionX ) {
    // console.log("It's within 3 spaces on the Y scale!");
    return true;
  } else {
  // Else alert("You can only move 3 spaces at a time")
    $('#wrongMoveModal').modal('show');
    return false
  }
}
// //Function to check if the spot has a barriers
const isThereABarrier = (eventTarget) => {
  //If event.target has a class of barrier, alert("Can't move there! There's a barrier")
  let yesBarrier = $(eventTarget).hasClass("barrier");
  console.log("Is there a barrier?: ", yesBarrier);
  if (yesBarrier) {
    console.log("Can't move there! There's a barrier");
    // return false;
  }
  //Else move player
  else {
    // return true;
  }
}
const barrierCheck = (tempArray) => { //return boolean
  console.log('tempArray', tempArray);
  for(var m = 0; m < tempArray.length; m++) {
    let isSquareBlocked = $(`[data-x="${tempArray[m].x}"][data-y="${tempArray[m].y}"]`).hasClass('barrier')

    if( isSquareBlocked ) {
      $('#barrierInTheWay').modal('show');
      // alert('You can\'t jump over or onto a barrier.')
      return false
    }

  }
  return true
}

const switchActivePlayer = () => {
    if(activePlayer == gameSetup.player1) {
      activePlayer = gameSetup.player2;
      activePlayer_Highlight();
    } else if (activePlayer === gameSetup.player2) {
      activePlayer = gameSetup.player1;
      activePlayer_Highlight();
    }
}

const isWeaponPresent = (eventTarget) => {
  let yesWeapon = $(eventTarget).hasClass("weapon");
  console.log("Is there a Weapon present?:", yesWeapon);
  if (yesWeapon) {
    return true;
  } else {
    return false;
  }
}

$("#player1_health").text(gameSetup.player1.health);
$("#player2_health").text(gameSetup.player2.health);
$("#player1_weapon").text('Pencil');
$("#player2_weapon").text('Pencil');
$("#player1_damage").text('5');
$("#player2_damage").text('5');

const updatingPlayerStatsBox = (eventTarget) => {
  let newWeapon = $(eventTarget).attr('data-weaponType');
  let newDamage = $(eventTarget).attr('data-weaponDamage');
  //Entering data into the DOM
  if(activePlayer == gameSetup.player1){
    $("#player1_health").text(gameSetup.player1.health);
    $("#player1_weapon").text(newWeapon);
    $("#player1_damage").text(newDamage);
  } else {
    $("#player2_health").text(gameSetup.player2.health);
    $("#player2_weapon").text(newWeapon);
    $("#player2_damage").text(newDamage);
  }
}

let player1_weaponImage = $('#player1_weaponImage');
player1_weaponImage.addClass('pencil');
let player2_weaponImage = $('#player2_weaponImage');
player2_weaponImage.addClass('pencil');

const weaponImageBackground = (eventTarget, player) => {
  let player1_weaponImage = $('#player1_weaponImage');
  let player2_weaponImage = $('#player2_weaponImage');
  let newWeapon = $(eventTarget).attr('data-weaponType');
  let url = $(eventTarget).attr('data-weapon_url')
  if ($(eventTarget).hasClass('weapon') && $(eventTarget).hasClass('player1')){
      player1_weaponImage.css('background-image', $(eventTarget).attr('data-weapon_url')).css('backgroundRepeat', 'no-repeat').css('backgroundPosition', 'center');
      player1_weaponImage.removeClass('pencil');
  } else if ($(eventTarget).hasClass('weapon') && $(eventTarget).hasClass('player2')){
      player2_weaponImage.css('background-image', $(eventTarget).attr('data-weapon_url')).css('backgroundRepeat', 'no-repeat').css('backgroundPosition', 'center');
      player2_weaponImage.removeClass('pencil');
    }
}

const weaponPickUp = (eventTarget) => {
  if (activePlayer == gameSetup.player1)  {
    $('#player1').removeAttr('id');
  } else {
    $('#player2').removeAttr('id');
  }
  let weaponCheck = isWeaponPresent(eventTarget);
  let newWeapon = $(eventTarget).attr('data-weaponType');
  // let newWeapon_img = `url(${$(eventTarget).attr('data-weaponType')})`;
  // console.log(newWeapon_img);
  let newDamage = $(eventTarget).attr('data-weaponDamage');
  let player1_weapon = $("#player1_weapon").text(gameSetup.player1.weaponType);
  let player2_weapon = $("#player2_weapon").text(gameSetup.player2.weaponType);

  if (weaponCheck) {
    if(activePlayer == gameSetup.player1){
      $(eventTarget).attr('id', 'player1');
    } else {
      $(eventTarget).attr('id', 'player2');
    }
    let oldWeaponName = activePlayer.weaponType
    let oldWeaponDamage = activePlayer.weaponDamage;
    let oldWeaponImage = activePlayer.weaponImage;
    activePlayer.weaponType = newWeapon;
    activePlayer.weaponDamage = newDamage;
    weaponImageBackground(eventTarget, activePlayer.name);
    updatingPlayerStatsBox(eventTarget);
    $(eventTarget).attr('data-weaponType', oldWeaponName);
    $(eventTarget).attr('data-weaponDamage', oldWeaponDamage);
    $(eventTarget).attr('data-img', oldWeaponImage);
  }
}

//Modal Information
const infoModalBattle = () => {
  newWeapon = activePlayer.weaponType;
  newDamage = activePlayer.weaponDamage;
  if(activePlayer == gameSetup.player1){
    gameSetup.player2.health = gameSetup.player2.health - newDamage;
    $('.modalOpponentNameDisplay').text(gameSetup.player2.displayName);
    $('.modalWeaponName').text(newWeapon);
    $('.modalOpponentHealthDisplay').text(gameSetup.player2.health);
    $('.modalDamageDisplay').text(newDamage);
    $('.attackerModalImage').attr('id', 'player1');
    $('.defenderModalImage').attr('id', 'player2');
  } else if (activePlayer == gameSetup.player2){
    gameSetup.player1.health = gameSetup.player1.health - newDamage;
    $('.modalOpponentNameDisplay').text(gameSetup.player1.displayName);
    $('.modalWeaponName').text(newWeapon);
    $('.modalOpponentHealthDisplay').text(gameSetup.player1.health);
    $('.modalDamageDisplay').text(newDamage);
    $('.attackerModalImage').attr('id', 'player2');
    $('.defenderModalImage').attr('id', 'player1');
  }
}

const winnerSectionInfo = () => {
  if(gameSetup.player1.health <= 0) {
    $('.winnerModalName').text('Player 2');
    $('.winnerSection_PlayerImage').attr('id', 'player2_Winner');
  } else if (gameSetu.player2.health <= 0) {
    $('.winnerModalName').text('Player 1')
    $('.winnerSection_PlayerImage').attr('id', 'player1_Winner');
  }
}

// Fight logic
const canTheyFight = () => {
  let coordXPlayer1 = gameSetup.player1.position.x;
  let coordYPlayer1 = gameSetup.player1.position.y;
  let coordXPlayer2 = gameSetup.player2.position.x;
  let coordYPlayer2 = gameSetup.player2.position.y;

  if ( Math.abs(coordXPlayer1 - coordXPlayer2) == 1 && Math.abs(coordYPlayer1 - coordYPlayer2) == 0)  {
    console.log("Fight activated, player 1 and 2 are next to each other on the X axis!");
    return true;
  } else if(Math.abs(coordYPlayer1 - coordYPlayer2) == 1 && Math.abs(coordXPlayer1 - coordXPlayer2) == 0) {
    console.log("Fight activated, player 1 and 2 are next to each other on the Y axis!");
    return true;
  } else {
    return false;
  }
}

const fightMode = (eventTarget) => {
  if (canTheyFight()) {
    console.log(canTheyFight())
    $('#myModal').modal('show');
    infoModalBattle();
    updatingPlayerStatsBox(eventTarget);
  }
  $("#player1_health").text(gameSetup.player1.health);
  $("#player2_health").text(gameSetup.player2.health);
}

const winner = () => {
  if(gameSetup.player1.health <= 0 || gameSetup.player2.health <= 0){
    $('#myModal').hide();
    console.log("Winner!");
    $('.grid').hide();
    winnerSectionInfo();
    $('#winnerSection').show(); //Modal about Winner
    $('.pyro').show(); //Modal about Winner
    $('body').css('overflow', 'hidden');
  }
}

//Firework Animation Attempt


//Game Set Up
gameSetup.placeBarriers();
gameSetup.placeWeapons();
gameSetup.placePlayer(gameSetup.player1);
gameSetup.placePlayer(gameSetup.player2);

/*EVENT LISTENERS*/
$(document).ready(function (){

  $(document).on('click', '.grid-item', () => {
    let eventTarget = event.target;
    movePlayer(eventTarget);
    switchActivePlayer();
    winner();
  });

  $('#refresh').click(function() {
    location.reload();
});

});


//Map out the code logic (flow chart)
//Refactor to Object Oriented JS (do no classes first)

//Debug player movement and alerts

//Function to recognize a player next to you
  //IF player's coordinates are +1 up,down,right or left from other player
    //Return TRUE
  //ELSE Return FALSE

//Function to activate the fighting
  //If fight check returns TRUE
    //Activate fighting mode
      //player that moved is the aggressor and starts fight, they decide whether they attack player2 or defend form player2

//End Function
//IF above function == true
  //Activeplayer deals damage to player 2's HP depending on what weapon they have


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
//     eventTarget.x = x;
//     eventTarget.y = y;
//     eventTarget.username = username;
//     eventTarget.health = health;
//     eventTarget.isTurn = isTurn;
//   }
// };
// //How to incorporate isTurn below as a parameter in the new player objects.
// const player1 = new Player ($('.player1').attr('data-x'), $('.player1').attr('data-y'), playerUsername, playerHealth);
// const player2 = new Player ($('.player2').attr('data-x'), $('.player2').attr('data-y'), "NPC", playerHealth);
//
// class Weapon {
//   constructor(x, y, type, damagePossible, isPickedUp){
//     eventTarget.x = x;
//     eventTarget.y = y;
//     eventTarget.type = type;
//     eventTarget.damagePossible = damagePossible;
//     eventTarget.isPickedUp = isPickedUp;
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
