//Configuration for phaser.js
function config(render_type,swidth,sheight,modeType,center){
	this.type=render_type;
	this.scale = {
		mode:modeType,
		parent: "execGame",
		autoCenter: center,
		width: swidth,
		height: sheight
	};
	this.physics= {
		default: 'arcade',
		arcade: {
			gravity: { y: 3000 },
			debug: false
				
			}
		};
		
	this.scene={
		preload: preload,
		create: create,
		update: update
	};
};


//Find out browser version
function browser_version_finder(){
	var ua= navigator.userAgent,tem, 
	M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	if(/trident/i.test(M[1])){
		tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
		return 'IE '+(tem[1] || '');
	}
	if(M[1]=== 'Chrome'){
		tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
		if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
	}
	M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
	return M.join(' ');
}


//Set game type accordingly(for now only done and tested for chrome)
function setType()
{
   
   var browser_version=browser_version_finder().match(/([a-zA-Z]+)\s*(\d+)/);
	if(browser_version[1] == 'Firefox'){
		return Phaser.CANVAS;
	}
	if(parseInt(browser_version[2])>=67)
	{
		return Phaser.AUTO;
	}
	else
	{
		return Phaser.CANVAS;	
	}

}
function modeType(){
	return Phaser.Scale.FIT;
}
function setCenter(){
	return Phaser.Scale.CENTER_BOTH;
}


var screen_width;
var screen_height;
var scaleRatio;

var pause_resume_game;
var closeECGame;
var musicECGame;

var getECScoreData; 
var getECGameTaskData;

var storeTaskDataEvent;
var storeECScoreDataEvent;
// if game closed once ... then restarted 
var game_closed; 
var ec_play_clicked;

// store the time when the game is started
var ec_game_start_time;

//timeout var 
var generate_tasks_timeout;

// badges information
var ecg_bronze_constant;
var ecg_silver_constant;
var ecg_gold_constant;

var ecg_bronze_value;
var ecg_bronze_percent;

var ecg_silver_value;
var ecg_silver_percent;

var ecg_gold_value;
var ecg_gold_percent;
var total_correct_responses;

var badgeBarWidth;

var bronzeBadge;
var bronzeText;
var bronzeBar;
var bronzeBarBack;			// this the bar with lighter color and behind the actual bar

var silverBadge;
var silverText;
var silverBar;
var silverBarBack;

var goldBadge;
var goldText;
var goldBar;
var goldBarBack;

//Background Elements
var cityline_title;
var brick;
var brick1;
var clouds;
var river;
var river_filler;
var river_height;
var scene_change_platform;
var scene_change_platform_velocity_y;
var scene_change_timeout;
var player_y_speed;


//Double click detector
var no_of_clicks;
var clicked_detected;
var DOUBLE_CLICK_INTERVAL;

//Shooting action
var shooting_bomb_x;
var shooting_bomb_y;
var shooting_bomb_group;
var shoot_x;
var shoot_y;
var shooting_bomb;
var movement_increment;
var movement_progress;
var isShooting;
var SHOOTING_POWER;
var SHOOTING_POWER_UNLOCKED;
var shooting_power_option_shown;
var shooting_power_cost;
var pavement;
var platform;
var brick_end;
var blue_filler;
var cursors;
var pause_button;
var resume_button;

//Player Cordinates
var PLAYER_X;
var PLAYER_INITIAL_Y;
var player_blinking_animation;
var PLAYER_ANIMATION_TIMING;
var player_blinking_counter;
var player_counter;
var stop_player_animation;


//Speed Related variables
var LEVEL_SPEED;
var LEVEL_SPEED_INCREMENT_GAP;
var SPEED_INCREMENT;
var MAX_LEVEL_SPEED;
var MIN_LEVEL_SPEED;

var CITYLINE_SPEED;
var RIVER_SPEED;
var BIG_RIVER_SPEED;
var CLOUDS_SPEED;
var STILL_WATER_SPEED;


//normal coin variables;
var coin=[];
var coins_group;
var stop_coin_generation;
var coinGenerating;
var coinGeneratingInit;
var add_new_coin;
var COIN_MAX_Y_CORDINATE;
var COIN_Y_CORDINATE_RANGE;
var COIN_MIN_X_CORDINATE;
var COIN_X_CORDINATE_RANGE;
var COIN_SIZE_SCALE;
var NEXT_COIN_GAP_RANGE;
var MINIMUM_GAP_FOR_NEXT_COIN;
var COIN_SPEED;
var COIN_SCORE;
var COIN_GAP;
var NUMBER_OF_COINS;
var MAXIMUM_NUMBER_OF_COINS;
var coin_sound;


//coin with obstacle variables
var coin_with_obstacle;
var obstacle_for_coin;
var coin_obstacle_group;
var stop_coin_with_obstacle_generation;
var add_new_coin_with_obstacle;
var coinGeneratingWithObstacleInit;
var coinGeneratingWithObstacle;
var COIN_WTIH_OBSTACLE_MAX_Y_CORDINATE;
var COIN_WTIH_OBSTACLE_Y_CORDINATE_RANGE;
var COIN_WTIH_OBSTACLE_X_CORDINATE_RANGE;
var COIN_WTIH_OBSTACLE_MIN_X_CORDINATE;
var NEXT_COIN_WITH_OBSTACLE_GAP_RANGE;
var MINIMUM_GAP_FOR_NEXT_COIN_WITH_OBSTACLE;
var COIN_WITH_OBSTACLE_SPEED;
var OBSTACLE_ROTATION_PERIOD;
var COIN_WITH_OBSTACLE_SCORE;
var COIN_WITH_OBSTACLE_SIZE_SCALE;
var OBSTACLE_FOR_COIN_SIZE_SCALE;


//river pit variables
var pit;
var stop_pit_generation;
var PIT_MINIMUM_SIZE;
var PIT_SIZE_RANGE;
var MAX_PIT_LENGTH;
var PIT_SPEED;

//Extra Life variables
var extra_life_group;
var extra_life;
var lifeGenerating;
var stop_life_generation;
var EXTRA_LIFE_MAX_Y_CORDINATE;
var EXTRA_LIFE_Y_CORDINATE_RANGE;
var EXTRA_LIFE_X_CORDINATE_RANGE;
var EXTRA_LIFE_MIN_X_CORDINATE;
var NEXT_EXTRA_LIFE_GAP_RANGE;
var MINIMUM_GAP_FOR_NEXT_EXTRA_LIFE;
var EXTRA_LIFE_SPEED;
var EXTRA_LIFE_SIZE_SCALE;
var allowLifeReward;

//Dropping Platform variables
var dropping_platform;
var dropping_platform_group;
var stop_dropping_platform_generation;
var dropping_platform_first;
var drop_point;
var DROPPING_PLATFORM_MINIMUM_SIZE;
var DROPPING_PLATFORM_SIZE_RANGE;
var MINIMUM_DROP_POINT;
var DROP_POINT_RANGE;
var DROP_PLATFORM_Y_CORDINATE;
var DROP_PLATFORM_HEIGHT;
var DROPPING_PLATFORM_SPEED;
var DROP_PLATFORM_DOWN_SPEED;

//Obstacle variables
var obstacle;
var obstacle_group;
var stop_obstacle_generation;
var OBSTACLE_X_CORDINATE;
var OBSTACLE_Y_CORDINATE;
var OBSTACLE_SPEED;
var obstacleGenerating;
var flying_obstacle;
var top_obstacle;
var obstacle_type;
var obstacle_movement;
var TOP;
var BOTTOM;
var OBSTACLE_Y_SPEED;


//Task initialization
var task_completed;
var task_init;
var stop_length;
var MINIMUM_STOP_LENGTH;
var STOP_LENGTH_RANGE;
var start_tasks;
var reachedCrossing;
var date;
var restore_game;
var max_number_of_tasks
var current_number_of_tasks;
var TASK_INTERVAL;
var performance_reward;
var reward_group;
var reward_count;
var tasks_done;
var flanker_task_done;
var image_task_done;
var discrimination_task_initial_timeout;
var continue_to_next_set_timeout;
var generate_tasks_variable;

var task_dialog_done;
var task_background;
var task_background_added;
var task_background_removed;

var task_start_dialog_add;
var task_start_dialog;
var task_start_button;
var task_start_button_text;

var double_coin_blinker;

//User information display
var countdown;
var start_countdown_done;
var resume_countdown_done;
var countdown_handler;
var STARTING_TEXT;
var RESUMING_TEXT;
var INTERVAL;
var countdown_max_dot_length;
var countdown_dot_length;
var countdown_text;

//pause button
var pause_button;


//mystery egg;
var mystery_egg_icon;
var mystery_egg_collected;
var mystery_egg_collected_text;

//Gameover dialog_box;
var game_over_dialog;
var game_over_text;
var buy_live_img1;
var buy_live_img21;
var buy_live_img22;
var buy_live_img31;
var buy_live_img32;
var buy_live_img33;
var buy_one_live;
var buy_two_lives;
var buy_three_lives;

//Task buttons
var left_button;
var right_button;
var red_button;
var green_button;
var BUTTON_SPEED;
var LEFT_X;
var RIGHT_X;
var TOP_Y;
var BOTTOM_Y;
var distance;
var CORRECT_RESPONSE;
var INCORRECT_RESPONSE;
var NO_REPSONSE;
var NEGATIVE_IMAGE;
var NEUTRAL_IMAGE;
var TYPE_CHANGE_INTERVAL;
var number_of_correct_response;

//Flanker task variables
var flanker_task_init;
var flanker_task_started;
var flanker_task_ended;
var flanker_task_image;
var flanker_task_choice;
var flanker_task_start_time;
var flanker_task_end_time;
var flanker_task_response_time;
var flanker_task_response_type;
var flanker_task_congruency;
var flanker_task_timestamp;
var TOTAL_NUMBER_OF_FLANKER_TASK;
var FLANKER_Y_CORDINATE;
var FLANKER_X_CORDINATE;
var FLANKER_TASK_IMAGE_SCALE;
var FLANKER_TASK_IMAGE_SPEED;
var TIME_FOR_FLANKER;

//Task images
var task_image;
var task_image_type;
var TOTAL_NUMBER_OF_IMAGES;
var TIME_FOR_IMAGE;
var TIME_FOR_BLANK_SCREEN;
var IMAGE_Y_CORDINATE;
var IMAGE_X_CORDINATE;

//Discrimination task
var discrimination_task_init;
var discrimination_task_started;
var discrimination_task_ended;
var discrimination_task_image;
var discrimination_task_choice;
var discrimination_task_start_time;
var discrimination_task_end_time;
var discrimination_task_response_time;
var discrimination_task_response_type;
var discrimination_task_timestamp;
var TOTAL_NUMBER_OF_DISCRIMINATION_TASK;
var DISCRIMINATION_Y_CORDINATE;
var DISCRIMINATION_X_CORDINATE;
var DISCRIMIANTION_TASK_IMAGE_SCALE;
var DISCRIMINATION_TASK_IMAGE_SPEED;
var TIME_FOR_DISCRIMINATION;


//Game Scoring Elements
var GAME_ELEMENTS_SPEED;
var life;
var lifes_group;
var HEART_POSITION_ADJUSTMENT;
var heart_height;
var heart_size;
var stat_icon_display_y;
var stat_text_display_y;
var heart_x;
var MAX_NUMBER_OF_LIVES;
var COIN_SCORE_LENGTH_ADJUSTMENT;
var coin_score_icon;
var scoreText;
var score_x;
var score;
var level;
var coinsCollectedText;
var gameOver;
var coins_collected;
var max_score;
var no_player;
var number_of_lives;
var score_checkpoints;
var current_checkpoint;
var RESPAWNING_TEXT;
var RESPAWN_Y;
var RESPAWN_X;
var respawn_animator;
var respawn_dot_length;
var respawn_dot_max_length;
var RESPAWN_ANIMATION_INTERVAL
var game_paused;
var score_update_handler;

//Jumping Variables
var jump_up,jump_down;
var jumpingUp;
var jumpingInit;
var jump_disabled;
var jump_velocity;
var jump_height;
var isJumping;
var type;
var jump_button;
var double_jump_button;
var SINGLE_JUMP;
var DOUBLE_JUMP;


//Store the current instance of the game 
var curr_game;


//Brick related variables
var BRICK_SPEED;
var BRICK_Y_CORDINATE;
var BRICK_HEIGHT;
var NEW_BRICK_X_COORDINATE;
var brick_speed;
var brick_height;

//Cityline Variables
var Cityline_height;


//Randomization variables
/*
first_choice:to choose between elements in air and elements on platform
second_choice:to choose which element in air
second_choice_high:to choose which element on platform
lock_on_choice&choice_lock_counter:delay generating variables;
free_to...:new element generation possible only if it is true;
clear_to_start:incremented for every new element generated and decremented when its scope is over
*/
var first_choice;
var free_to_start_choose;

var second_choice;
var free_to_choose;

var second_choice_high;
var free_to_choose_high;

var lock_on_choice;
var choice_lock_counter;

var clear_to_start;

//RANDOMIZATION Value
var FIRST_CHOICE_RANGE;
var FIRST_CHOICE_SPLITTER;
var SECOND_CHOICE_RANGE;
var SECOND_CHOICE_HIGH_RANGE;
var COIN_SELECTOR;
var LIFE_SELECTOR;
var COIN_WITH_OBSTACLE_SELECTOR;
var PIT_SELECTOR;
var DROPPING_PLATFORM_SELECTOR;

//Game-Control Keys;
/*Jump=Space
Double-Jump=Ctrl+Space
Flanker-left=D
Flanker-right=K
Discrimination-red=V
Discrimination-green=N*/

//music button
var music_button_on;
var music_button_off;
var music_muted;

//Keyboard inputs
var isTouchDevice
var jumpKey;
var doubleJumpKey;
var flankerLeftKey;
var flankerRightKey;
var discriminationRedKey;
var discriminationGreenKey;

//sounds
var falling_down_sound;
var bgm_sound;
var game_over_sound;


//retry button
var retry_coin_icon;
var retry_coin_text;
var retry_coin_animation;
var retry_cost;

var buy_live_img1_text;
var buy_live_img2_text;
var buy_live_img3_text;
var buy_one_live_text;
var buy_two_lives_text;
var buy_three_lives_text;

//double_jump
var DOUBLE_COIN_POWER;
var double_coin_option_shown;
var double_coin_text;
var double_coin_icon;
var double_coin_yes_button;
var double_coin_no_button;
var double_coin_cost;
var double_coin_cost_text;
var double_coin_dialog;


//Tutorial
var SHOW_TUTORIAL;
var jump_tutorial_shown;
var obstacle_tutorial_shown;
var tutorial_text;
var tutorial_box;
var tutorial_end_text_time;
var double_jump_for_obstacle1_tutorial_shown;
var double_jump_for_obstacle2_tutorial_shown;
var control_button_1;
var control_button_2;
var task_tutorial_shown;
var task_button_blinking_animation;
var task_tutorial_text;

var touch_button_animation;
var touch_alpha;
var touch_size;
var alpha_choice;
var animation_active;

var JUMP_BUTTON_Y;
var DOUBLE_JUMP_BUTTON_Y;
var DOUBLE_JUMP_BUTTON_TEXT_Y;


//Scene change tunnel variables
var tunnel_entry;
var river_1;
var cityline_title_1;

var isChangingScene;
var flyingUp;
var startTunnelMovement;
var startTunnelMovementDelay
var stopTunnelMovement;
var stopTunnelMovementDelay;
var stopTunnelTimeout;
var moveSidewardsTimeout;
var flyingDown;
var brickYCordinate;
var horizontalMovement;
var tunnelDownwardMovement;
var tunnelUpwardMovement;
var scene_change_platform1;
var scene_change_platform;

var brick2;
var brick3;

var background_images_array;
var background_sky_array;
var scene_counter;

//Game objects(from db)
var game_object;
var game_over_update;
//Jump Platform variables
var jump_platform;
var JUMP_PLATFORM_MINIMUM_LENGTH;
var JUMP_PLATFORM_LENGTH_RANGE;
var JUMP_PLATFORM_MINIMUM_HEIGHT;
var JUMP_PLATFORM_HEIGHT_RANGE;
var JUMP_PLATFORM_MINIMUM_POSITION;
var JUMP_PLATFORM_POSITION_RANGE;
var JUMP_PLATFORM_SPEED;
var JUMP_PLATFORM_CHOICE;
var CROSSING_MINIMUM_LENGTH;
var JUMP_RANGE;
var CROSSING_RANGE;
var JUMP_RANGE_INCREMENT;
var CROSSING_RANGE_INCREMENT;
var DROP_JUMP_PLATFORM_SPEED;
var JUMP_PLATFORM_CHOICE_RANGE;
var initial_double_jumps;
var jumps;
var double_jump_text;
var double_jump_coin
var coin_blinker_interval;
var DOUBLE_JUMP_COST;


//For jump animations
function jump_tutorial_animation(){
  jump_button.alpha=touch_alpha[alpha_choice%2];
  jump_button.setScale(touch_size[alpha_choice%2]);
  alpha_choice++;
  animation_active=true;
}

function double_jump_tutorial_animation(){
  double_jump_button.alpha=touch_alpha[alpha_choice%2];
  double_jump_button.setScale(touch_size[alpha_choice%2]);
  alpha_choice++;
  animation_active=true;
}

//Load the elements
function preload(){

	//Background Elements
	this.load.image('skyline',png+'/background_images/mountains.png');
	this.load.image('skyline1',png+'/background_images/desert.png');
	this.load.image('skyline2',png+'/background_images/trees.png');
	this.load.image('skyline3',png+'/background_images/mountains_snow.png');
	this.load.image('skyline4',png+'/background_images/city.png');
	
	this.load.image('mountain_sky',jpg_location+'/blue_filler.jpg');
	this.load.image('desert_sky',svg_location+'/sky.svg');
	this.load.image('evening_sky',jpg_location+'/evening_sky.png');

	this.load.image('brick',jpg_location+'/platform.png');
	this.load.image('jump_platform_0',jpg_location+'/platform.png');
	this.load.image('jump_platform_1',jpg_location+'/unstable-platform.jpg');
	


	this.load.image('river',svg_location+'/river.svg');
	this.load.image('river_filler',jpg_location+"/big_river.jpg");

	//Coin Related Elements
	this.load.image('coin_obstacle',svg_location+'/stone_single.svg');
	this.load.image('coin',svg_location+'/GOLD_COIN.svg');

	
	//Obstacle
	this.load.image('obstacle',svg_location+'/stone_single.svg');
	this.load.image('flying_obstacle',svg_location+'/Frog.svg');
	this.load.image('big_obstacle',svg_location+'/stone_double.svg');

	//Extra life and other bonus
	this.load.image('life',svg_location+"/heart.svg");
	this.load.image('mystery_egg',svg_location+"/me.svg");

	//Shooting bomb
	this.load.image('bomb',png+'/bomb.png');

	//Avatar
	this.load.spritesheet('dude', png+'/avatar_1.png', { frameWidth: 59, frameHeight: 60}); // 32, 48

	// badges images
	this.load.image('bronze_badge',assets_img_location+'/Bronze badge symbol.svg');
	this.load.image('silver_badge',assets_img_location+'/Silver badge symbol.svg');
	this.load.image('gold_badge', assets_img_location+'/Gold badge symbol.svg');

	//Flanker Buttons
	this.load.spritesheet('flanker_button',svg_location+'/flanker_button.svg',{ frameWidth: 160, frameHeight: 160 });

	this.load.spritesheet('left_button', svg_location+'/left_button.svg',{ frameWidth: 160, frameHeight: 160 });
	this.load.spritesheet('right_button',svg_location+'/right_button.svg',{ frameWidth: 160, frameHeight: 160 });

	// single jump Buttons
	this.load.spritesheet('single_jump',svg_location+'/single_jump.png',{ frameWidth: 160, frameHeight: 160 });

	//Jump Button
	this.load.spritesheet('double_jump',svg_location+'/double_jump.png',{ frameWidth: 160, frameHeight: 160 });

	// black background
	this.load.spritesheet('black_background',svg_location+'/full_window_background.svg',{ frameWidth: 160, frameHeight: 160 });

	//Discrimination Task Buttons
	this.load.image('red_button',svg_location+"/red_buttonN.svg");
	this.load.image('green_button',svg_location+"/green_buttonN.svg");

	// this.load.image('music_off', assets_img_location + "/mute.png");
	
	//Flanker Task Images
	this.load.image('flanker_0',svg_location+"/flanker_task/0.svg");
	this.load.image('flanker_1',svg_location+"/flanker_task/1.svg");
	this.load.image('flanker_2',svg_location+"/flanker_task/2.svg");
	this.load.image('flanker_3',svg_location+"/flanker_task/3.svg");

	//Neutral or Negative Image(Odd:Negative Even:Neutral)
	for(var i=1; i<TOTAL_NUMBER_OF_IMAGES; i+=2){
		this.load.image('image_'+i,jpg_location+"/pictures/emotional/"+i+".jpg");
	}

	for(var i=0; i<TOTAL_NUMBER_OF_IMAGES; i+=2){
		this.load.image('image_'+i,jpg_location+"/pictures/neutral/"+i+".jpg");
	}	

	//Discrimination Task Images
	this.load.image('discrimination_0',svg_location+"/discrimination_task/red_symbol.svg");
	this.load.image('discrimination_1',svg_location+"/discrimination_task/green_symbol.svg");

	//sound effects
	this.load.audio('coin_sound',sound_location+"/coin.ogg");
	this.load.audio('shooting_sound',sound_location+"/gun_shoot.mp3")
	this.load.audio('jumping_sound',sound_location+"/jumping.mp3");
	this.load.audio('hit_obstacle_sound',sound_location+"/hit_obstacle.mp3");
	this.load.audio('falling_down_sound',sound_location+'/fall_down.mp3');
	this.load.audio('shoot_obstacle_sound',sound_location+'/shoot_obstacle.mp3');
	this.load.audio('game_over_sound',sound_location+'/game_over.mp3');
	this.load.audio('mystery_egg_sound',sound_location+'/mystery_egg.wav');
	this.load.audio('bgm',sound_location+'/bgm.mp3');

	//Gameover dialog
	this.load.image('game_over_dialog',svg_location+"/transparent_background.svg");
	this.load.image('restart_game', assets_img_location +"/play.png");		//actually resuming the game
	this.load.image('replay_game', assets_img_location+"/replay.png");

	this.load.image('buy_button',svg_location+"/Button.svg");
	//Yes/no button
	this.load.image('yes_button',png+"/yes_button.png");
	this.load.image('no_button',png+"/no_button.png");

	//tutorial buttons
	this.load.image("spacebar_button",svg_location+"/spacebar_button.svg");
	this.load.image("shift_button",svg_location+"/shift_button.svg");

	//tutorial box 
	this.load.image("tutorial_box",svg_location+"/transparent_background.svg");

	//Tunnel background
	this.load.image('tunnel',jpg_location+"/tunnel.jpeg");

	//Jump controls
	jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	doubleJumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

	//Flanker task controls
	flankerLeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
	flankerRightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

	//Discrimination task controls
	discriminationGreenKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
	discriminationRedKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
	

	isTouchDevice = 'ontouchstart' in document.documentElement;  
	this.input.keyboard.createCursorKeys();
	this.input.keyboard.on('keydown', e => {
		e.preventDefault();
	});
}



function create(){
	
	ec_game_start_time = generateTS();

	this.scale.on('resize', function(gameSize, baseSize, displaySize, resolution, previousWidth, previousHeight) {
	});

	this.scale.setGameSize(screen_width, screen_height);

	//Create physics group for collidables
	platforms = this.physics.add.group();
	coins_group=this.physics.add.group();
	lifes_group=this.physics.add.group();
	extra_life_group=this.physics.add.group();
	coin_obstacle_group=this.physics.add.group();
	obstacle_group=this.physics.add.group();
	dropping_platform_group=this.physics.add.group();
	pit_group=this.physics.add.group();
	shooting_bomb_group=this.physics.add.group();
	reward_group=this.physics.add.group();

	// this.input.enabled = true; 
	// this.input.addPointer(2);
	// this.renderer.resize(200, 500, 1.0);
	//Backgrond Elements
	blue_filler=this.add.tileSprite(screen_width/2,screen_height*0.35,screen_width,screen_height*0.7,"mountain_sky");
	cityline_title=this.add.tileSprite(screen_width/2,screen_height*(0.7-Cityline_height/(screen_height*2)),screen_width,Cityline_height,'skyline');
	tunnel_entry=this.add.tileSprite(screen_width*0.5,screen_height*1.7,screen_width,screen_height*2,'tunnel');
	
	river=this.add.tileSprite(screen_width/2,screen_height*0.75,screen_width,screen_height*0.1,'river');
	river_filler=this.add.tileSprite(screen_width/2,screen_height*0.9,screen_width,screen_height*0.2,'river_filler');

	brick=this.add.tileSprite(screen_width/2,screen_height*0.9,screen_width,screen_height*0.2,'brick');
	platforms.add(brick);
	brick.depth=1;
	brick.body.allowGravity=false;
	brick.body.immovable=true; 

	//Adjust the brick position if the screen is bigger
	if(screen_height*0.2>brick_height)
	{
		brick.height=brick_height;
		BRICK_HEIGHT=brick_height;
		brick.y=screen_height-brick_height/2;
		BRICK_Y_CORDINATE=brick.y;
		OBSTACLE_Y_CORDINATE=brick.y-brick.height/2;
		river_filler.height=screen_height-screen_height*0.7-river.height;
		river_filler.y=screen_height*0.7+river.height+river_filler.height/2;
	}

	//Adjust the river position if the screen position
	if(screen_height*0.1>river_height)
	{
		river.height=river_height;
		river.y=screen_height*0.7+river_height/2;
		river_filler.height=screen_height-river.y+river.height/2+3;
		river_filler.y=river.y+river.height/2+river_filler.height/2-1.5;
	}

	//Record these for scene changing code
	brick_height=brick.height;
	brickYCordinate=brick.y;

	shooting_bomb_y=brick.y-brick.height/2-20;

	//Life indicator
	life=lifes_group.create(heart_x, stat_icon_display_y, 'life').setScale(1);
	life.body.allowGravity=false;

	//Coin_Elements
	coin_score_icon=coins_group.create(screen_width-40, stat_icon_display_y, 'coin').setScale(0.15);
	coin_score_icon.body.allowGravity=false;

	
	//Detect touch on the screen for shooting action
	this.input.on('pointerdown', function (pointer) {
		if(gameOver==false&&no_player==false)
		{
		shoot_x.push([shooting_bomb_x,pointer.x]);
		shoot_y.push([shooting_bomb_y,pointer.y]);
		setTimeout(shoot,DOUBLE_CLICK_INTERVAL);
		}
	 });
	//Add player and collider
	player = this.physics.add.sprite(PLAYER_X,PLAYER_INITIAL_Y,'dude');
	// this.add.image(250,340,'avatar').setScale(0.5);
	this.physics.add.collider(player,brick);
	
	//Keyboard controls
	cursors = this.input.keyboard.createCursorKeys();
	
	//For Tasks Generation
	generate_tasks_variable=setTimeout(generate_tasks,TASK_INTERVAL);

	//Animations for the avatar
	this.anims.create({
		key: 'run',
		frames: this.anims.generateFrameNumbers('dude', { start: 2, end: 40}), //5, 8
		frameRate: 50,
		repeat: -1
	});

	this.anims.create({
		key: 'jump',
		frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 1}),
		frameRate: 10,
		repeat: -1
	});

	this.anims.create({
		key: 'stand',
		frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 0}),
		frameRate: 10,
		repeat: -1
	});

	//Texts to be displayed
	RESPAWNING_TEXT=this.add.text(RESPAWN_X,RESPAWN_Y,"", { fontSize: '27px', fill: '#fff' });
	countdown_text=this.add.text(RESPAWN_X,RESPAWN_Y,"", { fontSize: '27px', fill: '#fff'});
	scoreText = this.add.text(score_x, stat_text_display_y+1,'Score'+score, { fontSize: '27px', fill: '#fff',align:'left',
																			shadow: {offsetX: 1, offsetY: 1, color: '#0000003D',
																			blur: 2.2, stroke: true, fill: true }, });
	livesText = this.add.text(heart_x-41, stat_text_display_y, number_of_lives, { fontSize: '27px', fill: '#fff',align:'left',
																			shadow: {offsetX: 1, offsetY: 1, color: '#0000003D',
																			blur: 2.2, stroke: true, fill: true }, });
	coinsCollectedText=this.add.text(screen_width-85-COIN_SCORE_LENGTH_ADJUSTMENT*(coins_collected.toString().length-1), stat_text_display_y,coins_collected, 
																			{ fontSize: '27px', fill: '#fff',align:'left',wordWrap: true,
																			shadow: {offsetX: 1, offsetY: 1, color: '#0000003D',
																			blur: 2.2, stroke: true, fill: true }, });
	mystery_egg_collected_text=this.add.text(75, 105,'', { fontSize: '27px', fill: '#fff',align:'right',wordWrap: true });



	//Update Score every 1/2 second
	score_update_handler=setTimeout(score_updator, 500);

	//add the badges information and bars
	goldBadge = this.add.image(screen_width*0.256, stat_icon_display_y-1, 'gold_badge');
	goldBadge.allowGravity = false;
	goldBadge.depth=5;
	goldText = this.add.text(screen_width*0.275,goldBadge.y-8,ecg_gold_value, { fontSize: '14px', fill: '#FFFFFF', align:'right',
																			shadow: {offsetX: 1, offsetY: 1, color: '#0000003D',
																			blur: 2.2, stroke: true, fill: true },});
	goldText.depth=5;

	goldBarBack = this.add.rectangle(screen_width*0.27, stat_icon_display_y+9, badgeBarWidth, 3, 0xFFE59C);
	goldBarBack.depth=5;
 	goldBar = this.add.rectangle(screen_width*0.27, stat_icon_display_y+9, badgeBarWidth, 3, 0xD5A521);
	goldBar.depth =6;

	goldBar.width = (ecg_gold_percent/100) * goldBarBack.width;

	silverBadge = this.add.image(goldBadge.x + 50, stat_icon_display_y-1, 'silver_badge');
	silverBadge.allowGravity = false;
	silverBadge.depth=5;
	silverText = this.add.text(goldText.x + 50 ,silverBadge.y-8,ecg_silver_value, { fontSize: '14px', fill: '#FFFFFF', align:'right',
																			shadow: {offsetX: 1, offsetY: 1, color: '#0000003D',
																			blur: 2.2, stroke: true, fill: true },});
	silverText.depth=5;

	silverBarBack = this.add.rectangle(goldBarBack.x+50, stat_icon_display_y+9, badgeBarWidth, 3, 0xE5E5E5);
	silverBarBack.depth=5;
  	silverBar = this.add.rectangle(goldBar.x + 50, stat_icon_display_y+9, badgeBarWidth, 3, 0x9E9E9E);
	silverBar.depth =6;

	silverBar.width = (ecg_silver_percent/100) * silverBarBack.width;

	bronzeBadge = this.add.image(silverBadge.x+50, stat_icon_display_y-1, 'bronze_badge');
	bronzeBadge.depth=5;
	bronzeBadge.allowGravity = false;
	bronzeText = this.add.text(silverText.x+50,bronzeBadge.y-8,ecg_bronze_value, { fontSize: '14px', fill: '#FFFFFF', align:'right',
																			shadow: {offsetX: 1, offsetY: 1, color: '#0000003D',
																			blur: 2.2, stroke: true, fill: true },});
	bronzeText.depth=5;

	bronzeBarBack = this.add.rectangle(silverBarBack.x+50, stat_icon_display_y+9, badgeBarWidth, 3, 0xFFD59A);
	bronzeBarBack.depth=5;
  	bronzeBar = this.add.rectangle(silverBar.x+50, stat_icon_display_y+9, badgeBarWidth, 3, 0xB37826);
	bronzeBar.depth =6;

	bronzeBar.width = (ecg_bronze_percent/100) * bronzeBarBack.width;

	//Tutorial text
	tutorial_text=this.add.text(screen_width*0.335,screen_height*0.33,"", { fontSize: '14px', fill: '#FFFFFF',align:'center' });
	// tutorial_text.setPadding(20,2,20,2);
	tutorial_text.depth = 14;
	
	//If touch add jump button
	if(isTouchDevice==true)
	{
	//Jump Button
		jump_button=this.add.sprite(screen_width*0.06,screen_height*0.97, 'single_jump').setInteractive().setScale(0.35);
		jump_button.depth=2;
		if(jump_button.y+jump_button.height/2>screen_height)
		{
			jump_button.y=screen_height-jump_button.height*0.7/2;
		}
		jump_button.height = 50;
		jump_button.on('pointerdown',function(){
			jump();
			this.alpha = 1;
		}, this);
	}
	//Double jump button
	if(isTouchDevice){
		double_jump_button=this.add.sprite(screen_width*0.08+(jump_button.width*0.4),screen_height*0.97, 'double_jump').setInteractive().setScale(0.35);
	}else{
		double_jump_button=this.add.sprite(screen_width*0.08,screen_height*0.97, 'double_jump').setInteractive().setScale(0.35);
	}
	double_jump_button.depth=2;

	//double jump text
	double_jump_text=this.add.text(double_jump_button.x+10,screen_height*0.96,"x"+jumps.remaining, { fontSize: '22px', fill: '#fff',align:'center' });
	double_jump_text.depth=3;
	if(double_jump_button.y+double_jump_button.height/2>screen_height)
	{
		double_jump_button.y=screen_height-double_jump_button.height*0.7/2;
		double_jump_text.y=double_jump_button.y+10;

	}
	if(isTouchDevice){
		double_jump_button.on('pointerdown',function(){
			double_jump();
			this.alpha =1;
		}, this);
	}

	//Record these for game restore code
	if(isTouchDevice)
	{
	JUMP_BUTTON_Y=jump_button.y;
	}

	DOUBLE_JUMP_BUTTON_Y=double_jump_button.y;
	DOUBLE_JUMP_BUTTON_TEXT_Y=double_jump_text.y;

	//Add sound and loop it
	bgm_sound=this.sound.add('bgm');
	bgm_sound.loop=true;
	bgm_sound.play();

	game_over_sound=this.sound.add('game_over_sound');

	//Start scene change every 120 seconds
	
	scene_change_timeout =  setTimeout(scene_change_start, 5000);
	
}


function scene_change_start()
{
	//if tasks are going on or game is paused,delay the start of scene change
	if(start_tasks==true||restore_game==true||game_paused==true)
	{
		scene_change_timeout = setTimeout(scene_change_start,5400);
		return;
	}
	isChangingScene=true;
}


//This called(implicitly) for every frame update
function update(){

	//Store the current instance of the game (to be used in other files)
	curr_game=this;
	
	// to check if the game just started
	if(ec_play_clicked){
		if(music_muted){
			musicECGame(music_muted);
		}
		ec_play_clicked = false;
	}

	// barWidth = bronzeBar.width;
	// LIFE = 40;
	// bronzeBar.width = barWidth - barWidth/LIFE;

	//If gameover or game pause return
	if(gameOver==true||game_paused==true)
	{

		if(gameOver==true)
		{
			//Stop music
			clearInterval(respawn_animator);
			bgm_sound.stop();
			
			//Update data in the database
			if(game_over_update==false)
			{
				scoreUpdate();
			}
			
		}
		player.anims.play('run',false);
		player.anims.play('stand', true);

		//All jump action when game is paused for tutorial
		if(SHOW_TUTORIAL==true)
		{
			if(jumpKey.isDown&&!doubleJumpKey.isDown&&(obstacle_tutorial_shown==false||jump_tutorial_shown==false))
			{
				jump();
			}
			else if(jumpKey.isDown&&doubleJumpKey.isDown&&(double_jump_for_obstacle1_tutorial_shown==false||double_jump_for_obstacle2_tutorial_shown==false))
			{
				double_jump();
			}
		}
		return;
	}
   

	//Show double coin power buy dialog if the user has unlocked that power and has enough coins to buy it
	if(DOUBLE_COIN_POWER==true&&double_coin_option_shown==false&&coins_collected>=double_coin_cost)
	{
		game_paused=true;
		bgm_sound.pause();
	  
		double_coin_dialog=this.add.tileSprite(screen_width*0.5,screen_height*0.5,screen_width*0.35,screen_height*0.4,"game_over_dialog");
		double_coin_dialog.alpha =0.6;
		double_coin_dialog.depth=4;
		double_coin_text=this.add.text(screen_width*0.38,screen_height*0.38,"Buy Double Coin Power??", { fontSize: '20px', fill: '#000000',align:'center' });
		double_coin_text.depth=5;
		double_coin_icon=this.add.image(screen_width*0.5,screen_height*0.50,'coin').setScale(0.3);
		double_coin_icon.depth=5;
		double_coin_cost_text=this.add.text(screen_width*0.53,screen_height*0.5,"x"+double_coin_cost, { fontSize: '20px', fill: '#000000',align:'center' });
		double_coin_cost_text.depth=5;

		player.anims.play('stand', true);
	

		clearInterval(score_update_handler);

		double_coin_yes_button=this.add.image(double_coin_dialog.x,double_coin_dialog.y+double_coin_dialog.height/3,'yes_button').setScale(0.6).setInteractive();
		double_coin_yes_button.depth=5;
		double_coin_yes_button.x-=double_coin_yes_button.width*0.5;
	   
		double_coin_no_button=this.add.image(double_coin_dialog.x,double_coin_dialog.y+double_coin_dialog.height/3,'no_button').setScale(0.6).setInteractive();
		double_coin_no_button.depth=5;
		double_coin_no_button.x+=double_coin_yes_button.width*0.5;

		double_coin_yes_button.on('pointerdown',function(){
			score_update_handler=setTimeout(score_updator,500);
			COIN_SCORE=2;
			coins_collected-=double_coin_cost;
			coinsCollectedText.setText(coins_collected);
			coinsCollectedText.x=screen_width-90-COIN_SCORE_LENGTH_ADJUSTMENT*(coins_collected.toString().length-1);
			
			
			destroy_double_coin_dialog_box();
		});

		double_coin_no_button.on('pointerdown',function(){
			score_update_handler=setTimeout(score_updator,500);
			destroy_double_coin_dialog_box();
		});

		function destroy_double_coin_dialog_box()
		{
			
			double_coin_dialog.destroy();
			double_coin_text.destroy();
			double_coin_icon.destroy();
			double_coin_cost_text.destroy();
			double_coin_yes_button.destroy();
			double_coin_no_button.destroy();
			double_coin_option_shown=true;
			bgm_sound.play();
			bgm_sound.loop=true;
			game_paused=false;
		}

		return;
		
	}


	//Do the same for shooting power
	if(SHOOTING_POWER_UNLOCKED==true&&shooting_power_option_shown==false&&coins_collected>=shooting_power_cost)
	{

		game_paused=true;
		bgm_sound.pause();

	  
		double_coin_dialog=this.add.tileSprite(screen_width*0.5,screen_height*0.5,screen_width*0.35,screen_height*0.4,"game_over_dialog");
		double_coin_dialog.alpha = 0.6;
		double_coin_dialog.depth=4;
		double_coin_text=this.add.text(screen_width*0.38,screen_height*0.38,"Buy Shooting Power??", { fontSize: '16px', fill: '#000000',align:'center' });
		double_coin_text.depth=5;
		double_coin_icon=this.add.image(screen_width*0.5,screen_height*0.50,'coin').setScale(0.3);
		double_coin_icon.depth=5;
		double_coin_cost_text=this.add.text(screen_width*0.53,screen_height*0.5,"x"+shooting_power_cost, { fontSize: '16px', fill: '#000000',align:'center' });
		double_coin_cost_text.depth=5;

		player.anims.play('stand', true);



		clearInterval(score_update_handler);

		double_coin_yes_button=this.add.image(double_coin_dialog.x,double_coin_dialog.y+double_coin_dialog.height/3,'yes_button').setScale(0.6).setInteractive();
		double_coin_yes_button.depth=5;
		double_coin_yes_button.x-=double_coin_yes_button.width*0.5;
		double_coin_no_button=this.add.image(double_coin_dialog.x,double_coin_dialog.y+double_coin_dialog.height/3,'no_button').setScale(0.6).setInteractive();
		double_coin_no_button.depth=5;
		double_coin_no_button.x+=double_coin_no_button.width*0.5;

		double_coin_yes_button.on('pointerdown',function(){
			score_update_handler=setTimeout(score_updator,500);
			SHOOTING_POWER=true;
			coins_collected-=shooting_power_cost;
			coinsCollectedText.setText(coins_collected);
			coinsCollectedText.x=screen_width-90-COIN_SCORE_LENGTH_ADJUSTMENT*(coins_collected.toString().length-1);

			destroy_double_coin_dialog_box();
			
		});

		double_coin_no_button.on('pointerdown',function(){
			score_update_handler=setTimeout(score_updator,500);
			destroy_double_coin_dialog_box();
		});

		function destroy_double_coin_dialog_box()
		{
			
			double_coin_dialog.destroy();
			double_coin_text.destroy();
			double_coin_icon.destroy();
			double_coin_cost_text.destroy();
			double_coin_yes_button.destroy();
			double_coin_no_button.destroy();
			shooting_power_option_shown=true;
			bgm_sound.play();
			bgm_sound.loop=true;
			game_paused=false;
			game_paused=false;
		}

		return;

	}

	//Increment level if reached a checkpoint
	if(score_checkpoints[current_checkpoint]==score)
	{
		level.number++;
		current_checkpoint++;
		level_changer();
	}
   
	//If player is out of the screen and it is detected for the first time
	if(player.y>screen_height+player.height&&no_player==false)
	{   


		falling_down_sound=curr_game.sound.add('falling_down_sound');
		falling_down_sound.play();
		game_paused=true;
		falling_down_sound.once('complete',function(){
			falling_down_sound=null;
			game_paused=false;});
		//Reduce the number of lives and adjust the lives display accordingly;
		if(number_of_lives>0)number_of_lives--;
		livesText.setText(number_of_lives);
		
		//If life is still available continue ,otherwise GameOver
		if(number_of_lives!=0)
		{
			no_player=true;
			//Display the respawning text till a new player is created
			respawn_animator=setInterval(respawn_animation,RESPAWN_ANIMATION_INTERVAL);
			respawn_dot_length=0;
		}
		

	}

	//If all the lives are over,show game over dialog
	if(number_of_lives<=0)
	{
		
		gameOver=true;
		clearInterval(respawn_animator);
		clearInterval(double_coin_blinker);
		clearInterval(scene_change_timeout);
		game_over_sound.play();
			
		game_over_dialog=this.add.tileSprite(screen_width*0.5,screen_height*0.5,screen_width*0.60,screen_height*0.55,"game_over_dialog").setTileScale(1.145,1.25);
		game_over_dialog.depth=4;
		
		game_over_text=this.add.text(game_over_dialog.x-(game_over_dialog.width*0.35)+10,game_over_dialog.y-(game_over_dialog.height*0.4),"All lives finished. Buy lives!", { fontSize: '18px', fill: '#FFFFFF',align:'center' });
		game_over_text.depth=5;

		buy_live_img1=this.add.image(screen_width*0.30,screen_height*0.50,'life').setScale(1.17);
		buy_live_img1.depth=5;
		buy_live_img1_text=this.add.text(screen_width*0.278,screen_height*0.55, "1 life",{ fontSize: '12px', fill: '#FFFFFF',align:'center' })
		buy_live_img1_text.depth=5;
		buy_one_live=this.add.image(screen_width*0.30,screen_height*0.66,'buy_button').setScale(1.1).setInteractive(); 
		buy_one_live.depth = 7;
		buy_one_live_text=this.add.text(screen_width*0.27,screen_height*0.625,"Buy for "+"\n" + retry_cost+ " coins", { fontSize: '12px', fill: '#000000',align:'center' });
		buy_one_live_text.setInteractive();
		buy_one_live_text.depth=8;
		
		buy_one_live.on('pointerdown', ()=>{
			no_lives_add = 1;
			resume_after_game_over(no_lives_add);
		}, curr_game);
		buy_one_live_text.on('pointerdown', ()=>{
			no_lives_add = 1;
			resume_after_game_over(no_lives_add);
		}, curr_game);

		buy_live_img21=this.add.image(screen_width*0.475,screen_height*0.50,'life').setScale(1.17);
		buy_live_img22=this.add.image(screen_width*0.515,screen_height*0.50,'life').setScale(1.17);
		buy_live_img21.depth=5;
		buy_live_img22.depth=5;
		buy_live_img2_text=this.add.text(screen_width*0.467,screen_height*0.55, "2 lives",{ fontSize: '12px', fill: '#FFFFFF',align:'center' })
		buy_live_img2_text.depth=5;
		buy_two_lives=this.add.image(screen_width*0.50,screen_height*0.66,'buy_button').setScale(1.1).setInteractive(); 
		buy_two_lives.depth = 7;
		buy_two_lives_text=this.add.text(screen_width*0.47,screen_height*0.625,"Buy for "+"\n" + (2*retry_cost)+ " coins", { fontSize: '12px', fill: '#000000',align:'center' });
		buy_two_lives_text.setInteractive();
		buy_two_lives_text.depth=8;

		buy_two_lives.on('pointerdown', ()=>{
			no_lives_add = 2;
			resume_after_game_over(no_lives_add);
		}, curr_game);
		buy_two_lives_text.on('pointerdown', ()=>{
			no_lives_add = 2;
			resume_after_game_over(no_lives_add);
		}, curr_game);

		buy_live_img31=this.add.image(screen_width*0.66,screen_height*0.50,'life').setScale(1.17);
		buy_live_img32=this.add.image(screen_width*0.70,screen_height*0.50,'life').setScale(1.17);
		buy_live_img33=this.add.image(screen_width*0.74,screen_height*0.50,'life').setScale(1.17);
		buy_live_img31.depth=5;
		buy_live_img32.depth=5;
		buy_live_img33.depth=5;
		buy_live_img3_text=this.add.text(screen_width*0.67,screen_height*0.55, "3 lives",{ fontSize: '12px', fill: '#FFFFFF',align:'center' })
		buy_live_img3_text.depth=5;
		buy_three_lives=this.add.image(screen_width*0.70,screen_height*0.66,'buy_button').setScale(1.1).setInteractive(); 
		buy_three_lives.depth = 7;
		buy_three_lives_text=this.add.text(screen_width*0.67,screen_height*0.625,"Buy for "+"\n" + (3*retry_cost)+ " coins", { fontSize: '12px', fill: '#000000',align:'center' });
		buy_three_lives_text.setInteractive();
		buy_three_lives_text.depth=8;

		buy_three_lives.on('pointerdown', ()=>{
			no_lives_add = 3;
			resume_after_game_over(no_lives_add);
		}, curr_game);
		buy_three_lives_text.on('pointerdown', ()=>{
			no_lives_add = 3;
			resume_after_game_over(no_lives_add);
		}, curr_game);
	}        
	//No player is currently active on the game,wait for the platforms to reach the required position
	if(no_player==true&&falling_down_sound==null&&((brick1.x>=-screen_width/2+PLAYER_X+JUMP_RANGE/4&&brick1.x<=screen_width/2+PLAYER_X+JUMP_RANGE/4)||(brick.x>=-screen_width/2+PLAYER_X+JUMP_RANGE/4&&brick.x<=screen_width/2+PLAYER_X+JUMP_RANGE/4)))
	{
		//Destory the current player and create new player and colliders for it
		player.destroy();
		player = this.physics.add.sprite(PLAYER_X,PLAYER_INITIAL_Y,'dude');
		player.height = (screen_height/8);
		this.physics.add.collider(player,brick);
		this.physics.add.collider(player,brick1);
		
		//Reset no_player flag
		no_player=false;

		//Stop respawn text animation
		clearInterval(respawn_animator);
		RESPAWNING_TEXT.setText("");
		respawn_dot_length=0;
	  
	}

	//Keyboard
	//Flanker task response
	if(flanker_task_started==true&&flanker_task_ended==false)
	{
		if(flankerLeftKey.isDown)
		{
			left_pressed();
		}
		else if(flankerRightKey.isDown)
		{
			right_pressed();
		}
	}

	//Discrimination task response
	if(discrimination_task_started==true&&discrimination_task_ended==false)
	{
		if(discriminationGreenKey.isDown)
		{
			green_pressed();
		}
		else if(discriminationRedKey.isDown)
		{
			red_pressed();
		}
	}



	//If gameover is false
	if(gameOver==false){

		//Generate game elements if not reached crossing or restoration of game has been started
		if((reachedCrossing==false||task_completed==false||restore_game==true))
		{ 
			//Make the first choice(between air and on platform)
			if(free_to_start_choose==true&&start_tasks==false&&isChangingScene==false&&startTunnelMovement==false&&stopTunnelMovement==false)
			{
				first_choice=Math.floor(Math.random()*FIRST_CHOICE_RANGE);
				
				//Change the random choice to show tutorial    
				if(SHOW_TUTORIAL==true&&jump_tutorial_shown==false)
				{
						first_choice=FIRST_CHOICE_SPLITTER;
				}
				else if(SHOW_TUTORIAL==true&&obstacle_tutorial_shown==false&&stop_obstacle_generation==false)
				{
						first_choice=FIRST_CHOICE_SPLITTER+1;
				}
				else if(SHOW_TUTORIAL==true&&double_jump_for_obstacle1_tutorial_shown==false&&stop_obstacle_generation==false)
				{
						first_choice=FIRST_CHOICE_SPLITTER+1;
				}
				else if(SHOW_TUTORIAL==true&&double_jump_for_obstacle2_tutorial_shown==false&&stop_obstacle_generation==false)
				{
						first_choice=FIRST_CHOICE_SPLITTER+1;

				}

				free_to_start_choose=false;
			}

			//Make the second choice(between coin,coin with obstacle and extra life)
			if(free_to_choose==true&&first_choice%FIRST_CHOICE_SPLITTER==0&&task_completed==true&&start_tasks==false&&isChangingScene==false&&startTunnelMovement==false&&stopTunnelMovement==false)
			{
					second_choice=Math.floor(Math.random()*SECOND_CHOICE_RANGE);
					if(SHOW_TUTORIAL==true&&jump_tutorial_shown==false)
					{
						second_choice=COIN_SELECTOR;
					}


			}
			
			//dont use this for generating coins in the tunnel(see scene change code)
			if(stopTunnelMovement==false&&startTunnelMovement==false)
			{
				//For Coin
				if(second_choice%COIN_SELECTOR==0&&second_choice!=-1||coinGenerating==true)
				{ 
					//If this condition is selected because of the latter condition(coin already exists),dont generate new coin
					if(second_choice%COIN_SELECTOR!=0)
					{     
						add_new_coin=false;
					}
					
					//Else generate new coin if flags allow it
					else if(coinGeneratingInit==true||coinGenerating==false)
					{
						add_new_coin=true;
					}

					coins_placer();
				}
			}      
			
			//For Coin with obstacle
			if(second_choice%COIN_WITH_OBSTACLE_SELECTOR==0&&second_choice%COIN_SELECTOR!=0&&second_choice!=-1||coinGeneratingWithObstacle==true)
			{
				 //If this condition is selected because of the latter condition(coin already exists),dont generate new coin
				if(second_choice%COIN_WITH_OBSTACLE_SELECTOR!=0||second_choice%2==0)
				{     
					add_new_coin_with_obstacle=false;
				}

				//Else generate new coin if flags allow it
				else if(coinGeneratingWithObstacleInit==true||coinGeneratingWithObstacle==false)
				{
					add_new_coin_with_obstacle=true;
				}
					 
				coins_with_obstacle_placer();
					
			}

			//For extra life
			if(second_choice%COIN_WITH_OBSTACLE_SELECTOR!=0&&second_choice%COIN_SELECTOR!=0&&second_choice%LIFE_SELECTOR==0&&second_choice!=-1||lifeGenerating==true)
			{   
				//Generate new life if it is required
				if(number_of_lives==MAX_NUMBER_OF_LIVES||lifeGenerating==true)
				{
					// REMOVED THE MYSTERY EGGS THING FOR NOW
					// extra_life_placer();
				}
			}

			
			//Start Tasks if no other elements are begin generated
			if(start_tasks==true&&task_init==true&&clear_to_start==0&&no_player==false&&startTunnelMovement==false&&stopTunnelMovement==false)
			{	
				
				task_generator();
				free_to_choose_high=false;
				free_to_choose=false;
			}

			//For flanker task
			if(flanker_task_init==true)
			{
				flanker_task_generator();
			}

			//For discrimination task
			if(discrimination_task_init==true)
			{
				discrimination_task_generator();
			}

			//Restore game after tasks
			if(restore_game==true)
			{
				game_restore();
				if (task_background_removed) {
					task_background.destroy();  
					task_background_removed = false;
					task_background_added = false; 
				}
			}

			//Make the second choice(between obstacle,pit,dropping platform)
			if(free_to_choose_high==true&&first_choice%FIRST_CHOICE_SPLITTER!=0&&start_tasks==false&&isChangingScene==false&&startTunnelMovement==false&&stopTunnelMovement==false)
			{
				second_choice_high=Math.floor(Math.random()*SECOND_CHOICE_HIGH_RANGE)

				if(SHOW_TUTORIAL==true&&(obstacle_tutorial_shown==false||double_jump_for_obstacle1_tutorial_shown==false||double_jump_for_obstacle2_tutorial_shown==false))
				{
					second_choice_high=5;

				}
			}

			//For Obstacle
			if(second_choice_high%PIT_SELECTOR!=0&&second_choice_high%DROPPING_PLATFORM_SELECTOR!=0&&second_choice_high!=-1||obstacleGenerating==true)
			{
				obstacle_placer();
			}

			//For Pit Generation
			if(second_choice_high%PIT_SELECTOR==0&&second_choice_high%DROPPING_PLATFORM_SELECTOR!=0&&second_choice_high!=-1||pit==true)
			{
				pit_placer();
			}

			//For Dropping Platform Generation
			if(second_choice_high%DROPPING_PLATFORM_SELECTOR==0&&second_choice_high!=-1||dropping_platform!=null&&dropping_platform_first==false)
			{
				
				dropping_platform_placer();
			}
		}


		
		//Disable jumping if the user falls down    
		if(player.body.touching.down==false&&isJumping==false)
		{
			jump_disabled=true;
		}
		else
		{
			jump_disabled=false;
		}

		//If reached crossing is true
		if(reachedCrossing==true)
		{   
			//Change Player animation
			player.anims.play('run',false);
			player.anims.play('stand', true);
		
			//Change River speed to still water speed
			river.tilePositionX+=STILL_WATER_SPEED;
			river.titlePositionY=1-river.titlePositionY;
			river_filler.tilePositionX+=STILL_WATER_SPEED;
			river_filler.titlePositionY=1-river_filler.titlePositionY;

			isJumping=false;
			
		}

		//If reached crossing is false
		if(reachedCrossing==false&&(isChangingScene==false||clear_to_start!=0))
		{

		//If not jumping,set animation to running
			if(isJumping==false||(isJumping==true&&player.body.allowGravity==false))
			{
				player.anims.play('run', true);
			}
			//else set animation to be jump
			else
			{
				player.anims.play('jump', true);
			}

			//Move the tiles
			brick.tilePositionX+=brick_speed;
			
			// scene_change_platform.x-=brick_speed;
			// scene_change_platform.y-=scene_change_platform_velocity_y;
			player.y-=player_y_speed;
			river.tilePositionX+=RIVER_SPEED;
			river.titlePositionY=1-river.titlePositionY;
			river_filler.tilePositionX+=BIG_RIVER_SPEED;
			

			blue_filler.tilePositionX+=CLOUDS_SPEED;
			cityline_title.tilePositionX+=CITYLINE_SPEED;
		}

		//for scene change
		if(isChangingScene==true&&(clear_to_start==0||startTunnelMovement==true||stopTunnelMovement==true)&&no_player==false&&(task_completed==true&&restore_game==false))
		{
			scene_changer();

			//See the scene change code for more clarity(basically this is used for animation of the player)
			if(isJumping==false||(isJumping==true&&player.body.allowGravity==false))
			{

				if(horizontalMovement==false)
				{
					 player.anims.play('stand', true);
					
				}
				else
				{

					player.anims.play('run', true);

				}
			   
			}

			//else set animation to be jump
			else
			{
			player.anims.play('jump', true);
			}
		}


		//Start Jumping actions if up arrow pressed and already not jumping
		if(jumpKey.isDown&&doubleJumpKey.isDown==false&&isJumping==false)
		{
			
			jump();
		
		}

		//Double jump
		else if(doubleJumpKey.isDown&&jumpKey.isDown&&isJumping==false&&jump_disabled==false&&reachedCrossing==false)
		{
			double_jump();
		   
		}    
			
		//For already jumping case
		else if(isJumping==true&&jump_disabled==false&&reachedCrossing==false)
		{
			jump_action(jump_height/type,jump_velocity*type);

			
		}

		//For shooting action
		if(isShooting==true)
		{
			shoot_action();
		}
	
	}
}
function resume_after_game_over(no_lives_add) {
	if(LEVEL_SPEED > MIN_LEVEL_SPEED){
		LEVEL_SPEED-=SPEED_INCREMENT;
		change_speed(false);
	}
	if(coins_collected<retry_cost)
	{
		return;
	}

	coins_collected-=no_lives_add*retry_cost;
	retry_cost = 2*retry_cost;
	coinsCollectedText.setText(coins_collected);
	coinsCollectedText.x=screen_width-90-COIN_SCORE_LENGTH_ADJUSTMENT*(coins_collected.toString().length-1);

	gameOver=false;
	scoreUpdate();
	game_over_update=false;

	clearInterval(retry_coin_animation);

	number_of_lives=no_lives_add;
	livesText.setText(number_of_lives);
	life.body.allowGravity=false;
	
	game_over_dialog.destroy();
	game_over_text.setText("");

	buy_live_img1.destroy();
	buy_live_img21.destroy();
	buy_live_img22.destroy();
	buy_live_img31.destroy();
	buy_live_img32.destroy();
	buy_live_img33.destroy();
	buy_live_img1_text.destroy();
	buy_live_img2_text.destroy();
	buy_live_img3_text.destroy();
	buy_one_live.destroy();
	buy_two_lives.destroy();
	buy_three_lives.destroy();
	buy_one_live_text.destroy();
	buy_two_lives_text.destroy();
	buy_three_lives_text.destroy();
	// retry_coin_icon.destroy();

	setTimeout(score_updator, 500);
	scene_change_timeout =  setTimeout(scene_change_start, 5000);
	
	isJumping=false;
	if(player.y>screen_height+player.height)
	{
		no_player=true;
	}
	game_over_sound.stop();
	bgm_sound.play();
}
//jumping action
function jump()
{


	//Tutorial for coin (stop animation and restore game)
	if(SHOW_TUTORIAL==true&&jump_tutorial_shown==false&&(control_button_1!=null||animation_active==true))
	{
		jump_tutorial_shown=true;
		game_paused=false;
		
		if(isTouchDevice==false)
		{
		tutorial_text.setText("");
		tutorial_box.destroy();
		control_button_1.destroy();
		control_button_1=null;
		}
		else
		{
			clearInterval(touch_button_animation);
			jump_button.alpha=1;
			jump_button.setScale(0.35);
			animation_active=false;
		}
	}

	
	//Tutorial for obstacle (stop animation and restore game)
	else if(SHOW_TUTORIAL==true&&obstacle_tutorial_shown==false&&obstacle!=null&&(control_button_1!=null||animation_active==true))
	{
		obstacle_tutorial_shown=true;
		game_paused=false;
		if(isTouchDevice==false)
		{
		tutorial_text.setText("");
		tutorial_box.destroy();
		control_button_1.destroy();
		control_button_1=null;
		}
		else
		{
			clearInterval(touch_button_animation);
			jump_button.alpha=1;
			jump_button.setScale(0.35);
			animation_active=false;
		   
		}
	}
	if(isJumping==false&&jump_disabled==false&&reachedCrossing==false&&game_paused==false&&gameOver==false)
	{   
		jumpingInit=true;
		type=SINGLE_JUMP;
		jump_action(jump_height/type,jump_velocity*type);
		curr_game.sound.add('jumping_sound').play();
	
	}
}


//double jumping action
function double_jump(){


	//Tutorial for double obstacle (stop animation and restore game)
	if(SHOW_TUTORIAL==true&&double_jump_for_obstacle1_tutorial_shown==false&&obstacle!=null&&((control_button_1!=null&&control_button_2!=null)||animation_active==true))
	{

		double_jump_for_obstacle1_tutorial_shown=true;
		game_paused=false;
		if(isTouchDevice==false)
		{
		tutorial_text.setText("");
		tutorial_box.destroy();
		control_button_1.destroy();
		contorl_button_1=null;
		control_button_2.destroy();
		contorl_button_2=null;
		}
		else
		{
			clearInterval(touch_button_animation);
			double_jump_button.alpha=1;
			double_jump_button.setScale(0.35);
			animation_active=false;
		}
	}

	//Tutorial for jumping obstacle (stop animation and restore game)
	else if(SHOW_TUTORIAL==true&&double_jump_for_obstacle2_tutorial_shown==false&&obstacle!=null&&((control_button_1!=null&&control_button_2!=null)||animation_active==true))
	{
		double_jump_for_obstacle2_tutorial_shown=true;
		game_paused=false;
		if(isTouchDevice==false)
		{
		tutorial_text.setText("");
		tutorial_box.destroy();
		control_button_1.destroy();
		contorl_button_1=null;
		control_button_2.destroy();
		contorl_button_2=null;
		}
		else
		{
			clearInterval(touch_button_animation);
			double_jump_button.alpha=1;
			double_jump_button.setScale(0.35);
			animation_active=false;
		}
	}


	//Jump if the flags allow it
	if(isJumping==false&&jump_disabled==false&&reachedCrossing==false&&game_paused==false&&gameOver==false&&(coins_collected>=DOUBLE_JUMP_COST||jumps.remaining>0))
	{

		jumpingInit=true;
		type=DOUBLE_JUMP;
		jump_action(jump_height/type,jump_velocity*type);
		curr_game.sound.add('jumping_sound').play();
		if(jumps.remaining>0)
		{
			jumps.remaining--;
			if(jumps.remaining==0)
			{
				double_jump_coin=curr_game.add.image(double_jump_text.x+2,double_jump_text.y+10, 'coin').setScale(0.15);
				double_jump_coin.depth=double_jump_button.depth+1;
				double_jump_text.setText(DOUBLE_JUMP_COST);
				double_jump_text.depth=double_jump_button.depth+1;
				double_jump_text.x+=15;
				double_jump_text.y-=5;
				double_jump_text.setColor('#fff');
				// double_coin_blinker=setInterval(coin_blinker,coin_blinker_interval)
			}
			else
			{
				jumps_remaining_changer();
			}
		}
		else
		{
		   
			var old_count=coins_collected
			coins_collected-=DOUBLE_JUMP_COST;
			//curr_game.sound.add('coin_sound');

			//Adjust the position of the coin score if the length varies
			if(old_count.toString().length!=coins_collected.toString().length)
			{
				 coinsCollectedText.x+=COIN_SCORE_LENGTH_ADJUSTMENT;
				
			}

			coinsCollectedText.setText(coins_collected);

		}
	}


} 

// TO BE REMOVED
// //Coin blinker(For double jump cost)
// function coin_blinker(){

// 	if(gameOver==false&&jumps.remaining==0&&game_paused==false)
// 	{
// 	double_jump_coin.alpha=1-double_jump_coin.alpha;
// 	double_jump_text.alpha=1-double_jump_text.alpha;
// 	}
// }

//for gameover coin blinker
function retry_coin_blinker()
{
	retry_coin_icon.alpha=1-retry_coin_icon.alpha;
	retry_coin_text.alpha=1-retry_coin_text.alpha;
}

//shooting action
function shoot(){

	if(SHOOTING_POWER==true&&game_paused==false&&gameOver==false&&reachedCrossing==false&&shoot_x[shoot_x.length-1][1]>screen_width/8&&shoot_y[shoot_y.length-1][1]<screen_height*0.8&&shoot_y[shoot_y.length-1][1]>screen_height*0.1+pause_button.height/2)
	{

		shooting_bomb.push(curr_game.add.image(shooting_bomb_x,player.y,'bomb').setScale(2));
		shooting_bomb_group.add(shooting_bomb[shooting_bomb.length-1]);
		shooting_bomb[shooting_bomb.length-1].body.allowGravity=false;
		curr_game.sound.add('shooting_sound').play();

		

		for(var i=0;i<obstacle_for_coin.length;i++)
		{
			curr_game.physics.add.overlap(obstacle_for_coin[i],shooting_bomb[shooting_bomb.length-1],function(obj1,obj2){shoot_coin_obstacle(obj1,obj2);}, null, curr_game);
		   
		}
		if(obstacle!=null)
		{
			curr_game.physics.add.overlap(obstacle,shooting_bomb[shooting_bomb.length-1],function(obj1,obj2){shoot_obstacle(obj1,obj2);}, null, curr_game);
		}
		if(top_obstacle!=null)
		{
			curr_game.physics.add.overlap(top_obstacle,shooting_bomb[shooting_bomb.length-1],function(obj1,obj2){shoot_obstacle(obj1,obj2);}, null, curr_game);

		}

		movement_progress.push(movement_increment);
		if(isShooting==false)
		{
			shoot_action();
		}
	}
	else
	{
		shoot_x.pop();
		shoot_y.pop();

	}    
		
	no_of_clicks=0;    
	clicked_detected=false;
	
}

//For pausing the game    
pause_resume_game = function(gamePaused){
	// if(gameOver==true||control_button_1!=null||animation_active==true||score==0||control_button_1!=null||animation_active==true)
	// {
	// 	return;
	// }
	game_paused=gamePaused;
	if(game_paused==false)
	{
		if(reachedCrossing==false)
		{
			bgm_sound.resume();
		}
	}
	else
	{
		if(reachedCrossing==false||game_restore==true)
		{
			bgm_sound.pause();
		}

	}

}

musicECGame =  function(music_muted)
{

	// music_muted=!music_muted;

	if(music_muted==true)
	{
		bgm_sound.pause();
		curr_game.sound.mute=true;
		// music_button_on.depth=6;					//1
		// music_button_off.depth=7;					//2
	}
	else
	{
		bgm_sound.play();
		curr_game.sound.mute=false;
		// music_button_on.depth=7;
		// music_button_off.depth=6;

	}
}
closeECGame = function(){ 
	game_paused=true;
	gameOver=true;
	game_closed = true;
	
	clearInterval(blinking_animation);

	clearInterval(respawn_animator);
	clearInterval(double_coin_blinker);
	clearInterval(score_update_handler);
	clearInterval(player_blinking_animation);
	clearInterval(countdown_handler);
	clearInterval(retry_coin_animation);
	clearInterval(jump_tutorial_animation);

	// in task
	clearTimeout(generate_tasks_variable);
	clearTimeout(generate_tasks_timeout);
	clearTimeout(tasks_done);
	clearTimeout(flanker_task_done);
	clearTimeout(image_task_done);
	clearTimeout(discrimination_task_initial_timeout);
	clearTimeout(continue_to_next_set_timeout);

	clearInterval(start_countdown);
	clearInterval(task_button_blinking_animation);
	clearInterval(touch_button_animation);
	
	//when scene change
	clearTimeout(scene_change_timeout);
	clearTimeout(moveSidewardsTimeout);
	clearTimeout(stopTunnelTimeout);
	scene_change_timeout = null;

	if(curr_game){
		curr_game.sys.game.destroy(true);
	}
	return;
	// $('#start_page').removeClass('d-none');    
}

function score_updator(){   
	
	if(reachedCrossing==false&&gameOver==false&&reachedCrossing==false&&game_paused==false)
	{
		score+=1;
		scoreText.setText('Score:'+score);
	}
	if(gameOver==false)
	{
		score_update_handler=setTimeout(score_updator, 500);
	}
		
	if(score%LEVEL_SPEED_INCREMENT_GAP==0&&reachedCrossing==false&&game_paused==false)
	{
		if(LEVEL_SPEED < MAX_LEVEL_SPEED){
			LEVEL_SPEED+=SPEED_INCREMENT;
			change_speed(true);
		}
		
	}

}

//Set flags for tasks generation  
function generate_tasks()
{
   
	//If game is paused or scene is changing delay the tasks
	if(game_paused==true||isChangingScene==true)
	{
		generate_tasks_timeout =  setTimeout(generate_tasks,5300);
		return;
	}

	start_tasks=true;
	task_init=true;
}

//Blinking animation
function blinking_animation()
{
	if(game_paused==true||stop_player_animation==true)
	{
		return;
	}
	if(player_blinking_counter<=player_counter||gameOver==true)
	{
		clearInterval(player_blinking_animation);
		clearInterval(player_blinking_animation);
		player_counter=0;
		player.alpha=1;
		player.setTint();
		stop_player_animation=true;
	}
	else
	{
		if(player_counter%2)
		{
			player.alpha=0.25;
			//player.setTint(0x440000);
		   
		}
		else
		{
			player.alpha=1;
			//player.setTint(0xff0000);
		}

		player_counter++;
	}
}

//Watch for double jump
function jumps_remaining_changer()
{

	if(double_jump_coin!=null&&jumps.remaining!=0)
	{
		double_jump_coin.destroy();
		double_jump_coin=null;
		double_jump_text.x-=5;
		double_jump_text.setColor('#fff');
	}

	if(jumps.remaining!=0)
	{
		double_jump_text.setText("x"+jumps.remaining);
	}
}
	
//Watch for change in level.number 
function level_changer(){
	
	if(level.number==2)
	{
		stop_obstacle_generation=false;
	}

	//Allow pit generation
	if(level.number==3)
	{
		stop_pit_generation=false;
		PIT_MINIMUM_SIZE=100;
		PIT_SIZE_RANGE=100;
		JUMP_PLATFORM_CHOICE++;
	}

	//Allow dropping platforms
	if(level.number==4)
	{
		stop_dropping_platform_generation=false;
		DROPPING_PLATFORM_MINIMUM_SIZE=100;
		DROPPING_PLATFORM_SIZE_RANGE=100;
		PIT_SELECTOR=2;
		DROPPING_PLATFORM_SELECTOR=3;
	
	
	}

	//Don't allow coin with obstacles
	if(level.number==5)
	{
		// stop_coin_with_obstacle_generation=false;
		stop_life_generation=false;
	}
}

//For Respawn animation
function respawn_animation()
{
	if(game_paused==true)
	{
		return;
	}
	var Initial_Text="Respawning "
	for(var i=0;i<respawn_dot_length;i++)
	{
		Initial_Text+=". "
	}
	respawn_dot_length=(respawn_dot_length+1)%respawn_dot_max_length;
	RESPAWNING_TEXT.setText(Initial_Text);
}

//Increment the speed and crossing range
function change_speed(speed_increased)
{
	BRICK_SPEED=LEVEL_SPEED;
	CITYLINE_SPEED=LEVEL_SPEED;
	RIVER_SPEED=LEVEL_SPEED;
	BIG_RIVER_SPEED=LEVEL_SPEED;
	CLOUDS_SPEED=LEVEL_SPEED;
	COIN_SPEED=LEVEL_SPEED;
	COIN_WITH_OBSTACLE_SPEED=LEVEL_SPEED;
	PIT_SPEED=LEVEL_SPEED;
	EXTRA_LIFE_SPEED=LEVEL_SPEED
	DROPPING_PLATFORM_SPEED=LEVEL_SPEED;
	OBSTACLE_SPEED=LEVEL_SPEED;
	JUMP_PLATFORM_SPEED=LEVEL_SPEED;
	
	CROSSING_RANGE+=CROSSING_RANGE_INCREMENT;
	if(OBSTACLE_Y_SPEED>0)
	{
		OBSTACLE_Y_SPEED=LEVEL_SPEED;
	}
	else
	{
		OBSTACLE_Y_SPEED=-LEVEL_SPEED;
	}
	if(speed_increased){
		JUMP_RANGE+=JUMP_RANGE_INCREMENT;
		if(stop_dropping_platform_generation==false)
		{
			DROPPING_PLATFORM_MINIMUM_SIZE+=40;
		}
		if(stop_pit_generation==false)
		{
			PIT_MINIMUM_SIZE+=40;
		}
	} else{
		JUMP_RANGE-=JUMP_RANGE_INCREMENT;
		if(stop_dropping_platform_generation==false)
		{
			DROPPING_PLATFORM_MINIMUM_SIZE-=40;
		}
		if(stop_pit_generation==false)
		{
			PIT_MINIMUM_SIZE-=40
		}
	}
}

//For tasks timing modify the timestamp as per django(python) requirement        
function generateTS()
{
	date=new Date();
	var day=date.getDate();
	var month=date.getMonth()+1;
	var year=date.getFullYear();
	var hour=date.getHours();
	var minute=date.getMinutes();
	var seconds=date.getSeconds();

	if(month.toString().length==1)
	{
	  month="0"+month;
	}
	if(day.toString().length==1)
	{
	  day="0"+day;
	}
	if(hour.toString().length==1)
	{
	  hour="0"+hour;
	}
	 if(minute.toString().length==1)
	{
	  minute="0"+minute;
	}
	if(seconds.toString().length==1)
	{
	  seconds="0"+seconds;
	}
  

	//format-YYYY-MM-DD HH-MM-SS
	var ts=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+seconds;
	return ts;
}

function scoreUpdate(){
	console.log('update score of ecg');
	storeECScoreDataEvent = document.createEvent('CustomEvent');
	storeECScoreDataEvent.initCustomEvent('CallAngularECScoreFun');

	window.dispatchEvent(storeECScoreDataEvent);

	game_over_update=true;
	
}
getECScoreData = function(){
	if(score > max_score){
		max_score = score;
	}
	return [
		ec_game_start_time,
		game_object,
		score,
		level.number,
		generateTS(),
		gameOver,

		max_score,
		coins_collected,
		double_jump_field,
		shooting_power_field,
		double_coin_field
	]
}
