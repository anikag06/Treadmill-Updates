var lhGameGetTask1Data; 		// function called from game-play-service

var highlight_give_up_button_fifteen;
var highlight_give_up_button_nine;
var text_red;
var fifteen;
var task1_time_to_give_up;
var task1_no_of_moves;
var task1_no_of_resets;

$(document).ready(function(){
	resetGridPuzzleGame();
	setGridPuzzleGameWidthAndHeight();
	$(document).on("click", ".three-puzzle-square", function(){
		var $gap = $(".gap-three");
		var gap_id = $gap.attr("id").substr($gap.attr("id").lastIndexOf("-")+1);
		var click_id = $(this).attr("id").substr($(this).attr("id").lastIndexOf("-")+1);

		if(Math.abs(gap_id-click_id)==2 || (Math.abs(gap_id-click_id)==1 && !(gap_id==2 && click_id==3) && !(click_id==2 && gap_id==3))){
			$gap.text($(this).text());
			$gap.removeClass("gap-three");
			$(this).addClass("gap-three");
			$(this).text("");
		}else{
		}

		gridPuzzleDetectSuccess();
	});

	$(document).on("click", ".fifteen-puzzle-square", function(){
		var $gap = $(".gap-fifteen");
		var gap_id = $gap.attr("id").substr($gap.attr("id").lastIndexOf("-")+1);
		var click_id = $(this).attr("id").substr($(this).attr("id").lastIndexOf("-")+1);
		task1_no_of_moves++;
		if(Math.abs(gap_id-click_id)==4 || (Math.abs(gap_id-click_id)==1 && !(gap_id==13 && click_id==12) && !(click_id==13 && gap_id==12) && !(gap_id==5 && click_id==4) && !(click_id==5 && gap_id==4) && !(gap_id==9 && click_id==8) && !(click_id==9 && gap_id==8))){
			$gap.text($(this).text());
			$gap.removeClass("gap-fifteen");
			$(this).addClass("gap-fifteen");
			$(this).text("");
		}else{
		}
	});

	$(document).on("click", ".nine-puzzle-square", function(){
		var $gap = $(".gap-nine");
		var gap_id = $gap.attr("id").substr($gap.attr("id").lastIndexOf("-")+1);
		var click_id = $(this).attr("id").substr($(this).attr("id").lastIndexOf("-")+1);
		task1_no_of_moves++;
		if(Math.abs(gap_id-click_id)==3 || (Math.abs(gap_id-click_id)==1 && !(gap_id==3 && click_id==4) && !(click_id==3 && gap_id==4) && !(gap_id==6 && click_id==7) && !(click_id==6 && gap_id==7))){
			$gap.text($(this).text());
			$gap.removeClass("gap-nine");
			$(this).addClass("gap-nine");
			$(this).text("");
		}else{
		}
	});

	$(document).on("click", "#btn-give-up-fifteen", function(ev){
		ev.stopImmediatePropagation();
		task1_no_of_resets = 0;
		task1_no_of_moves = 0;
		task1_time_to_give_up = Date.now();

		$("#fifteen-puzzle-squares").addClass("d-none");
		$("#nine-puzzle-squares").removeClass("d-none");

		setTimeout(function(){
			$("#btn-give-up-nine").removeClass("d-none");

			highlight_give_up_button_nine = setInterval(function(){
				if(text_red){
					$("#btn-give-up-nine").addClass("give-up-text-black");
					text_red = false;
				}else{
					$("#btn-give-up-nine").removeClass("give-up-text-black");
					text_red = true;
				}
			}, 3000);
		}, 120);
	});

	$(document).on("click", "#btn-give-up-nine", function(ev){
		ev.stopImmediatePropagation();
		fifteen = false;
		// show play next pop up
		lhg_show_instructions = false;

		playNextGamePopup();
		$("#grid-puzzle-row").addClass("d-none");
		$("#color-reverse-game").removeClass("d-none");
		second_time = true;
		resetGridPuzzleGame();
		gridPuzzleGameReInit();
		unsolvable_game_counter=2;
		colorReverseInit();
	});

	$(document).on("click", "#btn-reset-three", function(){
		resetThreeGrid();
	});

	$(document).on("click", "#btn-reset-fifteen", function(){
		task1_no_of_resets++;
		resetFifteenGrid();
	});

	$(document).on("click", "#btn-reset-nine", function(){
		task1_no_of_resets++;
		resetNineGrid();
	});
});

function setGridPuzzleGameWidthAndHeight() {
	// setting asset sizes based on screen size
	// if(window.devicePixelRatio == 2) {
  //
	// 	// grid puzzle (unsolvable puzzle 1)
	// 	$(`.square,
	// 		.fifteen-puzzle-square,
	// 		.nine-puzzle-square,
	// 		.three-puzzle-square`).css({
	// 			'width': '150',
	// 			'height': '150'
	// 		});
	// }else if(window.devicePixelRatio == 1) {
	//
	// 	// grid puzzle (unsolvable puzzle 1)
	// 	$(`.square,
	// 		.fifteen-puzzle-square,
	// 		.nine-puzzle-square,
	// 		.three-puzzle-square`).css({
	// 			'width': '50'
	// 		});
	// }else {
		// !!IMPORTANT!!
		// write code for generic device pixel ratio
		$(`.square,
			.fifteen-puzzle-square,
			.nine-puzzle-square,
			.three-puzzle-square`).css({
				'width': '50'
			});
	// }
}

function resetThreeGrid() {
	var $gap = $(".gap-three");
	$gap.removeClass("gap-three");
	$("#three-puzzle-square-3").addClass("gap-three");

	$("#three-puzzle-square-1").html(3);
	$("#three-puzzle-square-2").html(1);
	$("#three-puzzle-square-3").html("");
	$("#three-puzzle-square-4").html(2);
	setGridPuzzleGameWidthAndHeight();
}

function resetFifteenGrid() {
	var $gap = $(".gap-fifteen");
	$gap.removeClass("gap-fifteen");
	$("#fifteen-puzzle-square-16").addClass("gap-fifteen");

	for(var i=1; i<=13; i++){
		$("#fifteen-puzzle-square-"+i).html(i);
	}

	$("#fifteen-puzzle-square-14").html(15);
	$("#fifteen-puzzle-square-15").html(14);
	$("#fifteen-puzzle-square-16").html("");
	setGridPuzzleGameWidthAndHeight();
}

function resetNineGrid() {
	var $gap = $(".gap-nine");
	$gap.removeClass("gap-nine");
	$("#nine-puzzle-square-9").addClass("gap-nine");

	for(var i=1; i<=6; i++){
		$("#nine-puzzle-square-"+i).html(i);
	}

	$("#nine-puzzle-square-7").html(8);
	$("#nine-puzzle-square-8").html(7);
	$("#nine-puzzle-square-9").html("");
	setGridPuzzleGameWidthAndHeight();
}

function gridPuzzleGameReInit() {
	resetThreeGrid();
	resetFifteenGrid();
	resetNineGrid();
	$("#three-puzzle-squares").removeClass("d-none");
	$("#fifteen-puzzle-squares").addClass("d-none");
	$("#nine-puzzle-squares").addClass("d-none");
}

function resetGridPuzzleGame() {
	text_red = true;
	fifteen = true;
	task1_time_to_give_up = Date.now();
	task1_no_of_moves = 0;
	task1_no_of_resets = 0;
}

function gridPuzzleDetectSuccess(){
	var first_grid_value = parseInt($("#three-puzzle-square-1").html());
	var second_grid_value = parseInt($("#three-puzzle-square-2").html());
	var third_grid_value = parseInt($("#three-puzzle-square-3").html());

	if(first_grid_value==1 && second_grid_value==2 && third_grid_value==3){
		$("#grid-puzzle-success-message").removeClass("d-none");
		var ping = document.getElementById("ping");
		ping.play();
		setTimeout(function(){
			$("#grid-puzzle-success-message").addClass("d-none");
			$("#three-puzzle-squares").addClass("d-none");
			$("#fifteen-puzzle-squares").removeClass("d-none");
			task1_time_to_give_up = Date.now();
		}, success_wait_time);
	}
}

lhGameGetTask1Data = function() {
	no_of_moves = task1_no_of_moves;
	no_of_resets = task1_no_of_resets;
	time_to_give_up = Math.floor((Date.now()-task1_time_to_give_up)/1000);

	return [time_to_give_up, no_of_moves, no_of_resets]
}
