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
		task_start_dialog_add = true;
		current_number_of_tasks=Math.floor(Math.random()*(max_number_of_tasks));
		if(task_tutorial_shown==false)
		{
			current_number_of_tasks=2;
		}

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
		console.log('in call func');

		if(countdown_handler==null&&task_dialog_done==false)
		{
			addInstructionTasks();
			// countdown_handler=setInterval(start_countdown,INTERVAL);
		}
		
	}


	else 
	{
		clearInterval(countdown_handler);
		countdown_handler=null;
		countdown_dot_length=0;
		start_countdown_done=true;
		resume_countdown_done=false;
		task_start_dialog_add = false;
		countdown=7;
		countdown_text.setText();


	    //Move the score panel upwards till out of site
	    // if(scoreText.y>=-screen_height-scoreText.height/2||coinsCollectedText.y>=-screen_height-coinsCollectedText.height/2||coin_score_icon.y>=-screen_height/2-coin_score_icon.height/2||life.y>=-screen_height/2-life.height/2)
	    // {
	    	// scoreText.y-=GAME_ELEMENTS_SPEED;
	    	// coinsCollectedText.y-=GAME_ELEMENTS_SPEED;
	    	// coin_score_icon.y-=GAME_ELEMENTS_SPEED;
	    	// life.y-=GAME_ELEMENTS_SPEED;
	    	// livesText.y-=GAME_ELEMENTS_SPEED;
	    	// if(isTouchDevice==true)
	    	// {
	    	// jump_button.y+=GAME_ELEMENTS_SPEED;
	    	// }
	    	// double_jump_button.y+=GAME_ELEMENTS_SPEED;
	    	// double_jump_text.y+=GAME_ELEMENTS_SPEED;
	    	// if(double_jump_coin!=null)
	    	// {
	    	// 	double_jump_coin.y+=GAME_ELEMENTS_SPEED;
	    	// }
	    	// if(mystery_egg_icon!=null)
	    	// {
	    	// 	mystery_egg_icon.y-=GAME_ELEMENTS_SPEED;
	    	// }
			// mystery_egg_collected_text.y-=GAME_ELEMENTS_SPEED
			
	    	// pause_button.y-=GAME_ELEMENTS_SPEED;
	    	// resume_button.y-=GAME_ELEMENTS_SPEED;
	    	// music_button_on.y-=GAME_ELEMENTS_SPEED;
	    	// music_button_off.y-=GAME_ELEMENTS_SPEED;
	    // }
	   
	    
	    // if (isTouchDevice==false)
	    // {

    
	      //Add the task buttons
	      if(left_button==null&&isTouchDevice==true)
	      {
	      
	      left_button=curr_game.add.sprite(LEFT_X-distance,TOP_Y, 'left_button').setInteractive();
		  left_button.setScale(1.2);
		  left_button.depth = 12;

	      if(left_button.y-left_button.height<0)
	      {
	      	left_button.y=left_button.height/2+20;
	      }
	      left_button.on('pointerdown',left_pressed);
	      left_button.on('pointerup',function(){this.alpha=1});


	      right_button=curr_game.add.sprite(RIGHT_X+distance,TOP_Y, 'right_button').setInteractive();
		  right_button.setScale(1.2); 
		  right_button.depth = 12;
	      if(right_button.y-right_button.height<0)
	      {
	      	right_button.y=right_button.height/2+20;
	      }
	      right_button.on('pointerdown', right_pressed);
	      right_button.on('pointerup',function(){this.alpha=1});

	      
	      red_button=curr_game.add.sprite(LEFT_X-distance,BOTTOM_Y, 'red_button').setInteractive();
		  red_button.setScale(1.2); 
		  red_button.depth = 12;
		  red_button.on('pointerdown', red_pressed);
	      red_button.on('pointerup',function(){this.alpha=1});

	      green_button=curr_game.add.sprite(RIGHT_X+distance,BOTTOM_Y, 'green_button').setInteractive();
		  green_button.setScale(1.2);
		  green_button.depth = 12; 
		  green_button.on('pointerdown', green_pressed);
	      green_button.on('pointerup',function(){this.alpha=1});

	     }


         
         //Move task buttons to the required posiiton
	    if(isTouchDevice==true)
	     {
			 console.log('bring task buttons');
		    if(left_button.x!=LEFT_X)
		    {
	     		// left_button.x+=BUTTON_SPEED;
	     		// right_button.x-=BUTTON_SPEED;
	     		// red_button.x+=BUTTON_SPEED;
				 // green_button.x-=BUTTON_SPEED;
				left_button.x = LEFT_X;
				right_button.x = RIGHT_X;
				red_button.x = LEFT_X;
				green_button.x = RIGHT_X;
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

	    // }
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
					left_button.setScale(1.2);
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
					right_button.setScale(1.2);
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
			console.log('in ec game', number_of_correct_response);
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
					red_button.setScale(1.2);
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
			console.log('in ec game green pressed', number_of_correct_response);
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
					green_button.setScale(1.2);
					animation_active=false;
					
					clearInterval(task_button_blinking_animation);
				}
				task_tutorial_text.setText("");
				// task_tutorial_text.setBackgroundColor('rgba(255,255,255,0)');
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
	if(game_paused==true || game_closed == true)
    {
        return;
	}
	if (!task_background_added){
		task_background = curr_game.add.sprite(screen_width*0.5, screen_height*0.5, 'black_background').setScale(5.5,2.5);
		task_background.depth = 10;
		task_background_added = true;
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

function addInstructionTasks() {
	if (task_start_dialog_add) {
		task_start_dialog = curr_game.add.tileSprite(screen_width*0.5,screen_height*0.46,screen_width*0.62,screen_height*0.613,"tutorial_box").setTileScale(1.185,1.39);

		task_start_dialog.depth = 12;
		task_start_dialog_text =curr_game.add.text(screen_width*0.25,screen_height*0.35,
				"", { fontSize: '15px', fill: '#FFFFFF',align:'center' });
		task_dialog_heading=curr_game.add.text(screen_width*0.42, screen_height*0.18,
					"Instructions", {strokeThicknes: '2.5px',fontSize:'18px', fill: '#FFFFFF',align:'center'});
		task_dialog_heading.depth = 13;
		if(isTouchDevice==true)
		{
			task_start_dialog_text.setText("1. Press the button in the direction of the\n middle arrow\n\n2. Press the button matching the color of\n the circle");
		}
		else
		{
			task_start_dialog_text.setText("1. Press the Left Key if the middle arrow is\npointing left,otherwise press the Right Key\n\n2.Press the Down Key if the circle is colored\nred, otherwise press the Up Key");
		}
		task_start_dialog_text.depth=13;
		task_start_button=curr_game.add.image(screen_width*0.505,screen_height*0.66,'buy_button').setInteractive();
		task_start_button.depth = 15;
		task_start_button_text = curr_game.add.text(screen_width*0.48,screen_height*0.645,'Start',{ fontSize: '15px', fill: '#000000',align:'center' }).setInteractive();
		task_start_button_text.depth = 16;
		task_start_dialog_add = false;
		task_dialog_done = true;
	}
	task_start_button.on('pointerdown', ()=>{
		onClickStartTask();
	}, curr_game);
	task_start_button_text.on('pointerdown', ()=>{
		onClickStartTask();
	}, curr_game);
}

function onClickStartTask() {
	task_start_button.destroy();
	task_start_dialog.destroy();
	task_start_dialog_text.destroy();
	task_dialog_heading.destroy();
	task_start_button_text.destroy();
	countdown_handler=setInterval(start_countdown,INTERVAL);

}
