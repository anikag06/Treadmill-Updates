var ffGameStart;
var ffGamePreloadImages;

// data from database
var ffGame_hostile_images = [];
var ffGame_friendly_images = [];

var no_positive_images_clicked_level1_click = 1;
var no_positive_images_clicked_level2_click = 1;
var no_positive_images_clicked_level3_click = 1;
var total_time_taken_level1_click = 1050 ;
var total_time_taken_level2_click = 1150;
var total_time_taken_level3_click = 1250;
var no_positive_images_clicked_level1_touch = 1;
var no_positive_images_clicked_level2_touch = 1;
var no_positive_images_clicked_level3_touch = 1;
var total_time_taken_level1_touch =950;
var total_time_taken_level2_touch = 1050;
var total_time_taken_level3_touch =1150;
// var music;
// var music_note_rate;
// var music_current_order;
// var music_order_first;
// var music_order_last;
// var music_name = "{{music.name}}";

var NUMBER_OF_IMAGES = 2                  // # initial number of images
var NUMBER_POSITIVE = 1                   // # initial number of positive images
var RANDOM_RATIO_THREE = [0.5, 0.95, 1]
var RANDOM_RATIO_SIX = [0.35, 0.7, 0.9, 0.95, 1]
var LEVEL_UP_THRESHOLD = [1075, 925]
var TONE_DURATION_MULTIPLIER = [[500, 8], [1000, 4], [2000, 2], [4000, 1]] // # 500 milliseconds for 8th note; 1000 milliseconds for quarter note and so on

var initial_no_positive = NUMBER_POSITIVE ; // no. of positive images to be shown; it depends on the stage in the particular level.
var initial_no_images = NUMBER_OF_IMAGES; // no. of images to be shown; it depends on the difficulty level of the game

// var music_playback_rate = 1;
var random_ratio_three;
var random_ratio_six;

var level_up_threshold;
var tone_duration_multiplier_mapping ;

var scaleWidth;
var scaleHeight;
var canvas1;
var ctx1;

var no_positive;
var no_images;

var image_urls_1; // for showing the initial image 1 sets
var image_urls_2; // for showing the initial image 2 sets

var store_friendly_images_coordinates_1; // for storing friendly image coordinates in canvas 1
var store_hostile_images_coordinates_1; // for storing hostile image coordinates in canvas 1

var level; // this determines the size of the matrix to be shown. 2x2 for level 1; 3x3 for level 2; 4x3 for level 3.
var stage; // this determines the progress within a stage. the higher this gets the more difficult that particular level gets.
var stage_counter; // this checks how many iterations have been completed in a single stage and changes the stage counter once the number of iterations are completed
var no_col; // no. of columns in the matrix.
var no_row; // no. of rows in the matrix.
var hard; // 0 means false, 1 means true.
// var time = 1000; //this determines the time allotted for each stage in a level.
var ajax_request_time_hostile; // this determines the time after which each ajax request is sent for retrieving the images
var ajax_request_time_friendly; // this determines the time after which each ajax request is sent for retrieving the images
var counter;
var margin;
var HEIGHT;
var WIDTH;

var friendly_image_clicked;
var no_friendly_image_clicked;

var hostile_images;
var friendly_images;

var level_up_counter;

// var music_counter_array;
// var music_counter;
var decrease;
var threshold;
var lower_threshold; // the minimum number of positive images to be shown
var higher_threshold; // the maximum number of positive images to be shown

var audio;

var no_wrong; // this stores the difference between the notes played and the number of positive faces clicked, if this gets below 0, game over
var wrong_threshold; // if the user clicks on this many wrong images consecutively, show maximum number of positive images possible

// delay before the next page is shown
var refresh_delay;

// for stopping ajax requests in case of inactive users
var time_out_in_milliseconds; // 10 seconds
var time_out_id;
var active;

var ajaxFriendlyImages;
var ajaxHostileImages;

var synth;

// for calculating the time taken between two consecutive positive image clicks
var date;
var time;
var last_click; // returns the number of milliseconds since Jan 1, 1970
var ajax_request_time_stat_update;
var ajaxUpdateStats;

var next_song_data;
var next_song;
var next_song_name;

var average_speed;
var time_difficulty;
var allotted_time;
var time_left;
var updation_interval; // how frequently the time bar should be updated 
var time_bar_interval;

var game_started = false;
var game_start_counter = 0;
var game_paused;

var life; // the number of wrong clicks allowed
var total_life; // for storing the total number of lives allowed in a level 
var first_click; // required for starting the clock

// for preloading images
var loaded_hostile_images = [];
var loaded_friendly_images = [];

var wrong_note;

var mute; // for muting volume
var heightOffset;

var positive_messages;

var checked_value;

var next_stage_elements_height; // for aligning the next stage elements in the middle of the screen

var title_width; // for setting the width of the title bar

var canvas_coordinates;

var initialization_counter = 0;

var TIME = {
	"1n": 4,
	"2n": 2,
	"4n": 1,
	"8n": 0.5,
	"16n": 0.25,
	"32n": 0.125
}

var HIGHEST_DURATION = 32;
var LOWEST_DURATION = 1;

var no_positive_images_clicked_level1=1;
var no_positive_images_clicked_level2=1;
var no_positive_images_clicked_level3=1;
var total_time_taken_level1=4;
var total_time_taken_level2=4;
var total_time_taken_level3=4;

var device;

var blink_first_image;

// var game_over_music;

var song_playing;

$(document).ready(function(){
	console.log("ff game");

	ffGameStart = function(){
		console.log("play clicked");
		if(event.type === "click"){
			device = "click";
			no_positive_images_clicked_level1 = no_positive_images_clicked_level1_click;
			no_positive_images_clicked_level2 = no_positive_images_clicked_level2_click;
			no_positive_images_clicked_level3 = no_positive_images_clicked_level3_click;
			total_time_taken_level1 = total_time_taken_level1_click;
			total_time_taken_level2 = total_time_taken_level2_click;
			total_time_taken_level3 = total_time_taken_level3_click;
		}else{
			device = "touch";
			no_positive_images_clicked_level1 = no_positive_images_clicked_level1_touch;
			no_positive_images_clicked_level2 = no_positive_images_clicked_level2_touch;
			no_positive_images_clicked_level3 = no_positive_images_clicked_level3_touch;
			total_time_taken_level1 = total_time_taken_level1_touch;
			total_time_taken_level2 = total_time_taken_level2_touch;
			total_time_taken_level3 = total_time_taken_level3_touch;
		}
		$(".ff-game-elements").removeClass("d-none");

		$(".game-instructions").hide();

		startGame();
	
		canvas1.addEventListener("mousedown", function(e){
			if(first_click){
				enableElements();
				showPauseButton();
				clearInterval(time_bar_interval);
				time_bar_interval = setInterval(timeBar, updation_interval);
				first_click = false;
				setOpacity();
			}else if(game_started&&game_paused){
				$("#pause-button").click();
			}
			onCanvasClick(canvas1);
		});

		$("#pause-button").click(function(){
			if(!game_paused){
				clearInterval(time_bar_interval);
				showPlayButton();
			}else{
				clearInterval(time_bar_interval);
				time_bar_interval = setInterval(timeBar, updation_interval);
				showPauseButton();
			}
			game_paused = !(game_paused);
		});

		$("#volume-button").click(function(){
			if(mute == true){
				showVolumeButton();
			}else{
				Tone.Transport.pause();
				showMuteButton();
			}
			mute = !(mute);
		});

		$("#play-song-button").click(function(){
			if(!song_playing){
				$("#canvas1").addClass("block-click");
				showStopButton();
				// playMusic(false, music);
			}else{
				$("#canvas1").removeClass("block-click");
				showMusicButton();
				// playMusic(true, music);
			}

			song_playing = !(song_playing);
		});

		$("#play-next-song").click(function(){

			switch(checked_value){
				case 'time':
					time_difficulty++;
					$("#difficulty-message").html("");
					setBarWidth();
					break;
				case 'errors':
					if(total_life > 1){
						total_life--;
					}else{
						$("#difficulty-message").html("Already at minimum");
					}
					break;
				case 'nothing':
					$("#difficulty-message").html("");
					break;
				default:
					console.log("None");
			}

			levelUp();
			
			$("#next-stage-message").addClass("d-none");
			$("#next-stage-div").addClass("d-none");
			$("#play-next-song").addClass("d-none");
			$("#harder-text").addClass("d-none");
			$("#harder-options").addClass("d-none");
			$(".game-components").show();
			disableElements();
			// document.getElementById("song-name").innerHTML = music_name;
			console.log("call fillgrid");
			ffGameFillGrid();
			drawLife(life);
			getColor(100, 0, 100);
		});

		$(document).on('change', 'input[type=radio]', function(){
			checked_value = this.id;
			setTimeout(function(){
				$("#play-next-song").click();
			}, 500);
		});

		$(document).on('click', '#play-again-button', function(){
			$(".loader").fadeIn("fast");
			setTimeout(function(){
				$("#game-over-div").addClass('d-none');
				startGame();
				$(".game-components").show();
			}, 500);
			setTimeout(function(){
				$(".loader").fadeOut("fast");
			}, 3000);
		});
	};
});

function startGame(reload){
	console.log("from start game");
	initialize();
	setupTimers();

	// positioning the game elements in the middle of the screen vertically
	setHeightAndWidth();
	ffGameFillGrid();
}

function setHeightAndWidth(){
	title_width = canvas1.width-10-$(".fa-fast-forward").width();
	$("#game").css('width', title_width+'px');
	$("#song-name-div").css('margin-left', (canvas_coordinates.x-10)+'px');
	$("#game-controls-div").css('margin-left', (canvas_coordinates.x-10)+'px');
	heightOffset = (window.innerHeight - ($("#time-bar-div").height()+$("#game-controls-div").height()+$("#song-name-div").height()+canvas1.height))/2;
	$(".ghost-element").css('height', heightOffset+'px');
	$("#next-stage-div").css('margin-top', (window.innerHeight/2-100-$(".ghost-element").height())+'px');
}

function drawLife(life){
	$("#mistake-count").html("");
	for(var i=0; i<life; i++){
		$("#mistake-count").append("<i class=\"fas fa-smile face treadwill-color\"></i>");
	}
	for(var i=life; i<total_life; i++){
		$("#mistake-count").append("<i class=\"fas fa-frown face wrong-color\"></i>");
	}
}

function showPlayButton(){
	var $child = $(".fa-pause");
	$child.removeClass("fa-pause");
	$child.addClass("fa-play");
}

function showPauseButton(){
	var $child = $(".fa-play");
	$child.removeClass("fa-play");
	$child.addClass("fa-pause");
}

function showVolumeButton(){
	var $child = $(".fa-volume-off");
	$child.attr("src", volume_link);
	$child.removeClass("fa-volume-off");
	$child.addClass("fa-volume-up");
}

function showMuteButton(){
	var $child = $(".fa-volume-up");
	$child.attr("src", mute_link);
	$child.removeClass("fa-volume-up");
	$child.addClass("fa-volume-off");
}

function showStopButton(){
	// var $child = $(".fa-music");
	// $child.removeClass("fa-music");
	// $child.addClass("fa-stop");
}

function showMusicButton(){
	// var $child = $(".fa-stop");
	// $child.removeClass("fa-stop");
	// $child.addClass("fa-music");
}


function setOpacity(){
	var elements = document.getElementsByClassName("fade-in");
	for(var i=0; i<elements.length; i++){
		elements[i].style.opacity = 1;
	}
}

function onCanvasClick(canvas){
	game_started = true;
	$("#pause-button").removeClass("d-none");
	$("#volume-button").removeClass("d-none");
	friendly_image_clicked = clickedFriendlyImage(canvas, event);
	setTimeout(function(){
		if(no_friendly_image_clicked == no_positive){
			console.log("from canvas click");
			ffGameFillGrid();
		}
	}, refresh_delay);
}

function clickedFriendlyImage(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
	var friendly_image_coordinates = store_friendly_images_coordinates_1;
	var hostile_image_coordinates = store_hostile_images_coordinates_1;
	for(var i=0; i<friendly_image_coordinates.length; i++){
		if(friendly_image_coordinates[i].contains(x, y)){
			friendly_image_coordinates[i].clicked = true;
			no_friendly_image_clicked++;
			no_wrong = 0;
			markImage(friendly_image_coordinates[i], true);
			date = new Date();
			time = date.getTime();
			
			if(!game_paused){
				// giving more weightage to the most recent click
				time_taken = time-last_click;
				
				if (level == 1){
					no_positive_images_clicked_level1++;
					total_time_taken_level1 += time_taken;
					average_speed = total_time_taken_level1/no_positive_images_clicked_level1;
				}else if(level == 2){
					no_positive_images_clicked_level2++;
					total_time_taken_level2 += time_taken;
					average_speed = total_time_taken_level2/no_positive_images_clicked_level2;
				}else if(level == 3){
					no_positive_images_clicked_level3++;
					total_time_taken_level3 += time_taken;
					average_speed = total_time_taken_level3/no_positive_images_clicked_level3;
				}
			}else{
				game_paused = false;
			}

			last_click = time;
			if(mute == false){
				// playNote();
			}
			clearInterval(blink_first_image);
			return true;
		}
	}

	// for highlighting the click on the hostile images
	for(var i=0; i<hostile_image_coordinates.length; i++){
		if(hostile_image_coordinates[i].contains(x, y)){
			markImage(hostile_image_coordinates[i], false);
			
			if(mute == false){
				playWrongNote();
			}
			no_wrong++;

			if(no_wrong == wrong_threshold){
				console.log("click on ");
				ffGameFillGrid();
			}
			penalty();
			return false;
		}
	}
	
	return false;
}

function penalty(){
	life--;
	drawLife(life);
	if(life <= 0) showGameOver();
}

function updateTimeDisplay(){
	if(game_started && !game_paused){
		var percent_val = time_left/allotted_time*100;
		getColor(percent_val, 0, 100);
	}
}

function getColor(value, min, max){
    if (value > max) value = max;
    if (value < min) value = min;
    var v = (value-min) / (max-min);
    var hue=((v)*120).toString(10);
    var color = ["hsl(",hue,",100%,50%)"].join("")
    $("#progressBar").css('width', value+'%').attr('aria-valuenow', time_left);
	$(".progress-bar").css('background-color', color);
}

function timeBar(){
	time_left -= updation_interval;
	if(time_left <= 0){
		showGameOver();
	}
	updateTimeDisplay();
}

// function getFriendlyImages(){
// 	var url = $("#get-images-url").attr('href');
// 	var url_tokens = url.split('/');
// 	url = "/"+url_tokens[1]+"/"+url_tokens[2]+"/5/1";
// 	$.ajax({
// 		type: "GET",
// 		url: url,
// 		data: {
// 		},

// 		beforeSend: function(xhr){
// 			xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
// 		},

// 		success: function(data){
// 			store_friendly_images = store_friendly_images.concat(data);
// 			preloadImages(1, data.length);
// 		},
		
// 		error: function(xhr, errmsh, err){
// 			$.notify("You are offline. The game might stop working.", {color: "#606090", delay: score_notification_timer.toString(), align:"left", verticalAlign:"top"});
// 		}

// 	});
// }

// function getHostileImages(){
// 	var url = $("#get-images-url").attr('href');
// 	var url_tokens = url.split('/');
// 	var no_of_images = Math.floor(no_images/2);
// 	url = "/"+url_tokens[1]+"/"+url_tokens[2]+"/5/0";
// 	$.ajax({
// 		type: "GET",
// 		url: url,
// 		data: {
// 		},

// 		beforeSend: function(xhr){
// 			xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
// 		},

// 		success: function(data){
// 			store_hostile_images = store_hostile_images.concat(data);
// 			preloadImages(0, data.length);
// 		},
		
// 		error: function(xhr, errmsh, err){
// 			$.notify("You are offline. The game might stop working.", {color: "#606090", delay: score_notification_timer.toString(), align:"left", verticalAlign:"top"});
// 		}
// 	});
// }

// function updateStats(){
// 	var url = $("#update-stats-url").attr('href');
// 	var url_tokens = url.split('/');
// 	url = "/"+url_tokens[1]+"/"+url_tokens[2]+"/";
// 	$.ajax({
// 		type: "POST",
// 		url: url,
// 		data: {
// 			'no_positive_images_clicked_level1': no_positive_images_clicked_level1,
// 			'no_positive_images_clicked_level2': no_positive_images_clicked_level2,
// 			'no_positive_images_clicked_level3': no_positive_images_clicked_level3,
// 			'total_time_taken_level1': total_time_taken_level1,
// 			'total_time_taken_level2': total_time_taken_level2,
// 			'total_time_taken_level3': total_time_taken_level3,
// 			'device': device,
// 		},

// 		beforeSend: function(xhr){
// 			xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
// 		},

// 		success: function(data){
// 			// stats successfully updated
// 		},
		
// 		error: function(xhr, errmsh, err){
// 			$.notify("You are offline. The game might stop working.", {color: "#606090", delay: score_notification_timer.toString(), align:"left", verticalAlign:"top"});
// 		}

// 	});
// }

// function getNextSong(){
// 	var url = $("#next-song-url").attr('href');
// 	var url_tokens = url.split('/');
// 	url = "/"+url_tokens[1]+"/"+url_tokens[2]+"/"+music_current_order+"/"+music_order_first+"/"+music_order_last;
// 	$.ajax({
// 		type: "GET",
// 		url: url,
// 		data: {
// 		},

// 		beforeSend: function(xhr){
// 			xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
// 		},

// 		success: function(data){
// 			// stats successfully updated
// 			next_song_data = JSON.parse(data);
// 			next_song_name = next_song_data[0].fields.name;
// 			next_song = JSON.parse(next_song_data[0].fields.notes);
// 			music_current_order = next_song_data[0].fields.order;
// 		},
		
// 		error: function(xhr, errmsh, err){
// 			$.notify("You are offline. The game might stop working.", {color: "#606090", delay: score_notification_timer.toString(), align:"left", verticalAlign:"top"});
// 		}

// 	});
// }

function ffGameFillGrid(){
	console.log("called fill grid function");
	ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
	images = setImageUrls();
	no_friendly_image_clicked = 0;
	for(var i=0; i< no_row; i++){
		for(var j=0; j< no_col; j++){
			var img = images[counter++];
			
			var img_coord = new coordinates((2*j+1)*margin+j*WIDTH, (2*i+1)*margin+i*HEIGHT, WIDTH, HEIGHT);
			if(img.src.indexOf("friendly") != -1){
				store_friendly_images_coordinates_1.push(img_coord);
				// if(music_counter==0)firstImageToggle(img, img_coord); //toggling the first image
			}else{
				store_hostile_images_coordinates_1.push(img_coord);
			}

			ctx1.shadowOffestX = 7;
			ctx1.shadowOffestY = 7;
			ctx1.shadowColor = 'grey';
			ctx1.shadowBlur = 10;
			ctx1.drawImage(img, (2*j+1)*margin+j*WIDTH, (2*i+1)*margin+i*HEIGHT, WIDTH, HEIGHT);
		}
	}
	counter = 0;
	setHeightAndWidth();
}

function firstImageToggle(img, img_coord){
	var toggle = true;
	blink_first_image = setInterval(function(){
		ctx1.shadowColor = "transparent";
		if(toggle){
			ctx1.strokeStyle = '#00FF00';
		}else{
			ctx1.strokeStyle = '#228B22';
		}
		ctx1.lineWidth = 1;
		ctx1.strokeRect(img_coord.x, img_coord.y, img_coord.w, img_coord.h);
		toggle = !(toggle);
	}, 500);
}

function setImageUrls(){
	// getting the hostile and friendly images for the next set
	hostile_images = loaded_hostile_images.slice(0, no_images-no_positive);
	friendly_images = loaded_friendly_images.slice(0, no_positive);
	
	// removing the used images
	loaded_hostile_images.splice(0, no_images-no_positive);
	loaded_friendly_images.splice(0, no_positive);

	// friendly_images = removeDuplicates(friendly_images);
	// setting the image urls for the next set
	image_urls_1 = hostile_images.concat(friendly_images.slice(0, friendly_images.length));
	
	image_urls_1 = shuffle(image_urls_1);

	// resetting the friendly image coordinates for the next set
	store_friendly_images_coordinates_1 = [];
	store_hostile_images_coordinates_1 = [];

	return image_urls_1;
}

// for storing the coordinates of the friendly images to detect if the user tapped on a friendly image
function coordinates(x, y, w, h, clicked){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.clicked = false;
}

// for returning whether the user tapped on a friendly image
coordinates.prototype.contains = function (x, y){
	return x>=this.x && x<=this.x+this.w && y>=this.y && y<=this.y+this.h && !(this.clicked);
}

function markImage(coordinates, correct){
	if(correct){
		ctx1.strokeStyle = '#228B22';
	}else{
		ctx1.strokeStyle = '#FF0000';
	}
	ctx1.lineWidth = 3;
	ctx1.strokeRect(coordinates.x, coordinates.y, coordinates.w, coordinates.h);
}


function removeDuplicates(arr){
	var temp_arr = [...new Set(arr)];
	while(temp_arr.length != arr.length){
		if(hard == 0){
			var new_image =ffGame_friendly_images.shift();
		}else{
			var new_image = store_friendly_images_hard.shift();
		}

		if(temp_arr.indexOf(new_image) == -1){
			temp_arr.push(new_image);
		}
	}

	return temp_arr;
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

  return array;
}

function playNote(){
	// using tone.js
	parts = music[music_counter++];
	synth.triggerAttackRelease(parts.note, parts.duration);
	
	if(music_counter==Math.floor(music.length/2)){
		getNextSong();
	}

	if(music_counter>=music.length){
		songOver();
	}
}

function playWrongNote(){
	synth.triggerAttackRelease(wrong_note[0], wrong_note[1]);
}

// this portion of the code deals with playing the full song multiple times. this doesn't work properly. fix that.
function playMusic(stop, song){
	var song_counter = 0;
	var part = new Tone.Part(function(time, note){
		if(song_counter==(song.length-1)){
			$("#canvas1").removeClass("block-click");
			showMusicButton();
			Tone.Transport.stop();
		}
		song_counter++;
		synth.triggerAttackRelease(note.note, note.duration, time);
	}, song).start(0);
	Tone.Transport.start();
}

function songOver(){
	// show great;
	updateUser(music_current_order);
	nextStage();
	music = next_song;
	music_name = next_song_name;
	game_paused = true;
	showPlayButton();
	clearInterval(time_bar_interval);
}

function levelUp(){
	// take to next level;
	level++;
	if (level > 3) level=1;
	no_images = no_images+2;
	if (level == 1) no_images=2;
	no_row = no_images/no_col;
	music_counter = 0;
	life = total_life;
	average_speed = getAverageSpeed(level);
	setDurationMultiplier(average_speed);
	allotted_time = (music.length-time_difficulty)*average_speed;
	time_left = allotted_time;
	updation_interval = allotted_time/100;
	first_click = true;
	canvas1.height = level*(HEIGHT+2*margin);
}

function getAverageSpeed(level){
	if(level == 1){
		return total_time_taken_level1/no_positive_images_clicked_level1;
	}else if(level == 2){
		return total_time_taken_level2/no_positive_images_clicked_level2;
	}else if(level == 3){
		return total_time_taken_level3/no_positive_images_clicked_level3;
	}
}

function showGameOver(){
	clearInterval(time_bar_interval);
	// clearInterval(ajaxFriendlyImages);
	// clearInterval(ajaxHostileImages);
	// clearInterval(ajaxUpdateStats);
	game_paused = true;
	game_started = false;
	first_click = true;
	showPlayButton();
	// playMusic(false, game_over_music);
	$("#canvas1").addClass("block-click");
	$(".game-components").fadeOut(2500, function(){
		$("#game-over-div").removeClass('d-none');
		$("#canvas1").removeClass("block-click");
	});
}

function nextStage(){
	$(".game-components").hide();
	$("input[name=options]").attr("checked", false);
	$(".btn-facegame-level-up").removeClass("active");
	$("#next-stage-div").removeClass("d-none");
	$("#next-stage-message").html(positive_messages[Math.floor(Math.random()*positive_messages.length)]);
	$("#next-stage-message").removeClass("d-none");

	setTimeout(function(){
		$("#next-stage-message").html("");
	}, 3000);

	setTimeout(function(){
		$("#harder-text").removeClass("d-none").hide().fadeIn(1000);
	}, 3000);

	setTimeout(function(){
		$("#harder-options").removeClass("d-none").hide().fadeIn(1000);
	}, 5000);
}

function initialize(){
	initialization_counter++;
	scaleWidth = 0.9;
	scaleHeight = 0.8;
	canvas1 = document.getElementById("canvas1");
	canvas1.width = 324; //window.innerWidth*scaleWidth
	ctx1 = canvas1.getContext("2d");

	image_urls_1 = []; // for showing the initial image 1 sets
	image_urls_2 = []; // for showing the initial image 2 sets

	store_friendly_images_coordinates_1 = new Array(); // for storing friendly image coordinates in canvas 1
	store_hostile_images_coordinates_1 = new Array(); // for storing hostile image coordinates in canvas 1

	no_positive = initial_no_positive;
	no_images = initial_no_images;

	level = 1; // this determines the size of the matrix to be shown. 2x2 for level 1; 3x3 for level 2; 4x3 for level 3.
	stage = 1; // this determines the progress within a stage. the higher this gets the more difficult that particular level gets.
	stage_counter = 0; // this checks how many iterations have been completed in a single stage and changes the stage counter once the number of iterations are completed
	no_col = 2; // no. of columns in the matrix.
	no_row = no_images/no_col; // no. of rows in the matrix.
	hard = 0; // 0 means false, 1 means true.
	// var time = 1000; //this determines the time allotted for each stage in a level.
	ajax_request_time_hostile = 1000; // this determines the time after which each ajax request is sent for retrieving the images
	ajax_request_time_friendly = 1000; // this determines the time after which each ajax request is sent for retrieving the images
	counter = 0;
	margin = 5;
	HEIGHT = 150;
	WIDTH = canvas1.width/no_col-2*margin;
	canvas1.height = HEIGHT+2*margin; //setting the initial canvas height based the image height

	friendly_image_clicked = false;
	no_friendly_image_clicked = 0;

	hostile_images = [];
	friendly_images = [];

	level_up_counter = [[3, 6, 6], [3, 18, 18], [3, 18, 18]];

	// music_counter_array = [1, 2, 3, 4, 5, 6, 7, 8];
	// music_counter = 0;
	decrease = true;
	threshold = 1;
	// lower_threshold = (music_note_rate - threshold) > 1 ? (music_note_rate - threshold) : 1; // the minimum number of positive images to be shown
	// higher_threshold = lower_threshold+2*threshold; // the maximum number of positive images to be shown

	// audio = document.getElementById("music-set");

	no_wrong = 0; // this stores the difference between the notes played and the number of positive faces clicked, if this gets below 0, game over
	wrong_threshold = 3; // if the user clicks on this many wrong images consecutively, show maximum number of positive images possible

	// delay before the next page is shown
	refresh_delay = 100;

	// for stopping ajax requests in case of inactive users
	time_out_in_milliseconds = 10000; // 10 seconds
	active = true;

	// ajaxFriendlyImages = setInterval(getFriendlyImages, ajax_request_time_friendly);
	// ajaxHostileImages = setInterval(getHostileImages, ajax_request_time_hostile);

	synth = new Tone.Synth().toMaster();

	// for calculating the time taken between two consecutive positive image clicks
	date = new Date();
	last_click = date.getTime(); // returns the number of milliseconds since Jan 1, 1970
	ajax_request_time_stat_update = 10000;
	// ajaxUpdateStats = setInterval(updateStats, ajax_request_time_stat_update);

	average_speed = total_time_taken_level1/no_positive_images_clicked_level1;
	time_difficulty = 0;
	// allotted_time = music.length*average_speed;
	allotted_time=5;
	time_left = allotted_time;
	updation_interval = allotted_time/100; // how frequently the time bar should be updated 

	game_started = false;
	game_start_counter = 0;
	game_paused = true;
 
	first_click = true; // required for starting the clock

	// // for preloading images
	// loaded_hostile_images = [];
	// loaded_friendly_images = [];

	wrong_note = ["A7", "16n"];

	mute = false; // for muting volume

	// set the time bar width
	getColor(100, 0, 100);
	setBarWidth();

	positive_messages = ["Great job!", "Fantastic!", "Awesome!", "Brilliant!", "Excellent!"];	

	life = 5;
	total_life = 5;
	drawLife(life);
	disableElements();
	no_row = no_images/no_col; // no. of rows in the matrix.
	WIDTH = canvas1.width/no_col-2*margin;
	// music_counter = 0;
	// document.getElementById("song-name").innerHTML = music_name;

	song_playing = false;

	game_over_music = [
		{"time": 0.5, "note": "A7", "duration": "4n"},
		{"time": 1.5, "note": "A7", "duration": "4n"},
		{"time": 2.5, "note": "A7", "duration": "4n"},
	];

	multiplier = 1;

	// only update it for the first time initialization is called
	if(initialization_counter == 1){
		canvas_coordinates = document.getElementById("canvas1").getBoundingClientRect();
	}
}

function setDurationMultiplier(average_speed){
	var max_song_note = getMaxNoteDuration();
	TIME[max_song_note+'n'] = average_speed-100;
	while(max_song_note<=HIGHEST_DURATION){
		var old_max_song_note = max_song_note;
		max_song_note*=2;
		TIME[max_song_note+'n'] = TIME[old_max_song_note+'n']/2;
	}
	setTime();
}

function setTime(){
	var time = 0;
	// for(var i=1; i<music.length; i++){
	// 	time+=TIME[music[i-1].duration.toString()];
	// 	music[i].time = time;
	// }
}

function getMaxNoteDuration(){
	var max = 1000;
	// for(var i=0; i<music.length; i++){
	// 	var duration = music[i].duration;
	// 	duration = parseInt(duration.substr(0, duration.indexOf('n')));
	// 	max = (duration<max)?duration:max; // max duration is value with minimum note
	// }
	return max;
}

function setBarWidth(){
	$(".progress").css('width', (2*WIDTH+2*margin-14-5*(time_difficulty+1))+'px'); // -14 due to clock width; -5 for margin-left
	$(".progress").attr('aria-valuemax', allotted_time);
}

function startTimer(){
	time_out_id = window.setTimeout(doInactive, time_out_in_milliseconds);
}

function doInactive(){
	// // stop ajax requests
	// clearInterval(ajaxFriendlyImages);
	// clearInterval(ajaxHostileImages);
	// clearInterval(ajaxUpdateStats);
	active = false;
}

function resetTimer(){
	window.clearTimeout(time_out_id);
	if(!active){
		// ajaxFriendlyImages = setInterval(getFriendlyImages, ajax_request_time_friendly);
		// ajaxHostileImages = setInterval(getHostileImages, ajax_request_time_hostile);
		// ajaxUpdateStats = setInterval(updateStats, ajax_request_time_stat_update);
		ajaxFriendlyImages;
		ajaxHostileImages;
		active = false;
	}
	active = true;
	startTimer();
}

function setupTimers (){
	document.addEventListener("mousemove", resetTimer, false);
	document.addEventListener("mousedown", resetTimer, false);
	document.addEventListener("keypress", resetTimer, false);
	document.addEventListener("touchmove", resetTimer, false);

	startTimer();
}

// friendly = 1 means friendly; friendly = 0 means hostile
ffGamePreloadImages = function (friendly, length){
	console.log('in preloadImages', friendly, length);
	var urls = friendly == 1 ?ffGame_friendly_images.slice(0, length) : ffGame_hostile_images.slice(0, length);

	console.log(urls, ffGame_friendly_images);
	var imgs = urls.map(function(url){
		console.log(url);
		var img = new Image();
		img.src = url;
		img.onload = function(){
			console.log("img push");
			if(friendly == 1){
				loaded_friendly_images.push(img);
			}else{
				loaded_hostile_images.push(img);				
			}
		};
	});
	console.log( 'loaded friendly images' , loaded_friendly_images, loaded_hostile_images);
	if(friendly == 1){
		ffGame_friendly_images.splice(0, length);
	}else{
		ffGame_hostile_images.splice(0, length);
	}
	console.log("game counter", game_start_counter);
	// if(game_start_counter<2){
	// 	game_start_counter++;
	// }else if(game_start_counter == 2){
	// 	ffGameFillGrid();
	// 	game_start_counter++;
	// }
}

function disableElements(){
	$(".game-components *").children().prop('disabled', true);
	$(".game-components").addClass("fade-in");
	$("#canvas-div").removeClass("fade-in");
	$("#canvas-div *").children().prop('disabled', false);
	$("#song-name-div *").children().prop('disabled', false);
	$("#song-name-div").removeClass("fade-in");
}

function enableElements(){
	$(".game-components *").children().prop('disabled', false);
	$(".game-components").removeClass("fade-in");
	$("#song-name-div *").children().prop('disabled', true);
	$("#song-name-div").addClass("fade-in");
}

var updateUser = function(order){
	var url = $("#update-order-url").attr('href');
	var url_tokens = url.split('/');
	url = "/"+url_tokens[1]+"/"+url_tokens[2]+"/"+order;
	$.ajax({
		type: "GET",
		url: url,
		data: {
		},

		beforeSend: function(xhr){
			xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
		},

		success: function(data){
			// stats successfully updated
		},
		
		error: function(xhr, errmsh, err){
			$.notify("You are offline. The game might stop working.", {color: "#606090", delay: score_notification_timer.toString(), align:"left", verticalAlign:"top"});
		}

	});
}