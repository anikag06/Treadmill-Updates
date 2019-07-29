//Configuration for phaser.js
function config(render_type,swidth,sheight,modeType,center){
	console.log("game start");
	this.type=render_type;
	this.parent='execGame';
	this.scale = {
		mode:modeType,
		autoCenter: center,
		width: swidth,
		height: sheight
	};
	console.log(this.scale);
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
		console.log('Firefox');
		return Phaser.CANVAS;
	}
	if(parseInt(browser_version[2])>=67)
	{
		console.log("auto");
		return Phaser.AUTO;
	}
	else
	{
		console.log("canvas");
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

// if game closed once ... then restarted 
var game_closed; 

//timeout var 
var generate_tasks_timeout;

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
var SPEED_INCREMENT

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
var restart_game_button;
var end_game_button;


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
	this.load.image('coin_obstacle',svg_location+'/obstacle.svg');
	this.load.image('coin',svg_location+'/coin.svg');

	
	//Obstacle
	this.load.image('obstacle',jpg_location+'/obstacles.png');

	//Extra life and other bonus
	this.load.image('life',svg_location+"/life.svg");
	this.load.image('mystery_egg',svg_location+"/me.svg");

	//Shooting bomb
	this.load.image('bomb',png+'/bomb.png');

	//Avatar
	this.load.spritesheet('dude', png+'/avatar_1.png', { frameWidth: 59, frameHeight: 60}); // 32, 48
 
	//Flanker & single jump Buttons
	this.load.spritesheet('flanker_button',svg_location+'/flanker_button.svg',{ frameWidth: 160, frameHeight: 160 });

	//Jump Button
	this.load.spritesheet('double_jump',svg_location+'/double_jump.svg',{ frameWidth: 160, frameHeight: 160 });

	//Discrimination Task Buttons
	this.load.image('red_button',svg_location+"/red_button.svg");
	this.load.image('green_button',svg_location+"/green_button.svg");

	//Pause and resume Button
	// this.load.image('pause_button',svg_location+"/pause_button.svg");
	// this.load.image('resume_button',svg_location+"/resume_button.svg");
	// this.load.image('pause_button', assets_img_location + "/pause.png" );
	// this.load.image('resume_button', assets_img_location + "/play.png" );

	// //Music button
	// // this.load.image('music_on',svg_location+"/music_on.svg");
	// // this.load.image('music_off',svg_location+"/music_off.svg");
	// this.load.image('music_on', assets_img_location + "/sound.png");
	// this.load.image('music_off', assets_img_location + "/mute.png");
	
	//Flanker Task Images
	this.load.image('flanker_0',jpg_location+"/flanker_task/0.jpeg");
	this.load.image('flanker_1',jpg_location+"/flanker_task/1.jpeg");
	this.load.image('flanker_2',jpg_location+"/flanker_task/2.jpeg");
	this.load.image('flanker_3',jpg_location+"/flanker_task/3.jpeg");

	//Neutral or Negative Image(Odd:Negative Even:Neutral)
	for(var i=1; i<TOTAL_NUMBER_OF_IMAGES; i+=2){
		this.load.image('image_'+i,jpg_location+"/pictures/emotional/"+i+".jpg");
	}

	for(var i=0; i<TOTAL_NUMBER_OF_IMAGES; i+=2){
		this.load.image('image_'+i,jpg_location+"/pictures/neutral/"+i+".jpg");
	}	

	//Discrimination Task Images
	this.load.image('discrimination_0',svg_location+"/discrimination_task/red.svg");
	this.load.image('discrimination_1',svg_location+"/discrimination_task/green.svg");

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
	this.load.image('game_over_dialog',svg_location+"/gameoverbox.png");
	this.load.image('restart_game', assets_img_location +"/play.png");		//actually resuming the game
	this.load.image('end_game', assets_img_location+"/home.png");

	//Yes/no button
	this.load.image('yes_button',png+"/yes_button.png");
	this.load.image('no_button',png+"/no_button.png");

	//tutorial buttons
	this.load.image("spacebar_button",png+"/spacebar.png");
	this.load.image("shift_button",png+"/shift.png");

	//tutorial box 
	this.load.image("tutorial_box",svg_location+"/gameoverbox.png");

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
}



function create(){

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

	function callback(){
		console.log("done");
	}
	river.setInteractive();
	console.log(river.input);
	console.log(this.input);
	river.on('pointerdown', function (pointer) {
		console.log(pointer);
		console.log('dowwwwn', screen_width,screen_height);
		console.log(river.input);

	});

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
	life=lifes_group.create(heart_x, stat_icon_display_y, 'life').setScale(0.25);
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
	RESPAWNING_TEXT=this.add.text(RESPAWN_X,RESPAWN_Y,"", { fontSize: '30px', fill: '#fff' });
	countdown_text=this.add.text(RESPAWN_X,RESPAWN_Y,"", { fontSize: '30px', fill: '#fff'});
	scoreText = this.add.text(score_x, stat_text_display_y,score, { fontSize: '30px', fill: '#fff',align:'left' });
	livesText = this.add.text(heart_x-35, stat_text_display_y, number_of_lives, { fontSize: '30px', fill: '#fff',align:'left' });
	coinsCollectedText=this.add.text(screen_width-90-COIN_SCORE_LENGTH_ADJUSTMENT*(coins_collected.toString().length-1), stat_text_display_y,coins_collected, { fontSize: '30px', fill: '#fff',align:'left',wordWrap: true });
	mystery_egg_collected_text=this.add.text(75, 105,'', { fontSize: '30px', fill: '#fff',align:'right',wordWrap: true });


	//Update Score every 1/2 second
	score_update_handler=setTimeout(score_updator, 500);

   

	//Double jump button
	double_jump_button=this.add.sprite(screen_width*0.94,screen_height*0.97, 'double_jump').setInteractive().setScale(0.5);
	double_jump_button.depth=2;
   

	//double jump text
	double_jump_text=this.add.text(screen_width*0.935,screen_height*0.96,"x"+jumps.remaining, { fontSize: '22px', fill: '#fff',align:'center' });
	double_jump_text.depth=3;
	if(double_jump_button.y+double_jump_button.height/2>screen_height)
	{
		double_jump_button.y=screen_height-double_jump_button.height*0.7/2;
		double_jump_text.y=double_jump_button.y+10;

	}

	//Tutorial text
	tutorial_text=this.add.text(screen_width*0.32,screen_height*0.3,"", { fontSize: '16px', fill: '#EC407A',align:'center' });
	tutorial_text.setPadding(20,2,20,2);
	tutorial_text.depth = 5;

	//If touch add jump button
	if(isTouchDevice==true)
	{
	//Jump Button
		jump_button=this.add.sprite(screen_width*0.06,screen_height*0.97, 'flanker_button').setInteractive().setScale(0.5);
		jump_button.depth=2;
		if(jump_button.y+jump_button.height/2>screen_height)
		{
			jump_button.y=screen_height-jump_button.height*0.7/2;
		}
		jump_button.height = 50;
		jump_button.on('pointerdown',jump);
		console.log("on jump", jump_button.height);
		jump_button.on('pointerdown',function(){this.alpha=1});
		double_jump_button.on('pointerdown',double_jump);
		double_jump_button.on('pointerdown',function(){this.alpha=1});
	}

	//Record these for game restore code
	if(isTouchDevice)
	{
	JUMP_BUTTON_Y=jump_button.y;
	}

	DOUBLE_JUMP_BUTTON_Y=double_jump_button.y;
	DOUBLE_JUMP_BUTTON_TEXT_Y=double_jump_text.y;

	// //Mute button
	// music_button_on=this.add.sprite(screen_width*0.83,screen_height*0.93,'music_on').setInteractive().setScale(0.7);
	// music_button_off=this.add.sprite(screen_width*0.83,screen_height*0.93,'music_off').setInteractive().setScale(0.7);
	// music_button_on.depth=-10;
	// music_button_off.depth=-10;

	// //pause and resume button
	// pause_button=this.add.sprite(screen_width*0.85 - music_button_on.width/2,screen_height*0.93,'pause_button').setInteractive().setScale(0.7);
	// pause_button.x-=pause_button.width/2;
	// resume_button=this.add.sprite(pause_button.x,screen_height*0.93,'resume_button').setInteractive().setScale(0.7);
	// pause_button.depth=-10;			//because depth of screen changer platform is 6
	// resume_button.depth=0;

	// //Add click event listeneres
	// pause_button.on('pointerdown',pause_resume_game);
	// resume_button.on('pointerdown',pause_resume_game);

	// music_button_off.on('pointerdown',mute_music);
	// music_button_on.on('pointerdown',mute_music);


	//During tasks,resume game if the tab becomes active again
	// window.onfocus = function () { 
	// 	// if(pause_button.y<0)
	// 	// {	
	// 	if (game_paused === true){
	// 		$('#pause-common-div').removeClass('d-none');
	// 		$('#common-pause-clicked-div').addClass('d-none');
	// 		pause_resume_game();
	// 	}
	// }; 

 
	// //pause the game when the game tab becomes inactive
	// window.onblur = function () { 
	// 	if(game_paused===false)
	// 	{    
	// 		console.log("on blur");
	// 		pause_resume_game();
	// 		$('#pause-common-div').addClass('d-none');
	// 		$('#common-pause-clicked-div').removeClass('d-none');
	// 	}
	// };

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
	console.log("isChanging scene", isChangingScene);	
	//if tasks are going on or game is paused,delay the start of scene change
	if(start_tasks==true||restore_game==true||game_paused==true)
	{
		scene_change_timeout = setTimeout(scene_change_start,5400);
		return;
	}
	console.log("changing scene");
	isChangingScene=true;
}


//This called(implicitly) for every frame update
function update(){

	this.input.topOnly = true;
	//Store the current instance of the game (to be used in other files)
	curr_game=this;

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
		console.log("level changed");
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
		console.log("no player", no_player, game_paused);

		//Reduce the number of lives and adjust the lives display accordingly;
		if(number_of_lives>0)number_of_lives--;
		livesText.setText(number_of_lives);
		
		//If life is still available continue ,otherwise GameOver
		if(number_of_lives!=0)
		{
			no_player=true;
			console.log("lives",number_of_lives,no_player);
			//Display the respawning text till a new player is created
			respawn_animator=setInterval(respawn_animation,RESPAWN_ANIMATION_INTERVAL);
			console.log(respawn_animator);
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
			
		game_over_dialog=this.add.tileSprite(screen_width*0.5,screen_height*0.5,screen_width*0.42,screen_height*0.5,"game_over_dialog");
		game_over_dialog.depth=4;
		game_over_dialog.alpha = 0.6;
		
		game_over_text=this.add.text(game_over_dialog.x-(game_over_dialog.width*0.25)+10,game_over_dialog.y-(game_over_dialog.height*0.5),"GAME OVER!", { fontSize: '26px', fill: '#000000',align:'center' });
		// game_over_text.setPadding(game_over_dialog.width*0.5-20 , 1, game_over_dialog.width*0.5-20, 1);
		game_over_text.setBackgroundColor('rgba(255,255,255,0.7)');
		game_over_text.depth=5;

		restart_game_button=this.add.image(screen_width*0.42,screen_height*0.50,'restart_game').setScale(0.6).setInteractive();
		restart_game_button.depth=5;
		
		// retry_coin_icon=this.add.image(screen_width*0.46,screen_height*0.63,'coin').setScale(0.25);
		// retry_coin_icon.depth=6;

		retry_coin_text=this.add.text(screen_width*0.34,screen_height*0.57,"Try again for" +"\n"+retry_cost+ " coins", { fontSize: '16px', fill: '#000000',align:'center' });
		retry_coin_text.depth=7;

		// retry_coin_animation=setInterval(retry_coin_blinker,coin_blinker_interval);
		
		end_game_button=this.add.image(screen_width*0.58,screen_height*0.50,'end_game').setScale(0.6).setInteractive();
		end_game_button.depth=5;

		
		console.log(restart_game_button);
		restart_game_button.on('pointerdown', function() {

			console.log("Restart game");
			if(coins_collected<retry_cost)
			{
				return;
			}


			coins_collected-=retry_cost;
			coinsCollectedText.setText(coins_collected);
			coinsCollectedText.x=screen_width-90-COIN_SCORE_LENGTH_ADJUSTMENT*(coins_collected.toString().length-1);

			gameOver=false;
			scoreUpdate();
			game_over_update=false;

			clearInterval(retry_coin_animation);

			number_of_lives=1;
			livesText.setText(number_of_lives);
			life.body.allowGravity=false;
			
			game_over_dialog.destroy();
			game_over_text.setText("");
			restart_game_button.destroy();
			end_game_button.destroy();
			retry_coin_text.destroy();
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
		 
		}, curr_game);
		
		end_game_button.on('pointerdown', (pointer)=>{ 
			console.log("end game clicked");
			clearInterval(retry_coin_animation);
			$('#start_page').removeClass('d-none');
			$( '#game_div' ).load(window.location.href + ' #game_div' );
		},curr_game);
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
			}

			//Make the second choice(between obstacle,pit,dropping platform)
			if(free_to_choose_high==true&&first_choice%FIRST_CHOICE_SPLITTER!=0&&start_tasks==false&&isChangingScene==false&&startTunnelMovement==false&&stopTunnelMovement==false)
			{
				second_choice_high=Math.floor(Math.random()*SECOND_CHOICE_HIGH_RANGE)

				if(SHOW_TUTORIAL==true&&(obstacle_tutorial_shown==false||double_jump_for_obstacle1_tutorial_shown==false||double_jump_for_obstacle2_tutorial_shown==false))
				{
					second_choice_high=5;
					console.log("\"----");

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
				//console.log("pit");
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
			console.log("Erw");
		
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

//jumping action
function jump()
{

 console.log("start jumping");

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
		console.log("jump_tutorial");
		}
		else
		{
			clearInterval(touch_button_animation);
			jump_button.alpha=1;
			jump_button.setScale(0.5);
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
		console.log("jump_tutorial");
		}
		else
		{
			clearInterval(touch_button_animation);
			jump_button.alpha=1;
			jump_button.setScale(0.5);
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
			double_jump_button.setScale(0.5);
			animation_active=false;
		}
		console.log("obstacle_tutorial");
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
			double_jump_button.setScale(0.5);
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
			//console.log(jumps.remaining);
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
		// console.log(shooting_bomb.length);
		if(isShooting==false)
		{
			shoot_action();
		}
	}
	else
	{
		// console.log(shoot_y[shoot_y.length-1][1]);
		// console.log(screen_height*0.8);
		shoot_x.pop();
		shoot_y.pop();

	}    
		
	no_of_clicks=0;    
	clicked_detected=false;
	
}

//For pausing the game    
pause_resume_game = function(){
	console.log("game paused");
	if(gameOver==true||control_button_1!=null||animation_active==true||score==0||control_button_1!=null||animation_active==true)
	{
		return;

	}
	game_paused=!game_paused;
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

musicECGame =  function()
{

	music_muted=!music_muted;
	console.log(music_muted);

	if(music_muted==true)
	{
		curr_game.sound.mute=true;
		// music_button_on.depth=6;					//1
		// music_button_off.depth=7;					//2
	}
	else
	{
		curr_game.sound.mute=false;
		// music_button_on.depth=7;
		// music_button_off.depth=6;

	}
}
closeECGame = function(){ 
	console.log("close the game");
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
	console.log(generate_tasks_variable);
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
	
	console.log(scene_change_timeout);
	//when scene change
	clearTimeout(scene_change_timeout);
	clearTimeout(moveSidewardsTimeout);
	clearTimeout(stopTunnelTimeout);
	scene_change_timeout = null;

	console.log(scene_change_timeout);
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
		scoreText.setText(score);
	}
	if(gameOver==false)
	{
		score_update_handler=setTimeout(score_updator, 500);
	}
		
	if(score%LEVEL_SPEED_INCREMENT_GAP==0&&reachedCrossing==false&&game_paused==false)
	{
		LEVEL_SPEED+=SPEED_INCREMENT;
		change_speed();
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
	
	console.log("level:", level.number,stop_obstacle_generation);
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
function change_speed()
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
	JUMP_RANGE+=JUMP_RANGE_INCREMENT;
	CROSSING_RANGE+=CROSSING_RANGE_INCREMENT;
	if(OBSTACLE_Y_SPEED>0)
	{
		OBSTACLE_Y_SPEED=LEVEL_SPEED;
	}
	else
	{
		OBSTACLE_Y_SPEED=-LEVEL_SPEED;
	}


	if(stop_dropping_platform_generation==false)
	{
		DROPPING_PLATFORM_MINIMUM_SIZE+=40;
	}

	if(stop_pit_generation==false)
	{
		PIT_MINIMUM_SIZE+=40;
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
	// $.ajax({
	// 	url:'gameOverUpdate',
	// 	type:'GET',
	// 	data:{
	// 		'game':game_object,
	// 		'score':score,
	// 		'level':level.number,
	// 		'coins':coins_collected,
	// 		'end_time':generateTS()
	// 	},
	// 	beforeSend: function(xhr){
	// 		console.log("reaching the beforesend");
	// 		xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
	// 	},
	// 	success: function(data){
	// 		//success
	// 	},
	// 	error: function(xhr,errmsg,err){
	// 		//failure, alert the user
	// 	}
	// });
	game_over_update=true;
}