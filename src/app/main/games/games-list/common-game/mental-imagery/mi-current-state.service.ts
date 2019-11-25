import { Injectable } from '@angular/core';
import { Level } from './level.model';
import { MIUser } from './mi-user.model';
import { Scenario } from './scenario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MIPlayService } from './mi-play.service';
import { MIG_SITUATIONS_DATA, MIG_USER_DATA, MIG_STORE_USER_DATA } from '@/app.constants';

@Injectable({
  providedIn: 'root'
})
export class MICurrentStateService {


  user = new MIUser('sourav', 0, [], null);
  currentLevel!: Level;
  nextLevel!: Level;
  levelList: Level[] = [];
  currentScenario!: Scenario;
  previousText = '';
  count = 0;

  extraContent = '';
  notificationHeader = '';
  notificationBody = '';

  continuePlaying = false;
  retry = false;
  disabled = false;
  blank = '';
  scenario!: Scenario;
  lastOrder!:number;

  constructor(
    private http: HttpClient,
    private miPlayService: MIPlayService
  ) {
  }

  // getContent(){

  //   if(this.count===0){
  //     const scenario2 = new Scenario(
  //       'You sit on your table and open your books and laptop in a hurry. You open the list of assignment topics.' +
  //       ' Your professor has given all students different topics. You take a look at the topic assigned to you. The assignment' +
  //       ' topic looks novel and challenging. You think that you',
  //       'be able to do it by yourself.',
  //       500,
  //       null,
  //       'You start looking for your friend realizing you need help for the assignment but he is nowhere to be seen.' +
  //       ' You do not have enough time to look for him everywhere. Time is running out and you have to complete the assignment' +
  //       ' anyhow before the deadline.',
  //       'You search for research articles and chapters on the web and in the books and start working in the assignment.' +
  //       ' You’ve been working on the assignment for quite some time now and you have almost' +
  //       ' finished it. You look at the time. It is 9:30 am. ' +
  //       '<p>Quickly, you finish the assignment and submit it on time. You feel relieved and relaxed after submitting the' +
  //       ' assignment. You a take a deep breath, sit back on your chair, close your eyes and start planning your Saturday.</p>',
  //       );
  //     const scenario1 = new Scenario(
  //       'It is 7:00 am on a Saturday morning. You just woke up after putting your alarm on snooze for 5 times.' +
  //       ' You get up from the bed and look out of the window. You can feel the gentle sunlight ' +
  //       ' on your face. Suddenly, you remember you have an assignment due today at 10:00 am. You immediately rush to your ' +
  //       ' study table thinking that you',
  //       'be able to submit it on time',
  //       500,
  //       scenario2,
  //       'You climb up your bed, lie down and pull over the covers on your face while you try and convince yourself that it' +
  //       'is a difficult assignment and not worth the maximum marks provided against it.  You decide to cover up those marks ' +
  //       'during other internals throughout the course, although you know you will not be able to.',
  //       null
  //       );
  //     const scenario4 = new Scenario(
  //       'You quickly change your outfit, pick your bag and rush for the class. It is very crowded outside' +
  //       ' and there is a possibility that you will be late for the class. You think that' +
  //       ' your professor',
  //       ' allow you to enter the class.',
  //       500,
  //       null,
  //       'You are getting very late for the class. You imagine your professor scolding you' +
  //       ' for being so late to the class. The thought of being humiliated in front of the class' +
  //       ' scares you. You decide to go back to your room although you know it is the wrong decision' +
  //       ' from you and you will regret it later.',
  //       'You somehow make your way through the crowd and reach the class. You stand at the class' +
  //       ' entrance, breathing heavily from all the running, the professor’s eyes fixed at you. You ask' +
  //       ' for permission to enter the class. Your professor scolds you for being late to the class.' +
  //       ' You apologize to him and promise to be more careful in the future. You take your seat beside' +
  //       ' your friend and the professor starts the discussion'
  //       );
  //     const scenario3 = new Scenario(
  //       'It is 9:45 am. You are sitting back on your chair in your room, all relaxed. You hear a few voices' +
  //       ' and some knocking on the door. You get up from your chair, unlock the door and open it. You find your' +
  //       ' friend standing on your door, ready with a bag. You recall that you have an important extra class at 10:00 am.' +
  //       ' You ask your friend to go and tell him that you will come asap. You start putting together your belongings' +
  //       ' thinking that you ',
  //       ' be able to reach the class on time.',
  //       500,
  //       scenario4,
  //       'You decide not to go to the class and sit back in the room even though you know you will' +
  //       ' regret your decision later. You believe that you will be able to cover up topics that were to be' +
  //       ' discussed in the class.',
  //       null
  //       );
  //     const scenario7 = new Scenario(
  //       'While working out, you start feeling a bit tired. You start feeling as if you are at your limit.'+
  //       'You feel like giving up.You stop to relax for a bit and '+
  //       'stretch your muscles. You feel refreshed and decide to',
  //       '',
  //       500,
  //       null,
  //       'You try to read the faces of your classmates who have received the question papers. You try to remember'+
  //       'what you read and get more nervous as you fail to '+ 
  //       'remember an important formula. You pray to god that your teacher has set an easy paper.',
  //       'You wait calmly for getting the question paper. You are confident that you will be able to answer most of the questions.'
  //       );

  //     const scenario6 = new Scenario(
  //       'You are apprehensive whether you can take out some time this semester. Although, it is equally important that you do.'+ 
  //       ' You convince yourself to',
  //       "",
  //       500,
  //       scenario7,
  //       'You decide not to go to the class. You start to think that this test is not that important anyway. You think that I will be able to make up '+
  //       'for it in the final exam. You know, though, in your heart that you are going to regret this decision as soon as you miss your chance to go to the class.',
  //       null
  //       );

  //     const scenario5 = new Scenario(
  //       'You wake up in a',
  //       'mood. You dress up and get ready for breakfast. While combing your hair, you realise that'+ 
  //       'you have gained a lot of weight these past few months. Stress and exam pressure have taken a toll on your health.',
  //       500,
  //       scenario6,
  //       'You got very anxious about not doing well in the test. '+
  //       'You decided not to go to the class even though you know that you will regret your decision later that day.',
  //       null
  //       );

  //     const scenario10 = new Scenario(
  //       'Extremely nervous, you approach the Librarian with shaking hands and feet. With her full rimmed spectacles and '+ 
  //       'stern demeanour, she seems to be a scary woman. The work seems to be tough. The working hours are long and you '+
  //       'are not satisfied with the money.But you are frightened to ask for more.You can try and negotiate or you can go '+
  //       'and look for another opportunity.You pick the',
  //       '',
  //       500,
  //       null,
  //       'You continue searching for hours and hours but no suitable opportunity comes your way.You regret your decision of '+
  //       'letting the bookstore job go. You return to find out that the vacancy has been filled. You return home disappointed knowing the situation has only become worse.',
  //       null
  //       );
  //     const scenario9 = new Scenario(
  //       'You see a notice at the university bookstore.They are looking for a new clerk.You are excited but also doubtful whether '+
  //       'you shall be able to handle it. You also remember that you had worked in sales before. But the thought of going to work everyday '+ 
  //       'makes you feel tired. Finally you decide to',
  //       '',
  //       500,
  //       scenario10,
  //       'Your money runs out. You stopped talking to  your parents because you grew tired of their constant nagging. '+ 
  //       'Unable to fund your education,you drop out of college.',
  //       null
  //       );
  //     const scenario8 = new Scenario(
  //       'Your savings are running dry. Simultaneously, it’s uncomfortable asking your parents for money this frequently. '+
  //       'You are in a tough spot. You come to conclusion that you need to apply for a part-time job. Not being able to do so '+ 
  //       'makes you feel really sad.You make up your mind to',
  //       '',
  //       500,
  //       scenario9,
  //       'Your money runs out. You stopped talking to  your parents because you grew tired of heir constant nagging.Unable to '+
  //       'fund your education,you drop out of college.',
  //       null
  //       );
  //     this.levelList.push(
  //       new Level('Assignment Submission', scenario1),
  //       new Level('Late For Class', scenario3),
  //       new Level('Physics Test', scenario5),
  //       new Level('Part Time Job', scenario8),
  //     );
  //   }
  // }

  initLevelsList() {
    this.fetchSituationData(this.user.level).subscribe((data: any) => {
      console.log("data from init level list: ", data);
      for (let i = 0; i < data.results.length; i++) {
        this.levelList.push(new Level(data.results[i].order, data.results[i].title, data.results[i].sentence_list));
      }
      this.lastOrder = data.results[0].last_order;
      this.user.level = data.results[0].order;
      console.log("this.levelList", this.levelList);
      this.miPlayService.setLevel.emit();
    });
  }

  updateLevelsList() {
    this.fetchSituationData(this.user.level).subscribe((data: any) => {
      console.log("data from Update Level List: ", data);
      for (let i = 0; i < data.results.length; i++) {
        this.levelList.push(new Level(data.results[i].order, data.results[i].title, data.results[i].sentence_list));
      }
      console.log('this.lastOrder',data.results[0].last_order);
      this.lastOrder = data.results[0].last_order;
      console.log("this.levelList", this.levelList);
    });

  }

  setInitialOrder() {
    // this.user.level = this.levelList[0].order;
    this.fetchUserData().subscribe((data:any) => {
      console.log(data);
      console.log("last played order:", data.last_played_order);
      this.user.level = data.last_played_order;
      this.miPlayService.startNext.emit();
    });
  }

  fetchSituationData(lastPlayedOrder: number) {
    return this.http.get(environment.API_ENDPOINT + MIG_SITUATIONS_DATA + lastPlayedOrder + '/');
  }

  fetchUserData() {
    return this.http.get(environment.API_ENDPOINT + MIG_USER_DATA);
  }

  saveUserData(data: any) {
    return this.http.post(environment.API_ENDPOINT + MIG_STORE_USER_DATA, data);
  }

  levelUpdate() {
    if (this.user.level === this.lastOrder) {
      this.user.level = 1;
    } else {
      this.user.level += 1;
    }
  }

  getCurrentLevel() {
    for (let i = 0 ; i < this.levelList.length; i++) {
      console.log("this.user.level", this.user.level);
      if (this.user.level === this.levelList[i].order) {
        console.log("get Current Level",this.levelList[i].title)
        this.currentLevel =  this.levelList[i];
        console.log("get currentlevel status",this.currentLevel);
      }
    }
    return this.currentLevel;
  }

  getNextLevel() {
    for (let i = 0 ; i < this.levelList.length; i++) {
      if (this.user.level === this.levelList[i].order) {
        this.nextLevel =  this.levelList[i + 1];
      }
    }
    return this.nextLevel;
  }

  convertScenario(scenario1: any, scenario2: any) {
    return new Scenario(scenario1.text_before_dash, scenario1.text_after_dash, scenario2, scenario1.wrong_text, scenario1.correct_text, scenario1.id);
  }


  updateScenario() {

    if (this.currentScenario && this.currentScenario.scenarioNextIndex) {
      let nextIndex = this.currentScenario.scenarioNextIndex;
      if(nextIndex < (this.currentLevel.scenario.length-1)) { // if not last scenario
        this.currentScenario = this.convertScenario(this.currentLevel.scenario[nextIndex], nextIndex+1);
      } else {
        this.currentScenario = this.convertScenario(this.currentLevel.scenario[nextIndex], null);
      }
    }
    else {
      this.currentScenario = this.convertScenario(this.currentLevel.scenario[0], 1);
      // return this.currentScenario;
    }
  }

  getScenario() {
    // // if (this.currentScenario) {

    // // }
    
    if (this.count === 0) {
      this.currentScenario = this.convertScenario(this.currentLevel.scenario[0], 1);
    }

  }

  resetScenario() {
    this.currentScenario = this.convertScenario(this.currentLevel.scenario[0], 1);
    //return this.currentScenario;
  }

  numOfScenarios() {
    return this.currentLevel.scenario.length;
  }

}
