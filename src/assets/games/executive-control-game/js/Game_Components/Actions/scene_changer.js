function scene_changer()
{
 
	//Add scene change platform and corresponding bricks to the scene
	if(scene_change_platform==null&&startTunnelMovement==false&&stopTunnelMovement==false){
		scene_change_platform =curr_game.add.tileSprite(screen_width+300,brick.y+20,500,brick.height,"brick");  // this platform carries the avatar down
		platforms.add(scene_change_platform);
		scene_change_platform.body.allowGravity=false;
		scene_change_platform.body.immovable=true;
		curr_game.physics.add.collider(scene_change_platform,player,function(){
			
			if(tunnelDownwardMovement==false&&startTunnelMovementDelay==false){
				tunnelDownwardMovement=true;

			}
		});
	  

		river1=curr_game.add.tileSprite(screen_width*0.5,0,screen_width,brick.y-brick.height/2-(river.y+river.height/2),'river_filler');
		river1.y=river.y+river.height/2+river1.height-5;
		river1.height+=10;

	 
		brick1=curr_game.add.tileSprite(screen_width+screen_width*0.6+600,brick.y,screen_width*1.2,brick.height,"brick"); // this is the brick for the continuity after the platform that moves
		scene_change_platform.depth=6;

		brick2=curr_game.add.tileSprite(scene_change_platform.x,screen_height*2.5,scene_change_platform.x-scene_change_platform.width/2,brick.height,'brick');
		brick3=curr_game.add.tileSprite(brick.x,screen_height*2.5,scene_change_platform.x+scene_change_platform.width/2,brick.height,'brick');

		platforms.add(brick3);
		brick3.body.allowGravity=false;
		brick3.body.immovable=true;
		curr_game.physics.add.collider(brick3,player);

		if(isTouchDevice){
			jump_button.depth=scene_change_platform.depth+1;
		}
		double_jump_button.depth=scene_change_platform.depth+1;
		double_jump_text.depth=double_jump_button.depth+1;
		

		scoreText.depth =scene_change_platform.depth+1;
		coinsCollectedText.depth=brick3.depth+1;
		mystery_egg_collected_text.depth=brick3.depth+1;
		life.depth=brick3.depth+1;
		livesText.depth=brick3.depth+1;
		coin_score_icon.depth=brick3.depth+1;
		if(double_jump_coin!=null)double_jump_coin.depth=double_jump_button.depth+1;
		player.depth=river1.depth+1;
	}

   //Move the scene horizontally till the avatar hits the scene change platform
	else if(tunnelDownwardMovement==false){
		scene_change_platform.x-=BRICK_SPEED;
		brick.x-=BRICK_SPEED;
		river.tilePositionX+=RIVER_SPEED;
		cityline_title.tilePositionX+=CITYLINE_SPEED;
		river_filler.x-=BRICK_SPEED;
		brick1.x-=BRICK_SPEED;
		horizontalMovement=true;
	}

	//Move the scene downwards till the scene change platform reaches the end
	else if(brick2.y>scene_change_platform.y&&tunnelUpwardMovement==false){
		
		brick2.width=scene_change_platform.x-scene_change_platform.width/2;
		brick2.x=brick2.width/2;

		brick3.width=screen_width*1.2;
		brick3.x=scene_change_platform.x+scene_change_platform.width/2+screen_width*0.6;

		// PART TO CHANGE UNDERGROUND - START
		brick.y=brick.y-brick.height/2+screen_height*0.5;
		brick.height=screen_height;
		
		brick1.y=brick.y-brick.height/2+screen_height*0.5;
		brick1.height=screen_height;
		// PART TO CHANGE UNDERGROUND - END

		cityline_title.y-=LEVEL_SPEED;
		river.y-=LEVEL_SPEED;
		river_filler.y-=LEVEL_SPEED;
		brick.y-=LEVEL_SPEED;
		brick1.y-=LEVEL_SPEED;
		blue_filler.y-=LEVEL_SPEED;
		tunnel_entry.y-=LEVEL_SPEED;
	 
		brick2.y-=LEVEL_SPEED;
		brick3.y-=LEVEL_SPEED;
		river1.y-=LEVEL_SPEED;

		if(brick2.y-LEVEL_SPEED<scene_change_platform.y){
			brick2.y=scene_change_platform.y;
			brick3.y=scene_change_platform.y;
		}
		horizontalMovement=false;
	}

	//Add a delay of 500s before starting the tunnel scene
	else if(startTunnelMovementDelay==false){
		tunnelDownardMovement=false;
		startTunnelMovementDelay=true;
		setTimeout(moveSidewards,500);
	}

	//Move the bricks till the cut out parts are out of the screen
	else if(startTunnelMovement==true&&brick1.x>screen_width*0.5){
		brick.x-=BRICK_SPEED;
		brick1.x-=BRICK_SPEED;
		brick2.x-=BRICK_SPEED;
		brick3.x-=BRICK_SPEED;
	
		scene_change_platform.x-=BRICK_SPEED;
		horizontalMovement=true;
	}

	//Tile the bricks and add coins and delayed call to stoptunnel(to stop tunnel movement)
	else if(startTunnelMovement==true){
		brick1.tilePositionX+=BRICK_SPEED;
		brick3.tilePositionX+=BRICK_SPEED;
		if(coinGeneratingInit==true||coinGenerating==false){
			add_new_coin=true;
		}
		coins_placer();

		if(stopTunnelMovementDelay==false){
			setTimeout(stopTunnel,10000);
			stopTunnelMovementDelay=true;
		}
	}

	//Wait for the the coin generation to be over
	else if(stopTunnelMovement==true&&coinGenerating==true){
		brick1.tilePositionX+=BRICK_SPEED;
		brick3.tilePositionX+=BRICK_SPEED;
		coins_placer();
	}

	//Add required platforms
	else if(stopTunnelMovement==true&&scene_change_platform1==null){
		scene_change_platform1=curr_game.add.tileSprite(brick1.x+brick1.width/2+200,brick3.y,500,brick3.height,"brick"); // this is the brick that carries the user up
		platforms.add(scene_change_platform1);
		scene_change_platform1.body.allowGravity=false;
		scene_change_platform1.body.immovable=true;
	
		curr_game.physics.add.collider(scene_change_platform1,player,function(){
			
			if(flyingDown==false&&tunnelUpwardMovement==false)
			{
				flyingDown=true;
			}
		});

	   brick=curr_game.add.tileSprite(scene_change_platform1.x+scene_change_platform1.width/2+screen_width/2,brick1.y,screen_width,brick1.height,"brick");
	   brick2=curr_game.add.tileSprite(brick.x+screen_width*0.05,brick3.y,0,brick3.height,"brick");

	   platforms.add(brick);
	   brick.body.allowGravity=false;
	   brick.body.immovable=true;
	   curr_game.physics.add.collider(brick,player);

	   var new_cityline_title=curr_game.add.tileSprite(cityline_title.x,cityline_title.y,cityline_title.width,cityline_title.height, background_images_array[scene_counter]);
	   new_cityline_title.depth=cityline_title.depth;
	  
	   var new_blue_filler=curr_game.add.tileSprite(blue_filler.x,blue_filler.y,blue_filler.width,blue_filler.height, background_sky_array[scene_counter]);
	   new_blue_filler.depth=cityline_title.depth-1;

	   scene_counter++;
	   scene_counter = scene_counter>(background_images_array.length-1)?0:scene_counter; //resetting scene_counter to repeat scenes

	   cityline_title=new_cityline_title;
	   blue_filler=new_blue_filler;
   }

	//Move the brick sidewards
	else if(stopTunnelMovement==true&&flyingDown==false){
		horizontalMovement=true;
		brick3.x-=BRICK_SPEED;
		brick1.x-=BRICK_SPEED;
		scene_change_platform1.x-=BRICK_SPEED;
		brick2.x-=BRICK_SPEED;
		brick.x-=BRICK_SPEED;
	}

	//Move the scene upwards
	else if(flyingDown==true&&scene_change_platform1.y!=brickYCordinate){
		flyingDownwards();
		tunnelUpwardMovement=true;
		
		cityline_title.y+=LEVEL_SPEED;
		river.y+=LEVEL_SPEED;
		river_filler.y+=LEVEL_SPEED;
		brick.y+=LEVEL_SPEED;
		brick1.y+=LEVEL_SPEED;
		tunnel_entry.y+=LEVEL_SPEED;
		brick2.y+=LEVEL_SPEED;
		brick3.y+=LEVEL_SPEED;
		blue_filler.y+=LEVEL_SPEED;
		horizontalMovement=false;
	}
	 
	else if(stopTunnelMovement==true&&blue_filler.y<screen_height*0.35){
		cityline_title.y+=LEVEL_SPEED;
		river.y+=LEVEL_SPEED;
		river_filler.y+=LEVEL_SPEED;
		brick.y+=LEVEL_SPEED;
		brick1.y+=LEVEL_SPEED;
		tunnel_entry.y+=LEVEL_SPEED;
		brick2.y+=LEVEL_SPEED;
		brick3.y+=LEVEL_SPEED;
		blue_filler.y+=LEVEL_SPEED;

		if(blue_filler.y+LEVEL_SPEED>screen_height*0.35){
			var adjustment=screen_height*0.35-blue_filler.y;
			cityline_title.y+=adjustment;
			river.y+=adjustment;
			river_filler.y+=adjustment;
			brick.y+=adjustment;
			brick1.y+=adjustment;
			tunnel_entry.y+=adjustment;
			brick2.y+=adjustment;
			brick3.y+=adjustment;
			blue_filler.y+=adjustment;
		}
		horizontalMovement=false;
	}

	//Move the cut out bricks sideways
	else if(stopTunnelMovement==true&&brick.x>screen_width*0.5){
		brick.x-=BRICK_SPEED;
		cityline_title.tilePositionX+=BRICK_SPEED;
		brick1.x-=BRICK_SPEED;
		scene_change_platform1.x-=BRICK_SPEED;
		horizontalMovement=true;
	}

	//Reinitalise everything
	else if(stopTunnelMovement==true){
		isChangingScene=false;
		flyingUp=false;
		startTunnelMovement=false;
		startTunnelMovementDelay=false;
		stopTunnelMovement=false;
		stopTunnelMovementDelay=false;
		flyingDown=false;
		brickYCordinate;
		horizontalMovement=false;
		tunnelDownwardMovement=false;
		tunnelUpwardMovement=false;
		scene_change_platform1=null;
		scene_change_platform=null;

		setTimeout(scene_change_start,75000);
	}

	if(stopTunnelMovement==true&&river_filler.x<screen_width*0.5){
		river_filler.x=screen_width*0.5;
	}

}


function flyingDownwards(){
	flyingDown=true;
	var adjust=LEVEL_SPEED;

	if(scene_change_platform.y-LEVEL_SPEED>brickYCordinate)
	{
		adjust=scene_change_platform1.y-brickYCordinate;
	}
	
	scene_change_platform1.y-=adjust;
	player.y-=adjust;
	
	player.anims.play('run', false);
	player.anims.play('stand',true);

}

function next_scene(){
	blackScreenMoveOut=true;
	black_screen_left.x-=LEVEL_SPEED;
	black_screen_right.x+=LEVEL_SPEED;

}

function stopTunnel(){
	stopTunnelMovement=true;
	startTunnelMovement=false;
}

function moveSidewards(){
	startTunnelMovement=true;
}