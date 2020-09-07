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
    // 0.svg and 3.svg are the images where the middle points to the right
		if(flanker_choice==0 || flanker_choice==3)
		{

			flanker_task_response_type=CORRECT_RESPONSE;
		}
		else
		{

			flanker_task_response_type=INCORRECT_RESPONSE;
			allowLifeReward=false;
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
				left_key_button.destroy();
				right_key_button.destroy();

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
    	// 1.svg and 2.svg are the images where the middle points to the right
		if(flanker_choice==1 || flanker_choice==2)
		{
      flanker_task_response_type=CORRECT_RESPONSE;
		}
		else
		{
      flanker_task_response_type=INCORRECT_RESPONSE;
      allowLifeReward=false;
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
				left_key_button.destroy();
				right_key_button.destroy();
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
				red_key_button.destroy();
				green_key_button.destroy();
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
				red_key_button.destroy();
				green_key_button.destroy();
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
		task_start_dialog = curr_game.add.tileSprite(screen_width*0.5,screen_height*0.46,screen_width*0.85,screen_height*0.835,"tutorial_box").setTileScale(1.63,1.9);

		task_start_dialog.depth = 12;
		task_tutorial_text_style = {fontFamily: 'Roboto' , fontSize: '16px', fill: '#FFFFFF',align:'center', wordWrap: { width: screen_width*0.82} };
		task1_text = curr_game.add.text(screen_width*0.10,screen_height*0.25,"For task 1:",
				task_tutorial_text_style);
		task2_text=curr_game.add.text(task1_text.x,screen_height*0.51,"For task 2:",
				task_tutorial_text_style);
		task1_text.setFont({fontFamily: 'Roboto' , fontSize: '16px',fontStyle: 'bold'});
		task2_text.setFont({fontFamily: 'Roboto' , fontSize: '16px',fontStyle: 'bold'});
		task1_text.depth=13;
		task2_text.depth=13;

		task_start_dialog_text1 =curr_game.add.text(screen_width*0.195,screen_height*0.25,
				"", task_tutorial_text_style);
		task_start_dialog_text2 =curr_game.add.text(task_start_dialog_text1.x,screen_height*0.36,
			"", task_tutorial_text_style);
		task_start_dialog_text3 =curr_game.add.text(task_start_dialog_text1.x,screen_height*0.51,
			"", task_tutorial_text_style);
		task_start_dialog_text4 =curr_game.add.text(task_start_dialog_text1.x,screen_height*0.635,
			"", task_tutorial_text_style);


		task_dialog_heading=curr_game.add.text(screen_width*0.42, screen_height*0.10,
					"Instructions", {strokeThicknes: '2.5px',fontFamily: 'Roboto', fontSize:'21px', fill: '#FFFFFF',align:'center'});
		task_dialog_heading.depth = 13;
		task_start_dialog_text1.setText("Press           if the middle arrow is pointing left");
		task_start_dialog_text2.setText("Press           if the middle arrow is pointing right");
		task_start_dialog_text3.setText("Press           if the central circle is");		//red circle
		task_start_dialog_text4.setText("Press           if the central circle is");		//green circle
		if(isTouchDevice==true)
		{
			left_key_button= curr_game.add.image(screen_width*0.27,screen_height*0.275,'left_button').setScale(0.45);
			right_key_button=curr_game.add.image(left_key_button.x,screen_height*0.39,'right_button').setScale(0.45);
			red_key_button=curr_game.add.image(left_key_button.x,screen_height*0.535,'red_button').setScale(0.45);
			green_key_button=curr_game.add.image(left_key_button.x,screen_height*0.66,'green_button').setScale(0.45);
		}
		else
		{
			left_key_button= curr_game.add.image(screen_width*0.27, screen_height*0.275,'left_key').setScale(0.6);
			right_key_button=curr_game.add.image(left_key_button.x, screen_height*0.39,'right_key').setScale(0.6);
			red_key_button=curr_game.add.image(left_key_button.x,screen_height*0.535,'down_key').setScale(0.6);
			green_key_button=curr_game.add.image(left_key_button.x,screen_height*0.66,'up_key').setScale(0.6);
		}
		left_key_button.depth =13;
		right_key_button.depth=13;
		red_key_button.depth=13;
		green_key_button.depth=13;

		flanker_tutorial_right = curr_game.add.image(screen_width*0.745, right_key_button.y+5, 'right_flanker_tutorial').setScale(0.5);
		flanker_tutorial_left = curr_game.add.image(flanker_tutorial_right.x, left_key_button.y, 'left_flanker_tutorial').setScale(0.5);
		discrimination_tutorial_red=curr_game.add.image(screen_width*0.535, red_key_button.y-2.8,'discrimination_0').setScale(0.35);
		discrimination_tutorial_green=curr_game.add.image(discrimination_tutorial_red.x, green_key_button.y+3.5,'discrimination_1').setScale(0.35);

		flanker_tutorial_right.depth =13;
		flanker_tutorial_left.depth =13;
		discrimination_tutorial_red.depth=13;
		discrimination_tutorial_green.depth=13;

		task_start_dialog_text1.depth=13;
		task_start_dialog_text2.depth=13;
		task_start_dialog_text3.depth=13;
		task_start_dialog_text4.depth=13;

		task_start_button=curr_game.add.image(screen_width*0.505,screen_height*0.805,'buy_button').setInteractive();
		task_start_button.depth = 15;
		task_start_button_text = curr_game.add.text(screen_width*0.485,screen_height*0.785,'Start',{fontFamily: 'Roboto', fontSize: '15px', fill: '#000000',align:'center' }).setInteractive();
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
	task_start_dialog_text1.destroy();
	task_start_dialog_text2.destroy();
	task_start_dialog_text3.destroy();
	task_start_dialog_text4.destroy();
	task1_text.destroy();
	task2_text.destroy();

	left_key_button.destroy();
	right_key_button.destroy();
	red_key_button.destroy();
	green_key_button.destroy();

	flanker_tutorial_left.destroy();
	flanker_tutorial_right.destroy();
	discrimination_tutorial_red.destroy();
	discrimination_tutorial_green.destroy();

	task_dialog_heading.destroy();
	task_start_button_text.destroy();
	countdown_handler=setInterval(start_countdown,INTERVAL);

}
