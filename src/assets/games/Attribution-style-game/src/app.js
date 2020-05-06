
// var startAttributeGame = function () {
//     const DEFAULT_WIDTH = 1320;
//     const DEFAULT_HEIGHT = 740;
//     const con = {
//         backgroundColor: "#000000",
//         scale: {
//         mode: Phaser.Scale.FIT,
//         autoCenter: Phaser.Scale.CENTER_BOTH,
//         width: DEFAULT_WIDTH,
//         height: DEFAULT_HEIGHT
//         },
//         scene: [PreloadScene, HomeScene, LevelOne, LevelTwo, LevelThree, UIScene, ScoreDisplay, QuestionAndAnswer,UserResult],
//         physics: {
//         default: "arcade",
//         arcade: {
//             debug: false,
//             gravity: { y: 400 }
//         }
//         }
//     };

//     window.addEventListener("load", () => {
//     let game = new Phaser.Game(con);
//     });

// }

// window.addEventListener("load", () => {
//   let game = new Phaser.Game(con);
// });



/*
var AttributeGame = function () {
  const DEFAULT_WIDTH = 1320;
  const DEFAULT_HEIGHT = 740;
  var con = {
         backgroundColor: "#000000",
         scale: {
         mode: Phaser.Scale.FIT,
         autoCenter: Phaser.Scale.CENTER_BOTH,
         width: DEFAULT_WIDTH,
         height: DEFAULT_HEIGHT
         },
         scene: [PreloadScene, HomeScene, LevelOne, LevelTwo, LevelThree, UIScene, ScoreDisplay, QuestionAndAnswer,UserResult],
         physics: {
         default: "arcade",
         arcade: {
             debug: false,
             gravity: { y: 400 }
         }
         }};

  return new Phaser.Game(con);



};
*/



// function conf() {
// 	const DEFAULT_WIDTH = 132;
//     const DEFAULT_HEIGHT = 74;
//     return con = {
//         backgroundColor: "#000000",
//         scale: {
//         mode: Phaser.Scale.FIT,
//         autoCenter: Phaser.Scale.CENTER_BOTH,
//         width: DEFAULT_WIDTH,
//         height: DEFAULT_HEIGHT
//         },
//         scene: [PreloadScene, HomeScene, LevelOne, LevelTwo, LevelThree, UIScene, ScoreDisplay, QuestionAndAnswer,UserResult],
//         physics: {
//         default: "arcade",
//         arcade: {
//             debug: false,
//             gravity: { y: 400 }
//         }
//         }
//     };
//     console.log('running');
// };



 class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    this.load.image("bg", "./assets/games/Attribution-style-game/src/assets/background.png");
    this.load.image("GoToHome", "./assets/games/Attribution-style-game/src/assets/GoToHome.png");
    this.load.image("PlayAgain", "./assets/games/Attribution-style-game/src/assets/PlayAgain.png");

    this.load.image("play_btn", "./assets/games/Attribution-style-game/src/assets/play_btn.png");
    this.load.image("pause_btn", "./assets/games/Attribution-style-game/src/assets/pause_btn.png");
    this.load.image("home_btn", "./assets/games/Attribution-style-game/src/assets/home_btn.png");
    this.load.image("restart_btn", "./assets/games/Attribution-style-game/src/assets/restart_btn.png");
    this.load.image("next_btn", "./assets/games/Attribution-style-game/src/assets/Copy of Button_small.svg");
    this.load.image("arrow", "./assets/games/Attribution-style-game/src/assets/arrow.png");
    this.load.image("bow", "./assets/games/Attribution-style-game/src/assets/bow.png");
    this.load.image("bow_bend", "./assets/games/Attribution-style-game/src/assets/bow_bend.png");
    this.load.image(
      "blue_balloon",
      "./assets/games/Attribution-style-game/src/assets/small_blue_balloon.png"
    );
    this.load.image(
      "green_balloon",
      "./assets/games/Attribution-style-game/src/assets/small_green_balloon.png"
    );
    this.load.image(
      "purple_balloon",
      "./assets/games/Attribution-style-game/src/assets/small_purple_balloon.png"
    );
    this.load.image("red_balloon", "./assets/games/Attribution-style-game/src/assets/small_red_balloon.png");
    this.load.image(
      "yellow_balloon",
      "./assets/games/Attribution-style-game/src/assets/small_yellow_balloon.png"
    );
    this.load.image(
      "danger_balloon",
      "./assets/games/Attribution-style-game/src/assets/danger_balloon.png"
    );
  }

  create() {
    this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);
    $('#attGame').removeClass('d-none');
    $("#start_page").addClass("d-none");
    this.scene.start('HomeScene');
  }
}



class HomeScene extends Phaser.Scene {
   constructor() {
     super({ key: 'HomeScene' })
   }

   create() {
     console.log('homescene class');
     this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);


        this.scene.stop();
        this.scene.start('LevelOne');
        this.registry.set('currentScene', 'LevelOne');


       let event = document.createEvent('Event');
       event.initEvent('build');
       window.dispatchEvent(event);
       console.log(event);





   }

   update() {

   }
}

class LevelOne extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelOne' })
    }

    create() {

      ASGLevelId = 1;
      level = 1;

        this.lastFired = 0;

        // Total Time given to player
        this.totalTime = 5;

        this.totalBalloon = 0;
        this.totalBalloonBlown = 0;
        this.totalBalloonMissed = 0;
        this.totalArrowsFired = 1;

        this.arrowInAir=false;

        this.BallonsFrame = [
            "blue_balloon",
            "green_balloon",
            "purple_balloon",
            "red_balloon",
            "yellow_balloon"
        ];

        this.arrowResetTime = 1; //multiple arrow shoot time interval
        this.isArrowReady = false;

        this.isGameOver = false;
        this.isGameStart = false;
        this.isPaused = false;

        this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);

        this.bow = this.add
            .sprite(100, 650, "bow")
            .setScale(0.5)
            .setOrigin(0.15, 0.5);

        this.bowBend = this.add
            .sprite(100, 650, "bow_bend")
            .setScale(0.5)
            .setOrigin(0.43, 0.5)
            .setVisible(false);

        this.arrow = this.physics.add
            .sprite(100, 650, "arrow")
            .setScale(0.1)
            .setOrigin(0, 0.5)
            .setGravityY(-400);

        this.arrowPoint = this.physics.add
            .sprite(100, 650, null)
            .setScale(0.1)
            .setGravityY(-400);
        this.arrowPoint.alpha = 0;

        let fontSize = 25;
        let fontColor = 'black';

        this.balloons = this.physics.add.group({
            allowGravity: false
        });

        let SetX = 650;
        let SetY = 70;

        this.balloons.createMultiple({ key: 'blue_balloon', repeat: 5, setXY: { x: SetX, y: SetY, stepX: 100 } });
        this.balloons.createMultiple({ key: 'green_balloon', repeat: 5, setXY: { x: SetX, y: SetY + 150, stepX: 100 } });
        this.balloons.createMultiple({ key: 'yellow_balloon', repeat: 5, setXY: { x: SetX, y: SetY + 300, stepX: 100 } });
        this.balloons.createMultiple({ key: 'red_balloon', repeat: 5, setXY: { x: SetX, y: SetY + 450, stepX: 100 } });
        this.balloons.createMultiple({ key: 'purple_balloon', repeat: 5, setXY: { x: SetX, y: SetY + 600, stepX: 100 } });

        this.balloons.getChildren().forEach(element => {
            element.setScale(0.2);
            element.setTexture(Phaser.Utils.Array.GetRandom(this.BallonsFrame));
        });

        this.ScoreTxt = this.add.text(30, 30, '0',{ fontFamily: '"Roboto"' })
            .setFontSize(fontSize)
            .setColor(fontColor);


            this.redBalloonTime = this.add.sprite(this.ScoreTxt.getTopRight().x + 20, (this.ScoreTxt.getTopRight().y + this.ScoreTxt.getBottomRight().y) / 2, 'red_balloon').setScale(0.07);


            this.timeTxt = this.add.text(this.redBalloonTime.getBottomRight().x +  30, 30, this.totalTime, { fontFamily: '"Roboto"' })
                .setFontSize(fontSize)
                .setColor(fontColor);

            this.timeTxtSec = this.add.text(this.timeTxt.getBottomRight().x + 5,30, 's', { fontFamily: '"Roboto"' })
                .setFontSize(fontSize)
                .setColor(fontColor);

        this.gameOverTxt = this.add.text(660, 370, "Game Over!", { fontFamily: '"Roboto"' })
            .setFontSize(50)
            .setColor('black')
            .setVisible(false)
            .setOrigin(0.5);

        this.LevelOneTxt = this.add.text(660, 370, "Level One", { fontFamily: '"Roboto"' })
            .setFontSize(100)
            .setColor('black')
            .setOrigin(0.5);

        this.velocityArrow = new Phaser.Math.Vector2();
        this.line = new Phaser.Geom.Line();

        this.physics.velocityFromRotation(0.1, 600, this.velocityArrow);

        this.add.tween({
            targets: this.LevelOneTxt,
            ease: 'Sine.easeInOuts',
            duration: 1000,
            alpha: 0,
            onComplete: () => {
                this.LevelOneTxt.setText("Level One", { fontFamily: '"Roboto"' });
                this.doCountDown(3);
            }
        });

        this.scene.run("UIScene");
    }


    startGame = function() {
        this.isGameStart = true;
        this.isArrowReady = true;

        this.input.on('pointermove', this.bowMovement, this);

        this.input.on('pointerup', this.shootArrow, this);

        this.input.on('pointerdown', this.prepairToShoot, this);

        this.gameOverTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.totalTime--;
                this.timeTxt.setText(this.totalTime, { fontFamily: '"Roboto"' });
                if (this.totalTime === 0) {
                    this.isGameOver = true;
                    this.gameOverTimer.remove();
                    this.gameOverTxt.setVisible(true);
                    this.scene.stop();
                    this.registry.set('questionNumber', '1');
                    ASGBalloonsBurst = this.totalBalloonBlown;
                    ASGTotalBaloons = 30;
                    ASGArrowsFired = this.totalArrowsFired - this.totalBalloonBlown;
                    this.registry.set('totalBalloonMissed', 30 - this.totalBalloonBlown);
                    this.registry.set('totalBalloon', 30);
                    this.registry.set('ParallelScene', 'ScoreDisplay');
                    this.scene.start('ScoreDisplay');
                    this.registry.set('currentScene', 'LevelTwo');
                  this.updateBadges();
                }
            },
            callbackScope: this.scene,
            loop: true
        });


    };

  ASGPostIndividualLevelPerformanceEvent;

  updateBadges() {
    this.ASGPostIndividualLevelPerformanceEvent = document.createEvent('CustomEvent');
    this.ASGPostIndividualLevelPerformanceEvent.initCustomEvent('ASGPostIndividualLevelPerformance');
    window.dispatchEvent(this.ASGPostIndividualLevelPerformanceEvent);
  }







    bowMovement(pointer) {
        if (!this.isGameStart) return;
        if (this.isGameOver) return;
        if (this.isPaused) return;

        this.bowAngle = Phaser.Math.Angle.BetweenPoints(this.bow, pointer);

        Phaser.Geom.Line.SetToAngle(this.line, this.arrow.x, this.arrow.y, this.bowAngle, 128);
        this.physics.velocityFromRotation(this.bowAngle, 600, this.velocityArrow);
        this.bow.rotation = this.bowAngle;
        this.bowBend.rotation = this.bowAngle;

        this.arrow.rotation = this.bowAngle;
    }

    prepairToShoot() {
        if (!this.isGameStart) return;
        if (this.isGameOver) return;
        if (this.arrowInAir) return;
        if (this.isPaused) return;

        this.bow.setVisible(false);
        this.bowBend.setVisible(true);
        this.arrow.setOrigin(0.27, 0.5);
    }

    shootArrow() {
        if (!this.isGameStart) return;
        if (this.isGameOver) return;
        if (this.arrowInAir) return;
        if (!this.isArrowReady) return;
        if (this.isPaused) return;

        this.arrowInAir = true;
        this.isArrowReady = false;

        // Arrow deviates at angle between -5 to 5 (angle is in degree)
        this.arrow.angle += Phaser.Math.Between(-5, 5);

        this.arrow.setOrigin(0, 0.5);

        // For Create second temp arrow
        var arrowSecond = this.physics.add
            .sprite(100, 650, "arrow")
            .setScale(0.1)
            .setOrigin(0, 0.5)
            .setGravityY(-400);

        arrowSecond.angle = this.arrow.angle;

        this.arrow.setVisible(false);

        var arrowPointTemp = this.physics.add.sprite(100, 650, null)
            .setScale(0.1)
            .setOrigin(0, 0.5)
            .setGravityY(-400);

        arrowPointTemp.alpha = 0;

        arrowPointTemp.x = arrowSecond.getTopRight().x;
        arrowPointTemp.y = (arrowSecond.getTopRight().y + arrowSecond.getBottomRight().y) / 2;

        arrowSecond.setVelocity(this.velocityArrow.x, this.velocityArrow.y);
        arrowPointTemp.setVelocity(this.velocityArrow.x, this.velocityArrow.y);

        this.bowBend.setVisible(false);
        this.bow.setVisible(true);

        arrowPointTemp.arrowProperty = arrowSecond;

        this.physics.add.collider(arrowPointTemp, this.balloons, this.balloonBlowUp, null, this);

        this.arrowShootTimer = this.time.delayedCall(this.arrowResetTime * 1000, this.reset, [], this);
    }

    balloonBlowUp(arrow, balloon) {
        balloon.setVelocity(0, 0);
        balloon.alpha = 0;
        balloon.disableBody(true, true);

        this.totalBalloonBlown++;
        this.ScoreTxt.setText(this.totalBalloonBlown, { fontFamily: '"Roboto"' });

        arrow.destroy();
        arrow.arrowProperty.destroy();
        balloon.destroy();
        this.resetArrow();
    }

    resetArrow() {
        this.totalArrowsFired++;
        this.arrow.setOrigin(0, 0.5);
        this.arrowPoint.enableBody(true, 100, 650, true, true);
        this.arrow.enableBody(true, 100, 650, true, true);
        this.arrowInAir = false;

        this.arrow.rotation = this.bow.rotation;

        if (this.input.activePointer.isDown) {
            this.prepairToShoot();
        }
        this.bowMovement(this.input.activePointer);
    }

    reset() {
      this.totalArrowsFired++;
        this.arrowInAir = false;
        this.isArrowReady = true;
        this.arrow.setVisible(true);

        if (this.input.activePointer.isDown) {
            if (this.isGameOver) return;

            this.bow.setVisible(false);
            this.bowBend.setVisible(true);
            this.arrow.setOrigin(0.27, 0.5);
        }
    }

    pauseAllObject() {
        this.isPaused = true;
        this.gameOverTimer.paused = true;
    }

    playAllObject() {
        this.isPaused = false;
        this.gameOverTimer.paused = false;
    }

    doCountDown(count, obj) {
        if (count === -1) {
            obj.destroy();
            // Count Down Complete
            return;
        }

        if (!obj) {
            obj = this.add.text(1320 / 2, 740 / 2, count.toString(), {
                fontFamily: 'ROBOTO',
                fontSize: 190,
                fill: '#000000',
                align: 'center'
            });
            obj.setOrigin(0.5, 0.5);
        }

        obj.alpha = 1;

        this.add.tween({
            targets: obj,
            ease: 'Sine.easeInOuts',
            duration: 500,
            alpha: 1,
            scaleX: 0.3,
            scaleY: 0.3,
            onComplete: () => {
                obj.alpha = 0;
                obj.setScale(1);
                count--;
                if (count === 0) {
                    obj.setText('GO!');
                    this.time.delayedCall(1000, function () {
                        this.startGame();
                    }, [], this);
                }
                else {
                    obj.setText(count.toString());
                }
                this.doCountDown(count, obj);

            }
        });
    }
}

class LevelTwo extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelTwo' })

    }

    create() {
      ASGLevelId = 2;


        this.lastFired = 0;
      this.totalArrowsFired = 1;


      // Total Time given to player
        this.totalTime = 5;

        this.totalBalloon = 0;
        this.totalBalloonBlown = 0;
        this.totalBalloonMissed = 0;

        this.BallonsFrame = [
            "blue_balloon",
            "green_balloon",
            "purple_balloon",
            "red_balloon",
            "yellow_balloon"
        ];

        this.arrowResetTime = 1; //multiple arrow shoot time interval
        this.isArrowReady = false;
        this.arrowInAir = false;

        this.isGameOver = false;
        this.isGameStart = false;

        this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);

        this.bow = this.add
            .sprite(100, 650, "bow")
            .setScale(0.5)
            .setOrigin(0.15, 0.5);

        this.bowBend = this.add
            .sprite(100, 650, "bow_bend")
            .setScale(0.5)
            .setOrigin(0.43, 0.5)
            .setVisible(false);

        this.arrow = this.physics.add
            .sprite(100, 650, "arrow")
            .setScale(0.1)
            .setOrigin(0, 0.5)
            .setGravityY(-400);

        this.arrowPoint = this.physics.add
            .sprite(100, 650, null)
            .setScale(0.1)
            .setGravityY(-400);
        this.arrowPoint.alpha = 0;

        let fontSize = 25;
        let fontColor = 'black';

        this.balloons = this.physics.add.group({
            allowGravity: false
        });

        let balloon = new Phaser.Class({
            Extends: Phaser.Physics.Arcade.Image,

            initialize: function Balloon(scene) {
                Phaser.Physics.Arcade.Image.call(
                    this,
                    scene,
                    0,
                    0,
                    Phaser.Utils.Array.GetRandom(scene.BallonsFrame)
                );

                this.speed = Phaser.Math.GetSpeed(Phaser.Math.Between(100, 300), 1);
            },

            fire: function (x, y) {
                this.alpha = 1;
                this.enableBody(true, x, y - 50, true, true);
                this.setScale(Phaser.Math.FloatBetween(0.15, 0.3));

                this.scene.totalBalloon++;
            },

            update: function (time, delta) {
                this.y -= this.speed * delta;

                if (this.y < -50 || this.y > 950) {
                    this.disableBody(true, true);

                    this.scene.totalBalloonMissed++;
                }
            }
        });

        this.balloons = this.physics.add.group({
            classType: balloon,
            maxSize: 10,
            allowGravity: false,
            runChildUpdate: true
        });

        this.ScoreTxt = this.add.text(30, 30, '0',{ fontFamily: '"Roboto"' })
            .setFontSize(fontSize)
            .setColor(fontColor);

        this.redBalloonTime = this.add.sprite(this.ScoreTxt.getTopRight().x + 20, (this.ScoreTxt.getTopRight().y + this.ScoreTxt.getBottomRight().y) / 2, 'red_balloon').setScale(0.07);


        this.timeTxt = this.add.text(this.redBalloonTime.getBottomRight().x +  30, 30, this.totalTime, { fontFamily: '"Roboto"' })
            .setFontSize(fontSize)
            .setColor(fontColor);

        this.timeTxtSec = this.add.text(this.timeTxt.getBottomRight().x + 5,30, 's', { fontFamily: '"Roboto"' })
            .setFontSize(fontSize)
            .setColor(fontColor);


        this.gameOverTxt = this.add.text(660, 370, "Game Over!", { fontFamily: '"Roboto"' })
            .setFontSize(50)
            .setColor('black')
            .setVisible(false)
            .setOrigin(0.5);

        this.LevelTwoTxt = this.add.text(660, 370, "Level Two", { fontFamily: '"Roboto"' })
            .setFontSize(100)
            .setColor('black')
            .setOrigin(0.5);

        this.velocityArrow = new Phaser.Math.Vector2();
        this.line = new Phaser.Geom.Line();

        this.physics.velocityFromRotation(0.1, 600, this.velocityArrow);

        this.add.tween({
            targets: this.LevelTwoTxt,
            ease: 'Sine.easeInOuts',
            duration: 1000,
            alpha: 0,
            onComplete: () => {
                this.LevelTwoTxt.setText("Level Two", { fontFamily: '"Roboto"' });
                this.doCountDown(3);
            }
        });
        this.scene.run("UIScene");
    }

    startGame() {
        this.isGameStart = true;
        this.isArrowReady = true;

        this.input.on('pointermove', this.bowMovement, this);

        this.input.on('pointerup', this.shootArrow, this);

        this.input.on('pointerdown', this.prepairToShoot, this);

        this.gameOverTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.totalTime--;
                this.timeTxt.setText(this.totalTime, { fontFamily: '"Roboto"' });
                if (this.totalTime === 0) {
                    this.isGameOver = true;
                    this.gameOverTimer.remove();

                  ASGBalloonsBurst = this.totalBalloonBlown;
                  ASGTotalBaloons = this.totalBalloon;
                  ASGArrowsFired = this.totalArrowsFired - this.totalBalloonBlown;

                    this.gameOverTxt.setVisible(true);
                    this.registry.set('questionNumber', '2');
                    this.registry.set('totalBalloonMissed', this.totalBalloon - this.totalBalloonBlown);
                    this.registry.set('totalBalloon', this.totalBalloon);
                    this.scene.stop();
                    this.scene.start('ScoreDisplay');
                    this.registry.set('currentScene', 'LevelThree');
                  this.updateBadges();
                  this.updateExplanation();
                }
            },
            callbackScope: this.scene,
            loop: true
        });
    }

  ASGPostLevelTwoPerformanceEvent;

  updateBadges() {
    this.ASGPostLevelTwoPerformanceEvent = document.createEvent('CustomEvent');
    this.ASGPostLevelTwoPerformanceEvent.initCustomEvent('ASGPostLevelTwoPerformance');
    window.dispatchEvent(this.ASGPostLevelTwoPerformanceEvent);}

  updateExplanation() {
    this.ASGpostUserExplanationEvent = document.createEvent('CustomEvent');
    this.ASGpostUserExplanationEvent.initCustomEvent('ASGpostUserExplanation');
    window.dispatchEvent(this.ASGpostUserExplanationEvent);}

    bowMovement(pointer) {
        if (!this.isGameStart) return;
        if (this.isGameOver) return;

        this.bowAngle = Phaser.Math.Angle.BetweenPoints(this.bow, pointer);

        Phaser.Geom.Line.SetToAngle(this.line, this.arrow.x, this.arrow.y, this.bowAngle, 128);
        this.physics.velocityFromRotation(this.bowAngle, 600, this.velocityArrow);
        this.bow.rotation = this.bowAngle;
        this.bowBend.rotation = this.bowAngle;

        this.arrow.rotation = this.bowAngle;
    }

    prepairToShoot() {
        if (!this.isGameStart) return;
        if (this.isGameOver) return;
        if (this.arrowInAir) return;

        this.bow.setVisible(false);
        this.bowBend.setVisible(true);
        this.arrow.setOrigin(0.27, 0.5);
    }

    shootArrow() {
        if (!this.isGameStart) return;
        if (this.isGameOver) return;
        if (this.arrowInAir) return;
        if (!this.isArrowReady) return;

        this.arrowInAir = true;
        this.isArrowReady = false;

        // Arrow deviates at angle between -5 to 5 (angle is in degree)
        this.arrow.angle += Phaser.Math.Between(-5, 5);

        this.arrow.setOrigin(0, 0.5);

        // For Create second temp arrow
        var arrowSecond = this.physics.add
            .sprite(100, 650, "arrow")
            .setScale(0.1)
            .setOrigin(0, 0.5)
            .setGravityY(-400);

        arrowSecond.angle = this.arrow.angle;

        this.arrow.setVisible(false);

        var arrowPointTemp = this.physics.add.sprite(100, 650, null)
            .setScale(0.1)
            .setOrigin(0, 0.5)
            .setGravityY(-400);

        arrowPointTemp.alpha = 0;

        arrowPointTemp.x = arrowSecond.getTopRight().x;
        arrowPointTemp.y = (arrowSecond.getTopRight().y + arrowSecond.getBottomRight().y) / 2;

        arrowSecond.setVelocity(this.velocityArrow.x, this.velocityArrow.y);
        arrowPointTemp.setVelocity(this.velocityArrow.x, this.velocityArrow.y);

        this.bowBend.setVisible(false);
        this.bow.setVisible(true);

        arrowPointTemp.arrowProperty = arrowSecond;

        this.physics.add.collider(arrowPointTemp, this.balloons, this.balloonBlowUp, null, this);

        this.arrowShootTimer = this.time.delayedCall(this.arrowResetTime * 1000, this.reset, [], this);
    }

    balloonBlowUp(arrow, balloon) {
        balloon.setVelocity(0, 0);
        balloon.alpha = 0;
        balloon.disableBody(true, true);

        this.totalBalloonBlown++;
        this.ScoreTxt.setText(this.totalBalloonBlown, { fontFamily: '"Roboto"' });

        arrow.destroy();
        arrow.arrowProperty.destroy();
        balloon.destroy();
        this.resetArrow();
    }

    resetArrow() {
        this.totalArrowsFired++;
        this.arrow.setOrigin(0, 0.5);
        this.arrowPoint.enableBody(true, 100, 650, true, true);
        this.arrow.enableBody(true, 100, 650, true, true);
        this.arrowInAir = false;

        this.arrow.rotation = this.bow.rotation;

        if (this.input.activePointer.isDown) {
            this.prepairToShoot();
        }
        this.bowMovement(this.input.activePointer);
    }

    reset() {
      this.totalArrowsFired++;
        this.arrowInAir = false;
        this.isArrowReady = true;
        this.arrow.setVisible(true);

        if (this.input.activePointer.isDown) {
            if (this.isGameOver) return;

            this.bow.setVisible(false);
            this.bowBend.setVisible(true);
            this.arrow.setOrigin(0.27, 0.5);
        }
    }

    update(time, delta) {
        if (!this.isGameStart) return;
        if (this.isGameOver) return;

        if (time > this.lastFired) {
            let balloon = this.balloons.get();

            if (balloon) {
                balloon.fire(Phaser.Math.Between(600, 1200), 850);

                this.lastFired = time + 1000;
            }
        }
    }

    pauseAllObject() {
        this.isPaused = true;
        this.gameOverTimer.paused = true;
        this.scene.pause();
    }

    playAllObject() {
        this.isPaused = false;
        this.gameOverTimer.paused = false;
    }

    doCountDown(count, obj) {
        if (count === -1) {
            obj.destroy();
            // Count Down Complete
            return;
        }

        if (!obj) {
            obj = this.add.text(1320 / 2, 740 / 2, count.toString(), {
                fontFamily: '"Roboto"',
                fontSize: 190,
                fill: '#000000',
                align: 'center'
            });
            obj.setOrigin(0.5, 0.5);
        }

        obj.alpha = 1;

        this.add.tween({
            targets: obj,
            ease: 'Sine.easeInOuts',
            duration: 500,
            alpha: 1,
            scaleX: 0.3,
            scaleY: 0.3,
            onComplete: () => {
                obj.alpha = 0;
                obj.setScale(1);
                count--;
                if (count === 0) {
                    obj.setText('GO!');
                    this.time.delayedCall(1000, function () {
                        this.startGame();
                    }, [], this);
                }
                else {
                    obj.setText(count.toString());
                }
                this.doCountDown(count, obj);

            }
        });
    }
}

class LevelThree extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelThree' })

    }

    create() {
      ASGLevelId = 3;

        this.lastFired = 0;
      this.totalArrowsFired = 1;

        // Total Time given to player
        this.totalTime = 5;

        this.totalBalloon = 0;
        this.totalBalloonBlown = 0;
        this.totalBalloonMissed = 0;

        this.BallonsFrame = [
            "blue_balloon",
            "green_balloon",
            "purple_balloon",
            "red_balloon",
            "yellow_balloon"
        ];

        this.arrowResetTime = 1; //multiple arrow shoot time interval
        this.isArrowReady = false;
        this.arrowInAir = false;

        this.isGameOver = false;
        this.isGameStart = false;

        this.dangerBalloonInterval = 3000; // Interval after which danger ballon is fired (in ms)
        this.freezeTime = 3000; // Bow - arrow will be freezed for this amount of time (in ms)
        this.isFreezed = false;

        this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);

        this.bow = this.add
            .sprite(100, 650, "bow")
            .setScale(0.5)
            .setOrigin(0.15, 0.5);

        this.bowBend = this.add
            .sprite(100, 650, "bow_bend")
            .setScale(0.5)
            .setOrigin(0.43, 0.5)
            .setVisible(false);

        this.arrow = this.physics.add
            .sprite(100, 650, "arrow")
            .setScale(0.1)
            .setOrigin(0, 0.5)
            .setGravityY(-400);

        this.arrowPoint = this.physics.add
            .sprite(100, 650, null)
            .setScale(0.1)
            .setGravityY(-400);
        this.arrowPoint.alpha = 0;

        let fontSize = 25;
        let fontColor = 'black';

        this.balloons = this.physics.add.group({
            allowGravity: false
        });

        let balloon = new Phaser.Class({
            Extends: Phaser.Physics.Arcade.Image,

            initialize: function Balloon(scene) {
                Phaser.Physics.Arcade.Image.call(
                    this,
                    scene,
                    0,
                    0,
                    Phaser.Utils.Array.GetRandom(scene.BallonsFrame)
                );

                this.speed = Phaser.Math.GetSpeed(Phaser.Math.Between(100, 300), 1);
            },

            fire: function (x, y) {
                this.alpha = 1;
                this.enableBody(true, x, y - 50, true, true);
                this.setScale(Phaser.Math.FloatBetween(0.15, 0.3));

                this.scene.totalBalloon++;
            },

            update: function (time, delta) {
                this.y -= this.speed * delta;

                if (this.y < -50 || this.y > 950) {
                    this.disableBody(true, true);

                    this.scene.totalBalloonMissed++;
                }
            }
        });

        this.balloons = this.physics.add.group({
            classType: balloon,
            maxSize: 10,
            allowGravity: false,
            runChildUpdate: true
        });

        this.dangerBalloons = this.physics.add.group({
            allowGravity: true,
            gravityY: -450
        });

        this.freezeTxt = this.add.text(660, 370, "Freezed!",{ fontFamily: '"Roboto"' })
            .setFontSize(60)
            .setColor('black')
            .setVisible(false)
            .setOrigin(0.5);


        this.ScoreTxt = this.add.text(30, 30, '0',{ fontFamily: '"Roboto"' })
            .setFontSize(fontSize)
            .setColor(fontColor);


            this.redBalloonTime = this.add.sprite(this.ScoreTxt.getTopRight().x + 20, (this.ScoreTxt.getTopRight().y + this.ScoreTxt.getBottomRight().y) / 2, 'red_balloon').setScale(0.07);


            this.timeTxt = this.add.text(this.redBalloonTime.getBottomRight().x +  30, 30, this.totalTime, { fontFamily: '"Roboto"' })
                .setFontSize(fontSize)
                .setColor(fontColor);

            this.timeTxtSec = this.add.text(this.timeTxt.getBottomRight().x + 5,30, 's', { fontFamily: '"Roboto"' })
                .setFontSize(fontSize)
                .setColor(fontColor);

        this.gameOverTxt = this.add.text(660, 370, "Game Over!", { fontFamily: '"Roboto"' })
            .setFontSize(50)
            .setColor('black')
            .setVisible(false)
            .setOrigin(0.5);

        this.LevelThreeTxt = this.add.text(660, 370, "Level Three", { fontFamily: '"Roboto"' })
            .setFontSize(100)
            .setColor('black')
            .setOrigin(0.5);

        this.velocityArrow = new Phaser.Math.Vector2();
        this.line = new Phaser.Geom.Line();

        this.physics.velocityFromRotation(0.1, 600, this.velocityArrow);

        this.add.tween({
            targets: this.LevelThreeTxt,
            ease: 'Sine.easeInOuts',
            duration: 1000,
            alpha: 0,
            onComplete: () => {
                this.LevelThreeTxt.setText("Level Three", { fontFamily: '"Roboto"' });
                this.doCountDown(3);
            }
        });

        this.scene.run("UIScene");
    }

    startGame() {
        this.isGameStart = true;
        this.isArrowReady = true;

        this.input.on('pointermove', this.bowMovement, this);

        this.input.on('pointerup', this.shootArrow, this);

        this.input.on('pointerdown', this.prepairToShoot, this);

        this.gameOverTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.totalTime--;
                this.timeTxt.setText(this.totalTime, { fontFamily: '"Roboto"' });
                if (this.totalTime === 0) {
                    this.isGameOver = true;
                    this.gameOverTimer.remove();

                  ASGBalloonsBurst = this.totalBalloonBlown;
                  ASGTotalBaloons = this.totalBalloon;
                  ASGArrowsFired = this.totalArrowsFired - this.totalBalloonBlown;

                    this.gameOverTxt.setVisible(true);
                    this.registry.set('questionNumber', '3');
                    this.registry.set('totalBalloonMissed', this.totalBalloon - this.totalBalloonBlown);
                    this.registry.set('totalBalloon', this.totalBalloon);
                    this.scene.start('ScoreDisplay');
                    this.registry.set('currentScene', 'LevelThree');
                  this.updateBadges();
                  this.updateExplanation();
                }
            },
            callbackScope: this.scene,
            loop: true
        });

        this.freezerBalloonLoop = this.time.addEvent({
            delay: this.dangerBalloonInterval,
            callback: this.createFreezeBalloon,
            callbackScope: this,
            loop: true
        });
    }

  ASGPostIndividualLevelPerformanceEvent;

  updateBadges() {
    this.ASGPostIndividualLevelPerformanceEvent = document.createEvent('CustomEvent');
    this.ASGPostIndividualLevelPerformanceEvent.initCustomEvent('ASGPostIndividualLevelPerformance');
    window.dispatchEvent(this.ASGPostIndividualLevelPerformanceEvent);}

  updateExplanation() {
    this.ASGpostUserExplanationEvent = document.createEvent('CustomEvent');
    this.ASGpostUserExplanationEvent.initCustomEvent('ASGpostUserExplanation');
    window.dispatchEvent(this.ASGpostUserExplanationEvent);}

    createFreezeBalloon() {
        if (this.isGameOver) return;

        // Danger Balloons are given 0.5 alpha
        this.dangerBalloon = this.physics.add.sprite(Phaser.Math.Between(600, 1200), 850, 'danger_balloon')
            .setScale(Phaser.Math.FloatBetween(0.4, 0.7));

        this.dangerBalloons.add(this.dangerBalloon);
    }

    bowMovement(pointer) {
        if (!this.isGameStart) return;
        if (this.isGameOver) return;
        if (this.isFreezed) return;

        this.bowAngle = Phaser.Math.Angle.BetweenPoints(this.bow, pointer);

        Phaser.Geom.Line.SetToAngle(this.line, this.arrow.x, this.arrow.y, this.bowAngle, 128);
        this.physics.velocityFromRotation(this.bowAngle, 600, this.velocityArrow);
        this.bow.rotation = this.bowAngle;
        this.bowBend.rotation = this.bowAngle;

        this.arrow.rotation = this.bowAngle;
    }

    prepairToShoot() {
        if (!this.isGameStart) return;
        if (this.isGameOver) return;
        if (this.arrowInAir) return;
        if (this.isFreezed) return;

        this.bow.setVisible(false);
        this.bowBend.setVisible(true);
        this.arrow.setOrigin(0.27, 0.5);
    }

    shootArrow() {
        if (!this.isGameStart) return;
        if (this.isGameOver) return;
        if (this.arrowInAir) return;
        if (!this.isArrowReady) return;
        if (this.isFreezed) return;

        this.arrowInAir = true;
        this.isArrowReady = false;

        // Arrow deviates at angle between -5 to 5 (angle is in degree)
        this.arrow.angle += Phaser.Math.Between(-5, 5);

        this.arrow.setOrigin(0, 0.5);

        // For Create second temp arrow
        var arrowSecond = this.physics.add
            .sprite(100, 650, "arrow")
            .setScale(0.1)
            .setOrigin(0, 0.5)
            .setGravityY(-400);

        arrowSecond.angle = this.arrow.angle;

        this.arrow.setVisible(false);

        var arrowPointTemp = this.physics.add.sprite(100, 650, null)
            .setScale(0.1)
            .setOrigin(0, 0.5)
            .setGravityY(-400);

        arrowPointTemp.alpha = 0;

        arrowPointTemp.x = arrowSecond.getTopRight().x;
        arrowPointTemp.y = (arrowSecond.getTopRight().y + arrowSecond.getBottomRight().y) / 2;

        arrowSecond.setVelocity(this.velocityArrow.x, this.velocityArrow.y);
        arrowPointTemp.setVelocity(this.velocityArrow.x, this.velocityArrow.y);

        this.bowBend.setVisible(false);
        this.bow.setVisible(true);

        arrowPointTemp.arrowProperty = arrowSecond;

        this.physics.add.collider(arrowPointTemp, this.balloons, this.balloonBlowUp, null, this);

        this.physics.add.collider(arrowPointTemp, this.dangerBalloons, this.dangerBalloonBlowUp, null, this);

        this.arrowShootTimer = this.time.delayedCall(this.arrowResetTime * 1000, this.reset, [], this);
    }

    balloonBlowUp(arrow, balloon) {
        balloon.setVelocity(0, 0);
        balloon.alpha = 0;
        balloon.disableBody(true, true);

        this.totalBalloonBlown++;
        this.ScoreTxt.setText(this.totalBalloonBlown, { fontFamily: '"Roboto"' });

        arrow.destroy();
        arrow.arrowProperty.destroy();
        balloon.destroy();
        this.resetArrow();
    }

    dangerBalloonBlowUp(arrow, balloon) {
        balloon.setVelocity(0, 0);
        balloon.alpha = 0;
        balloon.disableBody(true, true);

        arrow.destroy();
        arrow.arrowProperty.destroy();
        balloon.destroy();

        this.freeze();
        this.resetArrow();
        this.freezerTimer = this.time.delayedCall(this.freezeTime, this.unFreeze, null, this);
    }

    freeze() {
        this.isFreezed = true;
        this.freezeTxt.setVisible(true);
    }

    unFreeze() {
        this.isFreezed = false;
        this.freezeTxt.setVisible(false);
    }

    resetArrow() {
      this.totalArrowsFired++;
        this.arrow.setOrigin(0, 0.5);
        this.arrowPoint.enableBody(true, 100, 650, true, true);
        this.arrow.enableBody(true, 100, 650, true, true);
        this.arrowInAir = false;

        this.arrow.rotation = this.bow.rotation;

        if (this.input.activePointer.isDown) {
            this.prepairToShoot();
        }
        this.bowMovement(this.input.activePointer);
    }

    reset() {
      this.totalArrowsFired++;
        this.arrowInAir = false;
        this.isArrowReady = true;
        this.arrow.setVisible(true);

        if (this.input.activePointer.isDown) {
            if (this.isGameOver) return;

            this.bow.setVisible(false);
            this.bowBend.setVisible(true);
            this.arrow.setOrigin(0.27, 0.5);
        }
    }

    update(time, delta) {
        if (!this.isGameStart) return;
        if (this.isGameOver) return;

        if (time > this.lastFired) {
            let balloon = this.balloons.get();

            if (balloon) {
                balloon.fire(Phaser.Math.Between(600, 1200), 850);

                this.lastFired = time + 1000;
            }
        }
    }

    doCountDown(count, obj) {
        if (count === -1) {
            obj.destroy();
            // Count Down Complete
            return;
        }

        if (!obj) {
            obj = this.add.text(1320 / 2, 740 / 2, count.toString(), {
                fontFamily: 'Roboto',
                fontSize: 190,
                fill: '#000000',
                align: 'center'
            });
            obj.setOrigin(0.5, 0.5);
        }

        obj.alpha = 1;

        this.add.tween({
            targets: obj,
            ease: 'Sine.easeInOuts',
            duration: 500,
            alpha: 1,
            scaleX: 0.3,
            scaleY: 0.3,
            onComplete: () => {
                obj.alpha = 0;
                obj.setScale(1);
                count--;
                if (count === 0) {
                    obj.setText('GO!');
                    this.time.delayedCall(1000, function () {
                        this.startGame();
                    }, [], this);
                }
                else {
                    obj.setText(count.toString());
                }
                this.doCountDown(count, obj);

            }
        });

    }
}





  class QuestionAndAnswer extends Phaser.Scene {
    constructor() {
        super({ key: "QuestionAndAnswer" })
    }

    create() {
        let fontSize = 30;
        let fontColor = 'black';
        this.currentQuestion;
        this.questionNumber = "que1";

        let Title = "Based on your experience in the previous game, answer the questions that follow.";
          // console.log(ASGUserPerformance);
          // console.log(ASGAnswer.results[2]);
          // console.log(ASGQuestions.results[0].question_text);
          this.q1 = ASGQuestions.results[0].question_text;
      this.q2 = ASGQuestions.results[1].question_text;
      this.q3 = ASGQuestions.results[2].question_text;
      this.q4 = ASGQuestions.results[3].question_text;
      this.q5 = ASGQuestions.results[4].question_text;
      this.q6 = ASGQuestions.results[5].question_text;
      this.q7 = ASGQuestions.results[6].question_text;
      this.q8 = ASGQuestions.results[7].question_text;
      this.q9 = ASGQuestions.results[8].question_text;
      this.q10 = ASGQuestions.results[9].question_text;


      this.Answers1 = {
        "ans1": ASGAnswer.results[1].answer_text,
        "ans2": ASGAnswer.results[0].answer_text,
        "ans3": ASGAnswer.results[2].answer_text,
        "ans4": ASGAnswer.results[3].answer_text,
        "ans5": ASGAnswer.results[4].answer_text,
        "ans6": ASGAnswer.results[5].answer_text,
        "ans7": ASGAnswer.results[6].answer_text,
        "ans8": ASGAnswer.results[7].answer_text,
        "ans9": ASGAnswer.results[8].answer_text,
        "ans10": ASGAnswer.results[9].answer_text,
        "ans11": ASGAnswer.results[10].answer_text,
        "ans12": ASGAnswer.results[11].answer_text,
        "ans13": ASGAnswer.results[12].answer_text,
        "ans14": ASGAnswer.results[13].answer_text,
        "ans15": ASGAnswer.results[14].answer_text,
        "ans16": ASGAnswer.results[15].answer_text,
        "ans17": ASGAnswer.results[16].answer_text,
        "ans18": ASGAnswer.results[17].answer_text,
        "ans19": ASGAnswer.results[18].answer_text,
        "ans20": ASGAnswer.results[19].answer_text
      };












        this.Answers = {
            "ans1": ASGAnswer.results[1].answer_text,
            "ans2": ASGAnswer.results[0].answer_text,
            "ans3": ASGAnswer.results[2].answer_text,
            "ans4": ASGAnswer.results[3].answer_text,
            "ans5": ASGAnswer.results[4].answer_text,
            "ans6": ASGAnswer.results[5].answer_text,
            "ans7": ASGAnswer.results[6].answer_text,
            "ans8": ASGAnswer.results[7].answer_text,
            "ans9": ASGAnswer.results[9].answer_text,
            "ans10": ASGAnswer.results[18].answer_text,
            "ans11": ASGAnswer.results[19].answer_text,
            "ans12": ASGAnswer.results[11].answer_text
        };

        this.Questions = {
            "que1": {
                question: this.q1,
                ans1: {
                    ans: this.Answers.ans1,
                    id: 2,
                    question: this.q2,
                    ans1: { ans: this.Answers.ans3, id: 3,  question: "0", result: "1", explanationId: 1, a1: 2, a2: 3 },
                    ans2: { ans: this.Answers.ans4, id: 4,  question: "0", result: "3", explanationId: 3, a1: 2, a2: 4 }
                },
                ans2: {
                    ans: this.Answers.ans2,
                    id: 1,
                    question: this.q3,
                    ans1: { ans: this.Answers.ans5, id: 5, question: "0", result: "2", explanationId: 2, a1: 1, a2: 5 },
                    ans2: { ans: this.Answers.ans6, id: 6, question: "0", result: "4", explanationId: 4, a1: 1, a2: 6 }
                }
            },
            "que2": {
                question: this.q4,
                ans1: {
                    ans: this.Answers.ans7,
                    id: 7,
                    question: this.q5,
                    ans1: {
                        ans: this.Answers.ans7,
                        id: 9,
                        question: this.q6,
                        ans1: { ans: this.Answers.ans7, id:11, question: "0", result: "1", explanationId: 5, a1: 9, a2: 11 },
                        ans2: { ans: this.Answers.ans12, id:12, question: "0", result: "3", explanationId: 7, a1: 9, a2: 12 }
                    },
                    ans2: { ans: this.Answers.ans9, id:10, question: "0", result: "3", explanationId: 7, a1: 7, a2: 10 }
                },
                ans2: {
                    ans: this.Answers.ans8,
                    id: 8,
                    question: this.q7,
                    ans1: { ans: this.Answers.ans10, id:19, question: "0", result: "2", explanationId: 6, a1: 8, a2: 19 },
                    ans2: { ans: this.Answers.ans11, id:20, question: "0", result: "4", explanationId: 8 , a1: 8, a2: 20}
                }
            },
            "que3": {
                question: this.q8,
                ans1: {
                    ans: this.Answers.ans1,
                    id: 13,
                    question: this.q9,
                    ans1: { ans: this.Answers.ans7, id: 15, question: "0", result: "1", explanationId: 9, a1: 13, a2: 15 },
                    ans2: { ans: this.Answers.ans8, id: 16, question: "0", result: "3", explanationId: 11, a1: 13, a2: 16 }
                },
                ans2: {
                    ans: this.Answers.ans2,
                    id: 14,
                    question: this.q10,
                    ans1: { ans: this.Answers.ans7, id:17, question: "0", result: "2", explanationId: 10, a1: 14, a2: 17 },
                    ans2: { ans: this.Answers.ans8, id:18, question: "0", result: "4", explanationId: 12, a1: 14, a2: 18 }
                }
            }
        };

        this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);
        this.titleRect = this.add.rectangle(150, 180, 1050, 90, 0xffffff, 0.50).setOrigin(0, 0);
        this.descRect = this.add.rectangle(150, 180, 1050, 430, 0xffffff, 0.50).setOrigin(0, 0);
        this.nextRect = this.add.rectangle(150, 180, 1050, 430, 0xffffff, 0.50).setOrigin(0, 0);
        this.next_btn = this.add.sprite(670, 500, "next_btn")
          .setInteractive({ useHandCursor: true })
          .setScale(1.5);
        this.next_btn.setVisible(false);
        this.nextRect.setVisible(false);

        if (ASGLevelId === 1) {
          this.L1text = this.add.text(430, 300,'Great! you have completed level 1', { fontFamily: '"Roboto"' }).setFontSize(35).setColor('black').setFontStyle('bold');;
          this.L1text.setVisible(false);

          this.L1_2text = this.add.text(470, 350,'Click on the next button to continue to Level 2', { fontFamily: '"Roboto"' }).setFontSize(20).setColor('black');
         this.L1_2text.setVisible(false);
        } else if (ASGLevelId === 2) {
          this.L1text = this.add.text(430, 300,'Great! you have completed level 2', { fontFamily: '"Roboto"' }).setFontSize(35).setColor('black').setFontStyle('bold');;
          this.L1text.setVisible(false);

          this.L1_2text = this.add.text(470, 350,'Click on the next button to continue to Level 3', { fontFamily: '"Roboto"' }).setFontSize(20).setColor('black');
          this.L1_2text.setVisible(false);
        } else if (ASGLevelId === 3){
          this.L1text = this.add.text(430, 300,'Great! you have completed level 3', { fontFamily: '"Roboto"' }).setFontSize(35).setColor('black').setFontStyle('bold');;
          this.L1text.setVisible(false);

          this.L1_2text = this.add.text(470, 350,'Click on the next button to continue', { fontFamily: '"Roboto"' }).setFontSize(20).setColor('black');
          this.L1_2text.setVisible(false);
        }

        this.nexttext = this.add.text(645, 485,'Next', { fontFamily: '"Roboto"' }).setFontSize(25).setColor('black');
      this.nexttext.setVisible(false);

        this.titleTxt = this.add.text(170, 210, Title, { fontFamily: '"Roboto"' })
            .setFontSize(25)
            .setColor('black');

        this.Question1Txt = this.add.text(190, 310, this.Questions.que1.question, { fontFamily: '"Roboto"' })
            .setFontSize(fontSize)
            .setColor(fontColor)
            .setFontStyle('bold');

        this.green_balloon = this.add.sprite(220, this.Question1Txt.getBottomRight().y + 55, "green_balloon").setInteractive({ useHandCursor: true });
        this.green_balloon.setScale(0.1);

        let ansConfig = {
            fontSize: fontSize,
            fontFamily: '"Roboto"',
            color: fontColor,
            align: 'left',
            // fontStyle: 'bold',
            wordWrap: { width: 800 }
        }

        this.Question1Ans1Txt = this.add.text(this.green_balloon.getBottomRight().x + 20, this.Question1Txt.getBottomRight().y + 40, this.Questions.que1.ans1, ansConfig).setOrigin(0, 0).setInteractive({ useHandCursor: true });

        this.red_balloon = this.add.sprite(220, this.green_balloon.getBottomRight().y + 50, "red_balloon").setScale(0.1).setInteractive({ useHandCursor: true });

        this.Question1Ans2Txt = this.add.text(this.red_balloon.getBottomRight().x + 20, this.green_balloon.getBottomRight().y + 30, this.Questions.que1.ans2, ansConfig).setOrigin(0, 0).setInteractive({ useHandCursor: true });

        this.queGrp = this.add.group([this.titleTxt, this.titleRect, this.descRect, this.green_balloon, this.red_balloon, this.Question1Txt, this.Question1Ans1Txt, this.Question1Ans2Txt]);

        this.next_btn.on('pointerdown', function () {
            this.scene.stop();
            console.log(level);
          this.L1_2text.setVisible(false);
          this.L1text.setVisible(false);
          if(ASGLevelId === 1 ){
            if (timeToAnswer.length === 3) {
              console.log('run');
              AnswerId = Answer1Id;
              TimeTakenToAnswer = timeToAnswer.shift();
              this.updateBadges();
              AnswerId = Answer2Id;
              timeToAnswer.shift();
              TimeTakenToAnswer = timeToAnswer.shift();
              this.updateBadges();
            } else {
              AnswerId = Answer1Id;
              TimeTakenToAnswer = timeToAnswer.shift();
              this.updateBadges();
              AnswerId = Answer2Id;
              TimeTakenToAnswer = timeToAnswer.shift();
              this.updateBadges();
            }
          } else if (ASGLevelId === 2) {
            if (timeToAnswer.length === 3) {
              if ((timeToAnswer[0] + timeToAnswer[2]) === timeToAnswer[1] || timeToAnswer[1]+1 || timeToAnswer[1]-1) {
                AnswerId = Answer1Id;
                TimeTakenToAnswer = timeToAnswer.shift();
                this.updateBadges();
                timeToAnswer.shift();
                AnswerId = Answer2Id;
                TimeTakenToAnswer = timeToAnswer.shift();
                this.updateBadges();
              } else if((timeToAnswer[0] + timeToAnswer[2]) !== timeToAnswer[1]) {
                timeToAnswer.shift();
                AnswerId = Answer1Id;
                TimeTakenToAnswer = timeToAnswer.shift();
                this.updateBadges();
                AnswerId = Answer2Id;
                TimeTakenToAnswer = timeToAnswer.shift();
                this.updateBadges();
              }
            } else if(timeToAnswer.length === 5) {
              timeToAnswer.shift();
              AnswerId = Answer1Id;
              TimeTakenToAnswer = timeToAnswer.shift();
              this.updateBadges();
              timeToAnswer.shift();
              timeToAnswer.shift();
              AnswerId = Answer2Id;
              TimeTakenToAnswer = timeToAnswer.shift();
              this.updateBadges();
            }
          } else if(ASGLevelId === 3 ){
            if (timeToAnswer.length === 3) {
              console.log('run');
              AnswerId = Answer1Id;
              TimeTakenToAnswer = timeToAnswer.shift();
              this.updateBadges();
              AnswerId = Answer2Id;
              timeToAnswer.shift();
              TimeTakenToAnswer = timeToAnswer.shift();
              this.updateBadges();
            } else {
              AnswerId = Answer1Id;
              TimeTakenToAnswer = timeToAnswer.shift();
              this.updateBadges();
              AnswerId = Answer2Id;
              TimeTakenToAnswer = timeToAnswer.shift();
              this.updateBadges();
            }
          }

          if (this.questionNumber === "que3") {
                this.scene.start('PERSONALISATION');
            } else {
                this.scene.start(this.registry.get('currentScene'));
            }

        }, this);

        if (this.registry.get('questionNumber') === '1') {

            this.questionNumber = "que1";
            this.currentQuestion = this.Questions.que1;
        } else if (this.registry.get('questionNumber') === '2') {
            level = 2;
            this.questionNumber = "que2";
            this.currentQuestion = this.Questions.que2;
        } else if (this.registry.get('questionNumber') === '3') {
            level = 3;
            this.questionNumber = "que3";
            this.currentQuestion = this.Questions.que3;
        } else {
            level = 1;
            this.questionNumber = "que1";
            this.currentQuestion = this.Questions.que1;
        }
      this.i = 1;
      this.setQuestionAnswer(this.currentQuestion, this.i);
    }

    setQuestionAnswer(queAndAns, i) {
      let now1 = Date.now();
      // Disable Input
        this.disableInput();
        // Enable after some time to stop instant click on next question
        this.time.delayedCall(1000, this.enableInput, null, this);

        this.currentQuestion = queAndAns;
        this.Question1Txt.setText(queAndAns.question, { fontFamily: '"Roboto"' });
        this.Question1Ans1Txt.setText(queAndAns.ans1.ans, { fontFamily: '"Roboto"' });
        this.Question1Ans2Txt.setText(queAndAns.ans2.ans, { fontFamily: '"Roboto"' });

        this.green_balloon.once('pointerdown', function () {
          let now2 = Date.now();
          //  AnswerId = queAndAns.ans1.id;
          console.log(AnswerId);
          timeToAnswer.push(now2 - now1);
          console.log(timeToAnswer);


          // console.log(this.currentQuestion.ans1.question);
          if (this.currentQuestion.ans1.question !== "0") {

            console.log('ans1 1');
            // this.updateBadges();
            this.setQuestionAnswer(this.currentQuestion.ans1, i=i+1);
          }
          else {
            if (this.currentQuestion.ans2.question == "0") {
              //   this.updateBadges();
            }


            console.log('ans1 outside');
            this.queGrp.getChildren().forEach(child => {
              child.setVisible(false);
            });
            this.registry.set(this.questionNumber, this.currentQuestion.ans1.result);

            this.next_btn.setVisible(true);
            this.nexttext.setVisible(true);
            this.L1text.setVisible(true);
            this.L1_2text.setVisible(true);
            //this.L1_2text = this.add.text(470, 350,'Click on the next button to continue to Level 2', { fontFamily: '"Roboto"' }).setFontSize(20).setColor('black');
            //this.L1text = this.add.text(430, 300,'Great! you have completed level 1', { fontFamily: '"Roboto"' }).setFontSize(35).setColor('black').setFontStyle('bold');;


            this.nextRect.setVisible(true);
            ExplanationId = this.currentQuestion.ans1.explanationId;
            Answer1Id = this.currentQuestion.ans1.a1;
            Answer2Id = this.currentQuestion.ans1.a2;
          }
        }, this);

        // noinspection DuplicatedCode
      this.red_balloon.once('pointerdown', function () {
          let now2 = Date.now();

          // AnswerId = queAndAns.ans2.id;
          timeToAnswer.push(now2 - now1);
          console.log(timeToAnswer);


          // console.log(this.currentQuestion.ans2.question);
          if (this.currentQuestion.ans2.question !== "0") {

            console.log('ans2 2');
            //  this.updateBadges();
            this.setQuestionAnswer(this.currentQuestion.ans2, i=i+1 );

          }
          else {
            if (this.currentQuestion.ans2.question == "0") {
              //   this.updateBadges();
            }
            console.log('ans2 outside');
            this.queGrp.getChildren().forEach(child => {
              child.setVisible(false);
            });
            this.registry.set(this.questionNumber, this.currentQuestion.ans2.result);

            this.next_btn.setVisible(true);
            this.nextRect.setVisible(true);
            this.nexttext.setVisible(true);
            this.L1_2text.setVisible(true);
           // this.L1_2text = this.add.text(470, 350,'Click on the next button to continue to Level 2', { fontFamily: '"Roboto"' }).setFontSize(20).setColor('black');
            //this.L1text = this.add.text(430, 300,'Great! you have completed level 1', { fontFamily: '"Roboto"' }).setFontSize(35).setColor('black').setFontStyle('bold');;

           this.L1text.setVisible(true);
            ExplanationId = this.currentQuestion.ans2.explanationId;
            Answer1Id = this.currentQuestion.ans2.a1;
            Answer2Id = this.currentQuestion.ans2.a2;
          }
        }, this);

        this.Question1Ans1Txt.once('pointerdown', function () {
          let now2 = Date.now();
        //  AnswerId = queAndAns.ans1.id;
          console.log(AnswerId);
          timeToAnswer.push(now2 - now1);
          console.log(timeToAnswer);


            // console.log(this.currentQuestion.ans1.question);
            if (this.currentQuestion.ans1.question !== "0") {

              console.log('ans1 1');
             // this.updateBadges();
              this.setQuestionAnswer(this.currentQuestion.ans1, i=i+1);
            }
            else {
              if (this.currentQuestion.ans2.question == "0") {
             //   this.updateBadges();
              }


              console.log('ans1 outside');
                this.queGrp.getChildren().forEach(child => {
                    child.setVisible(false);
                });
                this.registry.set(this.questionNumber, this.currentQuestion.ans1.result);

                this.next_btn.setVisible(true);
              this.nexttext.setVisible(true);
              this.L1text.setVisible(true);
              this.L1_2text.setVisible(true);

              this.nextRect.setVisible(true);
              ExplanationId = this.currentQuestion.ans1.explanationId;
              Answer1Id = this.currentQuestion.ans1.a1;
              Answer2Id = this.currentQuestion.ans1.a2;
            }
        }, this);

        this.Question1Ans2Txt.once('pointerdown', function () {
          let now2 = Date.now();

          // AnswerId = queAndAns.ans2.id;
          timeToAnswer.push(now2 - now1);
          console.log(timeToAnswer);


            // console.log(this.currentQuestion.ans2.question);
            if (this.currentQuestion.ans2.question !== "0") {

              console.log('ans2 2');
            //  this.updateBadges();
              this.setQuestionAnswer(this.currentQuestion.ans2, i=i+1 );

            }
            else {
              if (this.currentQuestion.ans2.question == "0") {
             //   this.updateBadges();
              }
              console.log('ans2 outside');
                this.queGrp.getChildren().forEach(child => {
                    child.setVisible(false);
                });
                this.registry.set(this.questionNumber, this.currentQuestion.ans2.result);

                this.next_btn.setVisible(true);
                this.nextRect.setVisible(true);
              this.nexttext.setVisible(true);
              this.L1_2text.setVisible(true);

              this.L1text.setVisible(true);
              ExplanationId = this.currentQuestion.ans2.explanationId;
              Answer1Id = this.currentQuestion.ans2.a1;
              Answer2Id = this.currentQuestion.ans2.a2;
            }
        }, this);
    }

    updateBadges() {
      this.ASGpostUserAnswerEvent = document.createEvent('CustomEvent');
      this.ASGpostUserAnswerEvent.initCustomEvent('ASGpostUserAnswer');
      window.dispatchEvent(this.ASGpostUserAnswerEvent);}




    disableInput() {
        this.Question1Ans1Txt.disableInteractive();
        this.Question1Ans2Txt.disableInteractive();
    }

    enableInput() {
        this.Question1Ans1Txt.setInteractive();
        this.Question1Ans2Txt.setInteractive();
    }
}

class ScoreDisplay extends Phaser.Scene {
    constructor() {
        super({ key: "ScoreDisplay" })
    }

    create() {

        var fontSize = 28;
        var fontColor = 'black';
        var totalBalloonText = 'Total Balloons: ';
        var totalBalloonMissedText = 'Balloons Missed: ';
        var SuccessRateText = 'Success Rate: ';
        this.scene.run("UIScene");


      this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);
        this.titleRect = this.add.rectangle(150, 180, 1050, 90, 0xffffff, 0.50).setOrigin(0, 0);
        this.descRect = this.add.rectangle(150, 180, 1050, 430, 0xffffff, 0.50).setOrigin(0, 0);


        this.timesUpTxt = this.add.text(580, 200, "TIME'S UP!", { fontFamily: '"Roboto"' })
            .setFontSize(40)
            .setColor('black');

        this.TotalBalloonTxt = this.add.text(350, 300, 'Total Balloons', { fontFamily: '"Roboto"' })
            .setFontSize(fontSize)
            .setColor(fontColor);

        this.balloonMissedTxt = this.add.text(350, this.TotalBalloonTxt.getBottomRight().y + 30, "Balloons Missed", { fontFamily: '"Roboto"' })
            .setFontSize(fontSize)
            .setColor(fontColor);

        this.SuccessRateTxt = this.add.text(350, this.balloonMissedTxt.getBottomRight().y + 30, "Success Rate", { fontFamily: '"Roboto"' })
            .setFontSize(fontSize)
            .setColor(fontColor);

        this.next_btn = this.add.sprite(680, this.SuccessRateTxt.getBottomRight().y + 90, "next_btn").setInteractive().setScale(1.5);
        this.nexttext = this.add.text(653, this.SuccessRateTxt.getBottomRight().y + 75,'Next', { fontFamily: '"Roboto"' }).setFontSize(25).setColor('black');


      this.next_btn.on('pointerdown', function () {
            this.registry.set('QuestionScene', 'QuestionAndAnswer');
            this.scene.start('QuestionAndAnswer');
        }, this);

        this.totalBalloonMissed = this.registry.get('totalBalloonMissed');
        this.totalBalloon = this.registry.get('totalBalloon');
        this.successRate = ((this.totalBalloon - this.totalBalloonMissed) * 100) / this.totalBalloon;

        this.successRate = parseFloat((this.successRate).toFixed(2));

        this.TotalBallon = this.add.text(850, 300, this.totalBalloon,{ fontFamily: '"Roboto"' } ).setFontSize(fontSize)
          .setColor(fontColor);

      this.BallonMissed = this.add.text(850, this.TotalBalloonTxt.getBottomRight().y + 30, this.totalBalloonMissed,{ fontFamily: '"Roboto"' } ).setFontSize(fontSize)
        .setColor(fontColor);

      this.success = this.add.text(850, this.balloonMissedTxt.getBottomRight().y + 30, this.successRate,{ fontFamily: '"Roboto"' } ).setFontSize(fontSize)
        .setColor(fontColor);


      this.semi1 = this.add.text(670, 300, ':',{ fontFamily: '"Roboto"' } ).setFontSize(fontSize)
        .setColor(fontColor);
      this.semi2 =  this.add.text(670, this.TotalBalloonTxt.getBottomRight().y + 30, ':',{ fontFamily: '"Roboto"' } ).setFontSize(fontSize)
        .setColor(fontColor);
      this.semi3 = this.add.text(670, this.balloonMissedTxt.getBottomRight().y + 30, ':',{ fontFamily: '"Roboto"' } ).setFontSize(fontSize)
        .setColor(fontColor);



    }

    update() {

    }
}

class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' })
    }

    preload() {
        this.pause_btn;
        this.play_btn;
    }

    create() {
        // this.pause_btn = this.add.sprite(1260, 680, "pause_btn").setInteractive();

        this.pauseScreen = this.add.group();

        this.whiteAlphaBg = this.add.rectangle(0, 0, 1320 * 2, 740 * 2, 0xffffff, 0.5);

        // this.play_btn = this.add.sprite(1260, 680, "play_btn").setInteractive();

        // this.home_btn = this.add.sprite(this.play_btn.getTopLeft().x - 80, 680, "home_btn").setInteractive();

        // this.restart_btn = this.add.sprite(this.home_btn.getTopLeft().x - 80, 680, "restart_btn").setInteractive();

        this.pauseScreen.add(this.whiteAlphaBg);
        // this.pauseScreen.add(this.play_btn);
        // this.pauseScreen.add(this.home_btn);
        // this.pauseScreen.add(this.restart_btn);

        this.pauseScreen.getChildren().forEach(element => {
            element.setVisible(false);
        });

        // this.pause_btn.on('pointerdown', function () {
        //     this.pauseAllObject();
        // }, this);
        //
        //
        // this.play_btn.on('pointerdown', function () {
        //     this.playAllObject();
        // }, this);

        // this.home_btn.on('pointerdown', function () {
        //     this.scene.stop(this.registry.get('currentScene'));
        //     this.scene.start('HomeScene');
        //     this.registry.set('currentScene','HomeScene');
        // }, this);
        //
        // this.restart_btn.on('pointerdown', function () {
        //     this.scene.stop(this.registry.get('currentScene'));
        //     this.scene.start(this.registry.get('currentScene'));
        // }, this);

    }

    rstart = function() {
      timeToAnswer = [];
      console.log(timeToAnswer);
       this.scene.stop(this.registry.get('currentScene'));
      this.scene.stop(this.registry.get('QuestionScene'));
      this.scene.stop(this.registry.get('ParallelScene'));
      this.scene.stop('PERSONALISATION');
      this.scene.stop('PERMANENCE');
      this.scene.stop('pervasiveness');
      this.scene.stop('UserResult');


      this.scene.start('HomeScene');
        this.registry.set('currentScene','HomeScene');
    };

    pauseAllObject = function () {
        this.scene.pause(this.registry.get('currentScene'));
        this.scene.pause(this.registry.get('ParallelScene'));
      this.scene.pause(this.registry.get('QuestionScene'));

      console.log(this.registry.get('QuestionScene'));
        this.pauseScreen.getChildren().forEach(element => {
            element.setVisible(true);
            console.log(element);
        });
    };

    playAllObject = function() {
        this.pauseScreen.getChildren().forEach(element => {
            element.setVisible(false);
        });
        this.scene.resume(this.registry.get('currentScene'));
      this.scene.resume(this.registry.get('ParallelScene'));
      this.scene.resume(this.registry.get('QuestionScene'));

;
    };

    // pause = function() {
    //   this.scene.pause('ScoreDisplay');
    //   console.log('hua h');
    //
    //   this.add.rectangle(0, 0, 1320 * 2, 740 * 2, 0xffffff, 0.5);
    // }
    //

    update() {

    }
}



class Personalisation extends Phaser.Scene {
  updateExplanation;
  constructor() {
    super({ key: "PERSONALISATION" })
  }

  create() {
    var fontSize = 25;
    var fontColor = 'black';
    var fontWrapWidth = 1250;
    var space = 15;

    this.result = {
      "que1": {
        1 :  ASGExplanations.results[0].explanation_text,

        2 :  ASGExplanations.results[1].explanation_text,

        3 :  ASGExplanations.results[2].explanation_text,

        4 :  ASGExplanations.results[3].explanation_text,
      }
    };

    this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);
    this.titleRect = this.add.rectangle(150, 150, 1050, 460, 0xffffff, 0.70).setOrigin(0, 0);


    this.personalisationTitleTxt = this.add.text(170, 170, "Personalisation", { fontFamily: '"Roboto"' })
      .setFontSize(30)
      .setColor(fontColor)
      .setWordWrapWidth(fontWrapWidth)
      .setFontStyle('bold');

    this.personalisationDescriptionTxt = this.add.text(170, this.personalisationTitleTxt.getBottomRight().y + space, this.result.que1[this.registry.get('que1')], { fontFamily: '"Roboto"' })
      .setFontSize(fontSize)
      .setColor(fontColor)
      .setWordWrapWidth(fontWrapWidth);


    this.next_btn = this.add.sprite(1080, 530, "next_btn").setInteractive({ useHandCursor: true }).setScale(1.5);
    this.nexttext = this.add.text(1053, 515,'Next', { fontFamily: '"Roboto"' }).setFontSize(25).setColor('black');



    this.next_btn.on('pointerdown', function () {
      this.scene.stop();
      this.updateExplanation();


        this.scene.start('PERMANENCE');

    }, this);

    this.updateExplanation = function () {


      this.ASGpostUserExplanationEvent = document.createEvent('CustomEvent');
      this.ASGpostUserExplanationEvent.initCustomEvent('ASGpostUserExplanation');
      window.dispatchEvent(this.ASGpostUserExplanationEvent);}





  }
}





class Permanence extends Phaser.Scene {
  constructor() {
    super({ key: "PERMANENCE" })
  }

  create() {
    var fontSize = 25;
    var fontColor = 'black';
    var fontWrapWidth = 1250;
    var space = 15;



    this.result = {
      "que2": {
        1 :  ASGExplanations.results[4].explanation_text,

        2 :  ASGExplanations.results[5].explanation_text,

        3 :  ASGExplanations.results[6].explanation_text,

        4 :  ASGExplanations.results[7].explanation_text,
      }
    };

    this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);
    this.titleRect = this.add.rectangle(150, 150, 1050, 460, 0xffffff, 0.70).setOrigin(0, 0);


    this.permanenceTitleTxt = this.add.text(170, 170, 'Permanence', { fontFamily: '"Roboto"' })
      .setFontSize(30)
      .setColor(fontColor)
      .setWordWrapWidth(fontWrapWidth)
      .setFontStyle('bold');

    this.permanenceDescriptionTxt = this.add.text(170, this.permanenceTitleTxt.getBottomRight().y + space, this.result.que2[this.registry.get('que2')], { fontFamily: '"Roboto"' })
      .setFontSize(fontSize)
      .setColor(fontColor)
      .setWordWrapWidth(fontWrapWidth);


    this.next_btn = this.add.sprite(1080, 530, "next_btn").setInteractive({ useHandCursor: true }).setScale(1.5);
    this.nexttext = this.add.text(1053, 515,'Next', { fontFamily: '"Roboto"' }).setFontSize(25).setColor('black');
    this.backtext = this.add.text(900, 515,'Back', { fontFamily: '"Roboto"' }).setFontSize(25).setColor('black').setInteractive();

    this.backtext.on('pointerdown', function () {
      this.scene.stop();

      this.scene.start('PERSONALISATION');

    }, this);


    this.next_btn.on('pointerdown', function () {
      this.scene.stop();

      this.scene.start('pervasiveness');

    }, this);

  }
}


class Pervasiveness extends Phaser.Scene {
  constructor() {
    super({ key: "pervasiveness" })
  }

  create() {
    var fontSize = 25;
    var fontColor = 'black';
    var fontWrapWidth = 1250;
    var space = 15;

    this.result = {
      "que3": {
        1 :  ASGExplanations.results[8].explanation_text,

        2 :  ASGExplanations.results[9].explanation_text,

        3 :  ASGExplanations.results[10].explanation_text,

        4 :  ASGExplanations.results[11].explanation_text,
      }
    };

    this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);
    this.titleRect = this.add.rectangle(150, 150, 1050, 460, 0xffffff, 0.70).setOrigin(0, 0);


    this.pervasivenessTitleTxt = this.add.text(170, 170, "Pervasiveness", { fontFamily: '"Roboto"' })
      .setFontSize(30)
      .setColor(fontColor)
      .setWordWrapWidth(fontWrapWidth)
      .setFontStyle('bold');

    this.pervasivenessDescriptionTxt = this.add.text(170, this.pervasivenessTitleTxt.getBottomRight().y + space, this.result.que3[this.registry.get('que3')], { fontFamily: '"Roboto"' })
      .setFontSize(fontSize)
      .setColor(fontColor)
      .setWordWrapWidth(fontWrapWidth);


    this.next_btn = this.add.sprite(1080, 530, "next_btn").setInteractive({ useHandCursor: true }).setScale(1.5);
    this.nexttext = this.add.text(1053, 515,'Next', { fontFamily: '"Roboto"' }).setFontSize(25).setColor('black');
    this.backtext = this.add.text(900, 515,'Back', { fontFamily: '"Roboto"' }).setFontSize(25).setColor('black').setInteractive();

    this.backtext.on('pointerdown', function () {
      this.scene.stop();

      this.scene.start('PERMANENCE');

    }, this);


    this.next_btn.on('pointerdown', function () {
      this.scene.stop();

      this.scene.start('UserResult');

    }, this);

  }
}


























class UserResult extends Phaser.Scene {
    constructor() {
        super({ key: "UserResult" })
    }

    create() {
      var fontSize = 19;
      var fontColor = 'black';
      var fontWrapWidth = 1250;
      var space = 15;
      //this.ASGPutRequest();


        this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);

      this.titleRect = this.add.rectangle(0, 0, 1330, 530, 0xffffff, 0.70).setOrigin(0, 0);
      this.Rect = this.add.rectangle(0, 530, 1330, 240, 0xffffff, 0.90).setOrigin(0, 0);

      this.openLink = this.add.text(400, 540, "Click here")
        .setFontSize(fontSize)
        .setColor(fontColor)
        .setWordWrapWidth(fontWrapWidth)
        .setInteractive({ useHandCursor: true });

      // let graphics = this.make.graphics() ;
      //
      // // graphics.fillStyle(0xffffff);
      // graphics.fillRect(0, 0, 1330, 740);
      //
      // const mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

      this.textheading = this.add.text(50, 40, 'How does your explanatory style affect you?',{ fontFamily: '"Roboto"' } ).setFontSize(35).setColor('black').setFontStyle('bold');
         this.textfinal = [ 'The way you explain your successes and failures affect how vulnerable you are to depression. People who are most vulnerable to depression' +
           '\n' +
           ' - blame themselves for their failures\n' +
           ' - thinks that if they fail in one area of their life, then it means that they will fail in other areas of their life as well\n' +
           ' - thinks that if they fail once, then they will never be able to succeed.\n' +
           '\n' +
           'To become less vulnerable to depression remember that -' +
           '\n' +
           ' - our successes and failures often depend on many factors that are not in our control. So, before blaming yourself for your failure, think about what else could have affected the outcome.\n' +
           ' - if you fail once that does not mean that you are going to be a life long failure. Most things in life depend on skills that you can learn and improve upon.\n' +
           ' - if you fail in one area of your life that does not mean that you are doomed to fail in other areas as well.\n' +
           '\n' +
           'So, the next time you feel upset about a failure, think about how you are explaining your failure.' ];


         let text = this.add.text(50, 100, this.textfinal, {  fontFamily: '"Roboto"' , wordWrap: { width: 1250 } }).setFontSize(25).setColor('black');
      //text.setMask(mask);

      //this.play = this.add.rectangle(200, 100, 60, 30, 0x0000ff );
      //this.play.backgroundColor(255,255,100);

      //let zone = this.add.zone(0, 0, 1330, 740).setOrigin(0).setInteractive();

     // zone.on('pointermove', function (pointer) {
     //
     //    if (pointer.isDown)
     //    {
     //      text.y += (pointer.velocity.y / 10);
     //
     //      text.y = Phaser.Math.Clamp(text.y, -600, 100);
     //    }
     //
     //  });

      this.addtext = this.add.text(50,540,'To learn more about explanatory style',{fontFamily: '"Roboto"' }).setFontSize(19).setColor('black');



        this.openLink.once("pointerdown",function(){
            this.openWindow();
        },this);
      console.log(ASGFeedback);
      if (ASGFeedback) {

        this.gameFeedbackPopup();
      }


      this.GoToHome = this.add.sprite(400, 640, "GoToHome").setInteractive({ useHandCursor: true }).setScale(0.6);
      this.PlayAgain = this.add.sprite(900, 640, "PlayAgain").setInteractive({ useHandCursor: true }).setScale(0.6);

      this.GoToHome.on('pointerdown', function () {
        this.scene.stop();
        this.ASGPutRequest();
        this.ASGGoHome();

      }, this);

      this.PlayAgain.on('pointerdown', function () {
        this.scene.stop();
        this.ASGPutRequest();
        timeToAnswer = [];
        console.log(timeToAnswer);
        this.scene.stop(this.registry.get('currentScene'));
        this.scene.stop(this.registry.get('QuestionScene'));
        this.scene.stop(this.registry.get('ParallelScene'));
        this.scene.stop('PERSONALISATION');
        this.scene.stop('PERMANENCE');
        this.scene.stop('pervasiveness');
        this.scene.stop('UserResult');


        this.scene.start('HomeScene');
        this.registry.set('currentScene','HomeScene');

      }, this);

    }


  feedbackEvent;

  gameFeedbackPopup() {
    this.feedbackEvent = document.createEvent("CustomEvent");
    this.feedbackEvent.initCustomEvent("Feedback");
    window.dispatchEvent(this.feedbackEvent);
  }

  ASGPutEvent;

  ASGPutRequest() {
    this.ASGPutEvent = document.createEvent("CustomEvent");
    this.ASGPutEvent.initCustomEvent("ASGPut");
    window.dispatchEvent(this.ASGPutEvent);
  }

  ASGGoHomeEvent;

  ASGGoHome() {
    this.ASGGoHomeEvent = document.createEvent("CustomEvent");
    this.ASGGoHomeEvent.initCustomEvent("GoHome");
    window.dispatchEvent(this.ASGGoHomeEvent);
  }



  openWindow() {
        console.log('opening')
        var result = window.open('./assets/games/Attribution-style-game/src/assets/EXPLANATORY%20STYLE.pdf');
        console.log('result', result);
    }

    update() {

    }
}


function conf(DEFAULT_WIDTH, DEFAULT_HEIGHT){
  backgroundImage: "#000000"
  this.scale = {
    mode: Phaser.Scale.FIT,
    parent: "attGame",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  };
  this.physics= {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  };
/*
  this.scene = [UserResult, QuestionAndAnswer, ScoreDisplay, UIScene, LevelThree, LevelTwo, LevelOne, HomeScene, PreloadScene];
*/
        this.scene = [PreloadScene, HomeScene, LevelOne, LevelTwo, LevelThree, UIScene, ScoreDisplay, QuestionAndAnswer,Personalisation,Permanence,Pervasiveness,UserResult];

};

 var ASGAnswer;
 var ASGQuestions;
 var ASGExplanations;
 var ASGFeedback;
 var ASGUserPerformance;
 var ASGPostIndividualAnswer;
 var ASGPostExplanation;
 var timeToAnswer = [];
 var level;
 var ASGLevelId;
 var ASGTotalBaloons;
 var ASGBalloonsBurst;
 var ASGArrowsFired;
  var AnswerId;
 var TimeTakenToAnswer;
  var Answer1Id;
  var Answer2Id;
  var ExplanationId;





var AttributeGame = function () {
  const DEFAULT_WIDTH = 1320;
  const DEFAULT_HEIGHT = 740;
  var con = new conf(DEFAULT_WIDTH, DEFAULT_HEIGHT);

  return new Phaser.Game(con);

};




