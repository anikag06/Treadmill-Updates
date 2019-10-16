function obstacle_placer() {

      if(stop_obstacle_generation==true)
      {
        free_to_choose_high=true;
        free_to_start_choose=true;
        second_choice_high=-1;
        return;
      }
        
    //Generate Obstacle if it is allowed
    if (obstacle == null && stop_obstacle_generation == false&&start_tasks==false) {

        //choose obstacle type
        obstacle_type.curr_choice=Math.floor(Math.random()*obstacle_type.max_choice);

        //choose obstacles(not random) for tutorials
        if(SHOW_TUTORIAL==true)
        {
            if(obstacle_tutorial_shown==false)
            {
                obstacle_type.curr_choice=0;
            }
            else if(double_jump_for_obstacle1_tutorial_shown==false)
            {
                obstacle_type.curr_choice=1;
            }
            else if(double_jump_for_obstacle2_tutorial_shown==false)
            {
                obstacle_type.curr_choice=2;
            }
        }
        

        //Add obstacles as per the choice
        /*1.two obstacle(double jump must)
          2.jumping obstacle(double jump must)
          0.Simple obstacle*/
        if(obstacle_type.curr_choice==1)
        {
            // top_obstacle = obstacle_group.create(screen_width + OBSTACLE_X_CORDINATE,OBSTACLE_Y_CORDINATE-jump_height/4,'obstacle');
            // top_obstacle.body.allowGravity = false;
            // top_obstacle.depth=2;
            // top_obstacle.angle=180;
            // curr_game.physics.add.overlap(top_obstacle, player, function(obj1,obj2){hit_obstacle(obj1);}, null, curr_game);

            obstacle = obstacle_group.create(screen_width + OBSTACLE_X_CORDINATE,OBSTACLE_Y_CORDINATE-8, 'big_obstacle').setScale(0.8);
            obstacle.body.allowGravity = false;
            obstacle.depth=2;
            curr_game.physics.add.overlap(obstacle, player,function(obj1,obj2){hit_obstacle(obj1);}, null, curr_game);

        }
        else if(obstacle_type.curr_choice==2)
        {
            obstacle = obstacle_group.create(screen_width + OBSTACLE_X_CORDINATE,OBSTACLE_Y_CORDINATE, 'flying_obstacle').setScale(0.8);
            obstacle.body.allowGravity = false;
            obstacle.depth=2;
            curr_game.physics.add.overlap(obstacle, player,function(obj1,obj2){hit_obstacle(obj1);}, null, curr_game);

        }
        else
        {
            obstacle = obstacle_group.create(screen_width + OBSTACLE_X_CORDINATE,OBSTACLE_Y_CORDINATE, 'obstacle').setScale(0.65);
            obstacle.body.allowGravity = false;
            obstacle.depth=2;
            curr_game.physics.add.overlap(obstacle, player,function(obj1,obj2){hit_obstacle(obj1);}, null, curr_game);
         
        }
        //Game elements generator
        free_to_choose_high=false;
        choice_lock_counter=0;
        obstacleGenerating=true;
        clear_to_start++;



    }  

    //Move the obstacle till out of screen
    if (obstacle != null && obstacle.x >=-obstacle.width/2) 
    {
         
        
        if(obstacle_type.curr_choice==0)
        {
            obstacle.x-=OBSTACLE_SPEED;
            //Add tutorial if needed
            if(obstacle.x-player.x<=JUMP_RANGE*0.5&&obstacle_tutorial_shown==false&&SHOW_TUTORIAL==true)
            {

                if(isTouchDevice==false)
                {
                    tutorial_box = curr_game.add.tileSprite(screen_width*0.5,screen_height*0.38,screen_width*0.42,screen_height*0.5,"tutorial_box").setTileScale(0.8,1.145);
                    tutorial_box.depth = 4;
                    tutorial_text.setText("Press                   to\n\n  avoid obstacle");
                    control_button_1=curr_game.add.image(screen_width*0.505,screen_height*0.36,'spacebar_button');
                    tutorial_text.depth = 5;
                    control_button_1.depth = 5;
                }
                else
                {
                     touch_button_animation=setInterval(jump_tutorial_animation,200);
                }
                game_paused=true;
            }
            //Do this for the case when player dies and new player is added
            curr_game.physics.add.overlap(obstacle, player,function(obj1,obj2){hit_obstacle(obj1);}, null, curr_game);
        }


        else if(obstacle_type.curr_choice==1)
        {
            obstacle.x-=OBSTACLE_SPEED;
            // top_obstacle.x-=OBSTACLE_SPEED;
            if(obstacle.x-player.x<=JUMP_RANGE*0.7&&double_jump_for_obstacle1_tutorial_shown==false&&SHOW_TUTORIAL==true)
            {

                if(isTouchDevice==false)
                {
                    tutorial_box = curr_game.add.tileSprite(screen_width*0.5,screen_height*0.38,screen_width*0.42,screen_height*0.5,"tutorial_box").setTileScale(0.8,1.145);
                    tutorial_box.depth = 4;
                    tutorial_text.setText("Press          +           \n\nto avoid the obstacles");
                    // tutorial_text.x-=150;
                    control_button_1=curr_game.add.image(screen_width*0.46,screen_height*0.36,'shift_button');
                    control_button_2=curr_game.add.image(screen_width*0.60,screen_height*0.36,'spacebar_button');
                    tutorial_text.depth = 5;
                    control_button_1.depth = 5;
                    control_button_2.depth = 5;
                }
                else
                {
                    touch_button_animation=setInterval(double_jump_tutorial_animation,200);
                }
                game_paused=true;
            }
            //Do this for the case when player dies and new player is added
            curr_game.physics.add.overlap(obstacle, player,function(obj1,obj2){hit_obstacle(obj1);}, null, curr_game);
            //Do this for the case when player dies and new player is added
            // curr_game.physics.add.overlap(top_obstacle, player,function(obj1,obj2){hit_obstacle(obj1);}, null, curr_game);

        }
        else if(obstacle_type.curr_choice==2)
        {
            obstacle.x-=OBSTACLE_SPEED;
            obstacle.y-=OBSTACLE_Y_SPEED;
            if(obstacle.x-player.x<=JUMP_RANGE*0.76&&double_jump_for_obstacle2_tutorial_shown==false&&SHOW_TUTORIAL==true)
            {

                if(isTouchDevice==false)
                {
                    tutorial_box = curr_game.add.tileSprite(screen_width*0.5,screen_height*0.4,screen_width*0.42,screen_height*0.5,"tutorial_box").setTileScale(0.8,1.145);
                    tutorial_box.depth = 4;
                    tutorial_text.setText("Press          +          \n\nto avoid the obstacles");
                    control_button_1=curr_game.add.image(screen_width*0.46,screen_height*0.36,'shift_button')
                    control_button_2=curr_game.add.image(screen_width*0.60,screen_height*0.36,'spacebar_button')
                    tutorial_text.depth = 5;
                    control_button_1.depth = 5;
                    control_button_2.depth = 5;
                }
                else
                {
                    touch_button_animation=setInterval(double_jump_tutorial_animation,200);
                }
            
                game_paused=true;
            }
            if(obstacle.y<jump_height*1.2&&obstacle_movement==TOP)
            {
                OBSTACLE_Y_SPEED*=-1;
                obstacle_movement=BOTTOM;
            }
            if(obstacle.y>brick.y-brick.height/2&&obstacle_movement==BOTTOM)
            {
                OBSTACLE_Y_SPEED*=-1;
                obstacle_movement=TOP;
            }
            //Do this for the case when player dies and new player is added
            curr_game.physics.add.overlap(obstacle, player,function(obj1,obj2){hit_obstacle(obj1);}, null, curr_game);
        }
        
    }

    else if(obstacle !=null)
    {
       
        obstacle = null;
        // top_obstacle=null;
        obstacleGenerating=false;
    
        //Restore game elements generator
        free_to_choose_high=true;
        free_to_start_choose=true;
        second_choice_high=-1;
        clear_to_start--;

       
        
    }
}


function hit_obstacle(obs) {
    
    obs.disableBody(true, true);
    curr_game.sound.add('hit_obstacle_sound').play();

    if(player_counter==0)
    {   
        player_blinking_animation=setInterval(blinking_animation,PLAYER_ANIMATION_TIMING);
        stop_player_animation=false;
    }
    else
    {
        player_counter=0;
    }

    //Adjust the position of the lives left;
    if(number_of_lives>0)number_of_lives--;
    livesText.setText(number_of_lives);
}

function shoot_obstacle(obstacle,bomb)
{
    obstacle.disableBody(true,true);
    curr_game.sound.add('shoot_obstacle_sound').play();

    obstacle_tutorial_shown=true;
    double_jump_for_obstacle1_tutorial_shown=true;
    double_jump_for_obstacle2_tutorial_shown=true;

    bomb.destroy();
}

