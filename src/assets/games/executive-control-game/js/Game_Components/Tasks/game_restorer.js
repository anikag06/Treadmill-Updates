//Restore the game setup after executive control tasks
function game_restore()
{

    var used=false;
    var resume=true;

    //Generate reward if response good
    if(performance_reward==null&&number_of_correct_response>0)
    {
    	
    	//life reward only if the entire set's response was correct
    	if(number_of_lives!=MAX_NUMBER_OF_LIVES&&allowLifeReward==true)
    	{
    		performance_reward=reward_group.create(jump_platform[0].x,jump_platform[0].y-70,'life').setScale(1);
    		performance_reward.body.allowGravity=false;
        	curr_game.physics.add.collider(player,performance_reward,function(obj1,obj2){collect_life(obj2)},null,curr_game);

        }
        //otherwise double jump reward
        else
        {
    		performance_reward=reward_group.create(jump_platform[0].x,jump_platform[0].y-70,'double_jump').setScale(0.3);
    		reward_count=curr_game.add.text(performance_reward.x+10,performance_reward.y+10,"x"+number_of_correct_response, { fontSize: '25px', fill: '#fff',align:'center' });
        	performance_reward.body.allowGravity=false;
        	curr_game.physics.add.collider(player,performance_reward,collect_double_jump_power,null,curr_game);
    	}

    }

    //Move the reward to jump height
    if(number_of_correct_response!=0&&performance_reward.y<screen_height/2)
    {
    	performance_reward.y+=GAME_ELEMENTS_SPEED;
    	if(reward_count!=null)
    	{
    		reward_count.y+=GAME_ELEMENTS_SPEED;
    	}
    	resume=false;
    }

    //Wait for countdown(in discrimination task to end)
    if(countdown!=0&&resume_countdown_done==false&&current_number_of_tasks==0&&countdown_handler!=null)
    {
    	return;
    }

    //Clear all variables and move the game controls,score display and various and display to the scene
    if(countdown==0)
    { 	
		// task_background.depth = 0;
		console.log(task_background);
		task_background.destroy();
		console.log(task_background.destroy());
		if(tutorial_box){
			tutorial_box.destroy();
			task_tutorial_text.setText("");
		}
		clearInterval(countdown_handler);
		countdown_handler=null;
		countdown_dot_length=0;
		resume_countdown_done=true;
		countdown=7;
		bgm_sound.resume();
		countdown_text.setText();
		
		total_correct_responses = total_correct_responses + number_of_correct_response;
		console.log('correct response', number_of_correct_response, 'total', total_correct_responses);

		updateBadgesInfo();
    }

    // if(pause_button.y>screen_height*0.90)		//position of pause and music buttons changed
    // {
    // 	pause_button.y-=GAME_ELEMENTS_SPEED;
    // 	resume_button.y-=GAME_ELEMENTS_SPEED;
    // 	music_button_on.y-=GAME_ELEMENTS_SPEED;
	// 	music_button_off.y-=GAME_ELEMENTS_SPEED;
    // 	resume=false;
	// }
	// if ($('#pause-common-div').hasClass('d-none')){
	// 	// $('#pause-common-div').removeClass('d-none');
	// 	// resume=false;
	// }else{
	// 	$('#pause-common-div').addClass('d-none');
	// 	resume=false;
	// }
	
    if(left_button!=null&&isTouchDevice==true)
    {	
	if(left_button.x>=-left_button.width/2)
    {
     	left_button.x-=BUTTON_SPEED;
     	right_button.x+=BUTTON_SPEED;
     	red_button.x-=BUTTON_SPEED;
     	green_button.x+=BUTTON_SPEED;
     	resume=false;

    }
	}
    if(mystery_egg_icon!=null)
    {

    	if(mystery_egg_icon.y<120)
    	{
    		mystery_egg_icon.y+=GAME_ELEMENTS_SPEED;
    		resume=false;
    	}
    	

    }
    if(mystery_egg_collected_text.y<stat_text_display_y)
    {
    	mystery_egg_collected_text.y+=GAME_ELEMENTS_SPEED;
    	resume=false;
	} 
    if(isTouchDevice==true&&jump_button.y>JUMP_BUTTON_Y)
    {
    	jump_button.y-=GAME_ELEMENTS_SPEED;
    	resume=false;
    	
    }
    if(double_jump_button.y>DOUBLE_JUMP_BUTTON_Y)
    {
    	double_jump_button.y-=GAME_ELEMENTS_SPEED;
    	resume=false;
    }
    if(double_jump_text.y>DOUBLE_JUMP_BUTTON_TEXT_Y)
    {
    	double_jump_text.y-=GAME_ELEMENTS_SPEED;
	    if(double_jump_coin!=null)
	    {
    		double_jump_coin.y-=GAME_ELEMENTS_SPEED;
	    }
	    resume=false;

    }

    if(life.y<stat_icon_display_y)
    {
     	life.y+=GAME_ELEMENTS_SPEED;
     	used=true;
     	resume=false;
    }
    if(livesText.y<stat_text_display_y)
    {
     	livesText.y+=GAME_ELEMENTS_SPEED;
     	used=true;
     	resume=false;
    }
	 
	if(scoreText.y<stat_text_display_y)
	{
	 	scoreText.y+=GAME_ELEMENTS_SPEED;
	 	used=true;
	 	resume=false;
	}
	if(coinsCollectedText.y<stat_text_display_y)
	{
	 	coinsCollectedText.y+=GAME_ELEMENTS_SPEED;
	 	used=true;
	 	resume=false
	}
	if(coin_score_icon.y<stat_icon_display_y)
	{
	 	coin_score_icon.y+=GAME_ELEMENTS_SPEED;
	 	used=true;
	 	resume=false;
	}
    
    
    //Move the scene till it is covered with brick
	if(brick1.x>=screen_width/2+BRICK_SPEED/2&&resume==true)
	{
	 	
	 	 
	 	bgm_sound.resume();
	 	reachedCrossing=false;
	 	brick1.x-=BRICK_SPEED;
	 	brick.x-=BRICK_SPEED;
	 	for(var i=0;i<jump_platform.length;i++)
		{
		  	jump_platform[i].x-=JUMP_PLATFORM_SPEED;
		}
		if(performance_reward!=null)
		{
			performance_reward.x-=BRICK_SPEED;
			if(reward_count!=null)
			{
				reward_count.x-=BRICK_SPEED;
			}
		}
	 	used=true;
	}
	
	if(used==false&&resume==true)
	{
	 	brick=brick1;
	 	brick_speed=BRICK_SPEED;
	 	while(jump_platform.length!=0)
		{
		  	//jump_platform[jump_platform.length-1].disableBody(true,true);
		  	jump_platform.pop();


		}
	 	restore_game=false;

	 	
	 	flanker_task_response_time=0;
		flanker_task_response_type=NO_REPSONSE;
		flanker_task_start_time=0;
		flanker_task_end_time=0;
		
		discrimination_task_response_type=NO_REPSONSE;
		discrimination_task_response_time=0;
		discrimination_task_start_time=0;
		discrimination_task_end_time=0;
		
		task_image_type=-1;
	 	

	 	left_button=null;
	 	

	 	free_to_choose_high=true;
	 	free_to_choose=true;
	 	start_tasks=false;
	 	if(clear_to_start<0)
	 	{	
	 		clear_to_start=0;
	 	}

	 	start_countdown_done=false;
	 	resume_countdown_done=false;
	 	number_of_correct_response=0;
	 	performance_reward=null;
	 	reward_count=null;

	 	if(SHOW_TUTORIAL==true&&task_tutorial_shown==false)
	 	{
	 		task_tutorial_text.setText("");
	 	}

	 	allowLifeReward=true;
	 	generate_tasks_variable=setTimeout(generate_tasks,TASK_INTERVAL);

	 	
	}
}


function collect_double_jump_power()
{
	performance_reward.disableBody(true,true);
	curr_game.sound.add('mystery_egg_sound').play();
	reward_count.setText();
	jumps.remaining+=number_of_correct_response;
	jumps_remaining_changer();

}

function updateBadgesInfo() {
	ecg_bronze_value = Math.floor(total_correct_responses / ecg_bronze_constant);
    ecg_bronze_percent = this.getPercent(ecg_bronze_constant, total_correct_responses);

    ecg_silver_value = Math.floor(total_correct_responses / ecg_silver_constant);
    ecg_silver_percent = this.getPercent( ecg_silver_constant, total_correct_responses);

   	ecg_gold_value = Math.floor(total_correct_responses / ecg_gold_constant) ;
	ecg_gold_percent = this.getPercent( ecg_gold_constant, total_correct_responses);

	bronzeText.setText(ecg_bronze_value);
	bronzeBar.width = (ecg_bronze_percent/100) * bronzeBarBack.width;		// here need the fraction of the length of bar behind hence divide by 100

	silverText.setText(ecg_silver_value);
	silverBar.width = (ecg_silver_percent/100) * silverBarBack.width; 		// here need the fraction of the length of bar behind hence divide by 100

	goldText.setText(ecg_gold_value);
	goldBar.width = (ecg_gold_percent/100) * goldBarBack.width;				// here need the fraction of the length of bar behind hence divide by 100

}

function getPercent(constant, correctResponses){
	const progressValue = correctResponses % constant ;
    return (progressValue / constant) * 100; 
}