import { Component, OnInit, ViewChild } from '@angular/core';
import { MIUser } from './mi-user.model';
import { MICurrentStateService } from './mi-current-state.service';
import { Level } from './level.model';
import { MiPlayComponent } from './mi-play/mi-play.component';
import { MIPlayService } from './mi-play.service';

@Component({
  selector: 'app-mental-imagery',
  templateUrl: './mental-imagery.component.html',
  styleUrls: ['./mental-imagery.component.scss']
})
export class MentalImageryComponent implements OnInit {

  @ViewChild(MiPlayComponent, {static: false}) miPlayComponent!: MiPlayComponent;

  constructor(private getCurrentState: MICurrentStateService,
              private miPlayService: MIPlayService) { }

  user = new MIUser('sourav', 0, [], null);
  levelList: Level[] = [];
  isDisabled = false;
  home = true;
  instructions = false;
  playing = false;
  showInstructionIcon = true;

  ngOnInit() {
    this.miPlayService.startPlaying.subscribe( () => {
      this.startPlayingMIGame();
    })
    // const scenario2 = new Scenario(
    //     'You sit on your table and open your books and laptop in a hurry. You open the list of assignment topics.' +
    //     ' Your professor has given all students different topics. You take a look at the topic assigned to you. The assignment' +
    //     ' topic looks novel and challenging. You think that you',
    //     'be able to do it by yourself.',
    //     500,
    //     null,
    //     'You start looking for your friend realizing you need help for the assignment but he is nowhere to be seen.' +
    //     ' You do not have enough time to look for him everywhere. Time is running out and you have to complete the assignment' +
    //     ' anyhow before the deadline.',
    //     'You search for research articles and chapters on the web and in the books and start working in the assignment.' +
    //     ' You’ve been working n the assignment for quite some time now and you have almost' +
    //     ' finished it. You look at the time. It is 9:30 am. ' +
    //     '<p>Quickly, you finish the assignment and submit it on time. You feel relieved and relaxed after submitting the' +
    //     ' assignment. You a take a deep breath, sit back on your chair, close your eyes and start planning your Saturday.</p>',
    //     );
    // const scenario1 = new Scenario(
    //     'It is 7:00 am on a Saturday morning. You just woke up after putting your alarm on snooze for 5 times.' +
    //     ' You get up from the bed and look out of the window. You can feel the gentle sunlight ' +
    //     ' on your face. Suddenly, you remember you have an assignment due today at 10:00 am. You immediately rush to your ' +
    //     ' study table thinking that you',
    //     'be able to submit it on time',
    //     500,
    //     scenario2,
    //     'You climb up your bed, lie down and pull over the covers on your face while you try and convince yourself that it' +
    //     'is a difficult assignment and not worth the maximum marks provided against it.  You decide to cover up those marks ' +
    //     'during other internals throughout the course, although you know you will not be able to.',
    //     null
    //     );
    // const scenario4 = new Scenario(
    //     'You quickly change your outfit, pick your bag and rush for the class. It is very crowded outside' +
    //     ' and there is a possibility that you will be late for the class. You think that' +
    //     ' your professor',
    //     ' allow you to enter the class.',
    //     500,
    //     null,
    //     'You are getting very late for the class. You imagine your professor scolding you' +
    //     ' for being so late to the class. The thought of being humiliated in front of the class' +
    //     ' scares you. You decide to go back to your room although you know it is the wrong decision' +
    //     ' from you and you will regret it later.',
    //     'You somehow make your way through the crowd and reach the class. You stand at the class' +
    //     ' entrance, breathing heavily from all the running, the professor’s eyes fixed at you. You ask' +
    //     ' for permission to enter the class. Your professor scolds you for being late to the class.' +
    //     ' You apologize to him and promise to be more careful in the future. You take your seat beside' +
    //     ' your friend and the professor starts the discussion'
    //     );
    // const scenario3 = new Scenario(
    //     'It is 9:45 am. You are sitting back on your chair in your room, all relaxed. You hear a few voices' +
    //     ' and some knocking on the door. You get up from your chair, unlock the door and open it. You find your' +
    //     ' friend standing on your door, ready with a bag. You recall that you have an important extra class at 10:00 am.' +
    //     ' You ask your friend to go and tell him that you will come asap. You start putting together your belongings' +
    //     ' thinking that you ',
    //     ' be able to reach the class on time.',
    //     500,
    //     scenario4,
    //     'You decide not to go to the class and sit back in the room even though you know you will' +
    //     ' regret your decision later. You believe that you will be able to cover up topics that were to be' +
    //     ' discussed in the class.',
    //     null
    //     );
    // this.levelList.push(
    //   new Level('ASSIGNMENT SUBMISSION', scenario1),
    //   new Level('LATE FOR CLASS', scenario3),
    // );

    // this.getCurrentState.getLevelList(this.levelList);
  }

  goToMIGameInstruction() {
    this.home = false;
    this.playing = false;
    this.instructions = true;
  }

  startPlayingMIGame() {
    this.instructions = false;
    this.home = false;
    this.playing = true;
  }
  goToMIGameHome() {
    this.home = true;
    this.playing = false;
    this.instructions = false;
    this.showInstructionIcon = false;
  }

  onScoreUpdate(score: number) {
    this.user.points.push(score);
  }
  replayMIGame() {
    this.miPlayComponent.onNavBarReplay();
  }
  pauseMIGame() {
    this.miPlayComponent.onPause();
  }
  resumeMIGame() {
    this.miPlayComponent.onResumePlay();
  }
}
