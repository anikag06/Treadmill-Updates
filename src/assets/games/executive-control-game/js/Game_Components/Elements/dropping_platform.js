
function dropping_platform_placer() {

  if(stop_dropping_platform_generation==true)
  {
    free_to_choose_high=true;
    free_to_start_choose=true;
    second_choice_high=-1;
    return;
  }



  
  //Add dropping platform if the flags allow it
  if (dropping_platform_first == true && stop_dropping_platform_generation == false && start_tasks==false) 
  {
    
    //Set up dropping platform
    var length =Math.floor(Math.random() * DROPPING_PLATFORM_SIZE_RANGE)+DROPPING_PLATFORM_MINIMUM_SIZE;
    length = (length<MAX_PIT_LENGTH)?length:MAX_PIT_LENGTH;
    drop_point=MINIMUM_DROP_POINT-Math.random(Math.random()*DROP_POINT_RANGE);
    dropping_platform=curr_game.add.tileSprite(screen_width+length/2,DROP_PLATFORM_Y_CORDINATE,length+12,DROP_PLATFORM_HEIGHT,"brick");
    
    //Add new brick platform
    brick1=curr_game.add.tileSprite(NEW_BRICK_X_COORDINATE+length,BRICK_Y_CORDINATE,screen_width+PIT_SPEED,BRICK_HEIGHT,"brick");
    platforms.add(brick1);
    curr_game.physics.add.collider(brick1,player);
    brick1.body.allowGravity=false;
    brick1.body.immovable=true;

    //Dropping Platform flags
    dropping_platform_first =false;
   
    //Game Elements generator
    free_to_choose_high=false;
    free_to_start_choose=true;
    clear_to_start++;

    console.log("dropping_platform");
  }



  //Move the dropping platform till out of screen 
  if (dropping_platform_first == false && brick1.x >=screen_width/2+DROPPING_PLATFORM_SPEED) {

    
      dropping_platform.x-=DROPPING_PLATFORM_SPEED; 
      brick.x-=BRICK_SPEED;
      brick1.x-=BRICK_SPEED;
      brick_speed=0;
      if(dropping_platform.x<=drop_point)
      {
          dropping_platform.y+=DROP_PLATFORM_DOWN_SPEED;
      }
      
  } 

  else if(dropping_platform_first==false)
  {
    //Change the brick1 to brick        
    brick=brick1;
    brick_speed=BRICK_SPEED;

    //Restore game elements generator
    free_to_choose_high=true;
    free_to_start_choose=true;

    dropping_platform_first=true;
    second_choice_high=-1;   
    clear_to_start--;      
  }
} 




    


