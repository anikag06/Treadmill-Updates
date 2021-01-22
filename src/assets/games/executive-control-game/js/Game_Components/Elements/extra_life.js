function extra_life_placer() {

    if(stop_life_generation==true){
        free_to_choose=true;
        free_to_start_choose=true;
        second_choice=-1;
        return;
    }


    //Generate new lifeline if the flags allow it
    if (extra_life == null && stop_life_generation == false && start_tasks==false){
        //Set up the cordinates;
        var y_cordinate = EXTRA_LIFE_MAX_Y_CORDINATE - Math.floor(Math.random() * EXTRA_LIFE_Y_CORDINATE_RANGE);
        var x_cordinate = Math.floor(Math.random()*EXTRA_LIFE_X_CORDINATE_RANGE)+EXTRA_LIFE_MIN_X_CORDINATE;

        //Add a extra life and collider to it
        var option=Math.floor(Math.random()*2);
        //console.log(option);
        // if(option==0)
        // {
        extra_life = extra_life_group.create(screen_width + x_cordinate, y_cordinate, 'mystery_egg');
        curr_game.physics.add.overlap(extra_life, player,collect_mystery_egg, null, curr_game);
        // }
        // else
        // {
        // extra_life = extra_life_group.create(screen_width + x_cordinate, y_cordinate, 'life').setScale(EXTRA_LIFE_SIZE_SCALE);
        // curr_game.physics.add.overlap(extra_life, player,collect_life, null, curr_game);
        // }
        extra_life.body.allowGravity = false;


        //Extra life Generating Flags
        lifeGenerating=true;

        //Game Elements Generator
        free_to_choose=false;
        choice_lock_counter=0;
        lock_on_choice=Math.floor(Math.random()*NEXT_EXTRA_LIFE_GAP_RANGE)+MINIMUM_GAP_FOR_NEXT_EXTRA_LIFE;
        clear_to_start++;

    }

    if (extra_life != null && extra_life.x >= -extra_life.width/2)
    {


        //Move the Extra life till out of screen and rotate the obstacle
        extra_life.x-=EXTRA_LIFE_SPEED;
        //console.log("moving");

        //Free the lock for next game element
        choice_lock_counter++;
        if(lock_on_choice==choice_lock_counter)
        {
            free_to_choose=true;
            free_to_start_choose=true;
            second_choice=-1;
        }

        //Do this for the case when player dies and new player is added
        curr_game.physics.add.overlap(extra_life, player,collect_life, null, curr_game);


    }

    else if(extra_life!=null)
    {

        extra_life = null;
        lifeGenerating=false;
        clear_to_start--;
        second_choice=-1;
        free_to_choose=true;
        free_to_start_choose=true;
        //console.log("easd");
    }
}

function collect_life(es)
{

    es.disableBody(true, true);
    curr_game.sound.add('mystery_egg_sound').play();

    if(number_of_lives!=MAX_NUMBER_OF_LIVES)
    {
        number_of_lives++;

        //Adjust the position of the lives left;
        livesText.setText(number_of_lives);
    }

}

function collect_mystery_egg()
{
    extra_life.disableBody(true,true);
    curr_game.sound.add('mystery_egg_sound').play();
    mystery_egg_collected++;

    coinsCollectedText.setText(coins_collected);
    if(mystery_egg_collected==1)
    {
        mystery_egg_icon=this.add.image(50, 120, 'mystery_egg').setScale(0.5);
    }

    mystery_egg_collected_text.setText(mystery_egg_collected);

}
