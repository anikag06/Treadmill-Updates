var sentence_number = 0;
var sentence_ids = [];
var last_sentence_order = 0;
var STREAK_THRESHOLD = 2;
var level, streak;
var gameScore; 
var userOrder;
var success = false;				// to keep track of the user's performance in the game
// var sentences_sent= 3;
var sentence_array = [];
var sentence_word_array = [];
var sentence_response_array = [];
var sentence_trick = [];
var sentence_word_valence = [];
var sentence_order_array = [];
// var after_sentence_number = last_sentence_order+Math.floor(sentences_sent/2);	//request to send next set of sentences after a certain sentence number
  
var words = []                 //words of the sentence 
var initial_timer = "12";							// time for finding words from letter grid
var FIRST_HINTS_TIME = 60;
var SECOND_HINTS_TIME = 30;
var initial_time = 12000;
var game_timer = initial_timer;
var before_sentence_time = 1500;					//time after the user finds the required number of words
var sentence_time = 1000;							//in milli seconds, time for showing the sentence before asking about the word relations
var borrowed_time = 20;								// time (in seconds) increase after borrowing time after time's up
var increased_time = 30;								// time(in seconds) increase after using  hint increase time
var delay_show_sentence = 1000;						// delay for showing the sentence after showing the cross
var INITIAL_VALUE = ' ';
var no_of_parameters = 4;
var ALPHABETS = 'abcdefghijklmnopqrstuvwxyz';
var alpha_very_rare = 'bvkqjxz';					//different set of alphabets according frequency of their occurance in english words
var alpha_rare = 'fwygpc';
var alpha_common = 'rdlum';
var alpha_very_common = 'nosh';
var alpha_most_common = 'etai';
var countTrue = 0;									//counts how many words are already found by the user 
var word_already_found = [];						//array to store the words found 
var extra_word_already_found = [];					//array to store the words found not in the array.
var word_tip_shown = [];							//words for which tip has already been shown
var extra_word = false;								//flag for keeping track if the word is in sentence or not
var bonus_word_score = 5;							//coins for finding an extra word
var increase_time_score = 50;						//coins subtracted for using increase time hint
var borrow_time_score = 100;						//coins subtracted for borrowing time after time's up
var borrow_time_again_score = 150;					//if more than 15% words then borrowing time after time's up
var min_score_increaseTime = 20;					//minimum score to unlock the 'increase the time' power
var show_word_score = 30; 							// if user uses show word hint
var guess_word_score = 20;							// if user uses guess the word hint 
var score_each_letter = [10, 7, 5];					//for each letter of the word of the sentence
var try_again_score = 40; 

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
var answer = false;				//answer for the final question i.e about the 
var isValidWord = false;		//for saving lines in existing lines if the word is valid
var columnWidth;				// for width of column for grid
var rowHeight;					//for height of row for grid
var canvas = null;				//variables for drawing on canvas
var bounds = null;          
var ctx = null;
var hasLoaded = false;
var letter_swiped_row, letter_swiped_column;
			
var startX = 0;					//co-ordinates of starting and ending of swipe 
var startY = 0;
var mouseX = 0;
var mouseY = 0;
var lineColor;
var isDrawing = false;
var existingLines = [];						//to stores properties of lines drawn on canvas 
var existing_lines_length = -1;
var imageData;								//for storing stages of the canvas

//colors for making lines on grid while swiping
var line_color_set_extra_words = ['rgb(204, 204, 204)'];
var line_color_set_sentence_words = ['rgb(9,151,166)','rgb(65,63,220)','rgb(245,16,98)','rgb(255,218,0)', 'rgb(0,149,0)','rgb(255,153,15)'];

var color_number = 0;			//choose color from array of colors to draw the line
var line_width = 15;			//width of line used of highlighting the letters
var letters_x_coordinate = [];	//for storing x cooordinates of letters of grid on the canvas
var letters_y_coordinate = [];	// for storing y coordinates of letters of grid on the canvas
var textwidth = [];				// for storing width of alphabets on grid
var last_row, last_column;		//for getting end points of the lines
var countLine =0;
var lineDrawn = false;			//see if the existing is drawn or not
var w,h;						//width and height for making small squares around letters
var coordinates = [];			//coordinates of corners of the squares around letters
var store_swiped_letter = [];	//array stores letters while swiping for making them bold
var previous_i;					// for storing the i value of the previously swiped letter
var previous_j;					// for storing the j value of the previously swiped letter
var s
var t;

var start_time = 0;
var end_time = 0;

// for setWord function
var word_set = false;

// to highlight the initial letters of the words
var initial_letters = [];

// to determine the size of the square around each letter
var SQUARE_DIM = 4;

// to center align the elements in the screen
var margin_left;

// max allowed canvas width beyond which the alphabets get very small
var MAX_CANVAS_WIDTH = 450;

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

var inactivity_time = 0;

var game_paused = false;

function initializeVariables(){
	countdownReset();
	FIRST_HINTS_TIME = 60;
  	SECOND_HINTS_TIME = 30;
 	initial_time = 12000;
	before_sentence_time = 1500;					
	sentence_time = 1000;							
 	borrowed_time = 20;								
 	increased_time = 20;								
	delay_show_sentence = 1000;
	countTrue = 0; 	
	inactivity_time = 0;
	inactivity_threshold = 10000;		// show tips after 10 seconds of inactivity					
	INITIAL_VALUE = ' ';									 
	star_sentence = " ";
	canvas = null;				//variables for drawing on canvas
	bounds = null;          
	ctx = null;
	hasLoaded = false;
    word_set = false;
	words = [];
	word_already_found = [];					
 	extra_word_already_found = [];				
	word_tip_shown = [];
	words_pos_row=[]; 
	words_pos_column=[];
	sorted_words_list = [];	
	initial_letters = [];
	coordinates = [];
	store_swiped_letter = [];
	textwidth = [];
	letters_x_coordinate = [];
	letters_y_coordinate = [];
	score = gameScore;
	$(".game").removeClass("d-none");
	$('.instructions-row').addClass("d-none");
	$('.game-first-page').addClass("d-none");

}	
function getUpdatedVariables() {
	levelChange(success);
	if(start_time!=0){
		end_time = Date.now();
	}
//store the order of the sentence that will come next so that when user plays correct sentence even after refresh
	userOrder = sentence_order_array[sentence_number+1];
	gameLevel = level;
	gameOrder = userOrder;
	gameScore = score;
	gameStreak = streak;
	gameResponseTime=0;
	gameUserSentenceId = sentence_ids[sentence_number];
	if(answer){
		gameUserResponse = sentence_response_array[sentence_number];
	}else {
		gameUserResponse = !sentence_response_array[sentence_number];
	}
	gameResponseTime = (end_time - start_time) ; 
	console.log("time", gameResponseTime, end_time, start_time);
	return [
		gameOrder,
		gameLevel, 
		gameScore, 
		gameStreak, 
		gameUserSentenceId,
		gameUserResponse, 
		gameResponseTime,
		sentence_number
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
	$('.pause-hints').removeClass("d-none");
	$('.score-col').removeClass("d-none");
	$('.extra-col').removeClass("d-none");
	$('.game-over-row').addClass("d-none");
	$('.game-over-flex-row').removeClass("d-flex");
	$('.game-over-flex-row').addClass("d-none");
	$('.controls-row').addClass("d-none");
	$("#correct").addClass("d-none");
	$("#wrong").addClass("d-none");
	$('#timeup1').addClass("d-none");
	$("#lastPage").addClass("d-none");
	$(".sentence-word-row").addClass("d-none");
	$('#hint-div').addClass("d-none");	
	$('#showWordResult').addClass("d-none");
	$('#guessWordResult').addClass("d-none");
	$(".pause-clicked").addClass("d-none");
	document.getElementById('score-col').style.backgroundColor = "";
	document.getElementById('score-col').style.opacity = "1";	
	inactivity_time = 0;
	$("#tip-text").text(" ");	
	inactivity_check;
}

$(document).ready(function(){

	showImages();
	$(document).on("click", "#start-btn ,#replay-btn", function(ev){
	 //$('#start-btn').click(function(){
		initializeVariables();
		removeAddClassFun();
		countdown();
		foundWord(sentence_array[sentence_number],sentence_word_array[sentence_number]);
		success = false;
	});
	$(document).on("click","#help-btn", function(e){
		$(".instructions-row").removeClass("d-none");
		$('.game-first-page').addClass("d-none");
		if(!$('.game').hasClass("d-none")){
			$('.game').addClass("d-none");
		}
	});
	$(document).on("click", "#pause-btn", function(ev){
		console.log("pause clicked");
		countdownPause();
		hideCanvas();
		game_paused = true;
		$(".pause-hints").addClass("d-none");
		$(".pause-clicked").removeClass("d-none");
		$('.controls-row').addClass("d-none");
		document.getElementById('score-col').style.backgroundColor ='rgba(255, 255, 255, 0.81)';
	});
	$(document).on("click", "#play-btn", function(ev){       //play after pause
		countdown();
		showCanvas();
		game_paused = false;
		document.getElementById('score-col').style.backgroundColor = "";
		document.getElementById('score-col').style.opacity = "1";
		$(".pause-clicked").addClass("d-none");
		$(".pause-hints").removeClass("d-none");
		$('.controls-row').removeClass("d-none");
	});

	$(document).on("click", "#usehints", function(ev){
		if($('#hint-div').hasClass("d-none")){
			$('.controls-row').removeClass("d-none");
			$('#hint-div').removeClass("d-none");
			$('#showWord').removeClass("d-none");
			$('#guessWord').removeClass("d-none");
			$('#increase_time').removeClass("d-none");
		}else{
			$('#hint-div').addClass("d-none");
			$('#showWordResult').addClass("d-none");
			$('#guessWordResult').addClass("d-none");
		}
	});
	$(document).on("click", "#showWord", function(ev){
		if($('#showWordResult').hasClass("d-none")){
			showWord(sentence_array[sentence_number]);
			score = score - show_word_score;
			document.getElementById("score").innerHTML = score;
			$('#showWordResult').removeClass("d-none");
			$('#guessWord').addClass("d-none");
			$('#increase_time').addClass("d-none");
		}else{
			$('#showWordResult').addClass("d-none");
			$('#guessWord').removeClass("d-none");
			$('#increase_time').removeClass("d-none");
		}
	});
	$(document).on("click", "#guessWord", function(ev){
		if($('#guessWordResult').hasClass("d-none")){
			guessWord(sentence_array[sentence_number]);
			score = score - guess_word_score;
			document.getElementById("score").innerHTML = score;
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
		if(score >= min_score_increaseTime){
			unlock = true;
			score = score - min_score_increaseTime;
			document.getElementById("score").innerHTML = score;
		}else{
			unlock == false;
		}

		if(unlock == true){
			game_timer = game_timer + increased_time;
			//countdown();
			score = score - increase_time_score;
			 document.getElementById("score").innerHTML = score;
		}else if(unlock == false){
			console.log("Need" + min_score_increaseTime + " coins to unlock this power");
		}
		$('#hint-div').addClass("d-none");
	});
	$(document).on("click","#btn-try-again", function(ev){
		score = score-try_again_score;
		document.getElementById("score").innerHTML = score;
		removeAddClassFun();
		$("#timeup1").addClass("d-none");
		countdownReset();
		countdown();
	});
	$(document).on("click","#btn-borrow-time", function(ev){
		//if user had found 0-15% of words and time's up then borrowing time
		game_timer = game_timer + (borrowed_time);
		score = score - borrow_time_score;
		document.getElementById("score").innerHTML = score;
		removeAddClassFun();
		$("#timeup1").addClass("d-none");
		countdown();
	});
	$(document).on("click","#btn-borrow-time-again", function(ev){
	//if user had found 15-60% of words and time's up then borrowing time
		game_timer = game_timer +(borrowed_time);
		score = score-borrow_time_again_score;
		document.getElementById("score").innerHTML = score;
		removeAddClassFun();
		$('.game-over-flex-row').addClass("d-none");
		$("#timeup2").addClass("d-none");
		countdown();
	});
	
	$(document).on("click","#yes", function(ev){  //if the user clicks yes when asked whether the word and sentence are related or not
		// end_time = Date.now();	
		checkResponseYes(sentence_response_array[sentence_number]);
		$(".btn-sentence-word-rel").attr("disabled", "disabled");
		clearInterval(coins_rem);
		if(answer == false){
			coins = 0;
		}
		// document.getElementById("finalCoins").innerHTML = "You earned:" + coins +"coins";     //coins earned if the questions about relation is answered correctly
		//$("#finalCoins").removeClass("d-none");
		setTimeout(function(){
			$("#word").addClass("d-none");
		}, delay_sentence_word_message);
		score+=coins;
		document.getElementById("finalScore").innerHTML = "Score:"+score;
		document.getElementById("score").innerHTML = score;
		setTimeout(function(){
			$('.pause-hints').addClass("d-none");
			$('.score-col').addClass("d-none");
			$("#lastPage").removeClass("d-none");
			$(".btn-sentence-word-rel").removeAttr("disabled");
		}, delay_sentence_word_message);
		// saveUserResponse($("#save-user-response").val(), sentence_ids[sentence_number], answer, (end_time-start_time));
		delay_sentence_word_message = 1500;
	});
	
	$(document).on("click","#no", function(ev){   //if the user clicks yes when asked whether the word and sentence are related or not
		// end_time = Date.now();	
		checkResponseNo(sentence_response_array[sentence_number]);
		$(".btn-sentence-word-rel").attr("disabled", "disabled");
		clearInterval(coins_rem);
		if(answer == false){
			coins = 0;
		}
		//document.getElementById("finalCoins").innerHTML = "You earned:" + coins +"coins";   //coins earned if the questions about relation is answered correctly
		// $("#finalCoins").removeClass("d-none");
		setTimeout(function(){
			$("#word").addClass("d-none");
		}, delay_sentence_word_message);
		score+=coins;
		document.getElementById("finalScore").innerHTML = "Score:"+score;
		document.getElementById("score").innerHTML = score;
		setTimeout(function(){
			$('.pause-hints').addClass("d-none");
			$('.score-col').addClass("d-none");
			$('#lastPage').removeClass("d-none");
			$(".btn-sentence-word-rel").removeAttr("disabled");
		}, delay_sentence_word_message);
		// saveUserResponse($("#save-user-response").val(), sentence_ids[sentence_number], answer, (end_time-start_time));
		delay_sentence_word_message = 1500;
	});
	$(document).on("click","#btn-give-up", function(ev){
	 //if time's up and user had found less then 60% of words and then he choose give up option
		$("#timeup2").addClass("d-none");
		showSentence();
	});
	
	$(document).on("click","#btn-next-sentence, #btn-other-sentence", function(ev){
		answer=false;
		success=true;
		gameScore = score;
		// getUpdatedVariables();
		// $("#finalCoins").addClass("d-none");
		initializeVariables();
		removeAddClassFun();
		$("#tip-text").text("");
		countdown();
		sentence_number++;
		
		countTrue=0;
		
		foundWord(sentence_array[sentence_number],sentence_word_array[sentence_number]);      //start the game again with new sentence
	});	
		// if(sentence_number == after_sentence_number){											//if user has played a certain number of sentences then send request for next set
		// 	last_sentence_order = parseInt(last_sentence_order) + parseInt(sentences_sent);		//number of sentences to be send from server
		// 	var url = $("#save-last-sentence").val();
		// 	$.ajax({
		// 		url: url,
		// 		type:'GET', 
		// 		cache:false,
		// 		data:{'last_sentence_order': last_sentence_order, 'score':score}, 
		// 		dataType : "json",
		// 		contentTpe: "text",
		// 		beforeSend: function(xhr){
		// 			xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
		// 		},
		// 		success: function(data){
		// 			sentences = JSON.parse(data.sentence);						//sentences for grid formation and later for asking relation with the words
		// 			sentence_words = JSON.parse(data.sentence_word);			//words for asking relation and also their responses are used from database
		// 			last_sentence_order = JSON.parse(data.last_sentence_order);

		// 			for(var i=0; i<sentences.length; i++ ){
		// 				sentence_array.push(sentences[i]['fields']['sentence_text']);
		// 				sentence_trick.push(sentences[i]["fields"]["trick_sentence"].toString()==="True"?true:false);
		// 				sentence_ids.push(sentences[i]['pk']);
		// 				sentence_word_array.push(sentence_words[i]['fields']['word']);
		// 				sentence_word_valence.push(sentence_words[i]["fields"]["valence"]);
		// 				sentence_response_array.push(sentence_words[i]['fields']['response']);
		// 			}

		// 			after_sentence_number = last_sentence_order+Math.floor(sentences_sent/2);
		// 		},
		// 		error: function(xhr,errmsg,err){
		// 			// error
		// 			console.log("ERROR: "+errmsg);
		// 		}
		// 	});
		// }

	
	$(document).on("click","#exit", function(e){
		e.preventDefault();
		inactivity_time = 0;
		$("#tip-text").text(" ");
	});
});
function hideCanvas(){
	imageData = ctx.getImageData(0, 0, canvas_width, canvas_height);
	ctx.clearRect(0, 0, canvas_width, canvas_height);
}

function showCanvas(){
	ctx.putImageData(imageData,0,0);
}

function countdownDisplay() {
	document.getElementById('countdown').innerHTML= game_timer +'s';
	
}

function countdown() {
	// starts countdown
	if(document.getElementById('countdown')!=null){
		countdownDisplay();
		if(game_timer===0){
			$('.pause-hints').addClass("d-none");
			$('.hints-col').addClass("d-none");
			$('.score-col').addClass("d-none");
			$(".controls-row").addClass("d-none");
			$(".sentence-col").addClass("d-none");
			$(".sentence-row").addClass("d-none");
			$(".canvas-row").addClass("d-none");
			$(".extra-col").addClass("d-none");
			$(".game-over-row").removeClass("d-none");
			$('.game-over-flex-row').addClass("d-flex");
			$(".game-over-flex-row").removeClass("d-none");

			if(countTrue < (percent_partial_sen*sorted_words_list.length)){
				$("#timeup1").removeClass("d-none");
				success = false;
			}else if(countTrue<(percent_full_sen*sorted_words_list.length)){
				$("#timeup2").removeClass("d-none");
			} // time is up
		}else{
			game_timer--;
			t = setTimeout(countdown, 1000);

			if(game_timer===FIRST_HINTS_TIME){
				if(level<1){
					highlightSecondLetters();
				}else{
					highlightFirstLetters();
				}
			}else if(game_timer===SECOND_HINTS_TIME){
				console.log("give a second hint");
			}
		}
	}
}

function highlightFirstLetters(){
	var sentence = sentence_array[sentence_number];
	var sorted_words = getSortedWordList(sentence);
	star_sentence = "";			//sentence with words in ascending order of length
		
	for(var i=0; i<initial_letters.length; i++){
		var _word = initial_letters[i].word;
		
		// only for words that haven't been found
		if(word_already_found.indexOf(_word)==-1 && word_already_found.indexOf(reverseWord(_word))==-1 && _word.length>1){
			star_sentence+=initial_letters[i]["first_letter"]+starify(_word).substring(1);
		}else{
			if(isWordReversed(_word)){
				star_sentence+=reverseWord(_word);
			}else{
				star_sentence+=_word;
			}
		}
		star_sentence+=" ";
	}

	document.getElementById('stars').innerHTML = star_sentence;
}


// taking the easy way out here. wouldn't have to animate the letters in the canvas using this approach
function highlightSecondLetters(){
	var sentence = sentence_array[sentence_number];
	var sorted_words = getSortedWordList(sentence);
	star_sentence = "";			//sentence with words in ascending order of length
	
	for(var i=0; i<initial_letters.length; i++){
		var _word = initial_letters[i].word;
		
		// only for words that haven't been found
		if(word_already_found.indexOf(_word)==-1 && word_already_found.indexOf(reverseWord(_word))==-1 && _word.length>1){
			star_sentence+=initial_letters[i]["first_letter"]+initial_letters[i]["second_letter"]+starify(_word).substring(2);
		}else{
			if(isWordReversed(_word)){
				star_sentence+=reverseWord(_word);
			}else{
				star_sentence+=_word;
			}
		}
		star_sentence+=" ";
	}
	document.getElementById('stars').innerHTML = star_sentence;
}

function starify(word){
	return word.replace(/[a-z]/g,'*');				//replacing words of the sentence by stars
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
	game_timer = initial_timer;
	countdownDisplay();
}

function getSortedWordList(sentence){
	var sorted_words = words.sort(function(a, b){  // arranging the words by decreasing order of their length
		return b.length - a.length || a.localeCompare(b);
	});
	sorted_words_list = sorted_words;
	return sorted_words;
}

function makeGridArray(sentence){
	words = sentence.split(sentence_splitter);
	var sorted_words = getSortedWordList(sentence);
	var GRID_LENGTH = gridLength(sentence, sorted_words[0]); // determining the optimal length for the sentence
	var NO_OF_WORDS = words.length;
	var gridArray = matrix(GRID_LENGTH, GRID_LENGTH); // initializing 2D grid

	// getting the different parameters for the current level
	var sentence_parameters = difficultyParameters(level, words, NO_OF_WORDS);
	var no_diagonal = sentence_parameters[0];
	var no_vertical = sentence_parameters[1];
	var no_horizontal = sentence_parameters[2];
	var no_reverse = sentence_parameters[3];
	var final_words = new Array(NO_OF_WORDS);

	// reversing some words based on the level
	var reverse_indices = getReverseIndices(words, no_reverse, NO_OF_WORDS);

	for(var i=0; i<NO_OF_WORDS; i++){
		if(reverse_indices.indexOf(i) != -1){
			final_words[i] = reverseWord(sorted_words[i]);
		}else{
			final_words[i] = sorted_words[i];
		}
	}
	
	gridArray = generateGrid(NO_OF_WORDS,reverse_indices, final_words, GRID_LENGTH, gridArray);
	return [gridArray, GRID_LENGTH];
}


// looping over the words in the sentence and fitting it in the grid
function generateGrid(NO_OF_WORDS,reverse_indices,final_words,GRID_LENGTH,gridArray){
	var word_present = false;

	for(var i=0; i<NO_OF_WORDS; i++){
		var word = final_words[i];
		word_set = false;
		while(!(word_set)){
			var word_parameters = wordParameters(word,GRID_LENGTH);
			word_set = setWord(word, word_parameters, gridArray);
		}
		word_present = wordAlreadyFound(word);
		if(reverse_indices.indexOf(i) != -1){
			var temp_row = word_parameters[1]; var temp_column = word_parameters[0];
			for(var j=1; j<word.length; j++){
				if(word_parameters[2] == 0){
					temp_column++;
				}else if(word_parameters[2] == 1){
					temp_row++;
				}else if(word_parameters[2] == 2){
					temp_row++;
					temp_column++;
				}else if(word_parameters[2] == 3){
					temp_row--;
					temp_column++;
				}
			}
			words_pos_row.push(temp_row);
			words_pos_column.push(temp_column);
		}else{
			words_pos_row.push(word_parameters[1]);      //get the row and col at which words of sentence are placed
			words_pos_column.push(word_parameters[0]); 
		}
	}

	gridArray = fillGrid(gridArray,GRID_LENGTH);
	
	return gridArray;
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

	while(!(fit)){
		pos_x = Math.floor(Math.random()*(GRID_LENGTH)); //pos_x
		pos_y = Math.floor(Math.random()*(GRID_LENGTH)); //pos_y
		direction = Math.floor(Math.random()*4); //direction
		//checking if the word will fit in the grid with the given parameters
		if(direction == 0){
			if(pos_x+word_length<GRID_LENGTH){
				fit = true;
			}else{
				fit = false;
			}
		}else if(direction == 1){
			if(pos_y+word_length<GRID_LENGTH){
				fit = true;
			}else{
				fit = false;
			}
		}else if(direction == 2){
			if(pos_x+word_length<GRID_LENGTH && pos_y+word_length<GRID_LENGTH){
				fit = true;
			}else{
				fit = false;
			}
		}else if(direction ==3){
			if(pos_x+word_length<GRID_LENGTH && pos_y>word_length){
				fit = true;
			}else{
				fit = false;
			}
		}
	}
	
	var arr = new Array(3);
	arr[0] = pos_x;
	arr[1] = pos_y;
	arr[2] = direction;
	return arr;
}

// randomly decide which words are to be reversed
function getReverseIndices(words, no_reverse,NO_OF_WORDS){
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
function difficultyParameters(level, words, NO_OF_WORDS){
	var parameters = new Array(no_of_parameters);
	parameters[0] = Math.floor((33*NO_OF_WORDS)/100);
	parameters[1] = Math.floor((33*NO_OF_WORDS)/100);
	parameters[2] = Math.floor((33*NO_OF_WORDS)/100);
	var diff = NO_OF_WORDS - (parameters[0]+parameters[1]+parameters[2]);
	if(diff != 0){
		parameters[2]+=diff;
	}
	parameters[3] = (50*NO_OF_WORDS)/100;
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
function setWord(word, word_parameters, gridArray){
	var column = word_parameters[0];
	var row = word_parameters[1];
	var direction = word_parameters[2];
	var initial_grid = gridArray;
	var first_row;
	var first_col;
	var second_row;
	var second_col;
	var first_letter;
	var second_letter;
	var reverse_word = isWordReversed(word);

	for(var i = 0; i<word.length; i++){
		if(gridArray[row][column] === INITIAL_VALUE || gridArray[row][column] === word.charAt(i)){
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
			
			gridArray[row][column] = word.charAt(i);
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
	initial_letters.push(new_word);
	return true;
}

// returns true if word is reversed, false otherwise
function isWordReversed(word){
	return (words.indexOf(word) == -1)?true:false;
}

//getting a letter from a set depending upon level
function letterToFill(level){
	var letters_from_set = []

	letters_from_set[0] = 0.30 + (0.1*level);
	letters_from_set[1] = 0.60 + (0.1*level);
	letters_from_set[2] = 0.98 - (0.1*level);
	letters_from_set[3] = 1 -(letters_from_set[0] + letters_from_set[1] + letters_from_set[2] + letters_from_set[3]);

	return letters_from_set;
}

// fill the remaining grid with random alphabets; modify this code to minimize the probablity of finding other words
function fillGrid(gridArray,GRID_LENGTH){
	var LETERS_FROM_SET = letterToFill(level);

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

// for creating sentence with stars instead of letters
function starSentence(sentence){
	var sorted_words = getSortedWordList(sentence);
	var starSen = "";

	if(level == 0){			// beginner level
		for(var i=0; i<sorted_words.length; i++){
			if(sorted_words[i].length==1){
				starSen+=sorted_words[i]+" ";
			}else{
				starSen+=sorted_words[i].charAt(0)+starify(sorted_words[i]).substring(1)+" ";
			}
		}
	}else if(level == 1){	// intermediate level
		for(var i=0; i<sorted_words.length; i++){
			if(sorted_words[i].length>=4){
				starSen+=sorted_words[i].charAt(0)+starify(sorted_words[i]).substring(1)+" ";
			}else if(sorted_words[i].length==1){
				starSen+=sorted_words[i]+" ";
			}else{
				starSen+=starify(sorted_words[i])+" ";
			}
		}
	}else{
		for(var i=0; i<sorted_words.length; i++){
			if(sorted_words[i].length==1){
				starSen+=sorted_words[i]+" ";
			}else{
				starSen+=starify(sorted_words[i])+" ";
			}
		}
	}
	
	return starSen;
}

// for replacing stars in sentence with letters
function replaceStars(word,strArray,pos, star_sentence){
	var starWords=[] ;
	var starWords=star_sentence.split(sentence_splitter);			//split the star sentence to get an array with words with *

	for(var i=0; i<word.length; i++){								//replace the * with the letters of word found
		starWords[pos]=starWords[pos].replace(starWords[pos].charAt(i),word.charAt(i));      
	} 

	star_sentence=starWords.join(sentence_splitter);				//star sentence now changed, have the words found
	countTrue+=1;
	if(game_timer>FIRST_HINTS_TIME){
		score=score+(score_each_letter[0]*word.length);
	}else if(game_timer>SECOND_HINTS_TIME){
		score=score+(score_each_letter[1]*word.length);
	}else{
		score=score+(score_each_letter[2]*word.length);
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
word_already_found
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
	var strArray = sorted_words;

	present = wordAlreadyFound(str);
	
	if(present === true){         //if word is already found
		// $('#tick').hide();
		// $('#cross').hide();
		// $('#bonus').hide();
		// $('#already_found').show();
	}else if(present === false){
		for (var j=0; j<strArray.length; j++){               //search word in the array of words of sentence
			if(strArray[j].search(str) !=-1 && str.length== strArray[j].length){
				isValidWord = true;
				found = true;
				// $('#tick').show();
				// $('#cross').hide();
				// $('#bonus').hide();
				// $('#already_found').hide();
				word_already_found.push(str);
				words_pos_row.splice(j,1,'*');           //replace positions of the words already found with '*'
				words_pos_column.splice(j,1,'*');    
				star_sentence = replaceStars(str,strArray,j, star_sentence);      //if correct word found replace stars with the word
			}
		}

		if(found == false){            //if word found is incorrect 
			extra_present = extraWordAlreadyFound(str);
			if(extra_present === true){         //if the word not present in sentence is already found
				$('#tick').hide();
				$('#cross').hide();
				$('#bonus').hide();
				$('#already_found').show();
			}else if(extra_present ===false){
				var word_in_dictionary = Word_List.isInList(str);      //check in dictionary, maybe the word is valid but not part of sentence

				if(word_in_dictionary && str.length>=min_bonus_word_length){
					isValidWord = true;
					extra_word = true;
					extra_word_already_found.push(str);
					ctx.strokeStyle = "black";
					$('#tick').hide();
					$('#cross').hide();
					$('#bonus').show();
					$('#already_found').hide();
					score = score+bonus_word_score;
				}else{
					$('#tick').hide();
					$('#cross').show();
					$('#bonus').hide();
					$('#already_found').hide();
				}
			}
		}
	}

	if(countTrue >= (percent_full_sen*sorted_words.length)){   
		showSentence();
		
	}
	return star_sentence;
}

//shows full sentence for some time and then ask about relation with a word
function showSentence(){
	countdownReset();
	// $("#congrats").removeClass("d-none");
	// showing the fixation cross 
	setTimeout(function(){
		$(".extra-col").addClass("d-none");
		$('.game-over-flex-row').removeClass("d-flex");
		$('.game-over-row').addClass("d-none");
		$(".sentence-word-row").removeClass("d-none");
		$(".fixation-cross").removeClass("d-none");
		// $("#congrats").addClass("d-none");
		$(".sentence-row").addClass("d-none");
		$(".canvas-row").addClass("d-none");
		$(".controls-row").addClass("d-none");
		$('.pause-hints').removeClass("d-none");
		$('.hints-col').addClass("d-none");
		$('.score-col').addClass("d-none");
		$(".sentence-col").addClass("d-none");
	}, delay_show_sentence);

	// show the sentence
	setTimeout(function(){
		$(".fixation-cross").addClass("d-none");
		$(".complete-sentence").html(sentence_array[sentence_number]);
		$('.complete-sentence').removeClass("d-none");
	}, delay_show_sentence+before_sentence_time);

	setTimeout(function(){
		$(".complete-sentence").delay(delay_show_sentence).addClass("d-none");
		$("coins").delay(delay_show_sentence).addClass("d-none");
		$("#word").delay(delay_show_sentence).removeClass("d-none");
		start_time = Date.now();
	}, delay_show_sentence+before_sentence_time+sentence_time);				//show the sentence for some seconds and ask relation after some time

	// setTimeout(function(){
	// 	start_time = Date.now();
	// }, before_sentence_time+sentence_time+delay_show_sentence);
	 
	coins = final_coins+(delay_show_sentence/100);         // /100 to adjust for the time showing the sentence   
	coins_rem = setInterval(function(){ 
		if(coins>0){
			coins-=10 ; 
			if(document.getElementById("coins")!=null){
				document.getElementById("coins").innerHTML = coins;
			}		
		}
		else{
			coins=0;
		}
	}, 1000);//after delay of some seconds show the word and ask about relation with sentence
}

// Making canvas and finding the word swiped by the user
function foundWord(sentence,sentence_word){
	word_already_found.splice(0,word_already_found.length);			//make arrays empty before the next sentence is shown 
	extra_word_already_found.splice(0,extra_word_already_found.length);
	words_pos_row.splice(0,words_pos_row.length);
	words_pos_column.splice(0,words_pos_column.length);

	document.getElementById("complete-sentence").innerHTML = sentence;
	document.getElementById("sentence_word").innerHTML = sentence_word;

	var gridParameters = makeGridArray(sentence);
	var GRID_LENGTH = gridParameters[1];
	playGrid = gridParameters[0];
	star_sentence = starSentence(sentence);      //sentence with stars instead of letters
	document.getElementById('stars').innerHTML = star_sentence;
	var sorted_words = getSortedWordList(sentence);
	makeCanvasGrid(playGrid,sorted_words,sentence,GRID_LENGTH);
	
	var storeWord;
	document.getElementById('score').innerHTML = score;
}

//swipe detection
function detectSwipe(playGrid,canvas,rect,sorted_words,sentence){
	var storeLetter = [];
	var canSwipe = new Hammer.Manager(canvas, {
						recognizers: [
							[Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL }],
						]
					});
		
	canSwipe.get("swipe").set({velocity: 0.001, threshold: 0, direction: Hammer.DIRECTION_ALL });
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
			for(var rDiag= 0; rDiag < row_for_diag; rDiag ++){
				if(row_num <playGrid.length && column_num <playGrid.length  && row_num>=0 && column_num>=0){
					storeLetter[rDiag] = playGrid[row_num][column_num];
					last_row = letters_y_coordinate[(row_num)];
					last_column = letters_x_coordinate[(playGrid.length)*(column_num)];
					row_num++;
					column_num--;
				}
			}
		}else if(angle <= -80 && angle >= -100){
			for(var rVer=0; rVer< no_of_rows; rVer++){
				if(row_num <playGrid.length && column_num <playGrid.length && row_num>=0 && column_num>=0){
					storeLetter[rVer] = playGrid[row_num][column_num];
					last_row = letters_y_coordinate[(row_num)];
					last_column = letters_x_coordinate[(playGrid.length)*(column_num)];
					row_num--;
				}
			}
		}else if(angle <=100 && angle >= 80){
			for(var rVer=0; rVer< no_of_rows; rVer++){
				if(row_num <playGrid.length && column_num <playGrid.length  && row_num>=0 && column_num>=0){
					storeLetter[rVer] = playGrid[row_num][column_num];
					last_row = letters_y_coordinate[(row_num)];
					last_column = letters_x_coordinate[(playGrid.length)*(column_num)];
					row_num++;
				}
			}
		}else if(angle >= -10 && angle <=10){
			for(var cHor=0; cHor < no_of_cols ; cHor++){
				if(row_num <playGrid.length && column_num <playGrid.length  && row_num>=0 && column_num>=0){
					storeLetter[cHor] = playGrid[row_num][column_num];
					last_row = letters_y_coordinate[(row_num)];
					last_column = letters_x_coordinate[(playGrid.length)*(column_num)];
					column_num++;
				}
			}
		}else if((angle <=-170 && angle >= -180) || (angle>=170 && angle <=180)){
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
			var storeWord = sentence_splitter;
			storeLetter = [];  
		}else{
			var storeWord = storeLetter.join("");    //the word swiped by user
			if(store_swiped_letter[store_swiped_letter.length-1]!=storeWord.charAt(storeWord.length-1))storeWord+=store_swiped_letter[store_swiped_letter.length-1];
			star_sentence = searchWordInArray(storeWord,sorted_words,star_sentence, sentence);  //if word present in sorted words array
			document.getElementById('stars').innerHTML = star_sentence;
			document.getElementById('score').innerHTML = score;
			storeLetter = [];    //clear storeLetter to store another set of letters
		}
	});

	$('#nextSentence').click(function(){
		canSwipe.destroy();
	});
}

//show a word of the sentence and then ask users of find it in the grid
function showWord(sentence){
	words = getSortedWordList(sentence);
	var pos = getRandomInt(words.length);

	var word = words[pos];
	present = wordAlreadyFound(word);
	if(present == true){
		showWord(sentence);
	}else if(present == false){
		document.getElementById("aWord").innerHTML = word ;
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
	}
}

function checkResponseNo(response){			//if user choose 'NO' for a negative word that's correct
	if(response == true){
		if(sentence_trick[sentence_number]){
			showSincerityMessage();
		}
		$('#correct').addClass("d-none");
		$('#wrong').removeClass("d-none");
	}
	else if(response == false){
		$('#correct').removeClass("d-none");
		$('#wrong').addClass("d-none");
		answer = true;
	}
}

function showSincerityMessage(){
	delay_sentence_word_message = 10000;	// showing this message for a longer time
	var message;
	if(sentence_word_valence[sentence_number]){		// true means word was positive but unrelated
		message = "Think about the sentence word relation carefully. This word is positive but not related to the sentence";
	}else{											// false means word was negative but related
		message = "Think about the sentence word relation carefully. This word is negative but related to the sentence";
	}
	$("#sincerity-message").text(message);
}

//function for hints, it gives a shuffled word and user has to find the acutal word
function guessWord(sentence){
	var words = sentence.split(sentence_splitter);
	var pos_word = getRandomInt(words.length);
	word_to_guess = words[pos_word];
	var present = false; 
	var shuffled_word;

	present = wordAlreadyFound(word_to_guess);

	if(present == false){
		shuffled_word = word_to_guess.shuffle();
		document.getElementById('unscrambleWord').innerHTML = "Unjumble the Word: " + shuffled_word;        
	}else if(present == true){
		guessWord(sentence);
	}
}

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

function makeCanvasGrid(playGrid,sorted_words,sentence,GRID_LENGTH){
	letters_x_coordinate.splice(0,letters_x_coordinate.length);		//make arrays empty for every new canvas
	letters_y_coordinate.splice(0,letters_y_coordinate.length);
	
	// var canvas_width = bw + (p*2) + 1;
	// var ch = bh + (p*2) + 1;
	margin_left = 10;
	//.. canvas_width = (Math.floor(screen.width-2*margin_left)<MAX_CANVAS_WIDTH)?Math.floor(screen.width-2*margin_left):MAX_CANVAS_WIDTH;
	// ..if(canvas_width==MAX_CANVAS_WIDTH)margin_left = Math.floor((screen.width-MAX_CANVAS_WIDTH)/2);
	// ..canvas_height = canvas_width;
	var number;
	
	canvas_width  = document.getElementById("canvas").offsetWidth;
	canvas_height = canvas_width;
	// set rowHeight and columnWidth for each canvas grid
	columnWidth = Math.floor(canvas_width/GRID_LENGTH);	//Math.floor((window.innerWidth-20)/GRID_LENGTH);
	rowHeight = columnWidth;

	// columnWidth = (Math.floor((window.innerWidth-150)/GRID_LENGTH)<=100)?Math.floor((window.innerWidth-150)/GRID_LENGTH):100;
	// rowHeight = columnWidth;

	var line, isDown;
	var bw = GRID_LENGTH*columnWidth;					//box width
	var bh = GRID_LENGTH*rowHeight;						//box height
	var p = 0;											//box padding
	var para, t;
	

	document.getElementById("canvas").height = canvas_height;				//dimensions for canvas
	document.getElementById("canvas").width = canvas_width;
	// document.getElementById("congrats").width = canvas_width;				//dimension for congrats image
	// document.getElementById("congrats").height = canvas_height/4;
	// document.getElementById("congrats").style.marginTop = canvas_height/3;
	$(".stars").css("width", canvas_width+"px");
	canvas_font_width = columnWidth>COLUMN_WIDTH_BREAKPOINT?40:18;
	canvas_font_width_highlight = canvas_font_width + 5;

	canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	function drawBoard(){                           //making grid on canvas
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
		context.strokeStyle = "#d8bfd8";
		document.getElementById("canvas").innerHTML = context.stroke();   
		imageData = context.getImageData(0,0,canvas_width,canvas_height);             // save the current stage of the canvas every time as an image
	}

	drawBoard();
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
		mousePos = getTouchPos(canvas, e);
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousedown", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);

	canvas.addEventListener("touchend", function (e) {
		e.preventDefault();
		var mouseEvent = new MouseEvent("mouseup", {});
		canvas.dispatchEvent(mouseEvent);
	}, false);

	canvas.addEventListener("touchmove", function (e) {      
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousemove", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);
	canvas.addEventListener("touchcancelled", function(e){
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mouseout", { });
		canvas.dispatchEvent(mouseEvent);
	},false);
	hasLoaded = true;
	draw();
	detectSwipe(playGrid,canvas,bounds,sorted_words,sentence);
}
 
function draw(){
	getStartPointOfLine();       
	ctx.lineWidth = line_width;         //properties of line drawn
	ctx.globalAlpha = 0.50;
	ctx.lineCap = "round";
			
	//lines made previously are stored in an array and then drawn again
	if(existing_lines_length >=0 && lineDrawn ===false){
		var line = existingLines[existing_lines_length];				//drawing only newly made lines again not all the lines
		ctx.globalAlpha = 0.5;
		ctx.globalCompositeOperation="destination-over";
		ctx.beginPath();
		ctx.moveTo(line.startX+3,line.startY-3);
		ctx.lineTo(line.endX+3,line.endY-3);
		ctx.strokeStyle = line.lineColor; 
		ctx.stroke();
		countLine++;
		lineDrawn = true;
	}
	imageData = ctx.getImageData(0,0,canvas_width,canvas_height);
	
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
	if(!(game_paused)){
		inactivity_time=0;
		$("#tip-text").text(" ");
		inactivity_check;
		if(color_number < line_color_set_sentence_words.length){
			color_number++;
		}else{
			color_number=0;
		}
		if (hasLoaded && e.button === 0) {
			if (!isDrawing ) {
				startX = e.offsetX;
				startY = e.offsetY;
				isDrawing = true;
				showLetter(startX, startY);
			}
		}
	}
}

function onmouseup(e) {
	if(!(game_paused)){
		ctx.putImageData(imageData,0,0);
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
				imageData = ctx.getImageData(0, 0, canvas_width, canvas_height);       
				isValidWord = false;
			}
			// make the letter swiped array and its position arrays empty so that letters that became bold become normal again
			store_swiped_letter.splice(0,store_swiped_letter.length);
			isDrawing = false;
			showStarSentence();
			draw();
		}
	}
}

function onmouseout(e){   //if swipe ends outside the canvas
	if(!(game_paused)){
		ctx.putImageData(imageData,0,0);
		if(hasLoaded){
			mouseX = e.offsetX;
			mouseY = e.offsetY;      
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
				startX = e.offsetX;
				startY = e.offsetY;
			}
		}
	}
}

function onmousemove(e){
	if(!(game_paused)){
		ctx.putImageData(imageData,0,0);
		if (hasLoaded) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
			if (isDrawing) {
				draw();
			}
		}
	}
}

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
	return {
		x: touchEvent.offsetX,
		y: touchEvent.offsetY
	};
}

// function saveUserResponse(url, sentence_id, user_response, response_time){
// 	levelChange(success);
// 	$.ajax({
// 		type:"POST",
// 		url: url,
// 		data:{
// 			sentence_id: sentence_id,
// 			user_response: user_response,
// 			response_time: response_time,
// 			score: score,
// 			level: level,
// 			streak: streak
// 		},
// 		beforeSend: function(xhr){
// 			xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
// 		},
// 		success: function(data){
// 			// success
// 		},
// 		error: function(xhr,errmsg,err){
// 			// error
// 		}
// 	});
// }

function levelChange(success){
	if(streak>0 && !success){
		streak=0;	
	}else if(streak>=0 && success){
		streak++;
	}

	if(streak<0 && success){
		streak=0;
	}else if(streak<=0 && !success){
		streak--;
	}

	console.log("streak: "+streak);
	if(streak>=STREAK_THRESHOLD){
		if(level!=2){
			level++;
		}
	}

	if(streak<=-STREAK_THRESHOLD){
		if(level!=0){
			level--;
		}
	}
	console.log("level: "+level);
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

// window.addEventListener("beforeunload", function (e){
// 	e.preventDefault();
// 	var url = $("#save-user-score").val();
// 	$.ajax({
// 		url: url,
// 		type:'GET', 
// 		cache:false,
// 		data:{
// 			'score':score,
// 		}, 
// 		beforeSend: function(xhr){
// 			xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
// 		},
// 		success: function(data){
// 			// success
// 		},
// 		error: function(xhr,errmsg,err){
// 			// error
// 			console.log("ERROR: "+errmsg);
// 		}
// 	});
// 	return null;
// });

function showSelectedWord(selected_letter){
	console.log("reaching here: "+selected_letter);
	$(".selected-word").removeClass("d-none");
	$(".stars").addClass("d-none");
	var pre_word = $("#selected-word").text();
	$("#selected-word").text(pre_word+selected_letter);
}

function showStarSentence(){
	// $(".selected-word").addClass("d-none");
	// $("#selected-word").text("");
	$(".stars").removeClass("d-none");
}

$(document).on("click", ".div-instruction-img", function(ev){
	$(this).addClass("d-none");
	$(this).siblings().removeClass("d-none");
});

$(document).on("click", ".div-instruction-gif", function(ev){
	$(this).addClass("d-none");
	$(this).siblings().removeClass("d-none");
});

// var showImages = function(){
// 	var img_height = $(".card-img-top").height();
// 	$(".instruction-icon").css("margin-top", "-"+img_height/2+"px");
// }
var inactivity_check = setInterval(function(){
	inactivity_time+=50;
	if((document.getElementById('stars') != "undefined") || (document.getElementById('stars') != null)){
		if(inactivity_time>=inactivity_threshold && game_timer>0 && !(game_paused)){
			showTip();
		}
	}
}, 50);


function showTip(){
	var words_left = [];
	var two_letter_word = false;
	var three_letter_word = false;

	for(var i=0; i<words.length; i++){
		if(word_already_found.indexOf(words[i])==-1 && word_tip_shown.indexOf(words[i])==-1 && words[i].length>1){
			words_left.push(words[i]);
		}
	}

	var tip_word = words_left[words_left.length-1];
	word_tip_shown.push(tip_word);
	// console.log(document.getElementById('stars'));
	if((document.getElementById('stars') != "undefined") || (document.getElementById('stars') != null)){
		if(typeof(tip_word) != "undefined"){
			if(level == 0){
				$("#tip-text").text("look for "+tip_word.length+" letter words starting with "+tip_word.charAt(0));
			}else if(level == 1){
				$("#tip-text").text("look for "+tip_word.length+" letter words starting with "+tip_word.charAt(0));
				document.getElementById('stars').innerHTML = unstarFirstLetter(tip_word);
			}else{
				$("#tip-text").text("look for "+tip_word.length+" letter words starting with "+tip_word.charAt(0));
				document.getElementById('stars').innerHTML = unstarFirstLetter(tip_word);
			}
		}
	}	
	inactivity_time=0;
}

function unstarFirstLetter(word){
	var current_sentence = $("#stars").text();
	var current_sentence_tokens = current_sentence.split(sentence_splitter);
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