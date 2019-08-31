function jump_action(height,speed){

    //If Already Jumping,Return     
    //Set Jumping Flag
   
    if(jumpingInit == true)
    {
       jumpingInit=false;
       isJumping=true;
       jumpingUp=true;
    }

    if(player.y>=height)
    {
        player.setVelocityY(speed);
        //console.log("Jumping Up")
    }
    else
    {
       jumpingUp=false;
        //console.log("Start to jump down")
    }
    
    if(jumpingUp == false)
    {
      if(player.body.allowGravity==false)
      {
        player.setVelocityY(0);
      }
      else
      {
      player.setVelocityY(300);
      }
      if(player.body.touching.down)
      {
        isJumping=false;
        //console.log(brick.tilePositionX);
        
        //date=new Date();
        //console.log(date.getTime());
      }
      
    }
}