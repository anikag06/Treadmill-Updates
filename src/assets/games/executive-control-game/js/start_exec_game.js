var startExecControlGame = function(show_tutorial){
    //For fullscreen and orientation
    var orientKey = 'orientation';
    if('mozOrientation' in screen){
        orientKey = 'mozOrientation';
    }else if('msOrientation' in screen) {
        orientKey = 'msOrientation';
    }

    var goFullScreen = null;
    var exitFullScreen = null;
    if('requestFullscreen' in document.documentElement) {
        goFullScreen = 'requestFullscreen';
        exitFullScreen = 'exitFullscreen';
    }else if('mozRequestFullScreen' in document.documentElement) {
        goFullScreen = 'mozRequestFullScreen';
        exitFullScreen = 'mozCancelFullScreen';
    }else if('webkitRequestFullscreen' in document.documentElement) {
        goFullScreen = 'webkitRequestFullscreen';
        exitFullScreen = 'webkitExitFullscreen';
    }else if('msRequestFullscreen') {
        goFullScreen = 'msRequestFullscreen';
        exitFullScreen = 'msExitFullscreen';
    }

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
    
    //Setup game variables using database entry
    // coins_collected =parseInt('{{player_data.coins_collected}}');
    // shooting_power_field='{{player_data.shooting_capacity}}';
    // double_coin_field='{{player_data.double_coins}}';
    // double_jump_field='{{player_data.double_jump}}';
    // game_object='{{game_instance.pk}}';

    coins_collected =120;
    shooting_power_field='0';
    double_coin_field='2';
    double_jump_field='2';
    game_object='1';

    if(shooting_power_field=='True'){
        SHOOTING_POWER_UNLOCKED=true;
    }else{
        SHOOTING_POWER_UNLOCKED=false;
    }

    if(double_coin_field=='True'){
        DOUBLE_COIN_POWER=true;
    }else{
        DOUBLE_COIN_POWER=false;
    }

    if(double_jump_field=='True'){
        DOUBLE_JUMP_COST=5;
    }else{
        DOUBLE_JUMP_COST=10;
    }

    game_paused=false;

    var game_config=new config(setType(),screen_width,screen_height);
    var game=new Phaser.Game(game_config);
    
    // Add to resize event
    window.addEventListener('resize', resizeGame);
    // Set correct size when page loads the first time
    resizeGame(screen_width, screen_height);

    SHOW_TUTORIAL = show_tutorial;
    // if($('input[type="checkbox"]').is(":checked")){
    //     SHOW_TUTORIAL=true;
    // }
    // else{
    //     SHOW_TUTORIAL=false;
    // }

    // $("#start_page").hide();
    $("#start_page").addClass("d-none");
}