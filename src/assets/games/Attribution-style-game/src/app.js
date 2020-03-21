
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

   }

   update() {

   }
}

class LevelOne extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelOne' })
    }

    create() {

        this.lastFired = 0;

        // Total Time given to player
        this.totalTime = 5;

        this.totalBalloon = 0;
        this.totalBalloonBlown = 0;
        this.totalBalloonMissed = 0;

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
                    this.registry.set('totalBalloonMissed', 30 - this.totalBalloonBlown);
                    this.registry.set('totalBalloon', 30);
                    this.registry.set('ParallelScene', 'ScoreDisplay');
                    this.scene.start('ScoreDisplay');
                    this.registry.set('currentScene', 'LevelTwo');
                }
            },
            callbackScope: this.scene,
            loop: true
        });
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

        this.lastFired = 0;

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
                    this.gameOverTxt.setVisible(true);
                    this.registry.set('questionNumber', '2');
                    this.registry.set('totalBalloonMissed', this.totalBalloon - this.totalBalloonBlown);
                    this.registry.set('totalBalloon', this.totalBalloon);
                    this.scene.stop();
                    this.scene.start('ScoreDisplay');
                    this.registry.set('currentScene', 'LevelThree');
                }
            },
            callbackScope: this.scene,
            loop: true
        });
    }

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

        this.lastFired = 0;

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
                    this.gameOverTxt.setVisible(true);
                    this.registry.set('questionNumber', '3');
                    this.registry.set('totalBalloonMissed', this.totalBalloon - this.totalBalloonBlown);
                    this.registry.set('totalBalloon', this.totalBalloon);
                    this.scene.start('ScoreDisplay');
                    this.registry.set('currentScene', 'LevelThree');
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

        this.Answers = {
            "ans1": "Good",
            "ans2": "Bad",
            "ans3": "I am good at playing games like these.",
            "ans4": "This game was easy to play.",
            "ans5": "I am bad at playing games like these.",
            "ans6": "This game was difficult to play.",
            "ans7": "Yes",
            "ans8": "No",
            "ans9": "No, I somehow played well this time. I am not usually good at games.",
            "ans10": "Yes, I did not play well just one time.",
            "ans11": "No, I cannot be good at it.",
            "ans12": "No, I don't think so."
        };

        this.Questions = {
            "que1": {
                question: "How do you think you have performed in this game?",
                ans1: {
                    ans: this.Answers.ans1,
                    question: "Why do you think you have performed good in this game?",
                    ans1: { ans: this.Answers.ans3, question: "0", result: "1" },
                    ans2: { ans: this.Answers.ans4, question: "0", result: "3" }
                },
                ans2: {
                    ans: this.Answers.ans2,
                    question: "Why do you think you have performed bad in this game?",
                    ans1: { ans: this.Answers.ans5, question: "0", result: "2" },
                    ans2: { ans: this.Answers.ans6, question: "0", result: "4" }
                }
            },
            "que2": {
                question: "Do you think you played well?",
                ans1: {
                    ans: this.Answers.ans7,
                    question: "Do you think your performance will change with time?",
                    ans1: {
                        ans: this.Answers.ans7,
                        question: "Will it improve?",
                        ans1: { ans: this.Answers.ans7, question: "0", result: "1" },
                        ans2: { ans: this.Answers.ans12, question: "0", result: "3" }
                    },
                    ans2: { ans: this.Answers.ans9, question: "0", result: "3" }
                },
                ans2: {
                    ans: this.Answers.ans8,
                    question: "Do you think your performance will change with time?",
                    ans1: { ans: this.Answers.ans10, question: "0", result: "2" },
                    ans2: { ans: this.Answers.ans11, question: "0", result: "4" }
                }
            },
            "que3": {
                question: "How do you think you have performed in this game?",
                ans1: {
                    ans: this.Answers.ans1,
                    question: "Will you be able to perform well at any other game?",
                    ans1: { ans: this.Answers.ans7, question: "0", result: "1" },
                    ans2: { ans: this.Answers.ans8, question: "0", result: "3" }
                },
                ans2: {
                    ans: this.Answers.ans2,
                    question: "Will you perform bad at any other game as well?",
                    ans1: { ans: this.Answers.ans7, question: "0", result: "2" },
                    ans2: { ans: this.Answers.ans8, question: "0", result: "4" }
                }
            }
        };

        this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);
        this.titleRect = this.add.rectangle(150, 180, 1050, 90, 0xffffff, 0.50).setOrigin(0, 0);
        this.descRect = this.add.rectangle(150, 180, 1050, 430, 0xffffff, 0.50).setOrigin(0, 0);
        this.nextRect = this.add.rectangle(150, 180, 1050, 430, 0xffffff, 0.50).setOrigin(0, 0);
        this.next_btn = this.add.sprite(670, 500, "next_btn")
          .setInteractive()
          .setScale(1.5);
        this.next_btn.setVisible(false);
        this.nextRect.setVisible(false);

        this.L1text = this.add.text(430, 300,'Great! you have completed level 1', { fontFamily: '"Roboto"' }).setFontSize(35).setColor('black').setFontStyle('bold');;
      this.L1text.setVisible(false);

      this.L1_2text = this.add.text(470, 350,'Click on the next button to continue to Level 2', { fontFamily: '"Roboto"' }).setFontSize(20).setColor('black');
      this.L1_2text.setVisible(false);

        this.nexttext = this.add.text(645, 485,'Next', { fontFamily: '"Roboto"' }).setFontSize(25).setColor('black');
      this.nexttext.setVisible(false);

        this.titleTxt = this.add.text(170, 210, Title, { fontFamily: '"Roboto"' })
            .setFontSize(25)
            .setColor('black');

        this.Question1Txt = this.add.text(190, 310, this.Questions.que1.question, { fontFamily: '"Roboto"' })
            .setFontSize(fontSize)
            .setColor(fontColor)
            .setFontStyle('bold');

        this.green_balloon = this.add.sprite(220, this.Question1Txt.getBottomRight().y + 55, "green_balloon");
        this.green_balloon.setScale(0.1);

        let ansConfig = {
            fontSize: fontSize,
            fontFamily: '"Roboto"',
            color: fontColor,
            align: 'left',
            // fontStyle: 'bold',
            wordWrap: { width: 800 }
        }

        this.Question1Ans1Txt = this.add.text(this.green_balloon.getBottomRight().x + 20, this.Question1Txt.getBottomRight().y + 40, this.Questions.que1.ans1, ansConfig).setOrigin(0, 0).setInteractive();

        this.red_balloon = this.add.sprite(220, this.green_balloon.getBottomRight().y + 50, "red_balloon").setScale(0.1);

        this.Question1Ans2Txt = this.add.text(this.red_balloon.getBottomRight().x + 20, this.green_balloon.getBottomRight().y + 30, this.Questions.que1.ans2, ansConfig).setOrigin(0, 0).setInteractive();

        this.queGrp = this.add.group([this.titleTxt, this.titleRect, this.descRect, this.green_balloon, this.red_balloon, this.Question1Txt, this.Question1Ans1Txt, this.Question1Ans2Txt]);

        this.next_btn.on('pointerdown', function () {
            this.scene.stop();
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
            this.questionNumber = "que2";
            this.currentQuestion = this.Questions.que2;
        } else if (this.registry.get('questionNumber') === '3') {
            this.questionNumber = "que3";
            this.currentQuestion = this.Questions.que3;
        } else {
            this.questionNumber = "que1";
            this.currentQuestion = this.Questions.que1;
        }
        this.setQuestionAnswer(this.currentQuestion);
    }

    setQuestionAnswer(queAndAns) {
        // Disable Input
        this.disableInput();
        // Enable after some time to stop instant click on next question
        this.time.delayedCall(1000, this.enableInput, null, this);

        this.currentQuestion = queAndAns;
        this.Question1Txt.setText(queAndAns.question, { fontFamily: '"Roboto"' });
        this.Question1Ans1Txt.setText(queAndAns.ans1.ans, { fontFamily: '"Roboto"' });
        this.Question1Ans2Txt.setText(queAndAns.ans2.ans, { fontFamily: '"Roboto"' });

        this.Question1Ans1Txt.once('pointerdown', function () {

            // console.log(this.currentQuestion.ans1.question);
            if (this.currentQuestion.ans1.question !== "0") {
                this.setQuestionAnswer(this.currentQuestion.ans1);
            }
            else {
                this.queGrp.getChildren().forEach(child => {
                    child.setVisible(false);
                });
                this.registry.set(this.questionNumber, this.currentQuestion.ans1.result);
                this.next_btn.setVisible(true);
              this.nexttext.setVisible(true);
              this.L1text.setVisible(true);
              this.L1_2text.setVisible(true);

              this.nextRect.setVisible(true);
            }
        }, this);

        this.Question1Ans2Txt.once('pointerdown', function () {

            // console.log(this.currentQuestion.ans2.question);
            if (this.currentQuestion.ans2.question !== "0") {
                this.setQuestionAnswer(this.currentQuestion.ans2);
            }
            else {
                this.queGrp.getChildren().forEach(child => {
                    child.setVisible(false);
                });
                this.registry.set(this.questionNumber, this.currentQuestion.ans2.result);
                this.next_btn.setVisible(true);
                this.nextRect.setVisible(true);
              this.nexttext.setVisible(true);
              this.L1_2text.setVisible(true);

              this.L1text.setVisible(true);
            }
        }, this);
    }

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
            this.registry.set('QuestionScene', 'QuestionAndAnswer')
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

    restart = function() {
        this.scene.stop(this.registry.get('currentScene'));
        this.scene.start('HomeScene');
        this.registry.set('currentScene','HomeScene');
    }

    pauseAllObject = function () {
        this.scene.pause(this.registry.get('currentScene'));
        this.scene.pause(this.registry.get('ParallelScene'));
      this.scene.pause(this.registry.get('QuestionScene'));

      console.log(this.registry.get('QuestionScene'));
        this.pauseScreen.getChildren().forEach(element => {
            element.setVisible(true);
            console.log(element);
        });
    }

    playAllObject = function() {
        this.pauseScreen.getChildren().forEach(element => {
            element.setVisible(false);
        });
        this.scene.resume(this.registry.get('currentScene'));
      this.scene.resume(this.registry.get('ParallelScene'));
      this.scene.resume(this.registry.get('QuestionScene'));


    }

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
        "1": "When you believed that you played well in the first part of the game, you owed your success\nto your good gaming skills.\nNow, imagine that you have won a competition.Why do YOU think you won?\nIs it because you practiced hard? You had prepared for it for a long time?\nYou deserved to win the competition? Yes?\nYou tend to believe that the cause of a good event happening to you is ‘you’.\nYou have an optimistic explanation in the ‘ME’ aspect.",

        "2": "When you believed that you did not perform well in the first version of the game, you\nattributed your bad performance to the difficulty of the game.\nNow, imagine that you have lost a competition. Why do YOU think you lost?\nIs it because the competition was tough? Your opponents were better?\nYour luck was not in your favour? Yes?\nYou tend to believe that a bad event happening to you is because of some external factor.\nYou have an optimistic explanation in the ‘ME’ aspect.",

        "3": "When you believed that you played well in the first part of the game, you owed your success\nto the easy gameplay.\nNow, imagine that you have won a competition. Why do YOU think you won?\nIs it because the competition was easy? Your opponents did not perform well?\nYour luck was in your favour? Yes?\nYou tend to believe that the cause of a good event happening to you is an external factor.\nYou have a pessimistic explanation in the ‘ME’ aspect.\nHere’s a secret: The game is not as easy as it seemed to be. So, if you think you \nplayed well, you’re pretty good at it!",

        "4": "When you believed that you did not perform well in the first version of the game, you also \n you are not good at any such game.\nNow, imagine that you have lost a competition.\nWhy do YOU think you lost?\nIs it because you aren’t good enough?\nYou aren’t good at anything? You keep failing at anything you do? Yes?\nYou tend to believe that the cause of a bad event happening to you is ‘you’.\nYou have a pessimistic explanation in the ‘ME’ aspect.\nBut hey, maybe the odds were just not in your favour!"
      },
      "que2": {
        "1": "After the second game you thought you performed well in the game and that your performance\nwill get better every time you play.\nNow, imagine that you have performed well in an interview that you applied for.\nDo you always interview well? Are you always confident during interviews?\nYou tend to believe that the cause of a good event is permanent and will always happen.\nYou have an ‘optimistic’ explanation in ‘Time’ aspect.",

        "2": "After the second game when you believed that your performance was not good, you also said\nthat it will improve with time.\nNow, imagine that you have not performed well in an interview that you applied for.\nDo you think it will get better next time? Did you mess up just one time?\nYou tend to believe that the cause of a bad event is temporary and will improve with time.\nYou have an ‘optimistic’ explanation in ‘Time’ aspect.",

        "3": "After the second game you thought you performed well in the game, but you also thought it\nwas just a one-time thing and might not happen again.\nNow, imagine that you have performed well in an interview that you applied for.\nWas it because you somehow felt confident this one-time?\nOr it was your lucky day? Other interviews will not go well?\nYou tend to believe that the cause of a good event is temporary and will not happen again.\nYou have an ‘pessimistic’ explanation in ‘Time’ aspect.",

        "4": "After the second game when you believed that your performance was not good, you also said\nthat it will not improve and can never be good.\nNow, imagine that you have not performed well in an interview that you applied for.\nAre you convinced that they’ll always go bad?\nYou cannot interview well? You will always mess up?\nYou tend to believe that the cause of a bad event is permanent and will always happen.\nYou have an ‘pessimistic’ explanation in ‘Time’ aspect"
      },
      "que3": {
        "1": "After the third game you believed you have performed well in this game and that you’ll be able\nto perform well in any other game that is given to you.\nNow, imagine that your friend asks you for an advice and you were able to help.\nYour friend is thankful to you.\nDo you think you always give useful advices? Are you good at that?\nYou tend to believe that you can be good at anything that you do.\nYou have an ‘optimistic’ style in ‘Space’ aspect.",

        "2": "After the third game you believed you have performed bad in this game but also that you’ll be\nable to perform well in any other game that is given to you.\nNow, imagine that your friend asks you for an advice and you were not able to help.\nDo you think it was because you did not know much about the topic, he asked advice in?\nYou could have helped if you had some knowledge about it?\nYou tend to believe that if not one, you can do better at any other activity.\nYou have an ‘optimistic’ style in ‘Space’ aspect.",

        "3": "After the third game you believed you have performed well in this game but also that you’ll not\nbe able to perform well in any other game that is given to you.\n\nNow, imagine that your friend asks you for an advice and you were able to help. Your friend is thankful to you.\nDo you think you were able to help because you’re an expert in that field? Had it been something else you wouldn’t have been to help?\n\nYou tend to believe that you can be good at only a few things you do. You have an ‘pessimistic’ style in ‘Space’ aspect.",

        "4": "After the third game you believed you have performed bad in this game and will perform bad in\nany other game that is given to you.\nNow, imagine that your friend asks you for an advice and you were not able to help.\nDo you think you’re not good at giving any sort of advice?\nYou tend to believe that you cannot be good at anything you do.\nYou have an ‘pessimistic’ style in ‘Space’ aspect."
      }
    };;

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


    this.next_btn = this.add.sprite(1080, 530, "next_btn").setInteractive().setScale(1.5);
    this.nexttext = this.add.text(1053, 515,'Next', { fontFamily: '"Roboto"' }).setFontSize(25).setColor('black');



    this.next_btn.on('pointerdown', function () {
      this.scene.stop();

        this.scene.start('PERMANENCE');

    }, this);

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
      "que1": {
        "1": "When you believed that you played well in the first part of the game, you owed your success\nto your good gaming skills.\nNow, imagine that you have won a competition.Why do YOU think you won?\nIs it because you practiced hard? You had prepared for it for a long time?\nYou deserved to win the competition? Yes?\nYou tend to believe that the cause of a good event happening to you is ‘you’.\nYou have an optimistic explanation in the ‘ME’ aspect.",

        "2": "When you believed that you did not perform well in the first version of the game, you\nattributed your bad performance to the difficulty of the game.\nNow, imagine that you have lost a competition. Why do YOU think you lost?\nIs it because the competition was tough? Your opponents were better?\nYour luck was not in your favour? Yes?\nYou tend to believe that a bad event happening to you is because of some external factor.\nYou have an optimistic explanation in the ‘ME’ aspect.",

        "3": "When you believed that you played well in the first part of the game, you owed your success\nto the easy gameplay.\nNow, imagine that you have won a competition. Why do YOU think you won?\nIs it because the competition was easy? Your opponents did not perform well?\nYour luck was in your favour? Yes?\nYou tend to believe that the cause of a good event happening to you is an external factor.\nYou have a pessimistic explanation in the ‘ME’ aspect.\nHere’s a secret: The game is not as easy as it seemed to be. So, if you think you \nplayed well, you’re pretty good at it!",

        "4": "When you believed that you did not perform well in the first version of the game, you also \n you are not good at any such game.\nNow, imagine that you have lost a competition.\nWhy do YOU think you lost?\nIs it because you aren’t good enough?\nYou aren’t good at anything? You keep failing at anything you do? Yes?\nYou tend to believe that the cause of a bad event happening to you is ‘you’.\nYou have a pessimistic explanation in the ‘ME’ aspect.\nBut hey, maybe the odds were just not in your favour!"
      },
      "que2": {
        "1": "After the second game you thought you performed well in the game and that your\nperformance will get better every time you play.\nNow, imagine that you have performed well in an interview that you applied for.\nDo you always interview well? Are you always confident during interviews?\nYou tend to believe that the cause of a good event is permanent and will always happen.\nYou have an ‘optimistic’ explanation in ‘Time’ aspect.",

        "2": "After the second game when you believed that your performance was not good, you\n also said that it will improve with time.\nNow, imagine that you have not performed well in an interview that you applied for.\nDo you think it will get better next time? Did you mess up just one time?\nYou tend to believe that the cause of a bad event is temporary and will improve with time.\nYou have an ‘optimistic’ explanation in ‘Time’ aspect.",

        "3": "After the second game you thought you performed well in the game, but you also\n thought it was just a one-time thing and might not happen again.\nNow, imagine that you have performed well in an interview that you applied for.\nWas it because you somehow felt confident this one-time?\nOr it was your lucky day? Other interviews will not go well?\nYou tend to believe that the cause of a good event is temporary and will not happen again.\nYou have an ‘pessimistic’ explanation in ‘Time’ aspect.",

        "4": "After the second game when you believed that your performance was not good, you\n also said that it will not improve and can never be good.\nNow, imagine that you have not performed well in an interview that you applied for.\nAre you convinced that they’ll always go bad?\nYou cannot interview well? You will always mess up?\nYou tend to believe that the cause of a bad event is permanent and will always happen.\nYou have an ‘pessimistic’ explanation in ‘Time’ aspect"
      },
      "que3": {
        "1": "After the third game you believed you have performed well in this game and that you’ll\n be able to perform well in any other game that is given to you.\nNow, imagine that your friend asks you for an advice and you were able to help.\nYour friend is thankful to you.\nDo you think you always give useful advices? Are you good at that?\nYou tend to believe that you can be good at anything that you do.\nYou have an ‘optimistic’ style in ‘Space’ aspect.",

        "2": "After the third game you believed you have performed bad in this game but also that\n you’ll be able to perform well in any other game that is given to you.\nNow, imagine that your friend asks you for an advice and you were not able to help.\nDo you think it was because you did not know much about the topic, he asked advice in?\nYou could have helped if you had some knowledge about it?\nYou tend to believe that if not one, you can do better at any other activity.\nYou have an ‘optimistic’ style in ‘Space’ aspect.",

        "3": "After the third game you believed you have performed well in this game but also that\n you’ll not be able to perform well in any other game that is given to you.\n\nNow, imagine that your friend asks you for an advice and you were able to help. Your friend is thankful to you.\nDo you think you were able to help because you’re an expert in that field? Had it been something else you wouldn’t have been to help?\n\nYou tend to believe that you can be good at only a few things you do. You have an ‘pessimistic’ style in ‘Space’ aspect.",

        "4": "After the third game you believed you have performed bad in this game and will perform\n bad in any other game that is given to you.\nNow, imagine that your friend asks you for an advice and you were not able to help.\nDo you think you’re not good at giving any sort of advice?\nYou tend to believe that you cannot be good at anything you do.\nYou have an ‘pessimistic’ style in ‘Space’ aspect."
      }
    };;

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


    this.next_btn = this.add.sprite(1080, 530, "next_btn").setInteractive().setScale(1.5);
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
      "que1": {
        "1": "When you believed that you played well in the first part of the game, you owed your success\nto your good gaming skills.\nNow, imagine that you have won a competition.Why do YOU think you won?\nIs it because you practiced hard? You had prepared for it for a long time?\nYou deserved to win the competition? Yes?\nYou tend to believe that the cause of a good event happening to you is ‘you’.\nYou have an optimistic explanation in the ‘ME’ aspect.",

        "2": "When you believed that you did not perform well in the first version of the game, you\nattributed your bad performance to the difficulty of the game.\nNow, imagine that you have lost a competition. Why do YOU think you lost?\nIs it because the competition was tough? Your opponents were better?\nYour luck was not in your favour? Yes?\nYou tend to believe that a bad event happening to you is because of some external factor.\nYou have an optimistic explanation in the ‘ME’ aspect.",

        "3": "When you believed that you played well in the first part of the game, you owed your success\nto the easy gameplay.\nNow, imagine that you have won a competition. Why do YOU think you won?\nIs it because the competition was easy? Your opponents did not perform well?\nYour luck was in your favour? Yes?\nYou tend to believe that the cause of a good event happening to you is an external factor.\nYou have a pessimistic explanation in the ‘ME’ aspect.\nHere’s a secret: The game is not as easy as it seemed to be. So, if you think you \nplayed well, you’re pretty good at it!",

        "4": "When you believed that you did not perform well in the first version of the game, you also \n you are not good at any such game.\nNow, imagine that you have lost a competition.\nWhy do YOU think you lost?\nIs it because you aren’t good enough?\nYou aren’t good at anything? You keep failing at anything you do? Yes?\nYou tend to believe that the cause of a bad event happening to you is ‘you’.\nYou have a pessimistic explanation in the ‘ME’ aspect.\nBut hey, maybe the odds were just not in your favour!"
      },
      "que2": {
        "1": "After the second game you thought you performed well in the game and that your\nperformance will get better every time you play.\nNow, imagine that you have performed well in an interview that you applied for.\nDo you always interview well? Are you always confident during interviews?\nYou tend to believe that the cause of a good event is permanent and will always happen.\nYou have an ‘optimistic’ explanation in ‘Time’ aspect.",

        "2": "After the second game when you believed that your performance was not good, you\n also said that it will improve with time.\nNow, imagine that you have not performed well in an interview that you applied for.\nDo you think it will get better next time? Did you mess up just one time?\nYou tend to believe that the cause of a bad event is temporary and will improve with time.\nYou have an ‘optimistic’ explanation in ‘Time’ aspect.",

        "3": "After the second game you thought you performed well in the game, but you also\n thought it was just a one-time thing and might not happen again.\nNow, imagine that you have performed well in an interview that you applied for.\nWas it because you somehow felt confident this one-time?\nOr it was your lucky day? Other interviews will not go well?\nYou tend to believe that the cause of a good event is temporary and will not happen again.\nYou have an ‘pessimistic’ explanation in ‘Time’ aspect.",

        "4": "After the second game when you believed that your performance was not good, you\n also said that it will not improve and can never be good.\nNow, imagine that you have not performed well in an interview that you applied for.\nAre you convinced that they’ll always go bad?\nYou cannot interview well? You will always mess up?\nYou tend to believe that the cause of a bad event is permanent and will always happen.\nYou have an ‘pessimistic’ explanation in ‘Time’ aspect"
      },
      "que3": {
        "1": "After the third game you believed you have performed well in this game and that you’ll\n be able to perform well in any other game that is given to you.\nNow, imagine that your friend asks you for an advice and you were able to help.\nYour friend is thankful to you.\nDo you think you always give useful advices? Are you good at that?\nYou tend to believe that you can be good at anything that you do.\nYou have an ‘optimistic’ style in ‘Space’ aspect.",

        "2": "After the third game you believed you have performed bad in this game but also that\n you’ll be able to perform well in any other game that is given to you.\nNow, imagine that your friend asks you for an advice and you were not able to help.\nDo you think it was because you did not know much about the topic, he asked advice in?\nYou could have helped if you had some knowledge about it?\nYou tend to believe that if not one, you can do better at any other activity.\nYou have an ‘optimistic’ style in ‘Space’ aspect.",

        "3": "After the third game you believed you have performed well in this game but also that\n you’ll not be able to perform well in any other game that is given to you.\nNow, imagine that your friend asks you for an advice and you were able to help.\nYour friend is thankful to you.\nDo you think you were able to help because you’re an expert in that field?\nHad it been something else you wouldn’t have been to help?\nYou tend to believe that you can be good at only a few things you do.\nYou have an ‘pessimistic’ style in ‘Space’ aspect.",

        "4": "After the third game you believed you have performed bad in this game and will perform\n bad in any other game that is given to you.\nNow, imagine that your friend asks you for an advice and you were not able to help.\nDo you think you’re not good at giving any sort of advice?\nYou tend to believe that you cannot be good at anything you do.\nYou have an ‘pessimistic’ style in ‘Space’ aspect."
      }
    };;

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


    this.next_btn = this.add.sprite(1080, 530, "next_btn").setInteractive().setScale(1.5);
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


        this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);
        this.titleRect = this.add.rectangle(0, 0, 1330, 740, 0xffffff, 0.70).setOrigin(0, 0);

         this.openLink = this.add.text(10, 700, "Click here")
        .setFontSize(fontSize)
        .setColor(fontColor)
        .setWordWrapWidth(fontWrapWidth)
        .setInteractive();

         this.textheading = this.add.text(50, 40, 'How does your explanatory style affect you?',{ fontFamily: '"Roboto"' } ).setFontSize(35).setColor('black').setFontStyle('bold');
         this.textfinal = this.add.text(50, 100, 'The way you explain your successes and failures affect how vulnerable you are to depression. People who\nare most vulnerable to depression \n' +
           '\n' +
           ' - blame themselves for their failures\n' +
           ' - thinks that if they fail in one area of their life, then it means that they will fail in other areas of their life as well\n' +
           ' - thinks that if they fail once, then they will never be able to succeed.\n' +
           '\n' +
           'To become less vulnerable to depression remember that - \n' +
           '\n' +
           ' - our successes and failures often depend on many factors that are not in our control.\n   So, before blaming yourself for your failure, think about what else could have affected the outcome.\n' +
           ' - if you fail once that does not mean that you are going to be a life long failure. Most things in life depend on\n   skills that you can learn and improve upon.\n' +
           ' - if you fail in one area of your life that does not mean that you are doomed to fail in other areas as well.\n' +
           '\n' +
           'So, the next time you feel upset about a failure, think about how you are explaining your failure.\n' +
           '\n' +
           'To learn in more details about explanatory style go to this link - ',{ fontFamily: '"Roboto"' } ).setFontSize(25).setColor('black');


        this.openLink.once("pointerdown",function(){
            this.openWindow();
        },this);

    }

    openWindow() {
        console.log('opening')
        var result = window.open('./assets/games/Attribution-style-game/src/assets/EXPLANATORY%20STYLE.pdf', "_self")
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

var AttributeGame = function () {
  const DEFAULT_WIDTH = 1320;
  const DEFAULT_HEIGHT = 740;
  var con = new conf(DEFAULT_WIDTH, DEFAULT_HEIGHT);

  return new Phaser.Game(con);

};




