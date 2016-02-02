$(document).ready(function(){


//GLOBAL VARIABLES
var playerTurn = "playerOne";
var getWinner = null;
var gameBoard = [];			
var $playerOneInput = $("#p1-input");
var $playerTwoInput = $("#p2-input");
var $player1Name;
var $player2Name;
var $currentPlayer;


//BEGIN THE GAME
// + fill up board 2d array
// + reset board to default slot class
// + change message
// + transition divs
var startGame = function () {

	//set the gameBoard 2D array up
	setBoard();

	//reset board to default slot classes
	clearBoard();

	//set message div
	setMessage("Go Nuts 4 Donuts!");

	// console.log("game has been set up");

	$("#click").show();
	$("#wrap").hide();
}


//CHANGES MESSAGES
var setMessage = function (msg) {
	$("#message").html(msg);
} 


//PLAYER NAME INPUT DIV "pops up"
$("#click").click(function(){

	//make div "pop up" and then hide
    $(".dialogbox").toggle(500);

    //hide $("#click") itself
    $(this).hide();

    //ready button
    $ready = $("#ready");

    //ON CLICK
    // + remove "pop up" divs
    // + set new message
    // + fire randomizePlayer
    $ready.click(function(){

    	//assign players Names 
	    $player1Name = $playerOneInput.val();
	    $player2Name = $playerTwoInput.val();

    	$(".dialogbox").fadeOut(400);
    	$("#click").fadeOut(400);
    	// $("#wrap").fadeIn(1000);

    	setMessage("Let's see who gets to go first!");

    	//set off Randomize player function
    	randomizePlayer();
	});

	//clears input field
	$('input:text').focus( function(){
        $(this).val('');
    });

}); //ends #click function


//RANDOM PLAYER
// + change message to show playerTurn
// + transition DIVS
var randomizePlayer = function () {

	//if < 0.5, playerOne goes first
	if (Math.random() < 0.5) {
		playerTurn = "playerOne";
		$currentPlayer = $player1Name;

		//change message
		setTimeout(function() {
			setMessage($currentPlayer + " gets to go first!");
		}, 1500)

		// console.log("it works??? it's " + playerTurn);

	//else if 0.5 < x < 1, playerTwo goes first
	} else {
		playerTurn = "playerTwo";
		$currentPlayer = $player2Name;
		// console.log("it works?? it's " + playerTurn);

		//change message
		setTimeout(function() {
			setMessage($currentPlayer + " gets to go first!");
		}, 1500)
		}

	//board shows up after 5 seconds
    $("#wrap").fadeIn(1500);

    //returns either "playerOne" or "playerTwo"
	return playerTurn;
}



//PLAYER TURN SEQUENCE
// + change message
// + finds which column/row to play
// assign the div a class, playerOne, playerTwo
$('.col').click(function(){

	// //display whose turn it is
	// setMessage("It's " + playerTurn + "'s turn!");

	//get ID of column selected
	var $columnId =  $(this).attr("id");

	//get children divs of col# 
	var $selectedCol = $("#" + $columnId).children();

	// console.log($test[0]);

	//for all the slots in that column check is there is a class
	for (var i = 5; i >= 0; i--) {

		// if ($($selectedCol[i]).hasClass("playerOne")) {
		// 	console.log("it worked");
		// } else {
		// 	console.log("nope doesn't have that class");
		// }

		//assign players Names 
	    $player1Name = $playerOneInput.val();
	    $player2Name = $playerTwoInput.val();
    
	    //if there IS a winner
		if (getWinner != null) {

			setMessage("CONGRATULATIONS! " + getWinner + ", YOU WIN!");

			//ask to play again
			// playAgain();

		//else if there is no winner
		} else if (playerTurn ==  "playerOne") {

				//if there are no player class assigned (if square is empty), add player class
				if (!($($selectedCol[i]).hasClass("playerOne")) && !($($selectedCol[i]).hasClass("playerTwo"))) {

					//set current player for win condition
					$currentPlayer = $player1Name;

					//add player class/spinny CSS class
					$($selectedCol[i]).addClass(playerTurn).addClass("fun");

					console.log("successfully added class");

					//change turns
					playerTurn = "playerTwo";

					console.log(playerTurn);
					//display whose turn it is
		
						setMessage("It's " + $player2Name + "'s turn!");
			

					checkWinner();

					//break the loop to only add one instance
					break;

				// console.log($selectedCol[i]);
				} 
		} else if (playerTurn == "playerTwo") {

				//if there are no player class assigned (if square is empty), add player class
				if (!($($selectedCol[i]).hasClass("playerOne")) && !($($selectedCol[i]).hasClass("playerTwo"))) {

					$currentPlayer = $player2Name;

					//add player class/spinny CSS class
					$($selectedCol[i]).addClass(playerTurn).addClass("fun");

					console.log("successfully added class in 2nd loop. PlayerTurn is " + playerTurn);

					playerTurn = "playerOne";

					//display whose turn it is
					setMessage("It's " + $player1Name + "'s turn!");
				
					//check for winner
					checkWinner();

					//break the loop to only add one instance
					break;
				}
		}
	
	}// ends for loop
}); //ends .click()


//FILL UP THE GAME BOARD ARRAY 
// where gameBoard[i] = # of column,
// gameboard[i][j] = all corresponding divs/rows in that column
var setBoard = function () {

	//starting on first column, go through all 7 "columns"
	for (i = 1; i <= 7; i++){

		//each individual column by ID
		var $arrayCol = $("#col" + i);

		// gameBoard.push($arrayCol); <--doesn't work

		// console.log($arrayCol);

		//create 7 empty arrays in gameBoard (7 = #col)
		var $arraySetUp = [];

		//push 7 empty arrays into gameBoard
		gameBoard.push($arraySetUp);

		//for every 6 divs in a "row"
		for (j = 0; j < 6; j++) {

			//all corresponding divs in the column
			var $gameDiv = $arrayCol.children()[j];

			//set all slots to default class
			$($gameDiv).attr("class", "slot");
			// console.log($gameDiv);

			//fill up 7 empty arrays with the divs
			$arraySetUp.push($gameDiv);
		}
	}
}//end setBoard();

// RESET BOARD
// + getWinner reset to null
// + every div class reset (removes all extra classes from game)
var clearBoard = function () {

	getWinner = null;

	for (col = 0; col < gameBoard.length; col++){

		for (row = 0; row < gameBoard[col].length; row++) {

			//set all slots to default class
			// $($gameDiv).attr("class", "slot");
			// console.log($gameDiv);

			$(gameBoard[col][row]).attr("class", "slot");
		}
	} 
	//set winner back to null
	return getWinner;
}//end clearBoard();

//CHECK WINNER
// + sets getWinner
// + sets message
// + playAgain pops up
var checkWinner = function () {

	//if any of the 4 win conditions are met
	if (verticalCheck() ||
		horizontalCheck() ||
		diagonalPosCheck() ||
		diagonalNegCheck() ){

		getWinner = $currentPlayer;

		setMessage("HOORAY! " + getWinner + ", YOU WIN!!");
		// console.log("winner detected");

		//playAgain div POP UP
		setTimeout(function() {$("#playagain").fadeIn(500)}, 1500);

	} if (checkDraw()) {
		setMessage("The game is a DRAW!");
		setTimeout(function() {$("#playagain").fadeIn(500)}, 800);
	}
}//ends checkWinner();


//Vincent's code for adding +1 to counter to check for tie
//once all DIVs are filled
var counter = 0;
var checkDraw = function () {
	var draw = false;
	counter += 1;
	if (counter >= 42){
		draw = true;
	}
	return draw;
}

//VERTICAL CHECK
// + checks 4 vertical divs for same className
// + returns winner (true or false)
// + add winner class
var verticalCheck = function () {

	var winner = false;

	//for all columns, and rows [1,2,3]
	for (var col = 0; col < gameBoard.length; col++) {
		for (var row = 0; row < (gameBoard[col].length - 3); row++) {

			var $col = $(gameBoard[col]);

			  if (($($col[row]).hasClass("playerOne")) &&
					($($col[row+1]).hasClass("playerOne")) &&
					($($col[row+2]).hasClass("playerOne")) &&
					($($col[row+3]).hasClass("playerOne"))) {
					// console.log("holy shit VERTICAL, it does have class playerOne")


					$($col[row]).addClass("winner");
					$($col[row+1]).addClass("winner");
					$($col[row+2]).addClass("winner");
					$($col[row+3]).addClass("winner");
					

					winner = true;
			} if (($(gameBoard[col][row]).hasClass("playerTwo")) &&
					($(gameBoard[col][row+1]).hasClass("playerTwo")) &&
					($(gameBoard[col][row+2]).hasClass("playerTwo")) &&
					($(gameBoard[col][row+3]).hasClass("playerTwo"))) {
					// console.log("PLAYER TWO VERTICAL it worked, it does have class playerTwo")

					$($col[row]).addClass("winner");
					$($col[row+1]).addClass("winner");
					$($col[row+2]).addClass("winner");
					$($col[row+3]).addClass("winner");
					

					winner = true
			}
		}
	} return winner;
}//ends verticalCheck()


//HORIZONTAL CHECK
// + checks 4 horizontal divs for same className
// + returns winner (true or false)
var horizontalCheck = function () {

	var winner = false;

	//for columns [4,5,6,7] and all rows
	for (var col = 0; col < (gameBoard.length - 3); col++) {
		for (var row = 0; row < gameBoard[col].length; row++) {
			  if (($(gameBoard[col][row]).hasClass("playerOne")) &&
					($(gameBoard[col+1][row]).hasClass("playerOne")) &&
					($(gameBoard[col+2][row]).hasClass("playerOne")) &&
					($(gameBoard[col+3][row]).hasClass("playerOne"))) {
					// console.log("holy shit HORIZONTAL, it does have class playerOne");

					$(gameBoard[col][row]).addClass("winner");
					$(gameBoard[col+1][row]).addClass("winner");
					$(gameBoard[col+2][row]).addClass("winner");
					$(gameBoard[col+3][row]).addClass("winner");
				
					//return return as true
					winner = true;
			} if (($(gameBoard[col][row]).hasClass("playerTwo")) &&
					($(gameBoard[col+1][row]).hasClass("playerTwo")) &&
					($(gameBoard[col+2][row]).hasClass("playerTwo")) &&
					($(gameBoard[col+3][row]).hasClass("playerTwo"))) {
					// console.log("PLAYER TWO HORIZONTAL it worked, it does have class playerTwo");

					$(gameBoard[col][row]).addClass("winner");
					$(gameBoard[col+1][row]).addClass("winner");
					$(gameBoard[col+2][row]).addClass("winner");
					$(gameBoard[col+3][row]).addClass("winner");

					//return winner as true
					winner = true;
			}
		}
	} return winner;
}//ends horizontalCheck()


//DIAGONAL CHECK (+)
// + checks "slope = +1" for same className
// + returns winner (true or false)
var diagonalPosCheck = function () {

	var winner = false; 

	//for columns [4,5,6,7] and rows [1,2,3]
	for (var col = 3; col < gameBoard.length; col++) {
		for (var row = 0; row < (gameBoard[col].length - 3); row++) {
			  if (($(gameBoard[col][row]).hasClass("playerOne")) &&
					($(gameBoard[col-1][row+1]).hasClass("playerOne")) &&
					($(gameBoard[col-2][row+2]).hasClass("playerOne")) &&
					($(gameBoard[col-3][row+3]).hasClass("playerOne"))) {
					// console.log("holy shit DIAGONAL POSITIVE, it does have class playerOne");

					$(gameBoard[col][row]).addClass("winner");
					$(gameBoard[col-1][row+1]).addClass("winner");
					$(gameBoard[col-2][row+2]).addClass("winner");
					$(gameBoard[col-3][row+3]).addClass("winner");

					//return winner as true
					winner = true;
			} if (($(gameBoard[col][row]).hasClass("playerTwo")) &&
					($(gameBoard[col-1][row+1]).hasClass("playerTwo")) &&
					($(gameBoard[col-2][row+2]).hasClass("playerTwo")) &&
					($(gameBoard[col-3][row+3]).hasClass("playerTwo"))) {
					// console.log("PLAYER TWO DIAGONAL POSITIVE it worked, it does have class playerTwo");

					$(gameBoard[col][row]).addClass("winner");
					$(gameBoard[col-1][row+1]).addClass("winner");
					$(gameBoard[col-2][row+2]).addClass("winner");
					$(gameBoard[col-3][row+3]).addClass("winner");

					//return winner as true
					winner = true;
			}
		}
	} return winner;
}// ends diagonalPosCheck()


//DIAGONAL CHECK NEGATIVE
// + checks "slope = -1" for same className
// + returns winner (true or false)
var diagonalNegCheck = function () {

	winner = false;

	//for columns [1,2,3,4] and rows [1,2,3]
 	for (var col = 0; col < (gameBoard.length - 3); col++) {
		for (var row = 0; row < (gameBoard[col].length - 3); row++) {
			  if (($(gameBoard[col][row]).hasClass("playerOne")) &&
					($(gameBoard[col+1][row+1]).hasClass("playerOne")) &&
					($(gameBoard[col+2][row+2]).hasClass("playerOne")) &&
					($(gameBoard[col+3][row+3]).hasClass("playerOne"))) {
					// console.log("holy shit DIAGONAL-, it does have class playerOne");

					$(gameBoard[col][row]).addClass("winner");
					$(gameBoard[col+1][row+1]).addClass("winner");
					$(gameBoard[col+2][row+2]).addClass("winner");
					$(gameBoard[col+3][row+3]).addClass("winner");

					//return winner as true
					winner = true;

			} if (($(gameBoard[col][row]).hasClass("playerTwo")) &&
					($(gameBoard[col+1][row+1]).hasClass("playerTwo")) &&
					($(gameBoard[col+2][row+2]).hasClass("playerTwo")) &&
					($(gameBoard[col+3][row+3]).hasClass("playerTwo"))) {
					// console.log("PLAYER TWO DIAGONAL- it worked, it does have class playerTwo");

					$(gameBoard[col][row]).addClass("winner");
					$(gameBoard[col+1][row+1]).addClass("winner");
					$(gameBoard[col+2][row+2]).addClass("winner");
					$(gameBoard[col+3][row+3]).addClass("winner");

					//return winner as true
					winner = true;
			}
		}
	} return winner;
}//ends diagonalNegCheck()


//CLICK EVENTS
// +Replay lets you continue with the same names
// +NewGame clears out divs
// +clear counter
// +random player turn
$("#replay").click(function(){
	clearBoard();
	$("#playagain").fadeOut(500);
	counter = 0;
	randomizePlayer();
});

//newgame sets the game from the start
// + clear counter
$("#newgame").click(function(){
	$("#playagain").fadeOut(500);
	$("#wrap").hide();
	setTimeout(function() {startGame()}, 1000);
	$("#click").fadeIn(500);
	counter = 0;
});

//initiate Game
startGame();


}); //ends $(document).ready()


//=====================================
// JAVASCRIPT GRAVEYARD 
// (CODE THAT NEVER WORKED)
//=====================================

    // //to make it hide from toggle, move the button inside the div
    // //no longer accessible after game starts
    // // $(".dialogbox").append($("#click"));

    // $(".dialogbox").append($ready);
    // // //have message change (to avoid more click after this)
    // // setMessage("It's " + $player1Name + "'s Turn!")

//======================
//FAILED READY BUTTON CODE
  
// $("#ready").click(function() {
// 	// if (($player1Name !== "") && ($player2Name !== "")) {
		
// 			console.log("hey it works");
// 			$(".dialogbox").fadeOut(1000);
// 	// 	});
// 	// } else {
// 	// 	setMessage("Enter your names!");
// 	// }
// 	   //button disappears/no more toggling
//     // $(this).fadeOut(1000);
// });
  
// $ready.click(function() {

// 	$player1Name = $playerOneInput.val();
// 	setMessage("It's " + $player1Name + "'s Turn to Play!");

// });

//========================
//FAILED CODE :( :( 
//FILL UP THE BOARD ARRAY
//column is all children divs of the board game
// var $column = $(".col");

// for (i = 0; i < 7; i++) {

// 	console.log($column[i][0]);

// 	gameBoard.push($column[i][0]);


// 	// for (j = 0; j < 6; j++) {

// 	// 	gameBoard.push($column[i][j]);

// 	// 	console.log($column[i][j]);
// 	// }

// }


//=======================
// CHECKING ARRAY STUFF
//=======================

//access gameBoard divs:
// $(gameBoard[0][1]).hasClass("playerOne") //true or false

//check if specific div in gameBoard has a class
 // ($(gameBoard[i][j]).hasClass("playerOne");

 // to access the class of the div
 // $(gameBoard[0][1]).attr("class")


//CHECK IF THE DIV ON THE BOARD HAS CLASS "playerOne" or "playerTwo"

// for every column, check its row
// for (var i = 0; i < gameBoard.length; i++){

// 	//print out gameBoard Columns with all ROW elements
// 	// console.log ($(gameBoard[i]));

// 	//$divColumn gives me all the DIVS of that column i
// 	var $divColumn = $(gameBoard[i]);

// 	// console.log("number " + i + "'s class name is: " + $($divColumn).attr("class"));

// 	//To get access to the inner DIVS, run another loop
// 	for (var j = 0; j < $divColumn.length; j++) {

// 		// console.log("i work");

// 		// var className = $('.myclass').attr('class');

		
// 		//.attr('class') to list ALL the class names of ALL DIVS
// 		// var $test = $($divColumn[j]).attr('class');

// 		//gives you the DIV inside the $divColumn
// 		var $test = $($divColumn[j]);


// 		//HORIZONTAL GAME LOGIC
// 		if ($($test).hasClass("playerOne")) {

// 			// && $($test[i][j+1]).hasClass("playerOne") && $($test[i][j+2]).hasClass("playerOne") && $($test[i][j+3]).hasClass("playerOne")) {
				
// 			console.log("IT WORKED WAHATT");
// 		}			else {
// 			console.log("Almost worked.., didn't have the class");
// 		}	// winner = $player1Name;


// 		// console.log(i + "j is: " + j + $test);

		
// 	}
// }

// //TAKE THREE VARIATION FOR VERTICAL
// //var col = column
// for (var col = 0; col < gameBoard.length; col++) {

// 	//all columns in gameBoard
// 	var $col = $(gameBoard[col]);

// 	for(var row = 0; row < $col; row++) {

// console.log("poop")
// 	}
// }


//VERTICAL CHECK
//CHECK IF THE INNER DIVS HAVE CLASS PLAYERONE
// for (var col = 0; col < gameBoard.length; col++) {
// 	for (var row = 0; row < gameBoard[col].length; row++) {
// 		  if (($(gameBoard[col][row]).hasClass("playerOne")) &&
// 				($(gameBoard[col][row+1]).hasClass("playerOne")) &&
// 				($(gameBoard[col][row+2]).hasClass("playerOne")) &&
// 				($(gameBoard[col][row+3]).hasClass("playerOne"))) {
// 				console.log("holy shit it worked, it does have class playerOne")
// 		} if (($(gameBoard[col][row]).hasClass("playerTwo")) &&
// 				($(gameBoard[col][row+1]).hasClass("playerTwo")) &&
// 				($(gameBoard[col][row+2]).hasClass("playerTwo")) &&
// 				($(gameBoard[col][row+3]).hasClass("playerTwo"))) {
// 				console.log("PLAYER TWO HOLY SHIT it worked, it does have class playerTwo")
// 		}
// 	}
// }

// var playAgain = function () {

// 	var tryAgain = prompt("Do you want to play again?"); 

// 	if (tryAgain ) {
// 		//scan all columns
// 		for (col = 0; col < gameBoard.length; col++) {
// 			//for every DIV in that column
// 			for (row = 0; row < gameBoard[col].length; row++) {

// 				$(gameBoard[col][row]).attr("class", "slot");

// 			}
// 		} getWinner == null;
// 	} 

//CHECK TIE
// + checks whether all DIVS have class (.playerOne || .playerTwo)
// + return (true or false)
// var checkTie = function () {

// 	var result = false;

// 	//scan all columns
// 	for (col = 0; col < gameBoard.length; col++) {
// 		//for every DIV in that column
// 		for (row = 0; row < gameBoard[col].length; row++) {
	 
// 	 		//if they have class playerOne or playerTwo
// 	 		if (($(gameBoard[col][row]).hasClass("playerOne")) ||
// 				($(gameBoard[col][row]).hasClass("playerTwo"))) {
// 	 			// console.log("they all have a class");
// 	 			result = true;
// 	 		} else {
// 	 			// console.log("all scanned, not all have classes");
// 	 			result = false;
// 	 		}	
// 		}
// 	//return true or false
// 	} return result;
// } //ends checkTie()
