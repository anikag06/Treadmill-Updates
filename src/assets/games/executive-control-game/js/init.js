function init_game_variables(){
	screen_width=800;
	screen_height=400;

	scaleRatio = 2/3;

	// if game closed once 
	game_closed =false;
	ec_play_clicked;
	flankerTaskECGame = false;

	// store the time when the game is started
	ec_game_start_time;

	//Background Elements
	cityline_title;
	brick;
	brick1;
	clouds;
	river;
	river_filler;
	river_height=37;
	scene_change_platform;
	scene_change_platform_velocity_y=0;
	scene_change_timeout = null;
	player_y_speed=0;


	//Double click detector
	no_of_clicks=0;
	clicked_detected=false;
	DOUBLE_CLICK_INTERVAL=100;

	//Shooting action
	shooting_bomb_x=screen_width/6+30;
	shooting_bomb_y=screen_height*0.75+20;
	shooting_bomb_group;
	shoot_x=[];
	shoot_y=[];
	shooting_bomb=[];
	movement_increment=0.01;
	movement_progress=[];
	isShooting=false;
	SHOOTING_POWER=false;
	SHOOTING_POWER_UNLOCKED=true;
	shooting_power_option_shown=false;
	shooting_power_cost=50;
	pavement;
	platform;
	brick_end;
	blue_filler;
	cursors;
	pause_button;
	resume_button;

	//Player Cordinates
	PLAYER_X=screen_width/8;
	PLAYER_INITIAL_Y=screen_height/2;
	player_blinking_animation;
	PLAYER_ANIMATION_TIMING=50;
	player_blinking_counter=40;
	player_counter=0;
	stop_player_animation=false;


	//Speed Related variables
	MAX_LEVEL_SPEED = 10;
	MIN_LEVEL_SPEED = 6;
	LEVEL_SPEED=MIN_LEVEL_SPEED;
	
	LEVEL_SPEED_INCREMENT_GAP=50;
	SPEED_INCREMENT=0.5;

	CITYLINE_SPEED=LEVEL_SPEED;
	RIVER_SPEED=LEVEL_SPEED;
	BIG_RIVER_SPEED=LEVEL_SPEED;
	CLOUDS_SPEED=LEVEL_SPEED;
	STILL_WATER_SPEED=1.5;


	//normal coin variables;
	coin=[];
	coins_group;
	stop_coin_generation=false;
	coinGenerating=false;
	coinGeneratingInit=true;
	add_new_coin=true;
	COIN_MAX_Y_CORDINATE=screen_height*0.55;
	COIN_Y_CORDINATE_RANGE=screen_height*0.05;
	COIN_MIN_X_CORDINATE=300;
	COIN_X_CORDINATE_RANGE=200;
	COIN_SIZE_SCALE=0.28;
	NEXT_COIN_GAP_RANGE=50;
	MINIMUM_GAP_FOR_NEXT_COIN=250;
	COIN_SPEED=LEVEL_SPEED;
	COIN_SCORE=1;
	COIN_GAP=75;
	NUMBER_OF_COINS;
	MAXIMUM_NUMBER_OF_COINS=10;
	coin_sound;


	//coin with obstacle variables
	coin_with_obstacle=[];
	obstacle_for_coin=[];
	coin_obstacle_group;
	stop_coin_with_obstacle_generation=true;
	add_new_coin_with_obstacle=true;
	coinGeneratingWithObstacleInit=true;
	coinGeneratingWithObstacle=false;
	COIN_WTIH_OBSTACLE_MAX_Y_CORDINATE=screen_height*0.53;
	COIN_WTIH_OBSTACLE_Y_CORDINATE_RANGE=screen_height*0.03;
	COIN_WTIH_OBSTACLE_X_CORDINATE_RANGE=200;
	COIN_WTIH_OBSTACLE_MIN_X_CORDINATE=50;
	NEXT_COIN_WITH_OBSTACLE_GAP_RANGE=50;
	MINIMUM_GAP_FOR_NEXT_COIN_WITH_OBSTACLE=75;
	COIN_WITH_OBSTACLE_SPEED=LEVEL_SPEED;
	OBSTACLE_ROTATION_PERIOD=0.001;
	COIN_WITH_OBSTACLE_SCORE=5;
	COIN_WITH_OBSTACLE_SIZE_SCALE=0.35;
	OBSTACLE_FOR_COIN_SIZE_SCALE=0.35;


	//river pit variables
	pit=false;
	stop_pit_generation=true;
	PIT_MINIMUM_SIZE=500;
	MAX_PIT_LENGTH=350;
	PIT_SIZE_RANGE;
	PIT_SPEED=LEVEL_SPEED;

	//Extra Life variables
	extra_life_group;
	extra_life;
	lifeGenerating=false;
	stop_life_generation=false;
	EXTRA_LIFE_MAX_Y_CORDINATE=screen_height*0.30;
	EXTRA_LIFE_Y_CORDINATE_RANGE=screen_height*0.05;
	EXTRA_LIFE_X_CORDINATE_RANGE=200;
	EXTRA_LIFE_MIN_X_CORDINATE=50;
	NEXT_EXTRA_LIFE_GAP_RANGE=200;
	MINIMUM_GAP_FOR_NEXT_EXTRA_LIFE=200;
	EXTRA_LIFE_SPEED=LEVEL_SPEED;
	EXTRA_LIFE_SIZE_SCALE=0.50;
	allowLifeReward=true;

	//Dropping Platform variables
	dropping_platform;
	dropping_platform_group;
	stop_dropping_platform_generation=true;
	dropping_platform_first=true;
	drop_point;
	DROPPING_PLATFORM_MINIMUM_SIZE=500;
	DROPPING_PLATFORM_SIZE_RANGE;
	MINIMUM_DROP_POINT=screen_width*0.75;
	DROP_POINT_RANGE=screen_width*0.25;
	DROP_PLATFORM_Y_CORDINATE=screen_height*0.9;
	DROP_PLATFORM_HEIGHT=screen_height*0.2;
	DROPPING_PLATFORM_SPEED=LEVEL_SPEED;
	DROP_PLATFORM_DOWN_SPEED=12;

	//Obstacle variables
	obstacle;
	obstacle_group;
	stop_obstacle_generation=false;
	OBSTACLE_X_CORDINATE=20;
	OBSTACLE_Y_CORDINATE=screen_height*0.8;
	OBSTACLE_SPEED=LEVEL_SPEED;
	OBSTACLE_SMALL_SCALE = 0.8;
	obstacleGenerating=false;
	flying_obstacle;
	top_obstacle;
	obstacle_type={curr_choice:0,max_choice:3};
	obstacle_movement=1;
	TOP=1;
	BOTTOM=-1;
	OBSTACLE_Y_SPEED=OBSTACLE_SPEED;


	//Task initialization
	task_completed=true;
	task_init=false;
	stop_length;
	MINIMUM_STOP_LENGTH=screen_width/7;
	STOP_LENGTH_RANGE=screen_width/16;
	start_tasks=false;
	reachedCrossing=false;
	date = new Date();
	restore_game=false;
	max_number_of_tasks=3;
	current_number_of_tasks;
	TASK_INTERVAL=30000;
	performance_reward=null;
	reward_group;
	reward_count;
	tasks_done = null;
	flanker_task_done=null;
	image_task_done = null;
	discrimination_task_initial_timeout = null;
	continue_to_next_set_timeout = null;
	generate_tasks_variable = null;


	//Jump Platform variables
	jump_platform=[];
	JUMP_PLATFORM_MINIMUM_LENGTH=170;
	JUMP_PLATFORM_LENGTH_RANGE=50;
	JUMP_PLATFORM_MINIMUM_HEIGHT=screen_height*0.75;
	JUMP_PLATFORM_HEIGHT_RANGE=screen_height*0.20;
	JUMP_PLATFORM_MINIMUM_POSITION=300;
	JUMP_PLATFORM_POSITION_RANGE=300;
	JUMP_PLATFORM_SPEED=LEVEL_SPEED;
	JUMP_PLATFORM_CHOICE=1;
	CROSSING_MINIMUM_LENGTH=screen_width*2;
	JUMP_RANGE=150;
	CROSSING_RANGE=700;
	JUMP_RANGE_INCREMENT=10;
	CROSSING_RANGE_INCREMENT=50;
	DROP_JUMP_PLATFORM_SPEED=30;
	JUMP_PLATFORM_CHOICE_RANGE=100;
	initial_double_jumps=5;
	jumps={remaining   :initial_double_jumps};
	double_jump_text;
	double_jump_coin=null;
	coin_blinker_interval=500;
	DOUBLE_JUMP_COST=10;
	double_coin_blinker;

	//User information display
	countdown=7;
	start_countdown_done=false;
	resume_countdown_done=false;
	countdown_handler=null;
	STARTING_TEXT="Starting Tasks";
	RESUMING_TEXT="Resuming Game";
	INTERVAL=300;
	countdown_max_dot_length=3;
	countdown_dot_length=0;
	countdown_text;

	//pause button
	pause_button;


	//mystery egg;
	mystery_egg_icon=null;
	mystery_egg_collected=0;
	mystery_egg_collected_text;

	//Gameover dialog_box;
	game_over_dialog;
	game_over_text;
	buy_one_live;
	buy_two_lives;
	buy_three_lives;


	//Task buttons
	left_button;
	right_button;
	red_button;
	green_button;
	BUTTON_SPEED=10;
	LEFT_X=screen_width*0.1;
	RIGHT_X=screen_width*0.9;
	TOP_Y=screen_height*0.15;
	BOTTOM_Y=screen_height*0.55;
	distance=200;
	CORRECT_RESPONSE=1;
	INCORRECT_RESPONSE=-1;
	NO_REPSONSE=0;
	NEGATIVE_IMAGE=-1;
	NEUTRAL_IMAGE=-1;
	TYPE_CHANGE_INTERVAL=2;
	number_of_correct_response=0;

	//Flanker task variables
	flanker_task_init=false;
	flanker_task_started=false;
	flanker_task_ended=true;
	flanker_task_image=null;
	flanker_task_choice=-1;
	flanker_task_start_time=0;
	flanker_task_end_time=0;
	flanker_task_response_time=0;
	flanker_task_response_type=NO_REPSONSE;
	flanker_task_congruency;
	flanker_task_timestamp=0;
	TOTAL_NUMBER_OF_FLANKER_TASK=4;
	FLANKER_Y_CORDINATE=screen_height/2.5;
	FLANKER_X_CORDINATE=screen_width/2;
	FLANKER_TASK_IMAGE_SCALE=1.5;
	FLANKER_TASK_IMAGE_SMALL_SCALE = 0.7;
	FLANKER_TASK_IMAGE_SPEED=15;
	TIME_FOR_FLANKER=1000;

	//Task images
	task_image;
	task_image_type=-1;
	TOTAL_NUMBER_OF_IMAGES=24;
	TIME_FOR_IMAGE=100;
	TIME_FOR_BLANK_SCREEN=50;
	IMAGE_Y_CORDINATE=screen_height/2.5;
	IMAGE_X_CORDINATE=screen_width/2;

	//Discrimination task
	discrimination_task_init=false;
	discrimination_task_started=false;
	discrimination_task_ended=true;
	discrimination_task_image=null;
	discrimination_task_choice=-1;
	discrimination_task_start_time=0;
	discrimination_task_end_time=0;
	discrimination_task_response_time=0;
	discrimination_task_response_type=NO_REPSONSE;
	discrimination_task_timestamp=0;
	TOTAL_NUMBER_OF_DISCRIMINATION_TASK=2;
	DISCRIMINATION_Y_CORDINATE=screen_height/2.5;
	DISCRIMINATION_X_CORDINATE=screen_width/2;
	DISCRIMIANTION_TASK_IMAGE_SCALE=1.5;
	DISCRIMINATION_TASK_IMAGE_SMALL_SCALE = 0.7;
	DISCRIMINATION_TASK_IMAGE_SPEED=15;
	TIME_FOR_DISCRIMINATION=2000;
	
	//Game Scoring Elements
	GAME_ELEMENTS_SPEED=12;
	life;
	lifes_group;
	HEART_POSITION_ADJUSTMENT=0.3;
	heart_size=106;
	stat_icon_display_y=15;
	stat_text_display_y=0;
	heart_height=88;
	heart_x = screen_width-155;
	MAX_NUMBER_OF_LIVES=3;
	COIN_SCORE_LENGTH_ADJUSTMENT=15;
	coin_score_icon;
	scoreText;
	score_x=40;
	score=0;
	max_score;
	level={number:1};
	coinsCollectedText;
	gameOver=false;
	coins_collected=250;
	no_player=false;
	number_of_lives=MAX_NUMBER_OF_LIVES;
	score_checkpoints=[50,75,100,125,150,250,350,600,750,1000,1500,2000,2500];
	current_checkpoint=0;
	RESPAWNING_TEXT;
	RESPAWN_Y=screen_height/3.5;
	RESPAWN_X=screen_width/3.2;
	respawn_animator;
	respawn_dot_length=0;
	respawn_dot_max_length=4;
	RESPAWN_ANIMATION_INTERVAL=350;
	game_paused=false;
	score_update_handler;

	//Jumping Variables
	jump_up,jump_down;
	jumpingUp;
	jumpingInit=false;
	jump_disabled=false;
	jump_velocity = -500;
	jump_height = screen_height*0.48;
	isJumping=false;
	type=0;
	jump_button;
	double_jump_button;
	SINGLE_JUMP=1;
	DOUBLE_JUMP=1.5;


	//Store the current instance of the game 
	curr_game;


	//Brick related variables
	BRICK_SPEED=LEVEL_SPEED;
	BRICK_Y_CORDINATE=screen_height*0.9;
	BRICK_HEIGHT=screen_height*0.2;
	NEW_BRICK_X_COORDINATE=screen_width*1.5;
	brick_speed = LEVEL_SPEED;
	brick_height=146;

	//Cityline Variables
	Cityline_height=170;


	//Randomization variables
	/*
	first_choice:to choose between elements in air and elements on platform
	second_choice:to choose which element in air
	second_choice_high:to choose which element on platform
	lock_on_choice&choice_lock_counter:delay generating variables;
	free_to...:new element generation possible only if it is true;
	clear_to_start:incremented for every new element generated and decremented when its scope is over
	*/
	first_choice;
	free_to_start_choose=false;

	second_choice=-1;
	free_to_choose=true;

	second_choice_high=-1;
	free_to_choose_high=true;

	lock_on_choice;
	choice_lock_counter;


	clear_to_start=0;

	//RANDOMIZATION Value
	FIRST_CHOICE_RANGE=100;
	FIRST_CHOICE_SPLITTER=2;
	SECOND_CHOICE_RANGE=10;
	SECOND_CHOICE_HIGH_RANGE=20;
	COIN_SELECTOR=2;
	LIFE_SELECTOR=7;
	COIN_WITH_OBSTACLE_SELECTOR=3;
	PIT_SELECTOR=2;
	DROPPING_PLATFORM_SELECTOR=3;

	//Game-Control Keys;
	/*Jump=Space
	Double-Jump=Ctrl+Space
	Flanker-left=D
	Flanker-right=K
	Discrimination-red=V
	Discrimination-green=N*/

	//music button
	music_button_on;
	music_button_off;
	music_muted;

	isTouchDevice
	jumpKey;
	doubleJumpKey;
	flankerLeftKey;
	flankerRightKey;
	discriminationRedKey;
	discriminationGreenKey;

	//sounds
	falling_down_sound;
	bgm_sound;
	game_over_sound;

	goFullScreen = null;
	exitFullScreen = null;

	//retry button
	retry_coin_icon;
	retry_coin_text;
	retry_coin_animation;
	retry_cost=10;

	buy_one_live_text;
	buy_two_lives_text;
	buy_three_lives_text;

	//double_jump
	DOUBLE_COIN_POWER=false;
	double_coin_option_shown=false;
	double_coin_text;
	double_coin_icon;
	double_coin_yes_button;
	double_coin_no_button;
	double_coin_cost=200;
	double_coin_cost_text;
	double_coin_dialog;


	//Tutorial
	SHOW_TUTORIAL=true;
	jump_tutorial_shown=false;
	obstacle_tutorial_shown=false;
	tutorial_text;
	tutorial_box;
	tutorial_end_text_time = 10000;
	double_jump_for_obstacle1_tutorial_shown=false;
	double_jump_for_obstacle2_tutorial_shown=false;
	control_button_1=null;
	control_button_2=null;
	task_tutorial_shown=false;
	task_button_blinking_animation=false;
	task_tutorial_text;

	touch_button_animation;
	touch_alpha=[0.4,1]
	touch_size=[0.38,0.56]
	alpha_choice=0;
	animation_active=false;

	JUMP_BUTTON_Y;
	DOUBLE_JUMP_BUTTON_Y;
	DOUBLE_JUMP_BUTTON_TEXT_Y;

	tunnel_entry;
	river_1;
	cityline_title_1;

	isChangingScene=false;
	flyingUp=false;
	startTunnelMovement=false;
	startTunnelMovementDelay=false;
	stopTunnelMovement=false;
	stopTunnelMovementDelay=false;
	stopTunnelTimeout =null;
	moveSidewardsTimeout = null;
	flyingDown=false;
	brickYCordinate;
	horizontalMovement=false;
	tunnelDownwardMovement=false;
	tunnelUpwardMovement=false;
	scene_change_platform1=null;
	scene_change_platform=null;

	brick2=null;
	brick3;

	background_images_array = ['skyline', 'skyline1', 'skyline2', 'skyline3', 'skyline4'];
	background_sky_array = ['mountain_sky', 'desert_sky', 'mountain_sky', 'desert_sky', 'mountain_sky'];
	scene_counter = 1;

	game_object;
	game_over_update=false;
	console.log("from init ", game_paused);
}