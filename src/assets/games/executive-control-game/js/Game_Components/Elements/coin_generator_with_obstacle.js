function coins_with_obstacle_placer() {


      if(stop_coin_with_obstacle_generation==true)
      {
        free_to_choose=true;
        free_to_start_choose=true;
        return;
      }



    //Generate new coin with obstacle if flags allow it
    if (coin.length==0&&add_new_coin_with_obstacle==true && stop_coin_with_obstacle_generation == false &&start_tasks==false)
    {

        //Set up the cordinates;
        var y_cordinate = COIN_WTIH_OBSTACLE_MAX_Y_CORDINATE- Math.floor(Math.random() * COIN_WTIH_OBSTACLE_Y_CORDINATE_RANGE);
        var x_cordinate = Math.floor(Math.random()*COIN_WTIH_OBSTACLE_X_CORDINATE_RANGE)+COIN_WTIH_OBSTACLE_MIN_X_CORDINATE;

        //Add coin and collider for it
        coin_with_obstacle.push(coins_group.create(screen_width + x_cordinate, y_cordinate, 'coin').setScale(COIN_WITH_OBSTACLE_SIZE_SCALE));
        coin_with_obstacle[coin_with_obstacle.length-1].body.allowGravity = false;
        curr_game.physics.add.overlap(coin_with_obstacle[coin_with_obstacle.length-1], player,function(obj1,obj2){collect_coin_with_obstacle(obj1);}, null, curr_game);

        //Add obstacle and collide for it
        obstacle_for_coin.push(coin_obstacle_group.create(screen_width+x_cordinate,y_cordinate,'coin_obstacle').setScale(OBSTACLE_FOR_COIN_SIZE_SCALE));
        obstacle_for_coin[obstacle_for_coin.length-1].body.allowGravity =false;
        curr_game.physics.add.overlap(obstacle_for_coin[obstacle_for_coin.length-1], player,function(obj1,obj2){hit_coin_obstacle(obj1);}, null, curr_game);

        //Coin Generating Flags
        coinGeneratingWithObstacleInit=false;
        coinGeneratingWithObstacle=true;
        add_new_coin_with_obstacle=false;

        //Game Elements Generator
        free_to_choose=false;
        free_to_start_choose=true;
        choice_lock_counter=0;
        lock_on_choice=Math.floor(Math.random()*NEXT_COIN_WITH_OBSTACLE_GAP_RANGE)+MINIMUM_GAP_FOR_NEXT_COIN_WITH_OBSTACLE;
        clear_to_start++;

    }

    for(var i=0;i<coin_with_obstacle.length;i++)
    {

        //Do this for the case when player dies and new player is added
        curr_game.physics.add.overlap(coin_with_obstacle[i], player,function(obj1,obj2){collect_coin_with_obstacle(obj1);}, null, curr_game);
        curr_game.physics.add.overlap(obstacle_for_coin[i], player,function(obj1,obj2){hit_coin_obstacle(obj1);}, null, curr_game);

        //Move the Coin till out of screen and rotate the obstacle
        if (coin_with_obstacle[i].x >=-coin_with_obstacle[i].width*2)
        {

            coin_with_obstacle[i].x-=COIN_WITH_OBSTACLE_SPEED;

            var period_for_obstacle_rotation = curr_game.time.now * OBSTACLE_ROTATION_PERIOD;
            obstacle_for_coin[i].x=coin_with_obstacle[i].x+Math.cos(period_for_obstacle_rotation)*coin_with_obstacle[i].height/2;
            obstacle_for_coin[i].y=coin_with_obstacle[i].y+Math.sin(period_for_obstacle_rotation)*coin_with_obstacle[i].height/2;


            //Increment the lock for the last coin
            if(i==coin_with_obstacle.length-1)
            {
                choice_lock_counter++;

                //Free the lock for next game element
                if(lock_on_choice==choice_lock_counter)
                {
                    free_to_choose=true;
                    free_to_start_choose=true;
                    second_choice=-1;
                    coinGeneratingWithObstacleInit=true;
                }
            }
        }

        //Remove the coin from the array
        else
        {
            coin_with_obstacle.splice(i,1);
            obstacle_for_coin.splice(i,1);
            clear_to_start--;

            if(coin_with_obstacle.length==0)
            {
                coinGeneratingWithObstacle=false;
                free_to_choose=true;
            }
        }
    }
}


function collect_coin_with_obstacle(coin_touched) {

    coin_touched.disableBody(true, true);
    var old_count=coins_collected
    coins_collected += COIN_WITH_OBSTACLE_SCORE;
    curr_game.sound.add('coin_sound').play();

    //Adjust the position of the coin score if the length varies
    if(old_count.toString().length!=coins_collected.toString().length)
    {
        coinsCollectedText.x-=COIN_SCORE_LENGTH_ADJUSTMENT;
    }
    coinsCollectedText.setText(coins_collected);
}

function hit_coin_obstacle(coin_obstacle) {

    coin_obstacle.disableBody(true, true);
    curr_game.sound.add('hit_obstacle_sound').play();

    //Adjust the position of the lives left;
     if(player_counter==0)
    {
        player_blinking_animation=setInterval(blinking_animation,PLAYER_ANIMATION_TIMING);
    }
    else
    {
        player_counter=0;
    }
    if(number_of_lives>0)number_of_lives--;
    livesText.setText(number_of_lives);
}

function shoot_coin_obstacle(coin_obstacle,bomb)
{
    coin_obstacle.disableBody(true,true);
    curr_game.sound.add('shoot_obstacle_sound').play();
    bomb.destroy();

}
