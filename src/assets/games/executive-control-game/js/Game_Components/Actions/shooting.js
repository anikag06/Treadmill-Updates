function shoot_action()
{


	for(var i=0;i<shooting_bomb.length;i++)
	{

		 if(movement_progress[i]<=1)
		 {
			shooting_bomb[i].x=Phaser.Math.Interpolation.Linear(shoot_x[i], movement_progress[i]);
		 	shooting_bomb[i].y=Phaser.Math.Interpolation.Linear(shoot_y[i], movement_progress[i]);
		 	movement_progress[i]+=movement_increment;
		 	isShooting=true;
		 }
		 else
		 {

		 	shoot_x.splice(i,1);
		 	shoot_y.splice(i,1);
		 	shooting_bomb[i].destroy();
		 	shooting_bomb.splice(i,1);
		 	movement_progress.splice(i,1);

		 	if(shooting_bomb.length==0)
		 	{
		 		isShooting=false;

		 	}
	}	 }


}
