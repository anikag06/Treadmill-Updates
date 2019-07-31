var startExecControlGame = function(show_tutorial, user_data,game_id, musicOn){
    $('#execGame').removeClass('d-none');
    
    // //For fullscreen and orientation
    // var orientKey = 'orientation';
    // if('mozOrientation' in screen){
    //     orientKey = 'mozOrientation';
    // }else if('msOrientation' in screen) {
    //     orientKey = 'msOrientation';
    // }

    // var goFullScreen = null;
    // var exitFullScreen = null;
    // if('requestFullscreen' in document.documentElement) {
    //     goFullScreen = 'requestFullscreen';
    //     exitFullScreen = 'exitFullscreen';
    // }else if('mozRequestFullScreen' in document.documentElement) {
    //     goFullScreen = 'mozRequestFullScreen';
    //     exitFullScreen = 'mozCancelFullScreen';
    // }else if('webkitRequestFullscreen' in document.documentElement) {
    //     goFullScreen = 'webkitRequestFullscreen';
    //     exitFullScreen = 'webkitExitFullscreen';
    // }else if('msRequestFullscreen') {
    //     goFullScreen = 'msRequestFullscreen';
    //     exitFullScreen = 'msExitFullscreen';
    // }

    // document.documentElement[goFullScreen] && document.documentElement[goFullScreen]();

    // var promise = null;
    // if(screen[orientKey].lock) {
    //     promise = screen[orientKey].lock("landspace-primary");
    // }else{
    //     promise = screen.orientationLock("landspace-primary");
    // }

    // promise.then(function () {
    //     document.getElementById("game_name").innerHTML='Screen lock acquired';
    // }).catch(function (err) {
    //     document.getElementById("game_name").innerHTML='Screen lock acquired';
    //     document[exitFullScreen] && document[exitFullScreen]();
    // });

    init_game_variables();
    console.log("data recieved ", user_data);
    //Setup game variables using database entry

    // game_object=user_data.data.id;
    game_object = game_id;
    coins_collected = user_data.data.coins_collected;
    shooting_power_field=user_data.data.shooting_capacity;
    double_coin_field=user_data.data.double_coins;
    double_jump_field=user_data.data.double_jump;
    max_score=user_data.data.max_score;

    console.log("when game started",game_object);
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
    let game=new Phaser.Game(game_config);

    ec_play_clicked =true;
    SHOW_TUTORIAL = show_tutorial;
    music_muted = !musicOn;
    // if($('input[type="checkbox"]').is(":checked")){
    //     SHOW_TUTORIAL=true;
    // }
    // else{
    //     SHOW_TUTORIAL=false;
    // }
    console.log(level);
    $("#start_page").addClass("d-none");
    
}