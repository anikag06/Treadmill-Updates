// box up puzzle variables (unsolvable game 3)
var box_up_ball = "../../../../../../assets/games/learning-helplessness/assets/box.up.puzzle/ball.png";
var box_up_inner = "../../../../../../assets/games/learning-helplessness/assets/box.up.puzzle/inner.png";
var box_up_outer = "../../../../../../assets/games/learning-helplessness//assets/box.up.puzzle/outer.png";
var box_up_small_obstacle = "../../../../../../assets/games/learning-helplessness/assets/box.up.puzzle/small.png";
var box_up_big_obstacle = "../../../../../../assets/games/learning-helplessness/assets/box.up.puzzle/big.png";

var lh_inner_position_initials;
var lh_outer_position_initials;
var lh_small_obstacle_initials;
var lh_big_obstacle_initials;
var lh_ball_position_initials;
var lh_box_up_grid_dimensions;

var lhGameGetTask3Data;

var success_wait_time = 1000;

var ball_element;
var inner_element;
var outer_element;
var small_obstacle = [];
var big_obstacle = [];
var box_up_grid_array;
var game_arcs;				// stores the arc element objects related to the game in decreasing order of size
var is_ball_in_container;
var box_up_level_counter;	// stores the current level to be shown to the user
var ball_position_initial;
var box_up_time_taken;
var box_up_no_of_resets;
var box_up_no_of_moves;
var box_up_first;
var block_arrows = false;	// to stop the user from playing once the level is completed
var boxUpSwipe;

var BoxUpGrid = function(length, height, ball_position_initial, inner_position_initial, outer_position_initial, small_obstacle_initial, big_obstacle_initial) {
	this.length = length;
	this.height = height;
	this.grid_array = populateBoxUpGrid(length, height, ball_position_initial, inner_position_initial, outer_position_initial, small_obstacle_initial, big_obstacle_initial);
}

$(document).ready(function() {
	resetBoxUpGame();

	var boxUpSwipeArea = document.getElementById("box-up-game-space");
	if(boxUpSwipeArea){
		boxUpSwipe = new Hammer.Manager(boxUpSwipeArea, {
			recognizers: [
				[Hammer.Swipe,{ direction: Hammer.DIRECTION_ALL }],
			]
		});
	
		boxUpSwipe.on("swipe", function(ev) {
			boxUpMoveRouter(ev.direction);
		});
	}
	$(document).on('keydown','#box-up-game-row', function(e) {
		if (unsolvable_game_counter == 3 && !block_arrows) {
			e.preventDefault();
			boxUpMoveRouter(e.which);		
		} else {
		}
	});
	
});

function boxUpMoveRouter(value) {
	var valid_move = false;

	switch(value){
		// left
		case 37: 	// key
		case 2:		// swipe
			valid_move = true;
			boxUpMoveLeft();
			break;
		// up
		case 38:	// key
		case 8:		// swipe
			valid_move = true;
			boxUpMoveUp();
			break;
		// right
		case 39: 	// key
		case 4:		// swipe
			valid_move = true;
			boxUpMoveRight();
			break;
		// down
		case 40: 	// key
		case 16:	//swipe
			valid_move = true;
			boxUpMoveDown();
			break;
		default:
			break;
	}

	if(valid_move) {
		box_up_no_of_moves++;
		is_ball_in_container = isBallInContainer();
	}
}

function setBoxUpGameWidthAndHeight() {
	// setting asset sizes based on screen size
	if(window.devicePixelRatio == 2) {
		
		// box up game (unsolvable puzzle 3)
		$(".box-up-game-square").css({
			'width': '200',
			'height': '200'
		});

		$(`.box-up-game-square>.box-up-inner, 
			.box-up-game-square>.box-up-small-obstacle`).css({
				'vertical-align': 'middle',
				'max-height': '120px'
			});

		$(`.box-up-game-square>.box-up-outer, 
			.box-up-game-square>.box-up-big-obstacle`).css({
				'vertical-align': 'middle',
				'max-height': '175px'
			});
		
		$(".box-up-ball").css({
			'position': 'relative',
			'z-index': '2',
			'transform': 'scale(0.6)'
		});

		$(`.box-up-inner, 
			.box-up-small-obstacle`).css({
				'position': 'absolute',
				'z-index': '1',
				'top': '38px',
				'left': '47px'
			});

		$(`.box-up-outer, 
			.box-up-big-obstacle`).css({
				'position': 'absolute',
				'z-index': '0',
				'top': '14px',
				'left': '32px'
			});
	}else if(window.devicePixelRatio == 1) {
		
		// box up game (unsolvable puzzle 3)
		$(".box-up-game-square").css({
			'width': '50px',
			'height': '50px'
		});

		$(`.box-up-game-square>.box-up-inner, 
			.box-up-game-square>.box-up-small-obstacle`).css({
				'vertical-align': 'middle',
				'max-height': '30px'
			});

		$(`.box-up-game-square>.box-up-outer, 
			.box-up-game-square>.box-up-big-obstacle`).css({
				'vertical-align': 'middle',
				'max-height': '43.75px'
			});
		
		$(".box-up-ball").css({
			'position': 'relative',
			'z-index': '2',
			'transform': 'scale(0.2)',
			'margin-left':'-5px',
			'margin-top':'-5px'
		});

		$(`.box-up-inner, 
			.box-up-small-obstacle`).css({
				'position': 'absolute',
				'z-index': '1',
				'top': '10px',
				'left': '11.5px'
			});

		$(`.box-up-outer, 
			.box-up-big-obstacle`).css({
				'position': 'absolute',
				'z-index': '0',
				'top': '4.5px',
				'left': '7px'
			});
	}else {
		// !!IMPORTANT!!
		// write code for generic device pixel ratio
		$(".box-up-game-square").css({
			'width': '50',
			'height': '50'
		});

		$(`.box-up-game-square>.box-up-inner, 
			.box-up-game-square>.box-up-small-obstacle`).css({
				'vertical-align': 'middle',
				'max-height': '30px'
			});

		$(`.box-up-game-square>.box-up-outer, 
			.box-up-game-square>.box-up-big-obstacle`).css({
				'vertical-align': 'middle',
				'max-height': '43.75px'
			});
		
		$(".box-up-ball").css({
			'position': 'relative',
			'z-index': '2',
			'transform': 'scale(0.2)',
			'margin-left':'-5px',
			'margin-top':'-5px'
		});

		$(`.box-up-inner, 
			.box-up-small-obstacle`).css({
				'position': 'absolute',
				'z-index': '1',
				'top': '10px',
				'left': '11.5px'
			});

		$(`.box-up-outer, 
			.box-up-big-obstacle`).css({
				'position': 'absolute',
				'z-index': '0',
				'top': '4.5px',
				'left': '7px'
			});
	}
}

function isBallInContainer() {
	var ball_status = {
		in_container: false,
		container_small: false,
		container_big: false
	}

	for (var i = 0; i < game_arcs.length; i++) {
		if (ball_element.x == game_arcs[i].x && ball_element.y == game_arcs[i].y) {
			ball_status.in_container = true;
			if (game_arcs[i].small) {
				ball_status.container_small = true;
			} else {
				ball_status.container_big = true;
			}
		}
	}
	return ball_status;
}

function boxUpGameInit() {
	var inner_position_initial = lh_inner_position_initials[box_up_level_counter];
	var outer_position_initial = lh_outer_position_initials[box_up_level_counter];
	ball_position_initial = lh_ball_position_initials[box_up_level_counter];
	
	var small_obstacle_initial = lh_small_obstacle_initials[box_up_level_counter];
	var big_obstacle_initial = lh_big_obstacle_initials[box_up_level_counter];
	var box_up_grid_dimension = lh_box_up_grid_dimensions[box_up_level_counter];

	small_obstacle = [];
	big_obstacle = [];
	box_up_grid_array = new BoxUpGrid(box_up_grid_dimension[0], box_up_grid_dimension[1], ball_position_initial, inner_position_initial, outer_position_initial, small_obstacle_initial, big_obstacle_initial);

	ball_element = {
		x: ball_position_initial[0],
		y: ball_position_initial[1],
		html: "<img id='player-ball' class='box-up-ball' src='"+box_up_ball+"'>"
	};

	inner_element = {
		x: inner_position_initial.x,
		y: inner_position_initial.y,
		orientation: inner_position_initial.orientation,
		small: true,
		html: "<img id='inner-element' class='box-up-inner' src='"+box_up_inner+"'>"
	};

	outer_element = {
		x: outer_position_initial.x,
		y: outer_position_initial.y,
		orientation: outer_position_initial.orientation,
		small: false,
		html: "<img id='outer-element' class='box-up-outer' src='"+box_up_outer+"'>"
	};

	for (let i = 0; i < small_obstacle_initial.length; i++) {
		small_obstacle.push({
			x: small_obstacle_initial[i].x,
			y: small_obstacle_initial[i].y,
			orientation: small_obstacle_initial[i].orientation,
			small: true,
			html: "<img id='small-obstacle-"+(i+1)+"' class='box-up-small-obstacle' src='"+box_up_small_obstacle+"'>"
		});
	}

	for (let i = 0; i < big_obstacle_initial.length; i++) {
		big_obstacle.push({
			x: big_obstacle_initial[i].x,
			y: big_obstacle_initial[i].y,
			orientation: big_obstacle_initial[i].orientation,
			small: false,
			html: "<img id='big-obstacle-"+(i+1)+"' class='box-up-big-obstacle' src='"+box_up_big_obstacle+"'>"
		});
	}

	game_arcs = [];
	game_arcs = game_arcs.concat(outer_element);
	game_arcs = game_arcs.concat(big_obstacle);
	game_arcs = game_arcs.concat(inner_element);
	game_arcs = game_arcs.concat(small_obstacle);

	is_ball_in_container = {
		in_container: false,
		container_small: false,
		container_big: false
	};

	drawGrid();
}

function resetBoxUpGame() {
	game_arcs = [];
	box_up_level_counter = 0;	// stores the current level to be shown to the user
	box_up_time_taken = 0;
	box_up_no_of_resets = 0;
	box_up_no_of_moves = 0;
	box_up_first = true;
}

function drawGrid() {
	$("#box-up-game-space").html("");

	for (var i = 0; i < box_up_grid_array.length; i++) {
		$("#box-up-game-space").append("<div style='display: inline-flex;' id='box-up-game-row-"+(i+1)+"'></div>");
		for (var j=0; j < box_up_grid_array.height; j++) {
			$("#box-up-game-row-"+(i+1)).append("<div class='box-up-game-square' id='box-up-game-square-"+i+"-"+j+"'><span class='helper'></span></div>");
		}
		$("#box-up-game-space").append("<br>");
	}
	drawBall(ball_position_initial[0], ball_position_initial[1]);

	for (var i = 0; i < game_arcs.length; i++) {
		drawArc(game_arcs[i]);
	}

	setBoxUpGameWidthAndHeight();
}

function removeBall() {
	$("#player-ball").remove();
}

// moves the ball and associated elements to the left
function boxUpMoveLeft() {
	
	// checks if the grid to the left has an element facing right or is empty
	if (ball_element.y > 0 ){
		if (box_up_grid_array.grid_array[ball_element.x][ball_element.y-1].orientation === "right" 
				|| box_up_grid_array.grid_array[ball_element.x][ball_element.y-1].orientation === "") {
			
					var big_container_moved = false;
					var small_container_moved = false;
	
					// this moves the big box, small box (if present), and the ball to the left
					for (i = 0; i < game_arcs.length; i++) {
	
						// checking if the ball is in a big box (first 3 lines) 
						// AND the big box is not oriented towards left
						// AND the grid to the left is empty
						if (ball_element.x == game_arcs[i].x 
							&& ball_element.y == game_arcs[i].y 
							&& !game_arcs[i].small 
							&& game_arcs[i].orientation !== "left" 
							&& box_up_grid_array.grid_array[ball_element.x][ball_element.y-1].orientation === "") { 
					
								for (j = i+1; j < game_arcs.length; j++) {
	
									// checking if there is an small box within the big box
									if (ball_element.x == game_arcs[j].x 
										&& ball_element.y == game_arcs[j].y 
										&& game_arcs[j].small) {
										
											small_container_moved = true;
											moveArc(j, "left");
											break;
									}
								}
						
								big_container_moved = true;
								moveBallLeft();
								moveArc(i, "left");
								return;
						}
					}
	
					// this moves the small box and the ball to the left
	
					// checking if the ball is in a small box and not in a big box 
					// OR if the ball is in a small box inside a big box facing left (in that case the small box and the ball will move out of the big box)
					// AND if the grid element to the left doesn't have a small arc
					if (
						((is_ball_in_container.container_small && !is_ball_in_container.container_big) 
						
							|| (is_ball_in_container.container_small 
								&& is_ball_in_container.container_big 
								&& !big_container_moved 
								&& box_up_grid_array.grid_array[ball_element.x][ball_element.y].orientation === "left")
							)
						
						&& !smallArcExists(ball_element.x, ball_element.y-1)) {
							
							// checking if the ball is in a small arc
							for (i = 0; i < game_arcs.length; i++) {
	
								// checking if the ball is in a small arc (first three lines)
								// AND the small box is not oriented towards left
								if (ball_element.x == game_arcs[i].x 
									&& ball_element.y == game_arcs[i].y 
									&& game_arcs[i].small 
									&& game_arcs[i].orientation !== "left") {
									small_container_moved = true;
									moveBallLeft();
									moveArc(i, "left");
									return;
								}
							}
					}
	
					// this moves just the ball to the left
	
					// checking if the ball is not in a box
					// OR if the ball is in a big box 
						// AND not in a small box
						// AND the big box didn't move because the big box is oriented towards left
					// OR if the ball is in a small box 
						// AND not in a big box
						// AND the small box didn't move because the small box is oriented towards left
					// OR if the ball is in a big and small box 
						// AND none of them moved
						// AND 
							// the grid to the left doesn't have a small box
							// OR the grid to the left has a small box that is oriented towards right
						// AND the big and small boxes are oriented towards the left
	
					if ((!is_ball_in_container.in_container) 
						
						|| (is_ball_in_container.container_big 
							&& !is_ball_in_container.container_small 
							&& !big_container_moved 
							&& box_up_grid_array.grid_array[ball_element.x][ball_element.y].orientation === "left") 
	
						|| (is_ball_in_container.container_small 
							&& !is_ball_in_container.container_big 
							&& !small_container_moved 
							&& box_up_grid_array.grid_array[ball_element.x][ball_element.y].orientation === "left")
	
						|| (is_ball_in_container.container_small 
							&& is_ball_in_container.container_big 
							&& !small_container_moved && !big_container_moved 
							&& (
								!smallArcExists(ball_element.x, ball_element.y-1) 
								|| (smallArcExists(ball_element.x, ball_element.y-1) 
									&& smallArcOrientation(ball_element.x, ball_element.y-1) === "left"
									&& box_up_grid_array.grid_array[ball_element.x][ball_element.y-1].orientation === "right")
								) 
							&& box_up_grid_array.grid_array[ball_element.x][ball_element.y].orientation === "left")) {
	
								moveBallLeft();
					}
		}
	}
}

// moves the ball and associated elements to the right
function boxUpMoveRight() {

	// checks if the grid to the right has an element facing left or is empty
	if (ball_element.y < (box_up_grid_array.grid_array[0].length-1)) {
		if (box_up_grid_array.grid_array[ball_element.x][ball_element.y+1].orientation === "left" 
				|| box_up_grid_array.grid_array[ball_element.x][ball_element.y+1].orientation === "") {
	
					var big_container_moved = false;
					var small_container_moved = false;
	
					// this moves the big box, small box (if present), and the ball to the right
					for (i = 0; i < game_arcs.length; i++) {
	
						// checking if the ball is in a big box (first 3 lines) 
						// AND the big box is not oriented towards right
						// AND the grid to the right is empty
						if (ball_element.x == game_arcs[i].x 
							&& ball_element.y == game_arcs[i].y 
							&& !game_arcs[i].small 
							&& game_arcs[i].orientation !== "right"
							&& box_up_grid_array.grid_array[ball_element.x][ball_element.y+1].orientation === "") { 
	
								for (j = i+1; j < game_arcs.length; j++) {
	
									// checking if there is a small box within the big box
									if (ball_element.x == game_arcs[j].x 
										&& ball_element.y == game_arcs[j].y 
										&& game_arcs[j].small) {
	
											small_container_moved = true;
											moveArc(j, "right");
											break;
									}
								}
								
								big_container_moved = true;
								moveBallRight();
								moveArc(i, "right");
								return;
						}
					}
	
					// this moves the small box and the ball to the right
	
					// checking if the ball is in a small box and not in a big box 
					// OR if the ball is in a small box inside a big box facing right (in that case the small box and the ball will move out of the big box)
					// AND if the grid element to the right doesn't have a small arc
					if (
						((is_ball_in_container.container_small && !is_ball_in_container.container_big)
						
							|| (is_ball_in_container.container_small 
								&& is_ball_in_container.container_big 
								&& !big_container_moved 
								&& box_up_grid_array.grid_array[ball_element.x][ball_element.y].orientation === "right")
							)
	
						&& !smallArcExists(ball_element.x, ball_element.y+1)) {
	
							// checking if the ball is in a small arc
							for (i = 0; i < game_arcs.length; i++) {
	
								// checking if the ball is in a small arc (first three lines)
								// AND the small box is not oriented towards right
								if (ball_element.x == game_arcs[i].x 
									&& ball_element.y == game_arcs[i].y 
									&& game_arcs[i].small 
									&& game_arcs[i].orientation !== "right") {
									small_container_moved = true;
									moveBallRight();
									moveArc(i, "right");
									return;
								}
							}
					}
	
					// this moves just the ball to the right
	
					// checking if the ball is not in a box
					// OR if the ball is in a big box 
						// AND not in a small box
						// AND the big box didn't move because the big box is oriented towards right
					// OR if the ball is in a small box 
						// AND not in a big box
						// AND the small box didn't move because the small box is oriented towards right
					// OR if the ball is in a big and small box 
						// AND none of them moved
						// AND 
							// the grid to the right doesn't have a small box
							// OR the grid to the right has a small box that is oriented towards left
						// AND the big and small boxes are oriented towards the right
					if ((!is_ball_in_container.in_container) 
	
						|| (is_ball_in_container.container_big 
							&& !is_ball_in_container.container_small 
							&& !big_container_moved 
							&& box_up_grid_array.grid_array[ball_element.x][ball_element.y].orientation === "right")
	
						|| (is_ball_in_container.container_small 
							&& !is_ball_in_container.container_big 
							&& !small_container_moved 
							&& box_up_grid_array.grid_array[ball_element.x][ball_element.y].orientation === "right")
	
						|| (is_ball_in_container.container_small 
							&& is_ball_in_container.container_big 
							&& !small_container_moved 
							&& !big_container_moved 
							&& (
								!smallArcExists(ball_element.x, ball_element.y+1) 
								|| (smallArcExists(ball_element.x, ball_element.y+1) 
									&& smallArcOrientation(ball_element.x, ball_element.y+1) === "right"
									&& box_up_grid_array.grid_array[ball_element.x][ball_element.y+1].orientation === "left")
								) 
							&& box_up_grid_array.grid_array[ball_element.x][ball_element.y].orientation === "right")) {
	
								moveBallRight();
					}
		}
	}
}

// moves the ball and associated elements to the up
function boxUpMoveUp() {

	// checks if the grid to the up has an element facing down or is empty
	if (ball_element.x > 0) {
		if (box_up_grid_array.grid_array[ball_element.x-1][ball_element.y].orientation === "down" 
				|| box_up_grid_array.grid_array[ball_element.x-1][ball_element.y].orientation === "") {
					
					var big_container_moved = false;
					var small_container_moved = false;
	
					// this moves the big box, small box (if present), and the ball to the up
					for (i = 0; i < game_arcs.length; i++) {
	
						// checking if the ball is in a big box (first 3 lines) 
						// AND the big box is not oriented towards up
						// AND the grid to the up is empty
						if (ball_element.x == game_arcs[i].x 
							&& ball_element.y == game_arcs[i].y 
							&& !game_arcs[i].small 
							&& game_arcs[i].orientation !== "up"
							&& box_up_grid_array.grid_array[ball_element.x-1][ball_element.y].orientation === "") { 
	
								for (j = i+1; j < game_arcs.length; j++) {
	
									// checking if there is a small box within the big box
									if (ball_element.x == game_arcs[j].x 
										&& ball_element.y == game_arcs[j].y 
										&& game_arcs[j].small) {		
	
											small_container_moved = true;
											moveArc(j, "up");
											break;
									}
								}
	
								big_container_moved = true;
								moveBallUp();
								moveArc(i, "up");
								return;
						}
					}
	
					// this moves the small box and the ball to the up
	
					// checking if the ball is in a small box and not in a big box 
					// OR if the ball is in a small box inside a big box facing up (in that case the small box and the ball will move out of the big box)
					// AND if the grid element to the up doesn't have a small arc
					if (
						((is_ball_in_container.container_small && !is_ball_in_container.container_big)
						
							|| (is_ball_in_container.container_small 
								&& is_ball_in_container.container_big 
								&& !big_container_moved 
								&& box_up_grid_array.grid_array[ball_element.x][ball_element.y].orientation === "up")
							)
	
						&& !smallArcExists(ball_element.x-1, ball_element.y)) {
	
							// checking if the ball is in a small arc
							for (i = 0; i < game_arcs.length; i++) {
	
								// checking if the ball is in a small arc (first three lines)
								// AND the small box is not oriented towards up
								if (ball_element.x == game_arcs[i].x 
									&& ball_element.y == game_arcs[i].y 
									&& game_arcs[i].small 
									&& game_arcs[i].orientation !== "up") {
									small_container_moved = true;
									moveBallUp();
									moveArc(i, "up");
									return;
								}
							}
					}
	
					// this moves just the ball to the up
	
					// checking if the ball is not in a box
					// OR if the ball is in a big box 
						// AND not in a small box
						// AND the big box didn't move because the big box is oriented towards up
					// OR if the ball is in a small box 
						// AND not in a big box
						// AND the small box didn't move because the small box is oriented towards up
					// OR if the ball is in a big and small box 
						// AND none of them moved
						// AND 
							// the grid to the up doesn't have a small box
							// OR the grid to the up has a small box that is oriented towards down
						// AND the big and small boxes are oriented towards the up
	
					if ((!is_ball_in_container.in_container) 
	
						|| (is_ball_in_container.container_big 
							&& !is_ball_in_container.container_small 
							&& !big_container_moved 
							&& box_up_grid_array.grid_array[ball_element.x][ball_element.y].orientation === "up") 
	
						|| (is_ball_in_container.container_small 
							&& !is_ball_in_container.container_big 
							&& !small_container_moved 
							&& box_up_grid_array.grid_array[ball_element.x][ball_element.y].orientation === "up")
	
						|| (is_ball_in_container.container_small 
							&& is_ball_in_container.container_big 
							&& !small_container_moved 
							&& !big_container_moved 
							&& (
								!smallArcExists(ball_element.x-1, ball_element.y) 
								|| (smallArcExists(ball_element.x-1, ball_element.y) 
									&& smallArcOrientation(ball_element.x-1, ball_element.y) === "up"
									&& box_up_grid_array.grid_array[ball_element.x-1][ball_element.y].orientation === "down")
								) 
							&& box_up_grid_array.grid_array[ball_element.x][ball_element.y].orientation === "up")) {
	
								moveBallUp();
					}
		}
	}
}

// moves the ball and associated elements to the down
function boxUpMoveDown() {

	// checks if the grid to the down has an element facing up or is empty
	if (ball_element.x < (box_up_grid_array.grid_array.length-1)) {
		if (box_up_grid_array.grid_array[ball_element.x+1][ball_element.y].orientation === "up" 
				|| box_up_grid_array.grid_array[ball_element.x+1][ball_element.y].orientation === "") {
	
					var big_container_moved = false;
					var small_container_moved = false;
	
					// this moves the big box, small box (if present), and the ball to the down
					for (i = 0; i < game_arcs.length; i++) {
	
						// checking if the ball is in a big box (first 3 lines) 
						// AND the big box is not oriented towards down
						// AND the grid to the down is empty
						if (ball_element.x == game_arcs[i].x 
							&& ball_element.y == game_arcs[i].y 
							&& !game_arcs[i].small 
							&& game_arcs[i].orientation !== "down"
							&& box_up_grid_array.grid_array[ball_element.x+1][ball_element.y].orientation === "") { 
	
								for (j = i+1; j < game_arcs.length; j++) {
	
									// checking if there is a small box within the big box
									if (ball_element.x == game_arcs[j].x 
										&& ball_element.y == game_arcs[j].y 
										&& game_arcs[j].small) {
	
											small_container_moved = true;
											moveArc(j, "down");
											break;
									}
								}
								
								big_container_moved = true;
								moveBallDown();
								moveArc(i, "down");
								return;
						}
					}
					
					// this moves the small box and the ball to the down
	
					// checking if the ball is in a small box and not in a big box 
					// OR if the ball is in a small box inside a big box facing down (in that case the small box and the ball will move out of the big box)
					// AND if the grid element to the down doesn't have a small arc
					if (
						((is_ball_in_container.container_small && !is_ball_in_container.container_big)
	
							|| (is_ball_in_container.container_small 
								&& is_ball_in_container.container_big 
								&& !big_container_moved 
								&& box_up_grid_array.grid_array[ball_element.x][ball_element.y].orientation === "down")
							)
	
						&& !smallArcExists(ball_element.x+1, ball_element.y)) {
	
							// checking if the ball is in a small arc
							for (i = 0; i < game_arcs.length; i++) {
	
								// checking if the ball is in a small arc (first three lines)
								// AND the small box is not oriented towards down
								if (ball_element.x == game_arcs[i].x 
									&& ball_element.y == game_arcs[i].y 
									&& game_arcs[i].small 
									&& game_arcs[i].orientation !== "down") {
									small_container_moved = true;
									moveBallDown();
									moveArc(i, "down");
									return;
								}
							}
					}
	
					// this moves just the ball to the down
	
					// checking if the ball is not in a box
					// OR if the ball is in a big box 
						// AND not in a small box
						// AND the big box didn't move because the big box is oriented towards down
					// OR if the ball is in a small box 
						// AND not in a big box
						// AND the small box didn't move because the small box is oriented towards down
					// OR if the ball is in a big and small box 
						// AND none of them moved
						// AND 
							// the grid to the down doesn't have a small box
							// OR the grid to the down has a small box that is oriented towards up
						// AND the big and small boxes are oriented towards the down
	
					if ((!is_ball_in_container.in_container) 
	
						|| (is_ball_in_container.container_big 
							&& !is_ball_in_container.container_small 
							&& !big_container_moved 
							&& box_up_grid_array.grid_array[ball_element.x][ball_element.y].orientation === "down") 
	
						|| (is_ball_in_container.container_small 
							&& !is_ball_in_container.container_big 
							&& !small_container_moved 
							&& box_up_grid_array.grid_array[ball_element.x][ball_element.y].orientation === "down")
	
						|| (is_ball_in_container.container_small 
							&& is_ball_in_container.container_big 
							&& !small_container_moved 
							&& !big_container_moved 
							&& (
								!smallArcExists(ball_element.x+1, ball_element.y) 
								|| (smallArcExists(ball_element.x+1, ball_element.y) 
									&& smallArcOrientation(ball_element.x+1, ball_element.y) === "down"
									&& box_up_grid_array.grid_array[ball_element.x+1][ball_element.y].orientation === "up")
								) 
							&& box_up_grid_array.grid_array[ball_element.x][ball_element.y].orientation === "down")) {
	
								moveBallDown();
					}
		}
	}
}

function moveBallLeft() {
	ball_element.y -= 1;
	drawBall(ball_element.x, ball_element.y);
}

function moveBallRight() {
	ball_element.y += 1;
	drawBall(ball_element.x, ball_element.y);
}

function moveBallUp() {
	ball_element.x -= 1;
	drawBall(ball_element.x, ball_element.y);
}

function moveBallDown() {
	ball_element.x += 1;
	drawBall(ball_element.x, ball_element.y);
}

function moveArc(i, direction) {
	if (box_up_grid_array.grid_array[game_arcs[i].x][game_arcs[i].y].orientation == game_arcs[i].orientation) {
		box_up_grid_array.grid_array[game_arcs[i].x][game_arcs[i].y].orientation = "";
	}

	switch(direction) {
		case "left":
			game_arcs[i].y -= 1;
			break;
		case "right":
			game_arcs[i].y += 1;
			break;
		case "up":
			game_arcs[i].x -= 1;
			break;
		case "down":
			game_arcs[i].x += 1;
			break;
		default:
			break;
	}
	
	if (box_up_grid_array.grid_array[game_arcs[i].x][game_arcs[i].y].orientation === ""
		|| !game_arcs[i].small) {
		box_up_grid_array.grid_array[game_arcs[i].x][game_arcs[i].y].orientation = game_arcs[i].orientation;
	}

	drawArc(game_arcs[i]);
}

function smallArcExists(x, y) {
	var exists = false;

	for (var i = 0; i < game_arcs.length; i++) {
		if (game_arcs[i].x == x && game_arcs[i].y == y && game_arcs[i].small) {
			exists = true;
			break;
		}
	}
	return exists;
}

function smallArcOrientation(x, y) {
	var orientation = "";

	for (var i = 0; i < game_arcs.length; i++) {
		if (game_arcs[i].x == x && game_arcs[i].y == y && game_arcs[i].small) {
			orientation = game_arcs[i].orientation;
			break;
		}
	}
	return orientation;
}

function drawBall(x, y) {
	removeBall();
	$("#box-up-game-square-"+x+"-"+y).append(ball_element.html);
	setBoxUpGameWidthAndHeight();
}

function drawArc(element) {
	var html_id = getIdFromHTML(element.html);
	$(html_id).remove();
	$("#box-up-game-square-"+element.x+"-"+element.y).append(element.html);
	setOrientation($(html_id), element.orientation);
	
	var box_up_level_completed = isInnerInOuter();
	if(box_up_level_completed) {
		block_arrows = true;
		$("#box-up-game-success-message").removeClass("d-none");
		var ping = document.getElementById("ping");
		ping.play();
		changeLevel();		
	}

	setBoxUpGameWidthAndHeight();
}

// returns the id from a string of the html img element
function getIdFromHTML(html) {
	return "#"+html.split("'")[1];
}

function isInnerInOuter() {
	return (outer_element.x == inner_element.x && outer_element.y == inner_element.y);
}

function populateBoxUpGrid(length, height, ball_position_initial, inner_position_initial, outer_position_initial, small_obstacle_initial, big_obstacle_initial) {
	var arr = [];

	for (var i = 0; i < length; i++) {
		arr[i] = [];
		for (var j = 0; j < height; j++) {
			var square_status;

			if(inner_position_initial.x == i && inner_position_initial.y == j) {
				square_status = {
					x: i,
					y: j,
					orientation: inner_position_initial.orientation
				};
			} else if(outer_position_initial.x == i && outer_position_initial.y == j) {
				square_status = {
					x: i,
					y: j,
					orientation: outer_position_initial.orientation
				};
			} else {
				square_status = {
					x: i,
					y: j,
					orientation: ''
				};
			}
			arr[i][j] = square_status;
		}
	}

	for (var i = 0; i < small_obstacle_initial.length; i++) {
		arr[small_obstacle_initial[i].x][small_obstacle_initial[i].y] = {
			x: small_obstacle_initial[i].x,
			y: small_obstacle_initial[i].y,
			orientation: small_obstacle_initial[i].orientation
		}
	}

	for (var i = 0; i < big_obstacle_initial.length; i++) {
		arr[big_obstacle_initial[i].x][big_obstacle_initial[i].y] = {
			x: big_obstacle_initial[i].x,
			y: big_obstacle_initial[i].y,
			orientation: big_obstacle_initial[i].orientation
		}
	}

	return arr;
}

function setOrientation($element, orientation) {
	switch(orientation) {
		case 'left':
			$element.addClass('left');
			break;
		case 'right':
			$element.addClass('right');
			break;
		case 'up':
			$element.addClass('up');
			break;
		case 'down':
			$element.addClass('down');
			break;
		default:
			break;
	}
}

$(document).on('click', '#btn-box-up-game-reset', function() {
	boxUpGameInit();
	box_up_no_of_resets++;
});

$(document).on('click', '#btn-box-up-game-give-up', function() {
	if(box_up_level_counter<(lh_inner_position_initials.length-1)) {
		changeLevel();
	}
	box_up_time_taken = Date.now();
	box_up_no_of_resets = 0;
	box_up_no_of_moves = 0;

	if(!box_up_first) {
		$("#box-up-game-row").addClass("d-none");
		$("#color-reverse-game").removeClass("d-none");
		unsolvable_game_counter = 1;
		resetBoxUpGame();
		console.log("call init 3", success); 
		colorReverseInit();
	}else{
		box_up_first = false;
	}
});

function changeLevel() {
	box_up_level_counter++;

	setTimeout(function() {
		boxUpGameInit();

		$("#box-up-game-success-message").addClass("d-none");
		if(box_up_level_counter == 1) {
			$("#btn-box-up-game-give-up").removeClass("d-none");
			box_up_time_taken = Date.now();
			box_up_no_of_resets = 0;
			box_up_no_of_moves = 0;
		}

		block_arrows = false;
	}, success_wait_time);
}

lhGameGetTask3Data = function() {
	var no_of_resets= box_up_no_of_resets;
	var time_to_give_up= Math.floor((Date.now()-box_up_time_taken)/1000);		// in seconds
	var no_of_moves= box_up_no_of_moves;
	var first = box_up_first;

	return [time_to_give_up, no_of_moves, no_of_resets, first]
}