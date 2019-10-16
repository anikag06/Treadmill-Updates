function discrimination_task_generator()
{
	//Add Discrimination Task
	if(discrimination_task_image==null)
	{
		discrimination_choice=Math.floor(Math.random()*TOTAL_NUMBER_OF_DISCRIMINATION_TASK);
		discrimination_task_image=curr_game.add.image(DISCRIMINATION_X_CORDINATE,DISCRIMINATION_Y_CORDINATE,'discrimination_'+discrimination_choice).setScale(DISCRIMIANTION_TASK_IMAGE_SCALE);
		discrimination_task_image.depth = 2;
		// if (isTouchDevice){
		// 	discrimination_task_image.setScale(DISCRIMINATION_TASK_IMAGE_SMALL_SCALE);
		// }
		//show tutorials if needed
		if(SHOW_TUTORIAL==true&&task_tutorial_shown==false)
		{
		if(isTouchDevice==true&&discrimination_choice%TYPE_CHANGE_INTERVAL!=0)
		{
				task_button_blinking_animation=setInterval(green_button_blinker,200);
				
				
			}
		else if(isTouchDevice==true&&discrimination_choice%TYPE_CHANGE_INTERVAL==0)
		{
				task_button_blinking_animation=setInterval(red_button_blinker,200);
		}
	}
	}
	else
	{
		//Discrimination Flag task flags
		discrimination_task_started=true;
		discrimination_task_ended=false;
		discrimination_task_init=false;

		//Text for tutorials
		if(SHOW_TUTORIAL==true&&task_tutorial_shown==false)
		{
			if(isTouchDevice==true)
			{
				task_tutorial_text=curr_game.add.text(screen_width*0.24,discrimination_task_image.y-discrimination_task_image.height+15 ,"Press the button matching the circle's \ncolor", { fontSize: '16px', fill: '#EC407A'});
			}
			else
			{
				task_tutorial_text=curr_game.add.text(screen_width*0.23,discrimination_task_image.y-discrimination_task_image.height+15,"Press the Down Key if the circle is \ncolored red, otherwise press Up Key", { fontSize: '18px', fill: '#EC407A'});
			}
			task_tutorial_text.setBackgroundColor('rgba(255,255,255,0.6)')
			task_tutorial_text.setPadding(24,3,24,3);
		}
		
		//Record discrimination task start time
	

		discrimination_task_timestamp=generateTS();
		date=new Date();
		discrimination_task_start_time=date.getTime();

		//if tutorial not shown,wait only the required time for response
		if(SHOW_TUTORIAL==false||task_tutorial_shown==true)
		{
		tasks_done=setTimeout(discrimination_task_complete,TIME_FOR_DISCRIMINATION);
		}
		
	}
}

function discrimination_task_complete()
{
	//Discrimination task flags
	discrimination_task_ended=true;
	discrimination_task_started=false;
	
	if(discrimination_task_end_time!=0)
	{
        discrimination_task_response_time=discrimination_task_end_time-discrimination_task_start_time;
	}
	else
	{
		allowLifeReward=false;
	}

	discrimination_task_image.destroy();
	discrimination_task_image=null;
	flankerTaskECGame = true;
	
	storeTaskDataEvent = document.createEvent('CustomEvent');
	storeTaskDataEvent.initCustomEvent('CallAngularStoreDataFun');

	window.dispatchEvent(storeTaskDataEvent);
	
	//Next set
	if(current_number_of_tasks>=1)
	{
		continue_to_next_set_timeout = setTimeout(continue_to_next_set,1000);
		
	}

	//Countdown (delay generator)
	else if(current_number_of_tasks==0&&countdown!=0&&resume_countdown_done==false)
	{
		
		if(countdown_handler==null)
		{
			if(task_tutorial_shown==false&&SHOW_TUTORIAL==true){
				countdown_handler=setInterval(resume_countdown,INTERVAL*3);
			}else{
				countdown_handler=setInterval(resume_countdown,INTERVAL);
			}
		}
		
		task_completed=true;
		restore_game=true;
		
		if(game_paused==true)
	    {
	        
	        return;
	    }
	}


}
getECGameTaskData = function (){
	return [
		game_object,
		flanker_task_timestamp,
		flanker_task_response_type,
		flanker_task_response_time,
		flanker_task_congruency,
		task_image_type,
		discrimination_task_timestamp,
		discrimination_task_response_type,
		discrimination_task_response_time,
	]
}

function resume_countdown()
{	
	if(game_paused==true)
    {
        return;
    }
	
	var Initial_Text=RESUMING_TEXT;
    for(var i=0;i<countdown_dot_length;i++)
    {
        Initial_Text+=". "
    }
    countdown_dot_length=(countdown_dot_length+1)%countdown_max_dot_length;
	countdown_text.setText(Initial_Text);

	if(task_tutorial_shown==false&&SHOW_TUTORIAL==true){
		
		tutorial_box = curr_game.add.tileSprite(screen_width*0.5,screen_height*0.4,screen_width*0.5,screen_height*0.5,"tutorial_box");
		tutorial_box.alpha = 0.6;
		tutorial_box.depth = 4;
		if(isTouchDevice){
			task_tutorial_text=curr_game.add.text(tutorial_box.x-(tutorial_box.width/2)+10,tutorial_box.y-(tutorial_box.height/2)+10,"Attention!!From Next time,\ntasks will appear only for\nsome time. Peform good in\nthe tasks and get rewarded", { fontSize: '13px', fill: '#EC407A'});

		}else{
			task_tutorial_text=curr_game.add.text(tutorial_box.x-(tutorial_box.width/2)+10,tutorial_box.y-(tutorial_box.height/2)+10,"Attention!!From Next time,\ntasks will appear only for\nsome time. Peform good in\nthe tasks and get rewarded", { fontSize: '18px', fill: '#EC407A'});
		}
		task_tutorial_shown=true;
		task_tutorial_text.depth = 6;
		countdown_text.setScale(0.5);
		countdown_text.y = task_tutorial_text.x - 20;
	}
    countdown_text.depth=100;
    countdown--;
}

//Reinitialize everything for next set
function continue_to_next_set()
{

	flanker_task_response_time=0;
	flanker_task_init=true;
	flanker_task_response_type=NO_REPSONSE;
	flanker_task_start_time=0;
	flanker_task_end_time=0;
	
	discrimination_task_response_type=NO_REPSONSE;
	discrimination_task_response_time=0;
	discrimination_task_start_time=0;
	discrimination_task_end_time=0;
	
	task_image_type=-1;
	current_number_of_tasks--;	
}

//Tutorial animation
function red_button_blinker()
{
  
  red_button.alpha=touch_alpha[alpha_choice%2];
  red_button.setScale(touch_size[alpha_choice%2]);
  alpha_choice++;
  animation_active=true;
}

//Tutorial animation
function green_button_blinker()
{
  
  green_button.alpha=touch_alpha[alpha_choice%2];
  green_button.setScale(touch_size[alpha_choice%2]);
  alpha_choice++;
  animation_active=true;
}