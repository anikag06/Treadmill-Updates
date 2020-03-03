var IBG_MAX_WORDS_HIDDEN = 6;
var sentence_number = 0;
var sentence_ids = [];
var last_sentence_order = 0;
var STREAK_THRESHOLD = 2;
var ibGamelevel, ibGameStreak;
var ibGameScore; 
var ibGameUserOrder;
var ibGameTime =20;
var ibGameWordsHidden;
var ibGameCorrectResponse;				// check whether user answers correctly or not 
var ibGameShowTutorial;
var ibGDifficultyValue;
var success = false;				// to keep track of the user's performance in the game

// var sentences_sent= 3;
var sentence_array = [];
var sentence_word_array = [];
var sentence_response_array = [];
var sentence_trick = [];
var sentence_word_valence = [];
var sentence_order_array = [];
// var after_sentence_number = last_sentence_order+Math.floor(sentences_sent/2);	//request to send next set of sentences after a certain sentence number

var ibGame_ask_feedback;
var ibCountdown;
var ibGamePause;
var ibGameResume;
var ibUsehints;
var ibGameHelp;
var ibGameTrainingSen;
var ibGameMakeGridArray;

var iBGSentenceDialogEvent;

var ibgWordsNeeded = 0;

var words = []                 //words of the sentence 
var NO_OF_WORDS;
var no_words_hidden;
var hidden_words_array = [];
// var initial_timer = "180";							// time for finding words from letter grid
var FIRST_HINTS_TIME = 60;
var SECOND_HINTS_TIME = 30;
// var initial_time = 12000;
var game_timer = "150";
var before_sentence_time = 1500;					//time after the user finds the required number of words
var sentence_time = 1000;							//in milli seconds, time for showing the sentence before asking about the word relations
var borrowed_time = 20;								// time (in seconds) increase after borrowing time after time's up
var increased_time = 30;								// time(in seconds) increase after using  hint increase time
var delay_show_sentence = 1000;						// delay for showing the sentence after showing the cross
var average_reading_speed = (50);					// considering average reading speed 50 characters per sec
var INITIAL_VALUE = ' ';
var no_of_parameters = 4;
var ALPHABETS = 'abcdefghijklmnopqrstuvwxyz';
var alpha_very_rare = 'bvkqjxz';					//different set of alphabets according frequency of their occurance in english words
var alpha_rare = 'fwygpc';
var alpha_common = 'rdlum';
var alpha_very_common = 'nosh';
var alpha_most_common = 'etai';

var answer = false;

var isFirstAttempt = true;
var countTrue = 0;									//counts how many words are already found by the user 
var word_already_found = [];						//array to store the words found 
var extra_word_already_found = [];					//array to store the words found not in the array.

var extra_word = false;								//flag for keeping track if the word is in sentence or not
var bonus_word_score = 5;							//coins for finding an extra word

var ibg_time_cost = 50;						//coins subtracted for using increase time hint
var ibg_borrow_time_score = 20;						//coins subtracted for borrowing time after time's up
var ibg_borrow_time_again_score = 30;					//if more than 15% words then borrowing time after time's up
var ibg_btn_give_up_score = 35;
var ibg_btn_other_sentence_score = 100;
var min_score_increaseTime = 20;					//minimum score to unlock the 'increase the time' power
var ibg_word_cost = 30; 							// if user uses show word hint
var guess_word_score = 20;							// if user uses guess the word hint 
var ibg_coordinate_cost = 20;
var score_each_letter = [10, 7, 5];					//for each letter of the word of the sentence
// var try_again_score = 40; 

var percent_full_sen = 0.5;						// to show the complete sentence
var percent_partial_sen = 0.15;						// give an extra chance and some other benefits to find the 90% of the sentence
var no_shuffle_words = 0;							// number of times hint guess the word called
var startBlink = null;								//for start blinking the first letter to give hints
var hideText = null;
var min_bonus_word_length = 2;						//minimum length of word for giving bonus coins
var words_pos_row=[], words_pos_column=[];			//row, columns words in sentence occupy 
var sentence_splitter = " ";
var sorted_words_list = [];		//array of sorted words, use when time up to get percentage of words found
var coins =0;					//coins for answer in relation questions 
var coins_rem = null;
var final_coins = 120;			//maximum coins displayed for answering relation question
var unlock = false;				//whether the powers can be unlocked to use or not
var rotation = false;			//check whether rotation occured or not
var blink_letter;				//letter to be blinked to show  the first letter of the word
var blink_time = 8000;			//milli seconds for which letter will be blinked
var word_to_guess;				//word for guess the word hint
var playGrid;
var star_sentence;
var isValidWord = false;		//for saving lines in existing lines if the word is valid
var columnWidth = 0;				// for width of column for grid
var rowHeight = 0;					//for height of row for grid
var canvas = null;				//variables for drawing on canvas
var bounds = null;          
var ctx = null;
var hasLoaded = false;
var letter_swiped_row, letter_swiped_column;

var startX=0 ;					//co-ordinates of starting and ending of swipe 
var startY=0 ;
var mouseX ;
var mouseY ;
var lineColor;
var isDrawing = false;
var existingLines = [];						//to stores properties of lines drawn on canvas 
var existing_lines_length = -1;
var imageData;								//for storing stages of the canvas

//colors for making lines on grid while swiping
var line_color_set_extra_words = ['rgb(204, 204, 204)'];
var line_color_set_sentence_words = ['rgb(9,151,166)','rgb(65,63,220)','rgb(245,16,98)','rgb(255,218,0)', 'rgb(0,149,0)','rgb(255,153,15)'];

var color_number = 0;			//choose color from array of colors to draw the line
var line_width = 17;			//width of line used of highlighting the letters
var letters_x_coordinate = [];	//for storing x cooordinates of letters of grid on the canvas
var letters_y_coordinate = [];	// for storing y coordinates of letters of grid on the canvas
var textwidth = [];				// for storing width of alphabets on grid
var last_row, last_column;		//for getting end points of the lines
var countLine =0;
var line;
var lineDrawn = false;			//see if the existing is drawn or not
var w,h;						//width and height for making small squares around letters
var coordinates = [];			//coordinates of corners of the squares around letters
var store_swiped_letter = [];	//array stores letters while swiping for making them bold
var swipe_direction;
var previous_i;					// for storing the i value of the previously swiped letter
var previous_j;					// for storing the j value of the previously swiped letter
var s
var t;

var start_time = 0;
var end_time = 0;

// for setWord function
var word_set = false;
var count1 = 0;
var gridArray = [[]];
// to highlight the initial letters of the words
var initial_letters = [];

// to determine the size of the square around each letter
var SQUARE_DIM = 4;

// to center align the elements in the screen
var margin_left;

// max allowed canvas width beyond which the alphabets get very small
var MAX_CANVAS_WIDTH = 400;

// column width breakpoint
var COLUMN_WIDTH_BREAKPOINT = 75;
var canvas_font_width;
var canvas_font_width_highlight;

// duration for which the message following sentence-word pair answer should be shown
var delay_sentence_word_message = 1500;

// main canvas width and height
var canvas_width;
var canvas_height;

var inactivity_threshold = 10000;		// show tips after 10 seconds of inactivity
var inactivity_check;
var inactivity_check_interval; 

var inactivity_time = 0;

var tip_msg_array = [
	"Word can be left to right, right to left, diagonal",
	"Search for extra words to earn extra points.",
	"Look for the first letter of the word.",
	"Look for the second letter of the word around the first letter.",
	"Search for less-common letters, such as j, b, k, q, x, y, or z, first.",
	"Try to search for multiple words at a time to find more words easily.",
];
var tip_number = 0;
var word_tip_shown = [];							//words for which tip has already been shown
var word_tip_count =0;

var game_paused = false;

var MAX_FUNC_CALL = 25000;

function initializeVariables(){
	countdownReset();
	game_timer = ibGameTime.toString();
	no_words_hidden = ibGameWordsHidden;
	FIRST_HINTS_TIME = 60;
  SECOND_HINTS_TIME = 30;
	before_sentence_time = 1500;					
	sentence_time = 1000;							
 	borrowed_time = 20;								
 	increased_time = 20;								
	delay_show_sentence = 1000;
	inactivity_time = 0;
	inactivity_threshold = 10000;		// show tips after 10 seconds of inactivity					
	columnWidth = 0;
	rowHeight = 0;
	final_coins = 120;
	count1 =0;
	tip_number = 0;
	INITIAL_VALUE = ' ';									 
	star_sentence = " ";
	canvas = null;				//variables for drawing on canvas
	bounds = null;          
	ctx = null;
	hasLoaded = false;
	word_set = false;
	game_paused = false;
	words = [];
	word_already_found = [];	
	hidden_words_array = [];				
 	extra_word_already_found = [];				
	word_tip_shown = [];
	word_tip_count = 0;
	words_pos_row=[]; 
	words_pos_column=[];
	sorted_words_list = [];	
	initial_letters = [];
	coordinates = [];
	store_swiped_letter = [];
	textwidth = [];
	letters_x_coordinate = [];
	letters_y_coordinate = [];
	ibg_score = ibGameScore;
	$(".game").removeClass("d-none");
	$('.instructions-row').addClass("d-none");
	$('.game-first-page').addClass("d-none");
	for(let i = 1; i<= ibgWordsNeeded; i++){
		if(document.getElementById("ibg-pBar"+i)) {
			document.getElementById('ibg-pBar'+i).style.backgroundColor = 'rgba(100, 216, 216, 0.5)';
		}
	}
	
	countTrue = 0; 	
}	
function getUpdatedVariables() {
	levelChange(success);
	if(start_time!=0){
		end_time = Date.now();
	}
//store the order of the sentence that will come next so that when user plays correct sentence even after refresh
	ibGameUserOrder = sentence_order_array[sentence_number+1];
	gameLevel = ibGamelevel;
	gameOrder = ibGameUserOrder;
	ibGameScore = ibg_score;
	gameStreak = ibGameStreak;
	gameResponseTime=0;
	gameUserSentenceId = sentence_ids[sentence_number];
	gameResponseTime = (end_time - start_time) ; 
	return [
		gameOrder,
		gameLevel, 
		ibGameScore, 
		gameStreak, 
		ibGameTime,
		ibGameWordsHidden,

		gameUserSentenceId,
		gameResponseTime,
		sentence_number,
		isFirstAttempt
	];
}

var showImages = function(){
	var img_height = $(".card-img-top").height();
	$(".instruction-icon").css("margin-top", "-"+ img_height/2 +"%");
}
function removeAddClassFun(){
	$('#main_div').removeClass("d-none");
	$(".sentence-row").removeClass("d-none");
	$(".canvas-row").removeClass("d-none");
	$(".sentence-col").removeClass("d-none");
	$(".controls-row").removeClass("d-none");
	$('.hints-col').removeClass("d-none");
	$('.score-col').removeClass("d-none");
	$('.game-over-row').addClass("d-none");
	$('.game-over-flex-row').removeClass("d-flex");
	$('.game-over-flex-row').addClass("d-none");
	$('#game_main_div').addClass("d-none");
	$('.controls-row').addClass("d-none");
	$("#correct").addClass("d-none");
	$("#wrong").addClass("d-none");
	$('#timeup1').addClass("d-none");
	$("#lastPage").addClass("d-none");
	$(".sentence-word-row").addClass("d-none");
	$('#hint-div').addClass("d-none");	
	$('#showWordResult').addClass("d-none");
	$('#showCoordResult').addClass("d-none");
	$("#levelup").addClass("d-none");
	inactivity_time = 0;
	$(".tip-text").text(" ");	
	$("#sincerity-message").text("");
	$("#hint-img-tip").addClass("d-none");
	inactivity_check();
}
var startIBGame; 
$(document).ready(function(){

	showImages();

	startIBGame = function(ev){
		$('#game_main_div').addClass('d-none');
		if(ibGameUserOrder>0){
			playGame();
		} else if(ibGameUserOrder === 0 ){
			if($('#instruct-div').hasClass('d-none')){
				$('#instruct-div').removeClass('d-none');
			} else{
				$('#instruct-div').removeClass('d-none');
				playGame();
			}
		}
	};
	function playGame(){
		clearInterval(inactivity_check_interval);
		isFirstAttempt = true;
		initializeVariables();
		removeAddClassFun();
		ibCountdown();
		foundWord(sentence_array[sentence_number],sentence_word_array[sentence_number]);
		success = false;
	}
	ibGamePause = function(ev){
		if (game_paused === false) {
			countdownPause();
			hideCanvas();
			game_paused = true;
			$('.hints-col').addClass("d-none");
		}
	}
	ibGameResume = function(){
		if (!$(".canvas-row").hasClass("d-none")) {
			ibCountdown();
			showCanvas();
			game_paused = false;
			$('.hints-col').removeClass("d-none");
		}
	}
	ibUsehints = function(ev){
		console.log('USE HINTS',ibg_score, ibg_time_cost, ibg_coordinate_cost, ibg_word_cost);
		// if(ibg_score > ibg_time_cost ) {
		// 	if(ibg_score > ibg_word_cost) {
		// 		if(ibg_score >  ibg_coordinate_cost) {

		// 		}
		// 	}
		// }
		if(hiddenWordsInfo() > 0){
			if($('#showWord').hasClass("disabled")){
				$('#showWord').removeClass("disabled");
			}
		}else if(hiddenWordsInfo() === 0){
			if(!$('#showWord').hasClass("disabled")){
				$('#showWord').addClass("disabled");
			}
		}
		if($('#hint-div').hasClass("d-none")){
			$('.controls-row').removeClass("d-none");
			$('#hint-div').removeClass("d-none");
			$('#showWord').removeClass("d-none");
			$('#showCoordinates').removeClass("d-none");
			$('#increase_time').removeClass("d-none");
		}else{
			$('#hint-div').addClass("d-none");
			$('#showWordResult').addClass("d-none");
			$('#showCoordResult').addClass("d-none");
		}
		// document.getElementById("showWordCost").innerHTML = "Cost: "+ibg_word_cost;
		// document.getElementById("showCoordCost").innerHTML = "Cost: "+ibg_coordinate_cost;
		// document.getElementById("addTimeCost").innerHTML = "Cost: "+ min_score_increaseTime;

	}
	ibGameHelp = function(ev){
			$('.game-first-page').addClass("d-none");
	}
	$(document).on("click", "#showWord", function(ev){
		if(ibg_score < ibg_word_cost) {
			showTooltip();
		 }
		else {
			if($('#showWordResult').hasClass("d-none")){
				if(showWord(sentence_array[sentence_number])){
					ibg_score = ibg_score - ibg_word_cost;
					document.getElementById("score").innerHTML = ibg_score;
					$('#showWordResult').removeClass("d-none");
				}
			}else{
				$('#showWordResult').addClass("d-none");
			}
		}
		
	});

	$(document).on("click", "#showCoordinates", function(ev){
		if(ibg_score < ibg_coordinate_cost){
			showTooltip();
		} else {
		if($('#showCoordResult').hasClass("d-none")){
			if(showFirstLetterCoordinates()){
				ibg_score = ibg_score - ibg_coordinate_cost;
				document.getElementById("score").innerHTML = ibg_score;
			}
			$('#showCoordResult').removeClass("d-none");
		}else{
			$('#showCoordResult').addClass("d-none");
		}
	}
	});

	$(document).on("click", "#guessWord", function(ev){
		if($('#guessWordResult').hasClass("d-none")){
			if(guessWord(sentence_array[sentence_number])){
				ibg_score = ibg_score - guess_word_score;
				document.getElementById("score").innerHTML = ibg_score;
			}
			$('#guessWordResult').removeClass("d-none");
			$('#showWord').addClass("d-none");
			$('#increase_time').addClass("d-none");
		}else{
			$('#guessWordResult').addClass("d-none");
			$('#showWord').removeClass("d-none");
			$('#increase_time').removeClass("d-none");
		}
		
	});
	
	$(document).on("click","#increase_time", function(ev){
		if(ibg_score < ibg_time_cost){
			showTooltip();		
		} else {

		$('#ibgame-clock-gif').removeClass("d-none");
		$('#ibgame-clock-png').addClass("d-none");
		// if(score >= min_score_increaseTime){
		// 	unlock = true;
		// 	score = score - min_score_increaseTime;
		// 	document.getElementById("score").innerHTML = score;
		// }else{
		// 	unlock == false;
		// }

		// if(unlock == true){
			game_timer = game_timer + increased_time;
			//ibCountdown();
			ibg_score = ibg_score - ibg_time_cost;
			document.getElementById("score").innerHTML = ibg_score;
		// }else if(unlock == false){
			//console.log("Need" + min_score_increaseTime + " coins to unlock this power");
		// }
		$('#hint-div').addClass("d-none");
		setTimeout( function() {
			$('#ibgame-clock-png').removeClass("d-none");
			$('#ibgame-clock-gif').addClass("d-none");
		},1500);
	}
	});
	$(document).on("click",".btn-try-again", function(ev){
		// score = score-try_again_score;
		// document.getElementById("score").innerHTML = score;
		removeAddClassFun();
		$("#timeup1").addClass("d-none");
		$("#timeup2").addClass("d-none");
		startIBGame();
		isFirstAttempt = false;
		// countdownReset();
		// ibCountdown();
	});
	$(document).on("click",".btn-borrow-time", function(ev){
		//if user had found 0-15% of words and time's up then borrowing time
		if (ibg_score< ibg_borrow_time_score) {
			showTooltip();
		} else {
			game_timer = game_timer + (borrowed_time);
			ibg_score = ibg_score - ibg_borrow_time_score;
			document.getElementById("score").innerHTML = ibg_score;
			removeAddClassFun();
			$("#timeup1").addClass("d-none");
			ibGameResume();
			// ibCountdown();
		}
	});
	$(document).on("click",".btn-borrow-time-again", function(ev){
	//if user had found 15-60% of words and time's up then borrowing time
	if (ibg_score< ibg_borrow_time_again_score) {
		showTooltip();
	} else {
		game_timer = game_timer +(borrowed_time);
		ibg_score = ibg_score-ibg_borrow_time_again_score;
		document.getElementById("score").innerHTML = ibg_score;
		removeAddClassFun();
		$('.game-over-flex-row').addClass("d-none");
		$("#timeup2").addClass("d-none");
		ibGameResume();
		// ibCountdown();
	}
	});
	
	$(document).on("click","#ibg-yes", function(ev){  //if the user clicks yes when asked whether the word and sentence are related or not
		checkResponseYes(sentence_response_array[sentence_number]);
		$(".btn-sentence-word-rel").attr("disabled", "disabled");
		clearInterval(coins_rem);
		if(answer == false){
			coins = 0;
		}
		
		$("#word").addClass("d-none");
		ibg_score+=coins;
		document.getElementById("bonusScore").innerHTML = "Bonus:"+coins;
		document.getElementById("score").innerHTML = ibg_score;
		$("#lastPage").removeClass("d-none");
		$(".btn-sentence-word-rel").removeAttr("disabled");
		$(".main-training").addClass('d-none');
		delay_sentence_word_message = 1500;
	});
	
	$(document).on("click","#ibg-no", function(ev){   //if the user clicks yes when asked whether the word and sentence are related or not
		checkResponseNo(sentence_response_array[sentence_number]);
		$(".btn-sentence-word-rel").attr("disabled", "disabled");
		clearInterval(coins_rem);
		if(answer == false){
			coins = 0;
		}
	
		$("#word").addClass("d-none");
		ibg_score+=coins;
		document.getElementById("bonusScore").innerHTML = "Bonus:"+coins;
		document.getElementById("score").innerHTML = ibg_score;

		$('#lastPage').removeClass("d-none");
		$(".btn-sentence-word-rel").removeAttr("disabled");
		$(".main-training").addClass('d-none');
		delay_sentence_word_message = 1500;
	});

	$(document).on("click",".btn-give-up", function(ev){
	 //if time's up and user had found less then 60% of words and then he choose give up option
	 if (ibg_score< ibg_btn_give_up_score) {
		showTooltip();
	} else {
		ibg_score = ibg_score-ibg_btn_give_up_score;
		document.getElementById("score").innerHTML = ibg_score;
		$("#timeup2").addClass("d-none");
		showSentence();
	}
	});
	
	$(document).on("click",".btn-other-sentence", function(ev){
		if (ibg_score< ibg_btn_other_sentence_score) {
			showTooltip();
		} else {
			ibg_score = ibg_score-ibg_btn_other_sentence_score;
			document.getElementById("score").innerHTML = ibg_score;
			answer=false;
			ibGameScore = ibg_score;
			playNextSentence();
			isFirstAttempt = true;
		}
	});	

	$(document).on("click","#btn-next-sentence",function(ev){
		
			answer=false;
			ibGameScore = ibg_score;
			playNextSentence();
			isFirstAttempt = true;
		
	});	
	
	$(document).on("click","#exit", function(e){
		e.preventDefault();
		showCanvas();
		game_paused = false;
		inactivity_time = 0;
		$(".tip-text").text(" ");
		$("#hint-img-tip").addClass("d-none");
	});

}); // document.ready ends here 

function playNextSentence(){
	if( gameOrder === 3 && ibGame_ask_feedback) {
		iBGFeedbackEvent = document.createEvent('CustomEvent');
		iBGFeedbackEvent.initCustomEvent('iBGFeedback');
		window.dispatchEvent(iBGFeedbackEvent);
		ibGame_ask_feedback = false;
	} else {
		clearInterval(inactivity_check_interval);
		initializeVariables();
		setTimeout(() => {
			removeAddClassFun();
		});
		
		$(".tip-text").text("");
		$("#hint-img-tip").addClass("d-none");
		ibCountdown();
		sentence_number++;
		foundWord(sentence_array[sentence_number],sentence_word_array[sentence_number]);
	}
}

function hideCanvas(){
	if (ctx) {
		imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	
}

function showCanvas(){
	ctx.putImageData(imageData,0,0);
}

function countdownDisplay() {
	document.getElementById('countdown').innerHTML= game_timer +'s';
	
}

ibCountdown = function() {
	var no_hidden_words = hiddenWordsInfo();
	// starts countdown
	if(document.getElementById('countdown')!=null){
		countdownDisplay();
		if(game_timer===0){
			success = false;
			isFirstAttempt = false;
			$('.hints-col').addClass("d-none");
			$(".controls-row").addClass("d-none");
			$(".sentence-col").addClass("d-none");
			$(".sentence-row").addClass("d-none");
			$(".canvas-row").addClass("d-none");
			$(".game-over-row").removeClass("d-none");
			$('.game-over-flex-row').addClass("d-flex");
			$(".game-over-flex-row").removeClass("d-none");

			if(countTrue < (percent_partial_sen*NO_OF_WORDS)){
				$("#timeup1").removeClass("d-none");
			}else if(countTrue<(percent_full_sen*NO_OF_WORDS)){
				$("#timeup2").removeClass("d-none");
			} // time is up
		}else{
			game_timer--;
			t = setTimeout(ibCountdown, 1000);

			if(game_timer===FIRST_HINTS_TIME){
				if(no_hidden_words>0){
					highlightFirstLetters();
				}
				document.getElementById('stars').innerHTML = star_sentence;
			}else if(game_timer===SECOND_HINTS_TIME){
				if(no_hidden_words>0) {
					highlightSecondLetters();
				}
				document.getElementById('stars').innerHTML = star_sentence;
			}
		}
	}
}

function highlightFirstLetters(){

	star_sentence = "";			//sentence with words in ascending order of length
	
	for(var i=0; i<initial_letters.length; i++){
		var senWord = initial_letters[i].word;

		// only for words that haven't been found
		if(word_already_found.indexOf(senWord)==-1 && word_already_found.indexOf(reverseWord(senWord))==-1 && senWord.length>1){
			if((hidden_words_array[i]==true)){
				star_sentence+=initial_letters[i]["first_letter"]+starify(senWord).substring(1);
			}else{
				if (isWordReversed(senWord)) {
					star_sentence += reverseWord(senWord);
				} else {
					star_sentence += senWord;
				}
			}
		}else{
			if(senWord.length>1){
				if(isWordReversed(senWord)){
					star_sentence+= "<span style='color:#45b9bc'>" + reverseWord(senWord) + "</span>";
				}else{
					star_sentence+= "<span style='color:#45b9bc'>" + senWord + "</span>";
				}
			}else if(senWord.length ==1) {
				star_sentence += senWord;
			}
		}
		star_sentence+=" ";
	}
}


// taking the easy way out here. wouldn't have to animate the letters in the canvas using this approach
function highlightSecondLetters(){
	var wordLength;

	star_sentence = "";			//sentence with words in ascending order of length
	for(var i=0; i<initial_letters.length; i++){
		var senWord= initial_letters[i].word;
		// only for words that haven't been found
		if(word_already_found.indexOf(senWord)==-1 && word_already_found.indexOf(reverseWord(senWord))==-1 && senWord.length>1){
			wordLength = senWord.length - 1;
			if(hidden_words_array[i]==true){
				if(isWordReversed(senWord)){
					if(wordLength > 1){
						star_sentence+=initial_letters[i]["first_letter"]+initial_letters[i]["second_letter"]+starify(senWord).substring(2, wordLength)+ senWord.charAt(0);
					} else {
						star_sentence+=initial_letters[i]["first_letter"]+initial_letters[i]["second_letter"];
					}
				}else{
					if(wordLength > 1){
						star_sentence+=initial_letters[i]["first_letter"]+initial_letters[i]["second_letter"]+starify(senWord).substring(2, wordLength)+ senWord.charAt(wordLength);
					} else {
						star_sentence+=initial_letters[i]["first_letter"]+initial_letters[i]["second_letter"];
					}
				}
			}else if(hidden_words_array[i]==false){
				if (isWordReversed(senWord)) {
					star_sentence += reverseWord(senWord);
				} else {
					star_sentence += senWord;
				}
			}
		}else{
			if(senWord.length>1){
				if(isWordReversed(senWord)){
					star_sentence+= "<span style='color:#45b9bc'>" + reverseWord(senWord) + "</span>";
				}else{
					star_sentence+= "<span style='color:#45b9bc'>" + senWord + "</span>";
				}
			}else if(senWord.length ==1) {
				star_sentence += senWord;
			}
		}
		star_sentence+=" ";
	}
}

function starify(word){
	return word.replace(/[a-z]/g,'_');				//replacing words of the sentence by stars
}


// it is getting hard to highlight the first letters properly
// function highlightFirstLetters(){
	
// 	for(var i=0; i<initial_letters.length; i++){
// 		var _word = initial_letters[i].word;
		
// 		// only for words that haven't been found
// 		if(word_already_found.indexOf(_word) == -1 && word_already_found.indexOf(reverseWord(_word)) == -1){
// 			ctx.font = "bold "+canvas_font_width_highlight+"px serif";
// 			ctx.fillStyle = "rgba("+initial_letters[i]["color"]+",1)";
// 			var x = initial_letters[i]["first_col"]*columnWidth+columnWidth/2;
// 			var y = initial_letters[i]["first_row"]*rowHeight+rowHeight/2;
// 			ctx.clearRect(x-rowHeight/6, y-columnWidth/6, columnWidth/3, rowHeight/3);
// 			ctx.fillText(initial_letters[i]["first_letter"], x, y);
// 		}
// 	}

// 	imageData = ctx.getImageData(0,0,canvas.width,canvas.height);       
// }

// function highlightSecondLetters(){
// 	for(var i=0; i<initial_letters.length; i++){

// 		var _word = initial_letters[i].word;
// 		if(word_already_found.indexOf(_word) == -1 && word_already_found.indexOf(reverseWord(_word)) == -1){
// 			ctx.font = "bold "+canvas_font_width_highlight+"px serif";
// 			ctx.fillStyle = "rgba("+initial_letters[i]["color"]+",1)";
// 			var x = initial_letters[i]["second_col"]*columnWidth+columnWidth/2;
// 			var y = initial_letters[i]["second_row"]*rowHeight+rowHeight/2;
// 			ctx.clearRect(x-rowHeight/6, y-columnWidth/6, columnWidth/3, rowHeight/3);
// 			ctx.fillText(initial_letters[i]["second_letter"], x, y);
// 		}
// 	}
	
// 	imageData = ctx.getImageData(0,0,canvas.width,canvas.height);       
// }

function countdownPause() {
	// pauses countdown
	clearTimeout(t);
}

function countdownReset() {
	// resets countdown
	countdownPause();
	game_timer = ibGameTime.toString();
	countdownDisplay();
}

function getSortedWordList(sentence){
	let get_words = sentence.split(sentence_splitter);
	let sorted_words = get_words.sort(function(a, b){  // arranging the words by decreasing order of their length
		return b.length - a.length || a.localeCompare(b);
	});
	sorted_words_list = sorted_words;
	return sorted_words;
}

ibGameMakeGridArray = function(sentence){
	var grid_done = false;
	words = sentence.split(sentence_splitter);
	var sorted_words = getSortedWordList(sentence);
	var GRID_LENGTH = gridLength(sentence, sorted_words[0]); // determining the optimal length for the sentence
	NO_OF_WORDS = words.length;
	ibgWordsNeeded = Math.ceil(percent_full_sen*NO_OF_WORDS);
	gridArray = matrix(GRID_LENGTH,GRID_LENGTH);
	// getting the different parameters for the current level
	var sentence_parameters = difficultyParameters(ibGamelevel, words);
	var no_diagonal = sentence_parameters[0];
	var no_vertical = sentence_parameters[1];
	var no_horizontal = sentence_parameters[2];
	var no_reverse = sentence_parameters[3];
	var final_words = new Array(NO_OF_WORDS);

	// reversing some words based on the level
	var reverse_indices = getReverseIndices(words, no_reverse);

	for(var i=0; i<NO_OF_WORDS; i++){
		if(reverse_indices.indexOf(i) != -1){
			final_words[i] = reverseWord(sorted_words[i]);
		}else{
			final_words[i] = sorted_words[i];
		}
	}
	
	// gridArray = generateGrid(NO_OF_WORDS,reverse_indices, final_words, GRID_LENGTH, gridArray);
	try {
		grid_done = generateGrid(NO_OF_WORDS,reverse_indices, final_words, GRID_LENGTH);
		return [true, gridArray, GRID_LENGTH];
	}
	catch(error) {
		alert(error +" " + " for the----  " +sentence +" --- grid not formed ");
		return false;
	}
	
}


// looping over the words in the sentence and fitting it in the grid
function generateGrid(NO_OF_WORDS,reverse_indices,final_words,GRID_LENGTH){

	var initialGrid = gridArray;
	var word_present = false;
	for(var i=0; i < NO_OF_WORDS; i++){
		count1 = 0;
		var word = final_words[i];
		word_set = false;
		var word_details;

		while(!(word_set)){

			if(count1<MAX_FUNC_CALL){
				var word_parameters = wordParameters(word,GRID_LENGTH);
				if(word_parameters[1]){
					word_details = setWord(word,word_parameters[0]);
					word_set = word_details[0];
				}else{
					gridArray = initialGrid;
					initial_letters =[];
					return generateGrid(NO_OF_WORDS,reverse_indices,final_words,GRID_LENGTH);
				}
			}
			else{
				break;
			}
			count1++;
		}

		if(!word_set){
			count1=0;
			words_pos_column=[];
			words_pos_row = [];
			initial_letters =[];
			gridArray = matrix(GRID_LENGTH,GRID_LENGTH);
			return generateGrid(NO_OF_WORDS,reverse_indices,final_words,GRID_LENGTH);
		}
		word_present = wordAlreadyFound(word);
		if(reverse_indices.indexOf(i) != -1){
			var temp_row = word_parameters[0][1]; var temp_column = word_parameters[0][0];
			for(var j=1; j<word.length; j++){
				if(word_parameters[0][2] == 0){
					temp_column++;
				}else if(word_parameters[0][2] == 1){
					temp_row++;
				}else if(word_parameters[0][2] == 2){
					temp_row++;
					temp_column++;
				}else if(word_parameters[0][2] == 3){
					temp_row--;
					temp_column++;
				}
			}
			words_pos_row.push(temp_row);
			words_pos_column.push(temp_column);
		}else{
			words_pos_row.push(word_parameters[0][1]);      //get the row and col at which words of sentence are placed
			words_pos_column.push(word_parameters[0][0]); 
		}
		if(i>= NO_OF_WORDS){
			break;
		}
		if(word_set){
			let new_word_info =  word_details[1];
			initial_letters.push(new_word_info);s
		}
	}

	gridArray = ibGameFillGrid(gridArray,GRID_LENGTH);
	return true;
}

//reverses one particular word
function reverseWord(word){
	return word.split("").reverse().join("");
}

// generates the starting positions and direction for each word in the sentence
function wordParameters(word,GRID_LENGTH){
	var fit = false;
	var word_length = word.length;
	var pos_x;
	var pos_y;
	var direction;
	var arr = new Array(3);
	var count = 0;
	while(!(fit)){
		if(count<MAX_FUNC_CALL){
			pos_x = Math.floor(Math.random()*(GRID_LENGTH)); //pos_x
			pos_y = Math.floor(Math.random()*(GRID_LENGTH)); //pos_y
			direction = Math.floor(Math.random()*4); //direction
			//checking if the word will fit in the grid with the given parameters
			if(direction == 0){
				if(pos_x+word_length<GRID_LENGTH){
					fit = true;
					arr[0] = pos_x;
					arr[1] = pos_y;
					arr[2] = direction;
					return [arr,fit];
				}else{
					fit = false;
				}
			}else if(direction == 1){
				if(pos_y+word_length<GRID_LENGTH){
					fit = true;
					arr[0] = pos_x;
					arr[1] = pos_y;
					arr[2] = direction;
					return [arr,fit];
				}else{
					fit = false;
				}
			}else if(direction == 2){
				if(pos_x+word_length<GRID_LENGTH && pos_y+word_length<GRID_LENGTH){
					fit = true;
					arr[0] = pos_x;
					arr[1] = pos_y;
					arr[2] = direction;
					return [arr,fit];
				}else{
					fit = false;
				}
			}else if(direction ==3){
				if(pos_x+word_length<GRID_LENGTH && pos_y>word_length){
					fit = true;
					arr[0] = pos_x;
					arr[1] = pos_y;
					arr[2] = direction;
					return [arr,fit];
				}else{
					fit = false;
				}
			}
		}else{
			return [arr,false];
		}
		count++;
	}
	
}

// randomly decide which words are to be reversed
function getReverseIndices(words, no_reverse){
	var indices = [];
	for(var i=0; i<no_reverse; i++){
		do{
			index = Math.floor(Math.random()*NO_OF_WORDS);
		}while(indices.indexOf(index) != -1)
		indices[i] = index;
	}
	return indices;
}

// generate the number of top-down, left-right, diagonal, and reverse words to be presented in the grid
function difficultyParameters(ibGamelevel, words){
	var parameters = new Array(no_of_parameters);
	parameters[0] = Math.floor((33*NO_OF_WORDS)/100);
	parameters[1] = Math.floor((33*NO_OF_WORDS)/100);
	parameters[2] = Math.floor((33*NO_OF_WORDS)/100);
	var diff = NO_OF_WORDS - (parameters[0]+parameters[1]+parameters[2]);
	if(diff != 0){
		parameters[2]+=diff;
	}
	if(ibGamelevel==0){
		parameters[3] = 0;
	}else if(ibGamelevel == 1){
		parameters[3] = Math.floor((20*NO_OF_WORDS)/100);
	}else if (ibGamelevel>1){
		parameters[3] = Math.floor((50*NO_OF_WORDS)/100);
	}
	return parameters;
}

// initializing the matrix
function matrix( rows, cols){
	var arr = [];
	for(var i=0; i < rows; i++){
		arr.push([]);
		arr[i].push( new Array(cols));
		for(var j=0; j < cols; j++){
			arr[i][j] = INITIAL_VALUE;
		}
	}
	return arr;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

//sets a word in the grid; sends true if successful, false otherwise
function setWord(word,word_parameters){
	var column = word_parameters[0];
	var row = word_parameters[1];
	var direction = word_parameters[2];
	var initial_grid = gridArray;
	var temp_gridArray = gridArray;
	var first_row;
	var first_col;
	var second_row;
	var second_col;
	var first_letter;
	var second_letter;
	var reverse_word = isWordReversed(word);

	for(var i = 0; i<word.length; i++){
		if(temp_gridArray[row][column] === INITIAL_VALUE || temp_gridArray[row][column] === word.charAt(i)){
			// storing the coordinates of the first and second letter of the words
			if(reverse_word){
				if(i==(word.length-1)){
					first_row = row;
					first_col = column;
					first_letter = word.charAt(word.length-1);
				}else if(i==(word.length-2)){
					second_row = row;
					second_col = column;
					second_letter = word.charAt(word.length-2);
				}
			}else{
				if(i==0){
					first_row = row;
					first_col = column;
					first_letter = word.charAt(0);
				}else if(i==1){
					second_row = row;
					second_col = column;
					second_letter = word.charAt(1);
				}	
			}
			temp_gridArray[row][column] = word.charAt(i);
		}else{
			gridArray = initial_grid;
			return false;
		}

		if(direction == 0){
			column++;
		}else if(direction == 1){
			row++;
		}else if(direction == 2){
			row++;
			column++;
		}else if(direction == 3){
			row--;
			column++;
		}
	}
	
	var new_word = new wordInitialsPosition(word, first_letter, second_letter, first_row, first_col, second_row, second_col);
	gridArray = temp_gridArray;
	return [true,new_word];
}

// returns true if word is reversed, false otherwise
function isWordReversed(word){
	return (words.indexOf(word) == -1)?true:false;
}

//getting a letter from a set depending upon level
function letterToFill(){
	var letters_from_set = []

	letters_from_set[0] = 0.30 + (0.1*ibGamelevel);
	letters_from_set[1] = 0.60 + (0.1*ibGamelevel);
	letters_from_set[2] = 0.98 - (0.1*ibGamelevel);
	letters_from_set[3] = 1 -(letters_from_set[0] + letters_from_set[1] + letters_from_set[2] + letters_from_set[3]);

	return letters_from_set;
}

// fill the remaining grid with random alphabets; modify this code to minimize the probablity of finding other words
function ibGameFillGrid(gridArray,GRID_LENGTH){
	var LETERS_FROM_SET = letterToFill();

	for(var i=0; i<GRID_LENGTH; i++){
		for(var j=0; j<GRID_LENGTH; j++){
			var r =Math.random();
			if(gridArray[i][j] === INITIAL_VALUE){
				if(r<LETERS_FROM_SET[0]){                                //filling alphabets according to probability of its occurrence in all english words
					gridArray[i][j] = alpha_very_rare.charAt(getRandomInt(alpha_very_rare.length));
				}else if(r<LETERS_FROM_SET[1]){
					gridArray[i][j] = alpha_rare.charAt(getRandomInt(alpha_rare.length));
				}else if(LETERS_FROM_SET[2]){
					gridArray[i][j] = alpha_common.charAt(getRandomInt(alpha_common.length));
				}else if(LETERS_FROM_SET[3]){
					gridArray[i][j] = alpha_very_common.charAt(getRandomInt(alpha_very_common.length));
				}else{
					gridArray[i][j] = alpha_most_common.charAt(getRandomInt(alpha_most_common.length));
				} 
			} 
		}
	}
	return gridArray;
}

// deciding the grid length depending on the longest word length and the sentence length
function gridLength(sentence, longest_word){
	return (Math.floor(Math.sqrt(sentence.length)) > longest_word.length?Math.floor(Math.sqrt(sentence.length)):longest_word.length)+1;
}
// for hiding the words of the sentence
function hideWords(sorted_words, ind){
	if(ind>=0 && ind < sorted_words.length){
		if(sorted_words[ind].length > 1 && hidden_words_array[ind]==false){
			sorted_words[ind] = 	starify(sorted_words[ind]);
			hidden_words_array[ind]	= true;
		}else if(sorted_words[ind].length == 1 || hidden_words_array[ind]){
			hideWords(sorted_words, ind-1);
		}	
	}
	return sorted_words;
}

// for creating sentence with stars instead of letters
function starSentence(sentence){
	let sorted_words = getSortedWordList(sentence);
	var starSen = "";
	let words_array_length = sorted_words.length;
	for(let i =0; i<words_array_length; i++){
		hidden_words_array[i] = false;
	}
	no_words_hidden = ibGameWordsHidden;
	if(no_words_hidden >= words_array_length){
		no_words_hidden = words_array_length;
	}
	for(let i=0; i<no_words_hidden; i++){
		let ind = words_array_length - i -1;
		sorted_words = hideWords(sorted_words,ind);
	}

	// if(ibGamelevel == 0){			// beginner level
	for(var i=0; i<sorted_words.length; i++){
		starSen += sorted_words[i]+" ";
	}
	// } else if (ibGamelevel == 1){			//intermediate level
	// 	for(var i=0; i<sorted_words.length; i++){
	// 		if(sorted_words[i].length>=4){				//show larger words and show first letter of smaller words
	// 			starSen+=sorted_words[i] + " ";
	// 		}else if(sorted_words[i].length==1){
	// 			starSen+=sorted_words[i] + " ";
	// 		}else{
	// 			starSen+=sorted_words[i].charAt(0)+starify(sorted_words[i]).substring(1)+" ";
	// 		}
	// 	}
	// }	else if(ibGamelevel == 2){	// hard level
	// 	for(var i=0; i<sorted_words.length; i++){
	// 		if(sorted_words[i].length>=4){							
	// 		// show first and last letter of larger words and hide smaller words
	// 			var wordLength = sorted_words[i].length - 1;
	// 			starSen+=sorted_words[i].charAt(0)+starify(sorted_words[i]).substring(1, wordLength)+ sorted_words[i].charAt(wordLength) +" ";
	// 		}else if(sorted_words[i].length==1){
	// 			starSen+=sorted_words[i]+" ";
	// 		}else{
	// 			starSen+=starify(sorted_words[i])+" ";
	// 		}
	// 	}
	// }else{				// very hard
	// 	for(var i=0; i<sorted_words.length; i++){
	// 		if(sorted_words[i].length==1){
	// 			starSen+=sorted_words[i]+" ";
	// 		}else{
	// 			starSen+=starify(sorted_words[i])+" ";
	// 		}
	// 	}
	// }
	
	return starSen;
}

// for replacing stars in sentence with letters
function replaceStars(word,strArray,pos, star_sentence){
	var starWords=[] ;
	var strikeWord = " ";
	var wordPos = pos;
	starWords = star_sentence.split(sentence_splitter);			//split the star sentence to get an array with words with *
	for(let i=0; i<starWords.length;i++){
		if(starWords[i] == '<span'){
			starWords[i] = starWords[i] + " "+ starWords[i+1];
			starWords.splice(i+1,1);
		}
	}
	for(let i=0; i<word.length; i++){								//replace the * with the letters of word found
		starWords[wordPos]=starWords[wordPos].replace(starWords[wordPos].charAt(i),word.charAt(i)); 
		var replacement = "<span style='color:#45b9bc'>" + starWords[wordPos] +"</span>";
		strikeWord = starWords[wordPos].replace(starWords[wordPos], replacement);
	}
	hidden_words_array[wordPos] = false;
	starWords[wordPos] = strikeWord;

	star_sentence= starWords.join(sentence_splitter);				//star sentence now changed, have the words found
	// countTrue+=1;
	if(game_timer>FIRST_HINTS_TIME){
		ibg_score=ibg_score+(score_each_letter[0]*word.length);
	}else if(game_timer>SECOND_HINTS_TIME){
		ibg_score=ibg_score+(score_each_letter[1]*word.length);
	}else{
		ibg_score=ibg_score+(score_each_letter[2]*word.length);
	}

	return star_sentence;
}

// check whether the word is already found by the user or not
function wordAlreadyFound(word){
	for(var i=0; i<word_already_found.length; i++){                //if the word was found before or not
		if(word_already_found[i].search(word) != -1 && word.length == word_already_found[i].length){
			return true;
		}
	}
	return false;
}
// word_already_found
// check whether the word is already found by the user or not
function extraWordAlreadyFound(word){
	for(var i=0; i<extra_word_already_found.length; i++){                //if the word was found before or not
		if(extra_word_already_found[i].search(word) != -1 && word.length == extra_word_already_found[i].length){ 
			return true;
		}
	}
	return false;
}

// for checking if the word selected by user by swiping is in sentence or not and also if the user found a word before or not
function searchWordInArray(str, sorted_words, star_sentence, sentence) {    
	var found= false; var present = false;        //for the words in sentence whether it is found before or not
	var extra_present = false;                   //to check if the word (not in sentence) has been found before or not
	var strArray = getSortedWordList(sentence);
	var word_str = str;

	present = wordAlreadyFound(str);
	if(present === false){    //search word in the array of words of sentence
		for (var j=0; j<strArray.length; j++){               
			if(strArray[j].search(str) !=-1 && str.length== strArray[j].length){
				isValidWord = true;
				found = true;

				word_already_found.push(str);
				words_pos_row.splice(j,1,'_');           //replace positions of the words already found with '*'
				words_pos_column.splice(j,1,'_');    
				star_sentence = replaceStars(str,strArray,j, star_sentence);      //if correct word found replace stars with the word
				countTrue++;
				const word_ind = ibgWordsNeeded - countTrue + 1;
				if(document.getElementById("ibg-pBar"+word_ind)) {
					document.getElementById("ibg-pBar"+word_ind).style.backgroundColor = "rgba(1, 113, 116, 1)";
				}
			}
		}

		if(found == false){            //if word found is incorrect 
			extra_present = extraWordAlreadyFound(str);
			if(extra_present === true){         //if the word not present in sentence is already found

			}else if(extra_present ===false){
				var word_in_dictionary = Word_List.isInList(str);      //check in dictionary, maybe the word is valid but not part of sentence

				if(word_in_dictionary && str.length>=min_bonus_word_length){
					isValidWord = true;
					extra_word = true;
					extra_word_already_found.push(str);
					ctx.strokeStyle = "black";
					ibg_score = ibg_score+bonus_word_score;
				
				}
			}
		}
	}

	if(countTrue >= (ibgWordsNeeded) && found){
		if(success == true){
			isFirstAttempt = false;
		}
		if(isFirstAttempt){
			success = true;
		}
		showSentence();
	}
	return star_sentence;
}

//shows full sentence for some time and then ask about relation with a word
function showSentence(){
	countTrue=0;
	delay_show_sentence = 100;
	// showing the congrats msg, it has 45 char
	before_sentence_time = (Math.ceil((45)/average_reading_speed))*1000;
	var total_characters = 0;
	for (let i = 0; i < words.length; i++){
		total_characters += words[i].length;
	}

	sentence_time = (Math.ceil((total_characters)/average_reading_speed))*1000 + 100;
	if (sentence_time < 2000){
		sentence_time = 2000;
	}
	
	countdownReset();
	clearInterval(inactivity_check_interval);

	// showing the congrats msg
	setTimeout(function(){
		// $(".extra-col").addClass("d-none");
		$('.game-over-flex-row').removeClass("d-flex");
		$('.game-over-row').addClass("d-none");
		$(".sentence-word-row").removeClass("d-none");
		$(".congrats-msg").removeClass("d-none");
		$(".canvas-row").addClass("d-none");
		$(".controls-row").addClass("d-none");
		$('.hints-col').addClass("d-none");
		// $('.score-col').addClass("d-none");
		$(".sentence-col").addClass("d-none");
	}, delay_show_sentence );

	// the event is dispatched
	setTimeout(function(){
		iBGSentenceDialogEvent = document.createEvent('CustomEvent');
		iBGSentenceDialogEvent.initCustomEvent('iBGameSentenceDialogFun');
		window.dispatchEvent(iBGSentenceDialogEvent);
	}, delay_show_sentence+before_sentence_time);
// show the sentence
	// setTimeout( function() {
	// 	$(".congrats-msg").addClass("d-none");
	// 	console.log(document.getElementById('complete-sentence'));
	// 	document.getElementById("complete-sentence").innerHTML= sentence_array[sentence_number];
	// 	$('.complete-sentence').removeClass("d-none");
	// 	console.log('sentence showing time', sentence_time);
	// }, delay_show_sentence+before_sentence_time + eventTime);

// //show the sentence for some seconds and ask relation after some time
// 	setTimeout(function(){
// 		console.log('sentence showing time', sentence_time);
// 		$(".complete-sentence").delay(delay_show_sentence).addClass("d-none");
// 		$("coins").delay(delay_show_sentence).addClass("d-none");
// 		document.getElementById("sentence_word").innerHTML = sentence_word_array[sentence_number];
// 		$("#word").delay(delay_show_sentence).removeClass("d-none");
// 		start_time = Date.now();
// 	}, delay_show_sentence+before_sentence_time+sentence_time + eventTime);				
 
// 	coins = final_coins+20;         // /100 to adjust for the time showing the sentence   
// 	coins_rem = setInterval(function(){ 
// 		if(coins>0){
// 			coins-=10 ; 
// 			if(document.getElementById("ibg-coins")!=null){
// 				document.getElementById("ibg-coins").innerHTML = coins;
// 			}		
// 		}
// 		else{
// 			coins=0;
// 		}
// 	}, delay_show_sentence+before_sentence_time);//after delay of some seconds show the word and ask about relation with sentence
}
ibGameTrainingSen = function() {
	// const eventTime = 20;
	$(".congrats-msg").addClass("d-none");
	document.getElementById("complete-sentence").innerHTML= sentence_array[sentence_number];
	$('.complete-sentence').removeClass("d-none");

	//show the sentence for some seconds and ask relation after some time
	setTimeout(function(){
		$(".complete-sentence").delay(delay_show_sentence).addClass("d-none");
		$("coins").delay(delay_show_sentence).addClass("d-none");
		document.getElementById("sentence_word").innerHTML = sentence_word_array[sentence_number];
		$("#word").delay(delay_show_sentence).removeClass("d-none");
		start_time = Date.now();
	}, delay_show_sentence+before_sentence_time+sentence_time);				
 
	coins = final_coins+20;         // /100 to adjust for the time showing the sentence   
	coins_rem = setInterval(function(){ 
		if(coins>0){
			coins-=10 ; 
			if(document.getElementById("ibg-coins")!=null){
				document.getElementById("ibg-coins").innerHTML = coins;
			}		
		}
		else{
			coins=0;
		}
	}, delay_show_sentence+before_sentence_time);//after delay of some seconds show the word and ask about relation with sentence

}

// Making canvas and finding the word swiped by the user
function foundWord(sentence,sentence_word){
	word_already_found.splice(0,word_already_found.length);			//make arrays empty before the next sentence is shown 
	extra_word_already_found.splice(0,extra_word_already_found.length);
	words_pos_row.splice(0,words_pos_row.length);
	words_pos_column.splice(0,words_pos_column.length);

	// document.getElementById("complete-sentence").innerHTML = sentence;
	// document.getElementById("sentence_word").innerHTML = sentence_word;

	var gridParameters = ibGameMakeGridArray(sentence);
	var GRID_LENGTH = gridParameters[2];
	playGrid = gridParameters[1];
	star_sentence = starSentence(sentence);      //sentence with stars instead of letters
	document.getElementById('stars').innerHTML = star_sentence;
	var sorted_words = getSortedWordList(sentence);
	makeCanvasGrid(playGrid,sorted_words,sentence,GRID_LENGTH);
	
	// var storeWord;
	document.getElementById('score').innerHTML = ibg_score;
}

//swipe detection
function detectSwipe(playGrid,canvas,rect,sorted_words,sentence){
	var storeLetter = [];
	var canSwipe = new Hammer.Manager(canvas, {
						recognizers: [
							[Hammer.Swipe,{ direction: Hammer.DIRECTION_ALL }],
						]
					});
		
	canSwipe.get("swipe").set({pointer:0, velocity: 0.001, threshold: 0, direction: Hammer.DIRECTION_ALL });
	canSwipe.on("swipe", function(eventObject) {         
		var pointer_x=startX;
		var pointer_y=startY;
		var angle=eventObject.angle;															//angle of swiping
		var distance_swiped_x=eventObject.deltaX;
		var distance_swiped_y=eventObject.deltaY;
		var distance_swiped=eventObject.distance;

		var row_num = Math.floor(Math.abs(pointer_y/rowHeight));					//final position of swipe in terms of rows and columns
		var column_num = Math.floor(Math.abs(pointer_x/columnWidth));
		var no_of_rows = Math.ceil((Math.abs(distance_swiped_y))/(rowHeight));					//no. of rows swiped as swipe is from letter to letter which is in the middle of the cell
		var no_of_cols = Math.ceil((Math.abs(distance_swiped_x))/(columnWidth));
		var row_for_diag = Math.ceil((distance_swiped/(Math.sqrt((rowHeight*rowHeight)+(columnWidth*columnWidth)))));
		//checking swipes according to angles
		if(angle<-125&&angle>-145){ //UP-LEFT SWIPE...  
			swipe_direction = 0;
			for(var rDiag= 0; rDiag < row_for_diag; rDiag ++){
				if(row_num <playGrid.length && column_num <playGrid.length  && row_num>=0 && column_num>=0){
					storeLetter[rDiag] = playGrid[row_num][column_num];
					last_row = letters_y_coordinate[(row_num)];
					last_column = letters_x_coordinate[(playGrid.length)*(column_num)];
					row_num--;
					column_num--;
				}
			}
		}else if(angle < -35 && angle > -55){ //UP-RIGHT SWIPE...
			swipe_direction = 1;
			for(var rDiag= 0; rDiag < row_for_diag; rDiag ++){
				if(row_num <playGrid.length && column_num <playGrid.length  && row_num>=0 && column_num>=0){
					storeLetter[rDiag] = playGrid[row_num][column_num];
					last_row = letters_y_coordinate[(row_num)];
					last_column = letters_x_coordinate[(playGrid.length)*(column_num)];
					row_num--;
					column_num ++;
				}
			}
		}else if(angle < 55 && angle > 35 ){//DOWN-RIGHT SWIPE...
			swipe_direction = 2;
			for(var rDiag= 0; rDiag < row_for_diag; rDiag ++){
				if(row_num <playGrid.length && column_num <playGrid.length  && row_num>=0 && column_num>=0){
					storeLetter[rDiag] = playGrid[row_num][column_num];
					last_row = letters_y_coordinate[(row_num)];
					last_column = letters_x_coordinate[(playGrid.length)*(column_num)];
					row_num++;
					column_num++;
				}
			}
		}else if(angle >125 && angle <145){ //DOWN-LEFT SWIPE...
			swipe_direction = 3;
			for(var rDiag= 0; rDiag < row_for_diag; rDiag ++){
				if(row_num <playGrid.length && column_num <playGrid.length  && row_num>=0 && column_num>=0){
					storeLetter[rDiag] = playGrid[row_num][column_num];
					last_row = letters_y_coordinate[(row_num)];
					last_column = letters_x_coordinate[(playGrid.length)*(column_num)];
					row_num++;
					column_num--;
				}
			}
		}else if(angle <= -80 && angle >= -100){		//up swipe
			swipe_direction = 4;
			for(var rVer=0; rVer< no_of_rows; rVer++){
				if(row_num <playGrid.length && column_num <playGrid.length && row_num>=0 && column_num>=0){
					storeLetter[rVer] = playGrid[row_num][column_num];
					last_row = letters_y_coordinate[(row_num)];
					last_column = letters_x_coordinate[(playGrid.length)*(column_num)];
					row_num--;
				}
			}
		}else if(angle <=100 && angle >= 80){			// down swipe
			swipe_direction = 5;
			for(var rVer=0; rVer< no_of_rows; rVer++){
				if(row_num <playGrid.length && column_num <playGrid.length  && row_num>=0 && column_num>=0){
					storeLetter[rVer] = playGrid[row_num][column_num];
					last_row = letters_y_coordinate[(row_num)];
					last_column = letters_x_coordinate[(playGrid.length)*(column_num)];
					row_num++;
				}
			}
		}else if(angle >= -10 && angle <=10){ //right swipe
			swipe_direction = 6;
			for(var cHor=0; cHor < no_of_cols ; cHor++){
				if(row_num <playGrid.length && column_num <playGrid.length  && row_num>=0 && column_num>=0){
					storeLetter[cHor] = playGrid[row_num][column_num];
					last_row = letters_y_coordinate[(row_num)];
					last_column = letters_x_coordinate[(playGrid.length)*(column_num)];
					column_num++;
					
				}
			}
		}else if((angle <=-170 && angle >= -180) || (angle>=170 && angle <=180)){ //left swipe
			swipe_direction = 7;
			for(var cHor=0; cHor < no_of_cols ; cHor++){
				if(row_num <playGrid.length && column_num <playGrid.length  && row_num>=0 && column_num>=0){
					storeLetter[cHor] = playGrid[row_num][column_num];
					last_row = letters_y_coordinate[(row_num)];
					
					last_column = letters_x_coordinate[(playGrid.length)*(column_num)];
					column_num--;
				}
			}  
		}else{
			storeLetter = sentence_splitter;
		}
	
		if(storeLetter==sentence_splitter){
			var storeWord;
			storeLetter = [];  
		}else{
		  var storeWord = storeLetter.join("");    //the word swiped by user
			var sendWord = storeWord;
			// last_row = letters_y_coordinate[row_num];
			if(store_swiped_letter[store_swiped_letter.length-1]!=storeWord.charAt(storeWord.length-1)){
				storeWord+=store_swiped_letter[store_swiped_letter.length-1];
				last_row = letters_y_coordinate[row_num];
				last_column = letters_x_coordinate[(playGrid.length)*(column_num)];
			}

				sendWord = storeWord;
				star_sentence = searchWordInArray(sendWord,sorted_words,star_sentence, sentence);  //if word present in sorted words array
				document.getElementById('stars').innerHTML = star_sentence;
				document.getElementById('score').innerHTML = ibg_score;
				storeLetter = [];    //clear storeLetter to store another set of letters
			
		}
	});
	$(document).on("click","#exit", "#btn-next-sentence, .btn-other-sentence", function(ev){
		canSwipe.destroy();
	});
}

//show a word of the sentence and then ask users of find it in the grid
function showWord(sentence){
	words = getSortedWordList(sentence);
	var pos;
	var word;
	// if(ibGamelevel==1){
	// 	for(let i=0; i< words.length; i++){
	// 		if(words[i].length>1 && words[i].length<4){
	// 			pos = i;
	// 			word = words[pos];
	// 			present = wordAlreadyFound(word);
	// 			if(present == false){
	// 				document.getElementById("aWord").innerHTML = "Find the word: " + word ;
	// 				return true;
	// 			}
	// 		}
	// 	}
	// 	document.getElementById("Button").disabled = true;
	// 	return false;
	// }
	if(no_words_hidden>=1){
		pos  = getRandomInt(words.length);
		word = words[pos];
		present = wordAlreadyFound(word);
		if(present == true){
			showWord(sentence);
		}else if(present == false){
			document.getElementById("aWord").innerHTML = word ;
			return true;
		}
	}
	return false;
}

function showFirstLetterCoordinates() {
	let index = Math.floor(Math.random() * (NO_OF_WORDS));
	let show_row_no = words_pos_row[index];
	let show_col_no = words_pos_column[index];
	if(Number.isInteger(show_row_no)) {
		//showFirstLetterCoordinates();
		document.getElementById("wordCoordinates").innerHTML="Find a word starting at "+"<br>"+"row: "+(show_row_no+1)+" & column: "+(show_col_no+1);
		return true;
	}else{
		showFirstLetterCoordinates();
	}
	
}

//On asking whether the sentence is related a given word or not
function checkResponseYes(response){
	if(response == true){          //'Yes' option for a word with positive valence  
		$('#correct').removeClass("d-none");
		$('#wrong').addClass("d-none");
		answer = true;
	}
	else if(response == false ){
		//if user choose yes for a word with negative valence
		if(sentence_trick[sentence_number]){
			showSincerityMessage();
		}
		$('#correct').addClass("d-none");
		$('#wrong').removeClass("d-none");
		answer = false;
	}
}

function checkResponseNo(response){			//if user choose 'NO' for a negative word that's correct
	if(response == true){
		if(sentence_trick[sentence_number]){
			showSincerityMessage();
		}
		$('#correct').addClass("d-none");
		$('#wrong').removeClass("d-none");
		answer = false;
	}
	else if(response == false){
		$('#correct').removeClass("d-none");
		$('#wrong').addClass("d-none");
		answer = true;
	}
}
ibGameCorrectResponse = function() {
	return sentence_response_array[sentence_number];
}

function showSincerityMessage(){
	delay_sentence_word_message = 10000;	// showing this message for a longer time
	var message;
	if(sentence_word_valence[sentence_number]){		// true means word was positive but unrelated
		message = "Think about the sentence word relation carefully. The word is positive but not related to the sentence.";
	}else{											// false means word was negative but related
		message = "Think about the sentence word relation carefully. The word is negative but related to the sentence.";
	}
	$("#sincerity-message").text(message);
}

//function for hints, it gives a shuffled word and user has to find the acutal word
// function guessWord(sentence){
// 	var words = getSortedWordList(sentence);
// 	var pos_word;
// 	var word_to_guess;
// 	var shuffled_word;
// 	if(ibGamelevel==1){
// 		for(let i=0; i< words.length; i++){
// 			if(words[i].length>1 && words[i].length<4){
// 				pos_word = i;
// 				word_to_guess = words[pos_word];
// 				present = wordAlreadyFound(word_to_guess);
// 				if(present == false){
// 					shuffled_word = word_to_guess.shuffle();
// 					document.getElementById('unscrambleWord').innerHTML = "Unjumble the Word: " + shuffled_word;        
// 					return true;
// 				}
// 			}
// 		}
// 		document.getElementById("unscrambleWord").innerHTML = "All words are already shown."
// 		return false;
// 	}
// 	if(ibGamelevel>1){
// 		pos_word = getRandomInt(words.length);
// 		word_to_guess = words[pos_word];
// 		present = wordAlreadyFound(word_to_guess);
// 		if(present == false){
// 			shuffled_word = word_to_guess.shuffle();
// 			document.getElementById('unscrambleWord').innerHTML = "Unjumble the Word: " + shuffled_word;        
// 			return true;
// 		}else if(present == true){
// 			// guessWord(sentence);
// 		}
// 	}
// 	document.getElementById("unscrambleWord").innerHTML = "All words are already shown."
// 	return false;
// }

String.prototype.shuffle = function () {        //function to shuffle a string
	var a = this.split(""),
	n = a.length;

	for(var i = n - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var tmp = a[i];
		a[i] = a[j];
		a[j] = tmp;
	}
	return a.join("");
}
function drawBoard(playGrid,context,bw,bh){                           //making grid on canvas
	var row = 0;
	var column=0;
	
	for(var x=0; x<bw; x+=columnWidth) {
		row=0;
		for(var y=0; y<bh; y+=rowHeight) {
			number = playGrid[row][column];
			context.font = canvas_font_width+"px serif";
			textwidth.push(context.measureText(number).width);
			context.fillText(number,x+(rowHeight/2),y+(columnWidth/2));
			letters_x_coordinate.push(x+(rowHeight/2));
			letters_y_coordinate.push(y+(columnWidth/2));
			
			row++;
		}
		column++;
	}
	context.strokeStyle = "black";
	document.getElementById("canvas").innerHTML = context.stroke();   
	imageData = context.getImageData(0,0,canvas.width,canvas.height);             // save the current stage of the canvas every time as an image
}

function makeCanvasGrid(playGrid,sorted_words,sentence,GRID_LENGTH){
	letters_x_coordinate.splice(0,letters_x_coordinate.length);		//make arrays empty for every new canvas
	letters_y_coordinate.splice(0,letters_y_coordinate.length);

	margin_left = 10;
	canvas_width = document.getElementById("canvas").width;
	canvas_height = canvas_width;
	var number;
	
	// set rowHeight and columnWidth for each canvas grid
	columnWidth = Math.floor(canvas_width/GRID_LENGTH);	//Math.floor((window.innerWidth-20)/GRID_LENGTH);
	rowHeight = Math.floor(canvas_height/GRID_LENGTH);

	var bw = GRID_LENGTH*columnWidth;					//box width
	var bh = GRID_LENGTH*rowHeight;						//box height
	

	document.getElementById("canvas").height = canvas_height;				//dimensions for canvas
	document.getElementById("canvas").width = canvas_width;

	$(".stars").css("width", canvas_width+"px");
	canvas_font_width = columnWidth>COLUMN_WIDTH_BREAKPOINT?18:15;
	canvas_font_width_highlight = canvas_font_width + 5;

	canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	drawBoard(playGrid,context,bw,bh);

	for(var i=0; i < letters_x_coordinate.length;i++){
		 coordinates.push({                   //coordinates of the square around every letter on the grid, used to detect the letters swiped
			coord_x : letters_x_coordinate[i] - (columnWidth/SQUARE_DIM),
			coord_y : letters_y_coordinate[i] - (rowHeight/SQUARE_DIM),
			w : letters_x_coordinate[i] + (columnWidth/SQUARE_DIM),
			h : letters_y_coordinate[i] + (rowHeight/SQUARE_DIM)
		});
	}
	
	ctx = canvas.getContext("2d");
	bounds = canvas.getBoundingClientRect();
	canvas.onmousedown = onmousedown;			//mouse events
	canvas.onmouseup = onmouseup;
	canvas.onmousemove = onmousemove;
	canvas.onmouseout = onmouseout;				//when mouse pointer leaves the canvas
	
	// Set up touch events for mobile, etc
	canvas.addEventListener("touchstart", function (e) {
		e.preventDefault();
		var touchPos = getTouchPos(canvas, e);
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousedown", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);

	canvas.addEventListener("touchend", function (e) {
		e.preventDefault();
		var touch = e.changedTouches[0];
		var mouseEvent = new MouseEvent("mouseup", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);

	canvas.addEventListener("touchmove", function (e) {      
		e.preventDefault();
		var touch = e.touches[0];
		var touchPos = getTouchPos(canvas,e);
		var mouseEvent = new MouseEvent("mousemove", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);
	canvas.addEventListener("touchcancelled", function(e){
		e.preventDefault();;
		var mouseEvent = new MouseEvent("mouseout", { });
		canvas.dispatchEvent(mouseEvent);
	},false);
	hasLoaded = true;
	draw();
	detectSwipe(playGrid,canvas,bounds,sorted_words,sentence);
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
function draw(){
	getStartPointOfLine();       
	ctx.lineWidth = line_width;         //properties of line drawn
	ctx.globalAlpha = 0.50;
	ctx.lineCap = "round";
			
	//lines made previously are stored in an array and then drawn again
	if(existing_lines_length >=0 && lineDrawn ===false){
		line = existingLines[existing_lines_length];				//drawing only newly made lines again not all the lines
		ctx.globalAlpha = 0.5;
		ctx.globalCompositeOperation="destination-over";
		ctx.beginPath();
		ctx.moveTo(line.startX+4,line.startY-4);
		ctx.lineTo(line.endX+4,line.endY-4);
		ctx.strokeStyle = line.lineColor; 
		ctx.stroke();
		countLine++;
		lineDrawn = true;
	}
	imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
	
	//while user is swiping, draw lines
	if(isDrawing) {
		ctx.strokeStyle = line_color_set_sentence_words[color_number];
		ctx.globalAlpha = 0.5;
		ctx.lineWidth = line_width;
		ctx.beginPath();
		ctx.lineCap = "round";
		ctx.moveTo(startX+3,startY-3);									//shifting line to align on alphabets properly
		ctx.lineTo(mouseX+3,mouseY-3);
		ctx.stroke();
	}

	showLetter(mouseX, mouseY);
}

function showLetter(x, y){
	if(coordinates.contains(x, y)){
		// showSelectedWord(store_swiped_letter[store_swiped_letter.length-1]);
	}
}

// used for deciding whether the mouse pointer is in the small square around the letter coordinates of the grid or not
Array.prototype.contains = function(x,y){
	for(var i=0; i<playGrid.length; i++){
		var coordinate_x = coordinates[playGrid.length*i];
		if(x < coordinate_x.w && x > (coordinate_x.coord_x)){
			for(var j=0; j<playGrid.length; j++){
				var coordinate_y = coordinates[j];
				if(y<coordinate_y.h && y>(coordinate_y.coord_y) && !(i==previous_i && j==previous_j)){
					previous_i=i;
					previous_j=j;
					store_swiped_letter.push(playGrid[j][i]);
					return true;
				}
			}
			return false;
		}
	}
}

//starting co-ordinates of the line drawn during swipe
function getStartPointOfLine(){
	var initialX = startX;
	var initialY = startY;
	for(var i=0; i<letters_x_coordinate.length ; i++){
		if(initialX < letters_x_coordinate[i] + (columnWidth/2)){			//check which is the nearest alphabest to the starting point of the swipe      
			startX = letters_x_coordinate[i];								//beginning of line changed to the co-ordinates of the nearest alphabet
			if(initialY < letters_y_coordinate[i] + (rowHeight/2)){
				startY = letters_y_coordinate[i] ;
				return;
			}     
		}
	}
	startX = initialX;
	startY = initialY;
	return;
}

function onmousedown(e){
	// alert("mousedown fun called");
	if(!(game_paused)){
		inactivity_time=0;
		$(".tip-text").text(" ");
		$("#hint-img-tip").addClass("d-none");
		clearInterval(inactivity_check_interval);
		inactivity_check();
		if(color_number < line_color_set_sentence_words.length){
			color_number++;
		}else{
			color_number=0;
		}
		if (hasLoaded && e.button === 0) {
			if (!isDrawing ) {
				var start = getMousePos(canvas, e);
				startX = start.x;
				startY = start.y;
				isDrawing = true;
				showLetter(startX, startY);
			}
		}
	}
}

function onmouseup(e) {
	setTimeout(() => {
		if(!(game_paused)){
			ctx.putImageData(imageData,0,0);
			var mousePos = getMousePos(canvas,e);
			mouseX = mousePos.x;
			mouseY = mousePos.y;    
	
			if(hasLoaded && e.button === 0){
				if(isValidWord){						//if swiped word is a valid word, either part of sentence or any other word
					if(isDrawing){
						existingLines.push({
							startX: startX,
							startY: startY,
							endX: last_column,			//making end positions of lines according to the co-ordinates of last letter of the swiped word
							endY: last_row,
							lineColor: (extra_word)?line_color_set_extra_words:line_color_set_sentence_words[color_number]
						});
						extra_word = false;
						lineDrawn = false;
					}
					existing_lines_length++;       
					imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);       
					isValidWord = false;
				}
				// make the letter swiped array and its position arrays empty so that letters that became bold become normal again
				store_swiped_letter.splice(0,store_swiped_letter.length);
				isDrawing = false;
				showStarSentence();
				draw();
			}
		}
	})
}

function onmouseout(e){   //if swipe ends outside the canvas
	if(!(game_paused)){
		ctx.putImageData(imageData,0,0);
		if(hasLoaded){
			var mousePos = getMousePos(canvas,e);
			mouseX = mousePos.x;
			mouseY = mousePos.y;   
			if(isValidWord){            //if swiped word is a valid word, either part of sentence or any other word
				if(isDrawing){
					existingLines.push({
						startX: startX,
						startY: startY,
						endX: last_column,      //making end positions of lines according to the co-ordinates of last letter of the swiped word
						endY: last_row,
						lineColor: (extra_word)?line_color_set_extra_words:line_color_set_sentence_words[color_number]
					});
					extra_word = false;
					lineDrawn = false;
				}
				existing_lines_length++;
				imageData = ctx.getImageData(0,0,canvas.width,canvas.height);     
				isValidWord = false;
			}
			isDrawing = false;
			draw();
			if(!isDrawing){        //when user stops drawing lines on canvas
				var startPos = getMousePos(canvas, e);
				startX = startPos.x;
				startY = startPos.y;
			}
		}
	}
}

function onmousemove(e){
	if(!(game_paused)){
		ctx.putImageData(imageData,0,0);
		if (hasLoaded) {
			var mousePos = getMousePos(canvas,e);
			mouseX = mousePos.x;
			mouseY = mousePos.y;
			if (isDrawing) {
				draw();
			}
		}
	}
}

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, e) {

	var rect = canvasDom.getBoundingClientRect();
	var x = e.targetTouches[0].pageX - rect.left;
	var y = e.targetTouches[0].pageY - rect.top;
	return{
		x,y
	}
}

function levelChange(success){
	if(ibGameStreak>0 && !success){
		ibGameStreak=0;	
	}else if(ibGameStreak>=0 && success){
		ibGameStreak++;
	}

	if(ibGameStreak<0 && success){
		ibGameStreak=0;
	}else if(ibGameStreak<=0 && !success){
		ibGameStreak--;
	}

	if(ibGameStreak>=STREAK_THRESHOLD){
			ibGamelevel++;
			levelup();
	}

	if(ibGameStreak<=-STREAK_THRESHOLD){
			if(ibGamelevel > 0){
				ibGamelevel--;
			}
			leveldown();
	}
}
function levelup(){
	ibGameStreak = 0;
	if(game_timer == "120"){
		if (ibGameWordsHidden < IBG_MAX_WORDS_HIDDEN) {
			ibGameTime = 150;
			ibGameWordsHidden++;
		}
	}else {
		ibGameTime = 120;
	}
}
function leveldown(){
	ibGameStreak = 0;
	if(game_timer == "150"){
		if(ibGameWordsHidden > 0){
			ibGameWordsHidden--;
		}else{
			ibGameWordsHidden = 0;
		}
	}else {
		ibGameTime = 150;
	}
}

function wordInitialsPosition(word, first_letter, second_letter, first_row, first_col, second_row, second_col){
	this.word = word;
	this.first_row = first_row;
	this.first_col = first_col;
	this.second_row = second_row;
	this.second_col = second_col;
	this.first_letter = first_letter;
	this.second_letter = second_letter;
	this.color = generateColor();
}

function generateColor(){
	var color_string="";
	for(var i=0; i<3; i++){
		color_string=color_string+getRandomInt(255);
		if(i!=2)color_string=color_string+", ";
	}
	return color_string;
}


function showSelectedWord(selected_letter){
	$(".selected-word").removeClass("d-none");
	$(".stars").addClass("d-none");
	var pre_word = $("#selected-word").text();
	$("#selected-word").text(pre_word+selected_letter);
}

function showStarSentence(){
	// $(".selected-word").addClass("d-none");
	// $("#selected-word").text("");
	// $(".stars").removeClass("d-none");
}

$(document).on("click", ".div-instruction-img", function(ev){
	$(this).addClass("d-none");
	$(this).siblings().removeClass("d-none");
});

$(document).on("click", ".div-instruction-gif", function(ev){
	$(this).addClass("d-none");
	$(this).siblings().removeClass("d-none");
});

inactivity_check = function(){
	inactivity_check_interval = setInterval(function(){
		inactivity_time+=50;
		if((document.getElementById('stars') != "undefined") || (document.getElementById('stars') != null)){
			if(inactivity_time>=inactivity_threshold && game_timer>0 && !(game_paused)){
				showTip();
			}
		}
	}, 50);
} 


function showTip(){
	
	var words_left = [];
	var no_hidden_words = hiddenWordsInfo();
	var tip_word;

	for(var i=0; i<sorted_words_list.length; i++){
		if(word_already_found.indexOf(sorted_words_list[i])==-1 && (word_tip_shown.indexOf(sorted_words_list[i])==-1) && sorted_words_list[i].length>1 &&(hidden_words_array[i]==true)){
			words_left.push(sorted_words_list[i]);
		}
	}
	if(words_left.length>=1){
		tip_word = words_left[words_left.length-1];
		word_tip_shown.push(tip_word);
	}
	if((document.getElementById('stars') != "undefined") || (document.getElementById('stars') != null)){
		if(word_tip_count==3){
			$(".tip-text").text("you can use hints");
			$("#hint-img-tip").removeClass("d-none");
			word_tip_count = 0;
			inactivity_time=0;
		}
		else if(word_tip_count<3){
			$(".tip-text").text("");
			$("#hint-img-tip").addClass("d-none");
			if(no_hidden_words<=0 || words_left.length<=0){
				if(tip_number>= tip_msg_array.length){
					tip_number = 0;
				};
				$(".tip-text").text(tip_msg_array[tip_number]);
				tip_number++;
			}else if(words_left.length>0){
				if(typeof(tip_word) != "undefined"){
					$(".tip-text").text("look for "+tip_word.length+" letter words starting with "+tip_word.charAt(0));
					document.getElementById('stars').innerHTML = unstarFirstLetter(tip_word);
				}
			}
			word_tip_count++;
			inactivity_time=0;
		}
	}	
}

function unstarFirstLetter(word){
	var current_sentence = star_sentence;
	var current_sentence_tokens = current_sentence.split(sentence_splitter);
	for(let i=0; i<current_sentence_tokens.length;i++){
		if(current_sentence_tokens[i] == '<span'){
			current_sentence_tokens[i] = current_sentence_tokens[i] + " "+ current_sentence_tokens[i+1];
			current_sentence_tokens.splice(i+1,1);
		}
	}
	var original_sorted_sentence = getSortedWordList(sentence_array[sentence_number]);
	var new_sentence = "";
	for(var i=0; i<original_sorted_sentence.length; i++){
		if(word==original_sorted_sentence[i]){
			new_sentence+=original_sorted_sentence[i].charAt(0)+current_sentence_tokens[i].substring(1)+" ";
		}else{
			new_sentence+=current_sentence_tokens[i]+" ";
		}
	}
	star_sentence = new_sentence;
	return new_sentence;
}

function hiddenWordsInfo(){
	var count=0;
	for(let i=0; i<hidden_words_array.length; i++){
		if(hidden_words_array[i] == true){
			count++;
		}
	}
	return count;
}

function showTooltip() {
	showTooltipEvent = document.createEvent("CustomEvent");
	showTooltipEvent.initCustomEvent("toolTip");
	window.dispatchEvent(showTooltipEvent);
}