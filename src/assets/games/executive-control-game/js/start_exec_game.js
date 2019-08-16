var startExecControlGame = function(show_tutorial, user_data,game_id, musicOn){
    $('#execGame').removeClass('d-none');

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