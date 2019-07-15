function task_generator()
{
	
    //Add jump platform
	if(jump_platform.length==0)
	{
	
		var crossing_length=Math.floor(Math.random() * CROSSING_RANGE)+CROSSING_MINIMUM_LENGTH;
		stop_length=Math.floor(Math.random() * STOP_LENGTH_RANGE)+MINIMUM_STOP_LENGTH;

	   
	    var covered=JUMP_RANGE;
	    var length =Math.floor(Math.random() * JUMP_PLATFORM_LENGTH_RANGE)+JUMP_PLATFORM_MINIMUM_LENGTH;
		
		//Add platforms till the jump range is covered
		while(covered<crossing_length-(screen_width+JUMP_PLATFORM_SPEED)/2-JUMP_RANGE-screen_width)
		{
		
			var height=Math.floor(Math.random()*JUMP_PLATFORM_HEIGHT_RANGE)+JUMP_PLATFORM_MINIMUM_HEIGHT;
		    
		    //Normal or dropping jump platforms
		    var choice=Math.floor(Math.random()*JUMP_PLATFORM_CHOICE_RANGE);
			choice=choice%JUMP_PLATFORM_CHOICE;

			jump_platform.push(curr_game.add.tileSprite(screen_width+covered,height,length,50,"jump_platform_"+choice));
			platforms.add(jump_platform[jump_platform.length-1]);
			jump_platform[jump_platform.length-1].body.allowGravity=false;
	    	jump_platform[jump_platform.length-1].body.immovable=true;

	    	if(choice==1)
	    	{
	    	curr_game.physics.add.collider(jump_platform[jump_platform.length-1],player,function(obj1,obj2){drop_jump_platform(obj1);},null,curr_game);
	    	}
	    	else
	    	{
	    		curr_game.physics.add.collider(jump_platform[jump_platform.length-1],player);

	    	}
	    	covered=JUMP_RANGE+jump_platform[jump_platform.length-1].x-screen_width+jump_platform[jump_platform.length-1].width/2;;
	    	length =Math.floor(Math.random() * JUMP_PLATFORM_LENGTH_RANGE)+JUMP_PLATFORM_MINIMUM_LENGTH;
	    	console.log(covered);
    	}

		//Add the next brick and collider for it
		brick1=curr_game.add.tileSprite(crossing_length,BRICK_Y_CORDINATE,screen_width+JUMP_PLATFORM_SPEED,BRICK_HEIGHT,"brick");
		platforms.add(brick1);
		brick1.body.allowGravity=false;
    	brick1.body.immovable=true;
    	curr_game.physics.add.collider(brick1,player);

        //Task related variables;
		task_completed=false;
		task_init=true;
		current_number_of_tasks=Math.floor(Math.random()*(max_number_of_tasks));
		if(task_tutorial_shown==false)
		{
			current_number_of_tasks=2;
		}
		console.log(current_number_of_tasks);

		//Game elements generator
		free_to_choice_high=false;
		free_to_choice=false;
	}


    
    //Move the bricks till reaching the stop length
	else if(brick.x>=-stop_length)
	{
	  brick.x-=BRICK_SPEED;
	  brick1.x-=BRICK_SPEED;
	  brick_speed=0;
	  for(var i=0;i<jump_platform.length;i++)
	  {
	  	jump_platform[i].x-=JUMP_PLATFORM_SPEED;
	  }
	}

	//If no tasks are generated,restore the game
	else if(current_number_of_tasks==0)
	{
		task_completed=true;
		restore_game=true;
	    
	}

	//Else generate delay before starting
	else if(current_number_of_tasks>0&&countdown!=0&&start_countdown_done==false)
	{
		reachedCrossing=true;
		bgm_sound.pause();
		if(countdown_handler==null)
		{
			countdown_handler=setInterval(start_countdown,INTERVAL);
		}
	}


	else
	{
		clearInterval(countdown_handler);
		countdown_handler=null;
		countdown_dot_length=0;
		start_countdown_done=true;
		resume_countdown_done=false;
		countdown=7;
		countdown_text.setText();


	    //Move the score panel upwards till out of site
	    if(scoreText.y>=-screen_height-scoreText.height/2||coinsCollectedText.y>=-screen_height-coinsCollectedText.height/2||coin_score_icon.y>=-screen_height/2-coin_score_icon.height/2||life.y>=-screen_height/2-life.height/2)
	    {
	    	scoreText.y-=GAME_ELEMENTS_SPEED;
	    	coinsCollectedText.y-=GAME_ELEMENTS_SPEED;
	    	coin_score_icon.y-=GAME_ELEMENTS_SPEED;
	    	life.y-=GAME_ELEMENTS_SPEED;
	    	livesText.y-=GAME_ELEMENTS_SPEED;
	    	if(isTouchDevice==true)
	    	{
	    	jump_button.y+=GAME_ELEMENTS_SPEED;
	    	}
	    	double_jump_button.y+=GAME_ELEMENTS_SPEED;
	    	double_jump_text.y+=GAME_ELEMENTS_SPEED;
	    	if(double_jump_coin!=null)
	    	{
	    		double_jump_coin.y+=GAME_ELEMENTS_SPEED;
	    	}
	    	if(mystery_egg_icon!=null)
	    	{
	    		mystery_egg_icon.y-=GAME_ELEMENTS_SPEED;
	    	}
	    	mystery_egg_collected_text.y-=GAME_ELEMENTS_SPEED
	    	pause_button.y+=GAME_ELEMENTS_SPEED; 	 	// changed the position of the buttons(pause and music) 
	    	resume_button.y+=GAME_ELEMENTS_SPEED;
	    	music_button_on.y+=GAME_ELEMENTS_SPEED;
	    	music_button_off.y+=GAME_ELEMENTS_SPEED;
	    }
	   
	    
	    else
	    {

    
	      //Add the task buttons
	      if(left_button==null&&isTouchDevice==true)
	      {
	      
	      left_button=curr_game.add.sprite(LEFT_X-distance,TOP_Y, 'flanker_button').setInteractive();
	      left_button.angle+=270;

	      if(left_button.y-left_button.height<0)
	      {
	      	left_button.y=left_button.height/2+20;
	      }
	      left_button.on('pointerdown',left_pressed);
	      left_button.on('pointerup',function(){this.alpha=1});


	      right_button=curr_game.add.sprite(RIGHT_X+distance,TOP_Y, 'flanker_button').setInteractive();
	      right_button.angle+=90;
	      if(right_button.y-right_button.height<0)
	      {
	      	right_button.y=right_button.height/2+20;
	      }
	      right_button.on('pointerdown', right_pressed);
	      right_button.on('pointerup',function(){this.alpha=1});

	      
	      red_button=curr_game.add.sprite(LEFT_X-distance,BOTTOM_Y, 'red_button').setInteractive();
	      red_button.on('pointerdown', red_pressed);
	      red_button.on('pointerup',function(){this.alpha=1});

	      green_button=curr_game.add.sprite(RIGHT_X+distance,BOTTOM_Y, 'green_button').setInteractive();
	      green_button.on('pointerdown', green_pressed);
	      green_button.on('pointerup',function(){this.alpha=1});

	     }


         
         //Move task buttons to the required posiiton
	     else if(isTouchDevice==true)
	     {
		    if(left_button.x!=LEFT_X)
		    {
	     		left_button.x+=BUTTON_SPEED;
	     		right_button.x-=BUTTON_SPEED;
	     		red_button.x+=BUTTON_SPEED;
	     		green_button.x-=BUTTON_SPEED;
		    }
		    
		    //Start the flanker task
		    else
		    {
	     	
	     		flanker_task_init=true;
	     		task_init=false;
		    }
		}

	     //Start the flanker task
	    else
	    {
	     	
	     	flanker_task_init=true;
	     	task_init=false;
	    }

	    }
	}
	
}

//The following four functions is to detect the task button inputs--one is explained
function left_pressed()
{

	//Detect input only durind task time	
	if(flanker_task_started==true&&flanker_task_ended==false)
	{
		date=new Date();
		//Animation for touch
		if(isTouchDevice)
		{
		left_button.alpha=0.8;
		}

		//Record end time
		flanker_task_end_time=date.getTime();

		//Record response type
		if(flanker_choice%TYPE_CHANGE_INTERVAL==0)
		{
			
			flanker_task_response_type=CORRECT_RESPONSE;
		}	
		else
		{
			
			flanker_task_response_type=INCORRECT_RESPONSE;
			allowLifeReward==false;
		}
		if(SHOW_TUTORIAL==true&&task_tutorial_shown==false)
		{
				if(flanker_task_response_type!=CORRECT_RESPONSE)
				{
					return;
				}	
				flanker_task_image.destroy();
				flanker_task_ended=true;
				flanker_task_complete();
				if(isTouchDevice==true)
				{
					left_button.setScale(1);
					animation_active=false;
				
					clearInterval(task_button_blinking_animation);
				}
				task_tutorial_text.setText("");

				
		}
		else
		{
			flanker_task_image.destroy();
			flanker_task_ended=true;
		}
		
		
		
	}
}

function right_pressed()
{

	
	if(flanker_task_started==true&&flanker_task_ended==false)
    {
    	date=new Date();
    	if(isTouchDevice)
    	{
    	right_button.alpha=0.8;
    	}
		flanker_task_end_time=date.getTime();
		if(flanker_choice%TYPE_CHANGE_INTERVAL==0)
		{
			flanker_task_response_type=INCORRECT_RESPONSE;
			allowLifeReward=false;
		}
		else
		{
		
			flanker_task_response_type=CORRECT_RESPONSE;
		}
		
		
		if(SHOW_TUTORIAL==true&&task_tutorial_shown==false)
		{

				if(flanker_task_response_type!=CORRECT_RESPONSE)
				{
					return;
				}
				flanker_task_image.destroy();
				flanker_task_ended=true;
				flanker_task_complete();
				if(isTouchDevice==true)
				{
					right_button.setScale(1);
					animation_active=false;
					
					clearInterval(task_button_blinking_animation);
				}
				task_tutorial_text.setText("");
		}
		else
		{
			flanker_task_image.destroy();
			flanker_task_ended=true;
		}
	}
}	

function red_pressed()
{
	
	if(discrimination_task_started==true&&discrimination_task_ended==false)
	{
		if(isTouchDevice)
		{
		red_button.alpha=0.8;
		}
		date=new Date();
		discrimination_task_end_time=date.getTime();
		if(discrimination_choice%TYPE_CHANGE_INTERVAL==0)
		{
			
			discrimination_task_response_type=CORRECT_RESPONSE;
			if(flanker_task_response_type==CORRECT_RESPONSE)
			{
				number_of_correct_response++;
			}
		}
		else
		{
			

			discrimination_task_response_type=INCORRECT_RESPONSE;
			allowLifeReward=false;
			
		}

		if(SHOW_TUTORIAL==true&&task_tutorial_shown==false)
		{

				if(discrimination_task_response_type!=CORRECT_RESPONSE)
				{
					return;
				}
				discrimination_task_image.destroy();
				discrimination_task_ended=true;
				discrimination_task_complete();
				if(isTouchDevice==true)
				{
					red_button.setScale(1);
					animation_active=false;
					
					clearInterval(task_button_blinking_animation);
				}
				task_tutorial_text.setText("");
		}
		
		

		else
		{
			discrimination_task_ended=true;
			clearTimeout(tasks_done);
			discrimination_task_complete();
		}
	}
}

function green_pressed()
{


	if(discrimination_task_started==true&&discrimination_task_ended==false)
	{
		if(isTouchDevice)
		{
		green_button.alpha=0.8;
		}
		date=new Date();
		discrimination_task_end_time=date.getTime();
		if(discrimination_choice%TYPE_CHANGE_INTERVAL==0)
		{
			
			discrimination_task_response_type=INCORRECT_RESPONSE;
			allowLifeReward=false;
		}
		else
		{
			

			discrimination_task_response_type=CORRECT_RESPONSE;
			if(flanker_task_response_type==CORRECT_RESPONSE)
			{
				number_of_correct_response++;
			}
		}
		
		if(SHOW_TUTORIAL==true&&task_tutorial_shown==false)
		{

				if(discrimination_task_response_type!=CORRECT_RESPONSE)
				{
					return;
				}
				discrimination_task_image.destroy();
				discrimination_task_ended=true;
				discrimination_task_complete();
				if(isTouchDevice==true)
				{
					green_button.setScale(1);
					animation_active=false;
					
					clearInterval(task_button_blinking_animation);
				}
				task_tutorial_text.setText("");
		}
		
		

		else
		{
			discrimination_task_ended=true;
			clearTimeout(tasks_done);
			discrimination_task_complete();
		}

	}
}

function drop_jump_platform(platform)
{
  platform.body.immovable=false;
}

function start_countdown()
{
	if(game_paused==true)
    {
        
        console.log("paused");
        return;
    }

 	var Initial_Text=STARTING_TEXT;
    for(var i=0;i<countdown_dot_length;i++)
    {
        Initial_Text+=". "
    }
    countdown_dot_length=(countdown_dot_length+1)%countdown_max_dot_length;
    countdown_text.setText(Initial_Text);
    countdown_text.depth=100;
    countdown--;


}
