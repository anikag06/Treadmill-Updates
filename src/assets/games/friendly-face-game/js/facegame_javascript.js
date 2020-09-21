var ffGameStart;
var ffGamePreloadImages;
var ffGPauseResumeGame;
var ffGRestartGame;
var getFFGClickData;
var getFFGUser;

var ffGameSongCounter;
// data from database
var ffGame_hostile_images = [];
var ffGame_friendly_images = [];

var ffg_no_positive_images_clicked_level1;
var ffg_no_positive_images_clicked_level2;
var ffg_no_positive_images_clicked_level3;
var ffg_total_time_taken_level1;
var ffg_total_time_taken_level2;
var ffg_total_time_taken_level3;
var game_completed = false;
// var ffg_total_images_clicked;
var ffg_total_positive_images;

var ffg_music;
var ffg_music_note_rate;
var ffg_music_current_order;
var ffg_music_order_first;
var ffg_last_music_order;
var ffg_music_name;
var ffgMusicBarValue;
var ffg_current_song_order;

var ffg_music_notes_array = [];
var ffg_music_note_rate_array = [];
var ffg_music_order_array = [];
var ffg_music_name_array = [];

var NUMBER_OF_IMAGES = 2; // # initial number of images
var NUMBER_POSITIVE = 1; // # initial number of positive images
var RANDOM_RATIO_THREE = [0.5, 0.95, 1];
var RANDOM_RATIO_SIX = [0.35, 0.7, 0.9, 0.95, 1];
var LEVEL_UP_THRESHOLD = [1075, 925];
var TONE_DURATION_MULTIPLIER = [
  [500, 8],
  [1000, 4],
  [2000, 2],
  [4000, 1]
]; // # 500 milliseconds for 8th note; 1000 milliseconds for quarter note and so on

var initial_no_positive = NUMBER_POSITIVE; // no. of positive images to be shown; it depends on the stage in the particular level.
var initial_no_images = NUMBER_OF_IMAGES; // no. of images to be shown; it depends on the difficulty level of the game

var ffg_music_playback_rate = 1;
var random_ratio_three;
var random_ratio_six;

var level_up_threshold;
var tone_duration_multiplier_mapping;

var scaleWidth;
var scaleHeight;
var canvas1;
var ctx1;

var no_positive;
var no_images;
var ffg_score;

var goldPoints = 0;
var silverPoints = 0;
var bronzePoints = 0;

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

var ffg_music_counter_array;
var ffg_music_counter;
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

var synth;

// for calculating the time taken between two consecutive positive image clicks
var date;
var time;
var last_click; // returns the number of milliseconds since Jan 1, 1970

var next_song_data;
var next_song;
var next_song_name;
var ffg_next_song;

var timeBeingShown;
var ffg_timer;
var ffg_timers; // for storing references to all ffg_timer intervals
var timeCounter;
var timer_is_on = 0;
var ffgExtraTime = false;
var ffg_extra_points = 20;
var startPlay = false;
var ffg_no_life = false;
// var average_speed;
var time_difficulty;
// var allotted_time;
var time_left;
// var updation_interval; // how frequently the time bar should be updated
// var time_bar_interval;
var min_time_per_note = 1000;
var max_time_per_note = 5000;
var time_change_unit = 500;
var timeAlloted;
var ffg_time_per_note;

var game_started = false;
var game_start_counter = 0;
var game_paused;

var life; // the number of wrong clicks allowed
var total_life; // for storing the total number of lives allowed in a level
var first_click; // required for starting the clock

// for preloading images
var ffg_loaded_hostile_images = [];
var ffg_loaded_friendly_images = [];

var wrong_note;

var mute; // for muting volume
var ffgMuted = false;

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
};

var HIGHEST_DURATION = 32;
var LOWEST_DURATION = 1;

var no_positive_images_clicked = 0;
// var no_positive_images_clicked_level1=0;
// var no_positive_images_clicked_level2=0;
// var no_positive_images_clicked_level3=0;
var total_time_taken = 0;

// var total_time_taken_level1=4;
// var total_time_taken_level2=4;
// var total_time_taken_level3=4;

var ffg_device_type;

var blink_first_image;
var canvasClicked = false;

var game_over_music;

var song_playing;

var ffg_coins;
var ffg_ask_feedback = false;


var ffg_perf_update = true;
var firstLevel = true; //for setting the same level on reload
var call_next_music = true; // to keep a check of calling next  music
var EASY_LEVEL_THRESHOLD = 4000; // if time_per_note is >= this, then show 2 images
var MEDIUM_LEVEL_THRESHOLD = 2500; // if time_per_note is >= this, then show 4 images

$(document).ready(function() {
  ffGameStart = function() {
    // device = device_type;
    console.log(ffg_device_type);

    $(".ff-game-container").removeClass("d-none");

    $(".game-cover").addClass("d-none");


    startGame();
    ffgMuted = false;
    canvas1.addEventListener("mousedown", function(e) {
      if (first_click) {
        enableElements();
        showPauseButton();
        ffgTimeCount();
        first_click = false;
      } else if (game_started && game_paused) {
        $("#pause-button").click();
        // clearInterval(ffg_timer);
        ffg_timers.forEach(function(ffg_timer) {
          clearInterval(ffg_timer);
        });
      }
      onCanvasClick(canvas1);
    });

  musicFFGame = function(mute) {
    if (!mute) {
      ffgMuted = false;
    } else {
      ffgMuted = true;
    }
  }

    // $("#volume-button").click(function() {
    //   if (mute == true) {
    //     showVolumeButton();
    //   } else {
    //     Tone.Transport.pause();
    //     showMuteButton();
    //   }
    //   mute = !mute;
    // });

    playnextsong = function() {
      console.log("playnext song clicked");

      levelUp();

      $("#next-stage-message").addClass("d-none");
      $("#next-stage-div").addClass("d-none");
      $("#play-next-song").addClass("d-none");
      $("#harder-text").addClass("d-none");
      $("#harder-options").addClass("d-none");
      $(".game-components").show();
      disableElements();
      if (ffg_music_name.length >= 30) {
        trimLength = ffg_music_name.length - 26;
        ffg_music_name.slice(0, -trimLength) + " ...";
      }
      document.getElementById("song-name").innerHTML = ffg_music_name;
      ffGameFillGrid();
      getColor(100, 0, 100);
    };
  };
});

ffGPauseGame = function() {
  console.log("calling pause resume function");
  if (!game_paused) {
    // clearInterval(ffg_timer);
    ffg_timers.forEach(function(ffg_timer) {
      clearInterval(ffg_timer);
    });
    $("#canvas1").addClass("block-click");
    showPlayButton();
  }
  game_paused = true;
  first_click = false;
};

ffGResumeGame = function() {
  if (game_paused) {
    console.log("game_paused: " + game_paused);
    showPauseButton();
    $("#canvas1").removeClass("block-click");
    if (ffgExtraTime) {
      timeBeingShown = 20;
      ffg_score -= ffg_extra_points;
      document.getElementById("score-num").innerHTML = ffg_score;
      ffgExtraTime = false;
    }
    ffgTimeCount();
  }
  game_paused = false;
};

ffGRestartGame = function() {
  $(".loader").fadeIn("fast");

  gameRestart = true;

  setTimeout(function() {
    $("#game-over-div").addClass("d-none");
    startGame();
    $(".game-components").show();
  }, 500);
  $("#canvas1").removeClass("block-click");
};

function startGame(reload) {
  ffg_music = ffg_music_notes_array[ffGameSongCounter];
  ffg_music_current_order = ffg_music_order_array[ffGameSongCounter];
  ffg_music_name = ffg_music_name_array[ffGameSongCounter];
  ffg_music_note_rate = ffg_music_note_rate_array[ffGameSongCounter];
  console.log(
    "MUSIC DETAILS",
    ffg_music,
    ffg_music_notes_array,
    ffGameSongCounter,
    ffg_music.length,
    ffg_music_current_order,
    ffg_music_name,
    ffg_music_note_rate,
    ffg_music_order_array
  );
  initialize();
  setupTimers();
  // positioning the game elements in the middle of the screen vertically
  setHeightAndWidth();
  ffGameFillGrid();
  if (ffg_music_current_order === ffg_last_music_order) {
    updateUser(ffg_music_current_order, ffg_coins);
  }
}

function setHeightAndWidth() {
  title_width = canvas1.width - 10 - $(".fa-fast-forward").width();
  $("#game").css("width", title_width + "px");
  $("#song-name-div").css("margin-left", canvas_coordinates.x - 10 + "px");
  $("#game-controls-div").css("margin-left", canvas_coordinates.x - 10 + "px");
  heightOffset =
    (window.innerHeight -
      ($("#time-bar-div").height() +
        $("#game-controls-div").height() +
        $("#song-name-div").height() +
        canvas1.height)) /
    2;
  $(".ghost-element").css("height", heightOffset + "px");
  $("#next-stage-div").css(
    "margin-top",
    window.innerHeight / 2 - 100 - $(".ghost-element").height() + "px"
  );
}

function showPlayButton() {
  var $child = $(".fa-pause");
  $child.removeClass("fa-pause");
  $child.addClass("fa-play");
}

function showPauseButton() {
  var $child = $(".fa-play");
  $child.removeClass("fa-play");
  $child.addClass("fa-pause");
}

function showVolumeButton() {
  var $child = $(".fa-volume-off");
  $child.attr("src", volume_link);
  $child.removeClass("fa-volume-off");
  $child.addClass("fa-volume-up");
}

function showMuteButton() {
  var $child = $(".fa-volume-up");
  $child.attr("src", mute_link);
  $child.removeClass("fa-volume-up");
  $child.addClass("fa-volume-off");
}

function showStopButton() {
  var $child = $(".fa-music");
  $child.removeClass("fa-music");
  $child.addClass("fa-stop");
}

function showMusicButton() {
  var $child = $(".fa-stop");
  $child.removeClass("fa-stop");
  $child.addClass("fa-music");
}

function setOpacity() {
  var elements = document.getElementsByClassName("fade-in");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.opacity = 1;
  }
}

function onCanvasClick(canvas) {
  game_started = true;
  canvasClicked = true;
  $("#pause-button").removeClass("d-none");
  $("#volume-button").removeClass("d-none");
  friendly_image_clicked = clickedFriendlyImage(canvas, event);
  setTimeout(function() {
    if (no_friendly_image_clicked == no_positive) {
      ffGameFillGrid();
    }
  }, refresh_delay);
}

function clickedFriendlyImage(canvas, event) {
  event.stopImmediatePropagation();

  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  var friendly_image_coordinates = store_friendly_images_coordinates_1;
  var hostile_image_coordinates = store_hostile_images_coordinates_1;
  for (var i = 0; i < friendly_image_coordinates.length; i++) {
    if (friendly_image_coordinates[i].contains(x, y)) {
      friendly_image_coordinates[i].clicked = true;
      no_friendly_image_clicked++;
      ffg_score += 1;
      document.getElementById("score-num").innerHTML = ffg_score;
      no_wrong = 0;
      markImage(friendly_image_coordinates[i], true);
      date = new Date();
      time = date.getTime();

      if (!game_paused) {
        // giving more weightage to the most recent click
        time_taken = time - last_click;
        ffg_total_positive_images++;
        no_positive_images_clicked++;
        total_time_taken += time_taken;
      } else {
        game_paused = false;
      }

      last_click = time;
      if (mute == false) {
        playNote();
      }
      clearInterval(blink_first_image);

      return true;
    }
  }

  // for highlighting the click on the hostile images
  for (var i = 0; i < hostile_image_coordinates.length; i++) {
    if (hostile_image_coordinates[i].contains(x, y)) {
      markImage(hostile_image_coordinates[i], false);

      if (mute == false) {
        playWrongNote();
      }
      no_wrong++;

      if (no_wrong == wrong_threshold) {
        ffGameFillGrid();
      }
      console.log('lost 1 life,hostile image coordinates', i, hostile_image_coordinates);

      penalty();
      return false;
    }
  }

  return false;
}

function penalty() {
  life--;
  $("#life-img").addClass("blink-image");
  setTimeout(function() {
    $("#life-img").removeClass("blink-image");
  }, 3000);

  document.getElementById("life").innerHTML = life;
  if (life <= 0) {
    ffg_no_life = true;
    // clearInterval(ffg_timer);
    ffg_timers.forEach(function(ffg_timer) {
      clearInterval(ffg_timer);
    });
    showGameOver();
  }
}

function ffgTimeCount() {
  ffg_timer = setInterval(function() {
    console.log("new ffg_timer getting set");
    timeBeingShown--;
    document.getElementById("time-sec").innerHTML = timeBeingShown + "s";
    if (timeBeingShown <= 0) {
      ffg_timers.forEach(function(ffg_timer) {
        clearInterval(ffg_timer);
      });
      // clearInterval(ffg_timer);
      showGameOver();
    }
  }, 1000);
  ffg_timers.push(ffg_timer);
}

function getColor(value, min, max) {
  if (value > max) value = max;
  if (value < min) value = min;
  var v = (value - min) / (max - min);
  var hue = (v * 120).toString(10);
  var color = ["hsl(", hue, ",100%,50%)"].join("");
  $("#progressBar")
    .css("width", value + "%")
    .attr("aria-valuenow", time_left);
}

function updateStats() {
  var FFGPerformance = document.createEvent("CustomEvent");
  FFGPerformance.initCustomEvent("FFGUserPerformanceUpdate");

  window.dispatchEvent(FFGPerformance);
}

function updateMusic() {
  UpdateMusicEvent = document.createEvent("CustomEvent");
  UpdateMusicEvent.initCustomEvent("FFGUpdateMusic");
  window.dispatchEvent(UpdateMusicEvent);
}

function getNextSong() {
  ffGameSongCounter++;
  next_song_name = ffg_music_name_array[ffGameSongCounter];
  next_song = ffg_music_notes_array[ffGameSongCounter];
  ffg_music_current_order = ffg_music_order_array[ffGameSongCounter];
  ffg_perf_update = true;
  call_next_music = true;
}

function ffGameFillGrid() {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  images = setImageUrls();
  no_friendly_image_clicked = 0;
  for (var i = 0; i < no_row; i++) {
    for (var j = 0; j < no_col; j++) {
      var img = images[counter++];
      var img_coord = new coordinates(
        (2 * j + 1) * margin + j * WIDTH,
        (2 * i + 1) * margin + i * HEIGHT,
        WIDTH,
        HEIGHT
      );
      if (img.src.indexOf("friendly") != -1) {
        store_friendly_images_coordinates_1.push(img_coord);
        if (ffg_music_counter == 0) {
          console.log("Toggle Image", level);
          firstImageToggle(img, img_coord);
        } //toggling the first image
      } else {
        store_hostile_images_coordinates_1.push(img_coord);
      }

      ctx1.strokeStyle = "#707070";
      ctx1.lineWidth = 1;
      ctx1.strokeRect(img_coord.x, img_coord.y, img_coord.w, img_coord.h);

      ctx1.drawImage(
        img,
        (2 * j + 1) * margin + j * WIDTH,
        (2 * i + 1) * margin + i * HEIGHT,
        WIDTH,
        HEIGHT
      );
    }
  }
  counter = 0;
  setHeightAndWidth();
}

function firstImageToggle(img, img_coord) {
  var toggle = true;
  blink_first_image = setInterval(function() {
    if (!canvasClicked) {
      if (toggle) {
        ctx1.strokeStyle = "#00FF00";
      } else {
        ctx1.strokeStyle = "#228B22";
      }
      ctx1.lineWidth = 1;
      ctx1.strokeRect(img_coord.x, img_coord.y, img_coord.w, img_coord.h);
      toggle = !toggle;
    }
  }, 500);
}

function setImageUrls() {
  // getting the hostile and friendly images for the next set
  hostile_images = ffg_loaded_hostile_images.slice(0, no_images - no_positive);
  friendly_images = ffg_loaded_friendly_images.slice(0, no_positive);

  // removing the used images
  ffg_loaded_hostile_images.splice(0, no_images - no_positive);
  ffg_loaded_friendly_images.splice(0, no_positive);

  // call the two functions from friendly-face-game.component.ts
  if (ffg_loaded_friendly_images.length < 20) {
    getImages("getFriendlyImages");
  }
  if (ffg_loaded_hostile_images.length < 20) {
    getImages("getHostileImages");
  }

  // setting the image urls for the next set
  image_urls_1 = hostile_images.concat(
    friendly_images.slice(0, friendly_images.length)
  );

  image_urls_1 = shuffle(image_urls_1);

  // resetting the friendly image coordinates for the next set
  store_friendly_images_coordinates_1 = [];
  store_hostile_images_coordinates_1 = [];

  return image_urls_1;
}

// for storing the coordinates of the friendly images to detect if the user tapped on a friendly image
function coordinates(x, y, w, h, clicked) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.clicked = false;
}

// for returning whether the user tapped on a friendly image
coordinates.prototype.contains = function(x, y) {
  return (
    x >= this.x &&
    x <= this.x + this.w &&
    y >= this.y &&
    y <= this.y + this.h &&
    !this.clicked
  );
};

function markImage(coordinates, correct) {
  if (correct) {
    ctx1.strokeStyle = "#228B22";
  } else {
    ctx1.strokeStyle = "#FF0000";
  }
  ctx1.lineWidth = 3;
  ctx1.strokeRect(coordinates.x, coordinates.y, coordinates.w, coordinates.h);
}

function removeDuplicates(arr) {
  var temp_arr = [...new Set(arr)];
  while (temp_arr.length != arr.length) {
    if (hard == 0) {
      var new_image = ffGame_friendly_images.shift();
    } else {
      var new_image = store_friendly_images_hard.shift();
    }

    if (temp_arr.indexOf(new_image) == -1) {
      temp_arr.push(new_image);
    }
  }

  return temp_arr;
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

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

function playNote() {
  // using tone.js
  parts = ffg_music[ffg_music_counter++];
  if (!ffgMuted) {
    synth.triggerAttackRelease(parts.note, parts.duration);
  }
  if (
    call_next_music &&
    ffg_music_counter >= Math.floor(ffg_music.length / 1.3)
  ) {
    console.log("FFG PLAY NOTE");
    updateMusic();
    call_next_music = false;
  }
  // ffg_total_images_clicked = no_positive_images_clicked_level1;
  updateMusicBar();
  updateBadges();
  if (ffg_music_counter >= ffg_music.length) {
    timeActualLeft = timeBeingShown;
    // clearInterval(ffg_timer);
    ffg_timers.forEach(function(ffg_timer) {
      clearInterval(ffg_timer);
    });
    game_completed = true;
    updateUser();
    //update performance
    updateStats();
    console.log('update performance');
    songOver();
  }
}

function updateMusicBar() {
  ffgMusicBarValue = (ffg_music_counter / ffg_music.length) * 100;
  UpdateMusicBarEvent = document.createEvent("CustomEvent");
  UpdateMusicBarEvent.initCustomEvent("FFGUpdateMusicBar");
  window.dispatchEvent(UpdateMusicBarEvent);
}

function playWrongNote() {
  if (!ffgMuted) {
    synth.triggerAttackRelease(wrong_note[0], wrong_note[1]);
  }
}

// this portion of the code deals with playing the full song multiple times. this doesn't work properly. fix that.
function playMusic(stop, song) {
  var song_counter = 0;
  var part = new Tone.Part(function(time, note) {
    if (song_counter == song.length - 1) {
      $("#canvas1").removeClass("block-click");
      showMusicButton();
      Tone.Transport.stop();
    }
    song_counter++;
    synth.triggerAttackRelease(note.note, note.duration, time);
  }, song).start(0);
  Tone.Transport.start();
}

function songOver() {
  // show play next modal
  console.log("song order", ffg_music_current_order);
  if (ffg_music_current_order === 4 && ffg_ask_feedback) {
    console.log('show feedback');
    gameFeedbackPopup();
  } else {
    console.log('show next game');
    playNextGamePopup();
  }
  // updateUser(ffg_music_current_order, ffg_coins);
  getNextSong();

  nextStage();

  ffg_music = next_song;
  ffg_next_song = next_song_name;
  ffg_music_name = next_song_name;
  game_paused = true;
  console.log("ffg_music", ffg_music);
  showPlayButton();
}

function levelUp() {
  console.log("level up called", level);
  // take to next level;
  updateDifficultyLevel();

  var values = getDifficultyLevel(ffg_time_per_note);
  level = values.level;
  no_images = values.no_images;

  no_row = no_images / no_col;
  ffg_music_counter = 0;
  life = total_life;
  document.getElementById("life").innerHTML = life;
  // check timebeing shown with time recieved from backend
  timeBeingShown = timeAlloted;
  canvasClicked = false;
  updateDifficultyBar();
  updateMusicBar();
  first_click = true;
  game_completed = false;
  game_paused = false;
  game_started = true;
  canvas1.height = level * (HEIGHT + 2 * margin);
  setTime();
}

function showGameOver() {
  if (timeBeingShown == 0) {
    showPlayagainPopup();
    if (ffg_time_per_note <= 4500) {
      ffg_time_per_note += time_change_unit;
    }
  } else {
    showNoLifePopup();
  }
  updateStats();
  game_paused = true;
  game_started = false;
}

function nextStage() {
  $(".game-components").hide();
  $("input[name=options]").attr("checked", false);
  $(".btn-facegame-level-up").removeClass("active");
  $("#next-stage-div").removeClass("d-none");
  $("#next-stage-message").html(
    positive_messages[Math.floor(Math.random() * positive_messages.length)]
  );
  $("#next-stage-message").removeClass("d-none");

  setTimeout(function() {
    $("#next-stage-message").html("");
  }, 3000);

  setTimeout(function() {
    $("#harder-text")
      .removeClass("d-none")
      .hide()
      .fadeIn(1000);
  }, 3000);

  setTimeout(function() {
    $("#harder-options")
      .removeClass("d-none")
      .hide()
      .fadeIn(1000);
  }, 5000);
}

function initialize() {
  initialization_counter++;
  scaleWidth = 0.9;
  scaleHeight = 0.8;
  canvas1 = document.getElementById("canvas1");
  canvas1.width = 266; //window.innerWidth*scaleWidth

  ctx1 = canvas1.getContext("2d");

  image_urls_1 = []; // for showing the initial image 1 sets
  image_urls_2 = []; // for showing the initial image 2 sets

  store_friendly_images_coordinates_1 = new Array(); // for storing friendly image coordinates in canvas 1
  store_hostile_images_coordinates_1 = new Array(); // for storing hostile image coordinates in canvas 1
  no_positive = initial_no_positive;
  var values = getDifficultyLevel(ffg_time_per_note);
  level = values.level;
  no_images = values.no_images;
  console.log("INSIDE INITIALIZATION, LEVEL : ", level);
  console.log("INSIDE INITIALIZATION, NO_IMAGES : ", no_images);

  gameRestart = false;

  ffg_timers = [];

  stage = 1; // this determines the progress within a stage. the higher this gets the more difficult that particular level gets.
  stage_counter = 0; // this checks how many iterations have been completed in a single stage and changes the stage counter once the number of iterations are completed
  no_col = 2; // no. of columns in the matrix.
  no_row = no_images / no_col; // no. of rows in the matrix.
  hard = 0; // 0 means false, 1 means true.
  ajax_request_time_hostile = 1000; // this determines the time after which each ajax request is sent for retrieving the images
  ajax_request_time_friendly = 1000; // this determines the time after which each ajax request is sent for retrieving the images
  counter = 0;
  margin = 13;
  HEIGHT = 107;
  WIDTH = 107;
  canvas1.height = level * (HEIGHT + 2 * margin); //setting the initial canvas height based the image height

  friendly_image_clicked = false;
  no_friendly_image_clicked = 0;

  hostile_images = [];
  friendly_images = [];

  level_up_counter = [
    [3, 6, 6],
    [3, 18, 18],
    [3, 18, 18]
  ];

  ffg_music_counter_array = [1, 2, 3, 4, 5, 6, 7, 8];
  ffg_music_counter = 0;
  decrease = true;
  threshold = 1;
  lower_threshold =
    ffg_music_note_rate - threshold > 1 ? ffg_music_note_rate - threshold : 1; // the minimum number of positive images to be shown
  higher_threshold = lower_threshold + 2 * threshold; // the maximum number of positive images to be shown

  audio = document.getElementById("music-set");

  no_wrong = 0; // this stores the difference between the notes played and the number of positive faces clicked, if this gets below 0, game over
  wrong_threshold = 3; // if the user clicks on this many wrong images consecutively, show maximum number of positive images possible

  // delay before the next page is shown
  refresh_delay = 100;

  // for stopping ajax requests in case of inactive users
  time_out_in_milliseconds = 10000; // 10 seconds
  active = true;

  synth = new Tone.Synth().toMaster();

  // for calculating the time taken between two consecutive positive image clicks
  date = new Date();
  last_click = date.getTime(); // returns the number of milliseconds since Jan 1, 1970
  game_started = false;
  game_start_counter = 0;
  game_paused = false;

  first_click = true; // required for starting the clock

  wrong_note = ["A7", "16n"];

  mute = false; // for muting volume

  // set the time bar width
  getColor(100, 0, 100);
  updateDifficultyBar();
  updateMusicBar();

  positive_messages = [
    "Great job!",
    "Fantastic!",
    "Awesome!",
    "Brilliant!",
    "Excellent!"
  ];

  life = 5;
  total_life = 5;
  console.log("ffg_coins", ffg_coins, ffg_time_per_note);
  ffg_score = ffg_coins;
  timeBeingShown = Math.floor((ffg_time_per_note * ffg_music.length) / 1000);

  timeAlloted = timeBeingShown;

  disableElements();
  no_row = no_images / no_col; // no. of rows in the matrix.
  ffg_music_counter = 0;
  if (ffg_music_name.length >= 30) {
    // trim music length
    trimLength = ffg_music_name.length - 26;
    ffg_music_name = ffg_music_name.slice(0, -trimLength) + " ...";
  }
  document.getElementById("song-name").innerHTML = ffg_music_name;
  document.getElementById("life").innerHTML = life;
  document.getElementById("score-num").innerHTML = ffg_score;
  document.getElementById("time-sec").innerHTML = timeBeingShown + "s";
  song_playing = false;

  game_over_music = [
    { time: 0.5, note: "A7", duration: "4n" },
    { time: 1.5, note: "A7", duration: "4n" },
    { time: 2.5, note: "A7", duration: "4n" }
  ];

  multiplier = 1;

  // only update it for the first time initialization is called
  if (initialization_counter == 1) {
    canvas_coordinates = document
      .getElementById("canvas1")
      .getBoundingClientRect();
  }
}

function setTime() {
  var time = 0;
  for (var i = 1; i < ffg_music.length; i++) {
    time += TIME[ffg_music[i - 1].duration.toString()];
    ffg_music[i].time = time;
  }
}

function getMaxNoteDuration() {
  var max = 1000;
  for (var i = 0; i < ffg_music.length; i++) {
    var duration = ffg_music[i].duration;
    duration = parseInt(duration.substr(0, duration.indexOf("n")));
    max = duration < max ? duration : max; // max duration is value with minimum note
  }
  return max;
}

function updateDifficultyBar() {
  diffConst =
    (max_time_per_note - ffg_time_per_note) /
    (max_time_per_note - min_time_per_note);

  ffgDifficultyValue = diffConst * 100;
  diffBarEvent = document.createEvent("CustomEvent");
  diffBarEvent.initCustomEvent("diffBarUpdate");
  window.dispatchEvent(diffBarEvent);
}

function updateDifficultyLevel() {
  if (timeActualLeft > Math.floor(0.2 * this.timeAlloted)) {
    ffg_time_per_note -= time_change_unit;
    timeBeingShown = Math.floor((ffg_time_per_note * ffg_music.length) / 1000);
  } else {
    timeBeingShown = this.timeAlloted;
  }
  console.log("time per note", ffg_time_per_note, timeAlloted);

  document.getElementById("time-sec").innerHTML = timeBeingShown + "s";
}

function startTimer() {
  time_out_id = window.setTimeout(doInactive, time_out_in_milliseconds);
}

function doInactive() {
  active = false;
}

function resetTimer() {
  window.clearTimeout(time_out_id);
  if (!active) {
    active = false;
  }
  active = true;
  startTimer();
}

function setupTimers() {
  document.addEventListener("mousemove", resetTimer, false);
  document.addEventListener("mousedown", resetTimer, false);
  document.addEventListener("keypress", resetTimer, false);
  document.addEventListener("touchmove", resetTimer, false);
  startTimer();
}

// friendly = 1 means friendly; friendly = 0 means hostile
ffGamePreloadImages = function(friendly, length) {
  var urls =
    friendly == 1
      ? ffGame_friendly_images.slice(0, length)
      : ffGame_hostile_images.slice(0, length);

  var imgs = urls.map(function(url) {
    var img = new Image();
    img.src = url;
    img.onload = function() {
      if (friendly == 1) {
        ffg_loaded_friendly_images.push(img);
      } else {
        ffg_loaded_hostile_images.push(img);
      }
    };
  });
  if (friendly == 1) {
    ffGame_friendly_images.splice(0, length);
  } else {
    ffGame_hostile_images.splice(0, length);
  }
};

function disableElements() {
  $(".game-components *")
    .children()
    .prop("disabled", true);
  $(".game-components").addClass("fade-in");
  $("#canvas-div").removeClass("fade-in");
  $("#canvas-div *")
    .children()
    .prop("disabled", false);
  $("#song-name-div *")
    .children()
    .prop("disabled", false);
  $("#song-name-div").removeClass("fade-in");
}

function enableElements() {
  $(".game-components *")
    .children()
    .prop("disabled", false);
  $(".game-components").removeClass("fade-in");
  $("#song-name-div *")
    .children()
    .prop("disabled", true);
  $("#song-name-div").addClass("fade-in");
}

var updateUser = function() {
  var storeFFGUserDataEvent = document.createEvent("CustomEvent");
  storeFFGUserDataEvent.initCustomEvent("FFGUserInfoUpdate");
  window.dispatchEvent(storeFFGUserDataEvent);
};

getFFGUser = function() {
  ffg_coins = ffg_score;
  console.log("time per note, user data", ffg_time_per_note, ffg_coins, ffg_music_current_order, ffg_time_per_note);
  return [ffg_coins, ffg_music_current_order, ffg_time_per_note];
};

getFFGClickData = function() {
  return [
    level,
    ffg_music_current_order,
    no_positive_images_clicked,
    total_time_taken,
    ffg_device_type,
    game_completed,
  ];
};

function playNextGamePopup() {
  showPlayNextEvent = document.createEvent("CustomEvent");
  showPlayNextEvent.initCustomEvent("CallPlayNext");
  window.dispatchEvent(showPlayNextEvent);
}

function showInstructionsPopup() {
  showInstructionsEvent = document.createEvent("CustomEvent");
  showInstructionsEvent.initCustomEvent("showInstructions");
  window.dispatchEvent(showInstructionsEvent);
}

function showPlayagainPopup() {
  showPlayagainEvent = document.createEvent("CustomEvent");
  showPlayagainEvent.initCustomEvent("Playagain");
  window.dispatchEvent(showPlayagainEvent);
}

function showNoLifePopup() {
  noLifeEvent = document.createEvent("CustomEvent");
  noLifeEvent.initCustomEvent("FFGNoLife");
  window.dispatchEvent(noLifeEvent);
}

function updateBadges() {
  FFGUpdateBadgesEvent = document.createEvent("CustomEvent");
  FFGUpdateBadgesEvent.initCustomEvent("FFGUpdateBadges");
  window.dispatchEvent(FFGUpdateBadgesEvent);
}

function getImages(imageType) {
  getImagesEvent = document.createEvent("CustomEvent");
  getImagesEvent.initCustomEvent(imageType);
  window.dispatchEvent(getImagesEvent);
}

function gameFeedbackPopup() {
  feedbackEvent = document.createEvent("CustomEvent");
  feedbackEvent.initCustomEvent("Feedback");
  window.dispatchEvent(feedbackEvent);
}

function getDifficultyLevel(time_per_note) {
  if (time_per_note >= EASY_LEVEL_THRESHOLD) {
    return { level: 1, no_images: 2 };
  } else if (time_per_note >= MEDIUM_LEVEL_THRESHOLD) {
    return { level: 2, no_images: 4 };
  } else {
    return { level: 3, no_images: 6 };
  }
}
