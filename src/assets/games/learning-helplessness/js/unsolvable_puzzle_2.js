// frog jump game variables (unsolvable game 2)
var lh_frog_levels;
var lh_frog_lengths;
var lh_frog_heights;
var lh_frog_face_directions;

var lhGameGetTask2Data;

var success_wait_time = 1000;

var frog_level_counter= 0;		// always start from 0 as this is an impossible game

var frogGameInit;
var resetFrogGame;

var FrogGrid = function(length, height, grid_string, frog_direction){
	this.length = length,
	this.height = height,
	this.grid_array = populateFrogGrid(length, height, grid_string),
	this.frog_x = frogX(this.grid_array),
	this.frog_y = frogY(this.grid_array),
	this.frog_direction = frog_direction 	//1=left;2=up;3=right;4=down
}

var frog_grid_string;	//0=blank, 1=food, 3=frog
var frog_length;
var frog_height;
var frog_face_direction;
var frog_grid;
var frog_direction_class;
var prev_frog_direction_class;
var wrong_move;
var frog_time_taken;
var frog_no_of_resets;
var frog_no_of_moves;
var first;
var frogGridSwipe;

$(document).ready(function(){
	
	$(document).on("click", "#btn-frog-game-reset", function(ev){
		frog_grid = new FrogGrid(frog_length, frog_height, frog_grid_string, frog_face_direction);
		frog_direction_class = getFrogDirection(frog_grid.frog_direction);
		prev_frog_direction_class = prev_frog_direction_class;
		showFrogGrid(frog_grid.grid_array);
		frog_no_of_resets++;
	});

	$(document).on("click", "#btn-frog-game-give-up", function(ev){
		ev.stopImmediatePropagation();
		if(frog_level_counter<(lh_frog_levels.length-1)) {
			frog_level_counter++;
			frogGameInit();
		}

		frog_time_taken = Date.now();
		frog_no_of_resets = 0;
		frog_no_of_moves = 0;

		if(!first){
			// show play next pop up
			lhg_show_instructions = false;
			playNextGamePopup();
			
			$("#frog-game-row").addClass("d-none");
			$("#color-reverse-game").removeClass("d-none");
			unsolvable_game_counter=3;		 
			resetFrogGame();
			frogGameInit();
			console.log("call init 2", success); 
			colorReverseInit();
		}else{
			first = false;
		}
	});

	var frogGridSwipeArea = document.getElementById("frog-game-space");
	if(frogGridSwipe){
		frogGridSwipe = new Hammer.Manager(frogGridSwipeArea, {
			recognizers: [
				[Hammer.Swipe,{ direction: Hammer.DIRECTION_ALL }],
			]
		});
		frogGridSwipe.on("swipe", function(ev) {
			frogGridMoveRouter(ev.direction);
		});
	}

	$(document).on('keydown','#frog-game-row', function(e) {
		e.preventDefault();
		
		if(unsolvable_game_counter == 2) {
			frogGridMoveRouter(e.which);
		}
	});
	
	
});



function frogGridMoveRouter(value) {
	if((frog_grid.frog_direction==3 && (value==37 || value==2)) 
		|| (frog_grid.frog_direction==4 && (value==38 || value==8)) 
		|| (frog_grid.frog_direction==1 && (value==39 || value==4)) 
		|| (frog_grid.frog_direction==2 && (value==40 || value==16))){
	}else{
		wrong_move = false;
		switch(value){
			// left
			case 37: 	// key
			case 2: 	// swipe
				frog_grid.frog_y = frogMoveLeft(frog_grid.frog_y, frog_grid.frog_x, frog_grid.grid_array);
				break;
			// up
			case 38: 	// key
			case 8: 	// swipe
				frog_grid.frog_x = frogMoveUp(frog_grid.frog_y, frog_grid.frog_x, frog_grid.grid_array);
				break;
			// right
			case 39: 	// key
			case 4: 	// swipe
				frog_grid.frog_y = frogMoveRight(frog_grid.frog_y, frog_grid.frog_x, frog_grid.grid_array);
				break;
			//down
			case 40: 	// key
			case 16: 	// swipe
				frog_grid.frog_x = frogMoveDown(frog_grid.frog_y, frog_grid.frog_x, frog_grid.grid_array);
				break;
			default:
				break;
		}

		if(!wrong_move){
			frog_no_of_moves++;
			prev_frog_direction_class = frog_direction_class;
			frog_direction_class = getFrogDirection(frog_grid.frog_direction);			
			updateFrogLocation();
			if(frogDetectSuccess()){
				frog_level_counter++;
				frogGameInit();
			}
		}
	}
}

function populateFrogGrid(length, height, grid_string){
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

function showFrogGrid(grid_array){
	$("#frog-game-space").html("");
	// var temp=[]
	// for (var i=0;i<grid_array.length;i++)
	// {
	// 	for(var j=0;j<grid_array[0].length;j++)
	// 	{
	// 		temp[j][i]=grid_array[i][j];
	// 	}
	// }

	for(var i=0; i<grid_array.length; i++){
		$("#frog-game-space").append("<div style='display: inline-flex;' id='frog-game-row-"+(i+1)+"'></div><br>");
		for(var j=0; j<grid_array[0].length; j++){
			if(grid_array[i][j]==1){
				$("#frog-game-row-"+(i+1)).append("<div class='frog-game-flower' id='frog-game-id-"+i+"-"+j+"'></div>");
			}else if(grid_array[i][j]==3){
				$("#frog-game-row-"+(i+1)).append("<div class='"+frog_direction_class+"' id='frog-game-id-"+i+"-"+j+"'></div>");
			}else{
				$("#frog-game-row-"+(i+1)).append("<div class='frog-game-square-blank' id='frog-game-id-"+i+"-"+j+"'></div>");
			}
		}
	}

	setFrogGridGameWidthAndHeight();
}

function setFrogGridGameWidthAndHeight() {
	// setting asset sizes based on screen size
	if(window.devicePixelRatio == 2) {

		// frog game (unsolvable puzzle 2)
		$(`.frog-game-flower, 
			.frog-game-flower-dry, 
			.frog-game-square-blank,
			.frog-right,
			.frog-left, 
			.frog-up, 
			.frog-down`).css({
				'width': '150',
				'height': '150'
			});

	}else if(window.devicePixelRatio == 1) {
		
		// frog game (unsolvable puzzle 2)
		$(`.frog-game-flower, 
			.frog-game-flower-dry, 
			.frog-game-square-blank,
			.frog-right,
			.frog-left, 
			.frog-up, 
			.frog-down`).css({
				'width': '37',
				'height': '37'
			});
	}else {
		// !!IMPORTANT!!
		// write code for generic device pixel ratio
		$(`.frog-game-flower, 
			.frog-game-flower-dry, 
			.frog-game-square-blank,
			.frog-right,
			.frog-left, 
			.frog-up, 
			.frog-down`).css({
				'width': '37',
				'height': '37'
			});
	}
}

frogGameInit = function(){
	frog_grid_string = lh_frog_levels[frog_level_counter];
	frog_length = lh_frog_lengths[frog_level_counter];
	frog_height = lh_frog_heights[[frog_level_counter]];
	frog_face_direction = lh_frog_face_directions[frog_level_counter];
	frog_grid = new FrogGrid(frog_length, frog_height, frog_grid_string, frog_face_direction);

	setTimeout(function(){
		frog_direction_class = getFrogDirection(frog_grid.frog_direction);
		prev_frog_direction_class = prev_frog_direction_class;
		showFrogGrid(frog_grid.grid_array);

		$("#frog-game-success-message").addClass("d-none");
		if(frog_level_counter==2){
			$("#btn-frog-game-give-up").removeClass("d-none");
			frog_time_taken = Date.now();
			frog_no_of_resets = 0;
			frog_no_of_moves = 0;
		}
	}, success_wait_time);
}

resetFrogGame = function() {
	wrong_move = false;
	frog_level_counter = 0;
	frog_time_taken = 0;
	frog_no_of_resets = 0;
	frog_no_of_moves = 0;
	first = true;
}

function frogMoveLeft(x, y, grid_array){
	for(var i=x; i>=0; i--){
		if(grid_array[y][i]==1){
			frog_grid.grid_array[y][x] = 0;
			x = i;
			frog_grid.grid_array[y][x] = 3;
			frog_grid.frog_direction = 1;
			return x;
		}
	}

	wrong_move = true;
	return x;
}

function frogMoveRight(x, y, grid_array){
	for(var i=x; i<grid_array[0].length; i++){
		if(grid_array[y][i]==1){
			frog_grid.grid_array[y][x] = 0;
			x=i;
			frog_grid.grid_array[y][x] = 3;
			frog_grid.frog_direction = 3;
			return x;
		}
	}

	wrong_move = true;
	return x;
}

function frogMoveUp(x, y, grid_array){
	for(var j=y; j>=0; j--){
		if(grid_array[j][x]==1){
			frog_grid.grid_array[y][x] = 0;
			y=j;
			frog_grid.grid_array[y][x] = 3;
			frog_grid.frog_direction = 2;
			return y;
		}
	}

	wrong_move = true;
	return y;
}

function frogMoveDown(x, y, grid_array){
	for(var j=y; j<grid_array.length; j++){
		if(grid_array[j][x]==1){
			frog_grid.grid_array[y][x] = 0;
			y=j;
			frog_grid.grid_array[y][x] = 3;
			frog_grid.frog_direction = 4;
			return y;
		}
	}

	wrong_move = true;
	return y;
}

function frogX(grid_array){
	for(var i=0; i<grid_array.length; i++){
		for(var j=0; j<grid_array[0].length; j++){
			if(grid_array[i][j]==3)return i;
		}
	}
}

function frogY(grid_array){
	for(var i=0; i<grid_array.length; i++){
		for(var j=0; j<grid_array[0].length; j++){
			if(grid_array[i][j]==3)return j;
		}
	}
}

function updateFrogLocation(){
	var frog_id = $("."+prev_frog_direction_class).attr("id");
	$("#"+frog_id).removeClass(prev_frog_direction_class);
	$("#"+frog_id).addClass("frog-game-flower-dry");

	$("#frog-game-id-"+frog_grid.frog_x+"-"+frog_grid.frog_y).removeClass("frog-game-flower");
	$("#frog-game-id-"+frog_grid.frog_x+"-"+frog_grid.frog_y).addClass(frog_direction_class);
}

function getFrogDirection(frog_direction){
	if(frog_direction==1){
		return "frog-left";
	}else if(frog_direction==2){
		return "frog-up";
	}else if(frog_direction==3){
		return "frog-right";
	}else if(frog_direction==4){
		return "frog-down";
	}
}

// only for the first two levels
function frogDetectSuccess(){
	var sum = 0;

	for(var i=0; i<frog_grid.grid_array.length; i++){
		for(var j=0; j<frog_grid.grid_array[0].length; j++){
			sum+=frog_grid.grid_array[i][j];
		}
	}

	if(sum==3){		// success
		$("#frog-game-success-message").removeClass("d-none");
		var ping = document.getElementById("ping");
		ping.play();
		return true;
	}else{
		return false;
	}
}

lhGameGetTask2Data = function(){
	var no_of_resets= frog_no_of_resets;
	var time_to_give_up= Math.floor((Date.now()-frog_time_taken)/1000);		// in seconds
	var no_of_moves = frog_no_of_moves;

	return [time_to_give_up, no_of_moves, no_of_resets, first]
}
