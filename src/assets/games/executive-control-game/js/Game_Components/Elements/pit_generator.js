
function pit_placer() {


  if(stop_pit_generation==true)
  {
    free_to_choose_high=true;
    free_to_start_choose=true;
    second_choice_high=-1;
    return;
  }

   //Generate new pit if flags allow it
  if (pit == false && stop_pit_generation == false && start_tasks==false)
  {

    pit=true;

    //Add new brick platform with gap
    var length =Math.floor(Math.random() * PIT_SIZE_RANGE)+PIT_MINIMUM_SIZE;
    length = (length<MAX_PIT_LENGTH)?length:MAX_PIT_LENGTH;
    brick1=curr_game.add.tileSprite(NEW_BRICK_X_COORDINATE+length,BRICK_Y_CORDINATE,screen_width+PIT_SPEED,BRICK_HEIGHT,"brick");
    platforms.add(brick1);
    brick1.body.allowGravity=false;
    brick1.body.immovable=true;
    curr_game.physics.add.collider(brick1,player);

    //Game Elements Generator
    free_to_choose_high=false;
    free_to_start_choose=true;
    clear_to_start++;

  }


  //Move the pit till out of screen
  if (pit == true && brick1.x >=screen_width/2+PIT_SPEED/2)
  {

    brick.x-=BRICK_SPEED;
    brick1.x-=BRICK_SPEED;
    brick_speed=0;

  }
  else if(pit == true)
  {
    //Change the brick1 to brick
    brick=brick1;
    brick_speed=BRICK_SPEED;

    //Restore game elements generator
    free_to_choose_high=true;
    free_to_start_choose=true;
    second_choice_high=-1;
    clear_to_start--;

    pit=false;
  }
}

