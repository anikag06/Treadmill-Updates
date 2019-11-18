function flanker_task_generator()
{
  // Wait till all elements are cleared
	if(clear_to_start>0)
	{
		return;
	}
	
	//Add the flanker task
	if(flanker_task_image==null)
	{
		//EVEN NUMBER-congruent; ODD NUMBER-incongruent
		flanker_choice=Math.floor(Math.random()*TOTAL_NUMBER_OF_FLANKER_TASK);
		flanker_task_congruency=(flanker_choice%2==0)?1:-1;
		flanker_task_image=curr_game.add.image(FLANKER_X_CORDINATE,-FLANKER_Y_CORDINATE,'flanker_'+flanker_choice).setScale(FLANKER_TASK_IMAGE_SCALE);
		flanker_task_image.depth = 12;
		// if(isTouchDevice==true){
		// 	flanker_task_image.setScale(FLANKER_TASK_IMAGE_SMALL_SCALE);
		// }
		if(flanker_choice%TYPE_CHANGE_INTERVAL!=0&&task_tutorial_shown==false&&SHOW_TUTORIAL==true)
		{
			if(isTouchDevice==true)
			{
				task_button_blinking_animation=setInterval(right_button_blinker,200);
				// flanker_task_image.setScale(FLANKER_TASK_IMAGE_SMALL_SCALE);
			}
			else
			{
				//task_tutorial_text=curr_game.add.text(screen_width*0.2,screen_height*0.2,"Press the key \"D\" if the middle arrow is pointing left,otherwise press key \"K\"", { fontFamily: 'Roboto', fontSize: '20px', fill: '#000'});

			}
		}
		else if(flanker_choice%TYPE_CHANGE_INTERVAL==0&&task_tutorial_shown==false&&SHOW_TUTORIAL==true&&isTouchDevice==true)
		{
			if(isTouchDevice==true)
			{
				task_button_blinking_animation=setInterval(left_button_blinker,200);
				//task_tutorial_text=curr_game.add.text(screen_width*0.2,screen_height*0.2,"Press the button in the direction of the middle arrow", { fontFamily: 'Roboto', fontSize: '20px', fill: '#000'});
			}
			else
			{
				//task_tutorial_text=curr_game.add.text(screen_width*0.2,screen_height*0.2,"Press the key \"D\" if the middle arrow is pointing left,otherwise press key \"K\"", { fontFamily: 'Roboto', fontSize: '20px', fill: '#000'});
			}
		}
	}

	//Move the image to the screen
	else if(flanker_task_image.y<=FLANKER_Y_CORDINATE)
	{
		flanker_task_image.y+=FLANKER_TASK_IMAGE_SPEED;
	}
	else
	{
		//Flanker task flags
		flanker_task_started=true;
		flanker_task_ended=false;
		flanker_task_init=false;
		if(SHOW_TUTORIAL==true&&task_tutorial_shown==false)
		{
			if(isTouchDevice==true)
			{
				task_tutorial_text=curr_game.add.text(screen_width*0.26,flanker_task_image.y-flanker_task_image.height-22,
					"Press the Left button if the middle arrow is pointing left, press Right button if pointing right", 
					{ fontFamily: 'Roboto', fontSize: '18px', fill: '#FFFFFF',wordWrap:{width: flanker_task_image.width+50}});
			}
			else
			{
				task_tutorial_text=curr_game.add.text(screen_width*0.28,flanker_task_image.y-flanker_task_image.height-45,
					"Press          if the middle arrow is pointing left,\n\npress          if pointing right", 
					{ fontFamily: 'Roboto', fontSize: '16px', fill: '#FFFFFF', });
					left_key_button= curr_game.add.image(task_tutorial_text.x+59,task_tutorial_text.y+8,'left_key').setScale(0.6);
					right_key_button=curr_game.add.image(left_key_button.x,left_key_button.y+40,'right_key').setScale(0.6);
					left_key_button.depth=14;
					right_key_button.depth=14;
			}
			task_tutorial_text.depth=14;
		}
		
		//Record flanker task start time
		flanker_task_timestamp=generateTS();
		date=new Date();
		flanker_task_start_time=date.getTime();
		
		if(SHOW_TUTORIAL==false||task_tutorial_shown==true)
		{
			flanker_task_done = setTimeout(flanker_task_complete,TIME_FOR_FLANKER);
		}	
		else
		{
		}
		
	}
}

function flanker_task_complete()
{

  


	//Flanker task flags

	flanker_task_ended=true;
	flanker_task_started=false;
	clearInterval(task_button_blinking_animation);
    
	
    //If any response record the time
	if(flanker_task_end_time!=0)
	{
        flanker_task_response_time=flanker_task_end_time-flanker_task_start_time;
        
	}	
	
	//Destory image flanker image
	else
	{
	flanker_task_image.destroy();
	allowLifeReward=false;
	}
	flanker_task_image=null;

	//Choose the image-even number-neutral;odd-number-negtive image(add more images accordingly)
	image_choice=showImage(flanker_choice);
	if(image_choice%TYPE_CHANGE_INTERVAL==0)
	{
		task_image_type=NEGATIVE_IMAGE;
	}
	else
	{
		task_image_type=NEUTRAL_IMAGE;
	}
	//Add the images
	task_image=curr_game.add.image(IMAGE_X_CORDINATE,IMAGE_Y_CORDINATE,'image_'+image_choice);
	task_image.depth=12;
	if(isTouchDevice){
		task_image.setScale(0.6);
	}
  image_task_done = setTimeout(image_task_completed,TIME_FOR_IMAGE);
}

function image_task_completed()
{
	//Destory the images
	task_image.destroy();
	//blank screen 
	discrimination_task_initial_timeout = setTimeout(discrimination_task_initial,TIME_FOR_BLANK_SCREEN);
}

function discrimination_task_initial()
{
	
	//Start the discrimation task
	discrimination_task_init=true;

}


//Tutorial animation
function left_button_blinker()
{
  
  left_button.alpha=touch_alpha[alpha_choice%2];
  left_button.setScale(touch_size_task[alpha_choice%2]);
  alpha_choice++;
  animation_active=true;
}

//Tutorial animation
function right_button_blinker()
{
  
  right_button.alpha=touch_alpha[alpha_choice%2];
  right_button.setScale(touch_size_task[alpha_choice%2]);
  alpha_choice++;
  animation_active=true;
}

// function that returns a value depending on whether a congruent or incongruent flanker task was shown
// INCONGRUENT TASK - 80% negative image, 20% neutral image
// CONGRUENT TASK - 80% neutral image, 20% negative image
function showImage(flanker_choice){
	var r = Math.random();
	if(flanker_choice%2==0){
		// congruent task
		if(r<0.8){
			return 2*(Math.floor(Math.random()*(TOTAL_NUMBER_OF_IMAGES/2)));
		}else{
			return 2*(Math.floor(Math.random()*(TOTAL_NUMBER_OF_IMAGES/2)))+1;
		}
	}else{
		// incongruent task
		if(r<0.8){
			return 2*(Math.floor(Math.random()*(TOTAL_NUMBER_OF_IMAGES/2)))+1;
		}else{
			return 2*(Math.floor(Math.random()*(TOTAL_NUMBER_OF_IMAGES/2)));
		}
	}
}