var startExecControlGame = function(show_tutorial, user_data,game_id, 
            musicOn, badgeInfo, correctResponses, badgeConstants){

    $('#execGame').removeClass('d-none');

    ecg_bronze_value = badgeInfo.bronzeBadges;
	ecg_bronze_percent = badgeInfo.bronzePercent;

	ecg_silver_value = badgeInfo.silverBadges;
	ecg_silver_percent = badgeInfo.silverPercent;

	ecg_gold_value = badgeInfo.goldBadges;
	ecg_gold_percent = badgeInfo.goldPercent;
    total_correct_responses = correctResponses;

    ecg_bronze_constant = badgeConstants.bronzeConstant;
    ecg_silver_constant = badgeConstants.silverConstant;
    ecg_gold_constant = badgeConstants.goldConstant;
    
    init_game_variables();

    //Setup game variables using database entry
    // game_object=user_data.data.id;
    game_object = game_id;
    coins_collected = user_data.data.coins_collected;
    shooting_power_field=user_data.data.shooting_capacity;
    double_coin_field=user_data.data.double_coins;
    double_jump_field=user_data.data.double_jump;
    max_score=user_data.data.max_score;

    if(shooting_power_field){
        SHOOTING_POWER_UNLOCKED=true;
    }else{
        SHOOTING_POWER_UNLOCKED=false;
    }

    if(double_coin_field){
        DOUBLE_COIN_POWER=true;
    }else{
        DOUBLE_COIN_POWER=false;
    }

    if(double_jump_field){
        DOUBLE_JUMP_COST=5;
    }else{
        DOUBLE_JUMP_COST=10;
    }

    game_paused=false;

    var game_config=new config(setType(),screen_width,screen_height,modeType(),setCenter());
    var game=new Phaser.Game(game_config);

    ec_play_clicked =true;
    SHOW_TUTORIAL = show_tutorial;
    music_muted = !musicOn;

    $("#start_page").addClass("d-none");
    
}