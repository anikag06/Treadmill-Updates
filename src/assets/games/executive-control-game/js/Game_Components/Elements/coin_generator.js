function coins_placer() {


      if(stop_coin_generation==true)
      {
        free_to_choose=true;
        free_to_start_choose=true;
        second_choice=-1;
        return;
      }

    //Generate new coin if flags allow it
    if (add_new_coin==true && stop_coin_generation == false&&start_tasks==false&&stopTunnelMovement==false) 
    {
        
        //Set up the cordinates;
        var y_cordinate = COIN_MAX_Y_CORDINATE - Math.floor(Math.random() * COIN_Y_CORDINATE_RANGE);
        var x_cordinate = Math.floor(Math.random()*COIN_X_CORDINATE_RANGE)+COIN_MIN_X_CORDINATE;

        if(startTunnelMovement==true)
        {
            y_cordinate=screen_height*0.56;
        }
        
        //Add the coins and a collider for it
        NUMBER_OF_COINS=Math.floor(Math.random()*(MAXIMUM_NUMBER_OF_COINS-1))+1;

        if(jump_tutorial_shown==false&&SHOW_TUTORIAL==true)
        {
            NUMBER_OF_COINS=MAXIMUM_NUMBER_OF_COINS;
        }
        for(var i=0;i<NUMBER_OF_COINS;i++)
        {
            coin.push(coins_group.create(screen_width +x_cordinate+COIN_GAP*i, y_cordinate, 'coin').setScale(COIN_SIZE_SCALE));
            coin[coin.length-1].body.allowGravity = false;
            clear_to_start++;
            curr_game.physics.add.collider(coin[coin.length-1], player,function(obj1,obj2){collect_coin(obj1);}, null, curr_game);
        }
        //Coin Generating Flags
        coinGeneratingInit=false;
        coinGenerating=true;
        add_new_coin=false;
        // COIN_WTIH_OBSTACLE_MIN_X_CORDINATE=NUMBER_OF_COINS*(coin[0].width+COIN_GAP);
        // EXTRA_LIFE_MIN_X_CORDINATE=NUMBER_OF_COINS*(coin[0].width+COIN_GAP);
        // COIN_MIN_X_CORDINATE=NUMBER_OF_COINS*(coin[0].width+COIN_GAP);

      
        //Game Elements Generator
        free_to_choose=false;
        choice_lock_counter=0;
        lock_on_choice=Math.floor(Math.random()*NEXT_COIN_GAP_RANGE)+MINIMUM_GAP_FOR_NEXT_COIN*coin.length;

        console.log("coin");
       
    }
    
    if(coin!=null)
    {
        for(var i=0;i<coin.length;i++)
        {  

            //Do this for the case when player dies and new player is added
            curr_game.physics.add.collider(coin[i], player,function(obj1,obj2){collect_coin(obj1);}, null, curr_game); 
            
            //Show tutorial if needed
            if(SHOW_TUTORIAL==true&&jump_tutorial_shown==false&&coin[i].x-player.x<=(JUMP_RANGE*0.9))
            {
                
                if(isTouchDevice == false)
                {
                    tutorial_box = curr_game.add.tileSprite(screen_width*0.5,screen_height*0.38,screen_width*0.42,screen_height*0.5,"tutorial_box");
                    tutorial_box.alpha = 0.6;
                    tutorial_box.depth = 4;
                    tutorial_text.setText("Press                to\n\n collect coins");
                    control_button_1=curr_game.add.image(screen_width*0.48,screen_height*0.32,'spacebar_button').setScale(0.4);
                    console.log("coin tutorial");
                    game_paused=true;
                }
                else
                {
                    game_paused=true;
                    touch_button_animation=setInterval(jump_tutorial_animation,200);

                }
            }

            //Move the Coin till out of screen
            if (coin[i].x >= -coin[i].width/2) 
            { 
                coin[i].x-=COIN_SPEED;
                
                //Increment the lock for the last coin
                if(i==coin.length-1)
                {    
                    choice_lock_counter++;

                    //Free the lock for next game element
                    if(lock_on_choice==choice_lock_counter)
                    {
                        free_to_choose=true;
                        free_to_start_choose=true;
                        coinGeneratingInit=true;
                      
                    }
                }
            } 

            //Remove the coin from the array
            else 
            {
                coin.splice(i,1);
                clear_to_start--;
                
                if(coin.length==0)
                {
                    
                    coinGenerating=false;
                    free_to_choose=true;
                    free_to_start_choose=true;
                    second_choice=-1;

                }
            }
        }
    }
}

function collect_coin(coin_captured) {
    
    coin_captured.disableBody(true,true);
    var old_count=coins_collected;
    coins_collected += COIN_SCORE;
    curr_game.sound.add('coin_sound').play();
    //Adjust the position of the coin score if the length varies
    if(old_count.toString().length!=coins_collected.toString().length)
    {
        coinsCollectedText.x-=COIN_SCORE_LENGTH_ADJUSTMENT;
    }
    
    coinsCollectedText.setText(coins_collected);
}
