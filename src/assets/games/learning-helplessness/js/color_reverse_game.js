// color reverse game variables, info of each level in the game
var lhGameLevelStrings;		// stores strings of a level
var lhGameLengths;
var lhGameHeights;

var lhGameLevelCounter;   // get from user level 

// functions called from typescript
var lhGameGetColorReverseData;
var lhGameStart;

// for checking if the user fails to solve a previously solved level
var previously_solved_level = lhGameLevelCounter;

var Grid = function(length, height, grid_string){
	console.log(" grid function");
	this.length = length,
	this.height = height,
	this.grid_array = populateGrid(length, height, grid_string)
}

// remove these variables based on database integration
var Grid;
var grid_string;
var length;
var height;
var success;

// for storing data when proceed to next level
var storeLHScoreColorReverse;

function initializeVar(){
	grid_string = lhGameLevelStrings[lhGameLevelCounter];
	length = lhGameLengths[lhGameLevelCounter];
	height = lhGameHeights[lhGameLevelCounter];
	$("#color-reverse-game-level").text("Level : "+lhGameLevelCounter);
}
var grid;
var no_of_moves;
var start_time;
var different_game_timeout;
var different_game_wait = 15000;		// 15 seconds
var second_time = false;				// to keep track of the unsolvable set of games to show to the user
var first_puzzle = true;				// if it is the first color puzzle, then we can't show the explanation if the user gives up, so reducing the level
var unsolvable_game_counter = 1;		// 1 - show the 15 puzzle; 2 - show the frog game; 3 - show the box up game
var success_wait_time = 1000;

$(document).ready(function(){

	lhGameStart = function(ev){
		$("#color-reverse-game").removeClass("d-none");
		initializeVar();
		init();
	}

	$(document).on("click", ".color-reverse-game-square", function(){
		no_of_moves++;
		squareClicked($(this), grid.grid_array);
		detectSuccess(grid.grid_array);
	});

	$(document).on("click", "#btn-color-reverse-game-reset", function(){
		// updateAttemptData(false);
		success = false;
		grid.grid_array = populateGrid(length, height, grid_string);
		start_time = Date.now();
		no_of_moves = 0;
		showBlocks(grid.grid_array);
	});

	$(document).on("click", "#btn-color-reverse-game-give-up", function(){
		console.log("reaching here");
		if(first_puzzle && lhGameLevelCounter!=0){
			lhGameLevelCounter--;
			previously_solved_level = lhGameLevelCounter-1;
			init();
		}else if(lhGameLevelCounter!=0 && previously_solved_level==lhGameLevelCounter){		// showing explanation if giving up on same level
			$("#color-reverse-game").addClass("d-none");
			$("#explanation-row").removeClass("d-none");
		}else if(unsolvable_game_counter == 3){
			$("#color-reverse-game").addClass("d-none");
			boxUpGameInit();
			$("#box-up-game-row").removeClass("d-none");
			$("#box-up-game-row").focus();
			lhGameLevelCounter = previously_solved_level;
		}else if(unsolvable_game_counter == 2){
			resetFrogGame();
			frogGameInit();
			$("#color-reverse-game").addClass("d-none");
			$("#frog-game-row").removeClass("d-none");
			$("#frog-game-row").focus();
			lhGameLevelCounter = previously_solved_level;
		}else if(unsolvable_game_counter == 1){
			$("#color-reverse-game").addClass("d-none");
			$("#grid-puzzle-row").removeClass("d-none");
			lhGameLevelCounter = previously_solved_level;

			setTimeout(function(){
				$("#btn-give-up-fifteen").removeClass("d-none");

				highlight_give_up_button_fifteen = setInterval(function(){
					if(text_red){
						$("#btn-give-up-fifteen").addClass("give-up-text-black");
						text_red = false;
					}else{
						$("#btn-give-up-fifteen").removeClass("give-up-text-black");
						text_red = true;
					}
				}, 3000);
			}, 125);
		}
	});
});

function populateGrid(length, height, grid_string){
	console.log(length, height, grid_string);
	var arr = [];
	var counter = 0;

	for(var i=0; i<height; i++){
		arr[i] = [];
		for(var j=0; j<length; j++){
			arr[i][j] = parseInt(grid_string.charAt(counter++));
		}
	}

	return arr;
}

function showBlocks(grid_array){
	$("#color-reverse-game-space").html("");
	console.log("in showblocks");
	for(var i=0; i<grid_array.length; i++){
		$("#color-reverse-game-space").append("<div style=\"display: inline-flex;\" id=\"row-"+(i+1)+"\"></div><br>");
		for(var j=0; j<grid_array[0].length; j++){
			if(grid_array[i][j]==1){
				$("#row-"+(i+1)).append("<div class=\"color-reverse-game-square\" id=\""+i+"-"+j+"\"></div>");
			}else if(grid_array[i][j]==2){
				$("#row-"+(i+1)).append("<div class=\"color-reverse-game-square circle\" id=\""+i+"-"+j+"\"></div>");
			}else{
				$("#row-"+(i+1)).append("<div class=\"color-reverse-game-square-blank\" id=\""+i+"-"+j+"\"></div>");
			}
		}
		
	}
	setColorReverseGameWidthAndHeight();
}

function squareClicked($square, grid_array){
	var id = $square.attr("id");
	var rowNumber = parseInt(id.split("-")[0]);
	var columnNumber = parseInt(id.split("-")[1]);

	// current element
	if($square.hasClass("circle")){
		$square.removeClass("circle");
		grid_array[rowNumber][columnNumber] = 1;
	}else{
		$square.addClass("circle");
		grid_array[rowNumber][columnNumber] = 2;
	}

	// top
	var top_element = $("#"+(rowNumber-1)+"-"+columnNumber);
	if(top_element.length && top_element.hasClass("color-reverse-game-square")){ // if element exists and is not blank
		console.log("top element");
		if(top_element.hasClass("circle")){
			top_element.removeClass("circle");
			grid_array[rowNumber-1][columnNumber] = 1;
		}else{
			top_element.addClass("circle");
			grid_array[rowNumber-1][columnNumber] = 2;
		}
	}
	
	// bottom
	var bottom_element = $("#"+(rowNumber+1)+"-"+columnNumber);
	if(bottom_element.length && bottom_element.hasClass("color-reverse-game-square")){ // if element exists and is not blank
		console.log("bottom element");
		if(bottom_element.hasClass("circle")){
			bottom_element.removeClass("circle");
			grid_array[rowNumber+1][columnNumber] = 1;
		}else{
			bottom_element.addClass("circle");
			grid_array[rowNumber+1][columnNumber] = 2;
		}
	}

	// left
	var left_element = $("#"+rowNumber+"-"+(columnNumber-1));
	if(left_element.length && left_element.hasClass("color-reverse-game-square")){ // if element exists and is not blank
		if(left_element.hasClass("circle")){
			left_element.removeClass("circle");
			grid_array[rowNumber][columnNumber-1] = 1;
		}else{
			left_element.addClass("circle");
			grid_array[rowNumber][columnNumber-1] = 2;
		}
	}

	//right
	var right_element = $("#"+rowNumber+"-"+(columnNumber+1));
	if(right_element.length && right_element.hasClass("color-reverse-game-square")){ // if element exists and is not blank
		if(right_element.hasClass("circle")){
			right_element.removeClass("circle");
			grid_array[rowNumber][columnNumber+1] = 1;
		}else{
			right_element.addClass("circle");
			grid_array[rowNumber][columnNumber+1] = 2;
		}
	}
}

function detectSuccess(grid_array){
	success = true;

	for(var i=0; i<grid_array.length; i++){
		for(var j=0; j<grid_array[0].length; j++){
			if(grid_array[i][j]==1)success=false;
		}
	}

	if(success){
		$("#color-reverse-game-success-message").removeClass("d-none");
		var ping = document.getElementById("ping");
		// ping.play();
		setTimeout(function(){
			// updateAttemptData(true);
			storeLHScoreColorReverse = new CustomEvent("CallLevelChangeStoreFun");
			window.dispatchEvent(storeLHScoreColorReverse);
			
			previously_solved_level = lhGameLevelCounter;
			lhGameLevelCounter++;
			clearTimeout(different_game_timeout);
			$("#color-reverse-game-success-message").addClass("d-none");
			$("#color-reverse-game-level").text("Level : "+lhGameLevelCounter);
			first_puzzle = false;					// setting first puzzle to false if the user has solved one
			init();
		}, success_wait_time);
	}
	return success;
}

function init(){
	grid_string = lhGameLevelStrings[lhGameLevelCounter];
	length = lhGameLengths[lhGameLevelCounter];
	height = lhGameHeights[lhGameLevelCounter];
	grid = new Grid(length, height, grid_string);
	start_time = Date.now();
	no_of_moves = 0;
	success = false;
	showBlocks(grid.grid_array);

	different_game_timeout = setTimeout(function(){
		$("#btn-color-reverse-game-give-up").removeClass("d-none");
	}, different_game_wait);

	setColorReverseGameWidthAndHeight();
}

function setColorReverseGameWidthAndHeight() {
	// setting asset sizes based on screen size
	if(window.devicePixelRatio == 2) {
		// color reverse game
		$(`.color-reverse-game-square,
			.color-reverse-game-square-common,
			.color-reverse-game-square-blank`).css({
				'width': '150',
				'height': '150'
			});
	}else if(window.devicePixelRatio == 1) {
		// color reverse game
		$(`.color-reverse-game-square,
			.color-reverse-game-square-common,
			.color-reverse-game-square-blank`).css({
				'width': '100',
				'height': '100'
			});
	}else {
		// !!IMPORTANT!!
		// write code for generic device pixel ratio
		$(`.color-reverse-game-square,
			.color-reverse-game-square-common,
			.color-reverse-game-square-blank`).css({
				'width': '100',
				'height': '100'
			});
	}
}

lhGameGetColorReverseData = function(){
	console.log("level before sending", lhGameLevelCounter);
	var time_spent= Math.floor((Date.now()-start_time)/1000);
	return [lhGameLevelCounter, time_spent, no_of_moves, success]
}

// function updateAttemptData(success){
// 	var url = $("input[name='color-reverse-game-data-update-url']").val();
// 	console.log(url);
// 	$.ajax({
// 		type: "POST",
// 		url: url,
// 		data:{
// 			level: lhGameLevelCounter,
// 			time_spent: Math.floor((Date.now()-start_time)/1000),		// in seconds
// 			no_of_moves: no_of_moves,
// 			success: success
// 		},
// 		beforeSend: function(xhr){
// 			xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
// 		},
// 		success: function(data){
// 			console.log("success");
// 			no_of_moves = 0;
// 		},
// 		error: function(xhr, errmsg, err){
// 			console.log("error");
// 		}
// 	});
// }