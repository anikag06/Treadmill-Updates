// class LevelThree extends Phaser.Scene {
//     constructor() {
//         super({ key: 'LevelThree' })

//     }

//     create() {

//         this.lastFired = 0;

//         // Total Time given to player
//         this.totalTime = 30;

//         this.totalBalloon = 0;
//         this.totalBalloonBlown = 0;
//         this.totalBalloonMissed = 0;

//         this.BallonsFrame = [
//             "blue_balloon",
//             "green_balloon",
//             "purple_balloon",
//             "red_balloon",
//             "yellow_balloon"
//         ];

//         this.arrowResetTime = 1; //multiple arrow shoot time interval
//         this.isArrowReady = false;
//         this.arrowInAir = false;

//         this.isGameOver = false;
//         this.isGameStart = false;

//         this.dangerBalloonInterval = 3000; // Interval after which danger ballon is fired (in ms)
//         this.freezeTime = 3000; // Bow - arrow will be freezed for this amount of time (in ms)
//         this.isFreezed = false;

//         this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);

//         this.bow = this.add
//             .sprite(100, 650, "bow")
//             .setScale(0.5)
//             .setOrigin(0.15, 0.5);

//         this.bowBend = this.add
//             .sprite(100, 650, "bow_bend")
//             .setScale(0.5)
//             .setOrigin(0.43, 0.5)
//             .setVisible(false);

//         this.arrow = this.physics.add
//             .sprite(100, 650, "arrow")
//             .setScale(0.1)
//             .setOrigin(0, 0.5)
//             .setGravityY(-400);

//         this.arrowPoint = this.physics.add
//             .sprite(100, 650, null)
//             .setScale(0.1)
//             .setGravityY(-400);
//         this.arrowPoint.alpha = 0;

//         let fontSize = 25;
//         let fontColor = 'black';

//         this.balloons = this.physics.add.group({
//             allowGravity: false
//         });

//         let balloon = new Phaser.Class({
//             Extends: Phaser.Physics.Arcade.Image,

//             initialize: function Balloon(scene) {
//                 Phaser.Physics.Arcade.Image.call(
//                     this,
//                     scene,
//                     0,
//                     0,
//                     Phaser.Utils.Array.GetRandom(scene.BallonsFrame)
//                 );

//                 this.speed = Phaser.Math.GetSpeed(Phaser.Math.Between(100, 300), 1);
//             },

//             fire: function (x, y) {
//                 this.alpha = 1;
//                 this.enableBody(true, x, y - 50, true, true);
//                 this.setScale(Phaser.Math.FloatBetween(0.15, 0.3));

//                 this.scene.totalBalloon++;
//             },

//             update: function (time, delta) {
//                 this.y -= this.speed * delta;

//                 if (this.y < -50 || this.y > 950) {
//                     this.disableBody(true, true);

//                     this.scene.totalBalloonMissed++;
//                 }
//             }
//         });

//         this.balloons = this.physics.add.group({
//             classType: balloon,
//             maxSize: 10,
//             allowGravity: false,
//             runChildUpdate: true
//         });

//         this.dangerBalloons = this.physics.add.group({
//             allowGravity: true,
//             gravityY: -450
//         });

//         this.freezeTxt = this.add.text(660, 370, "Freezed!")
//             .setFontSize(60)
//             .setColor('black')
//             .setVisible(false)
//             .setOrigin(0.5);


//         this.ScoreTxt = this.add.text(30, 30, '0')
//             .setFontSize(fontSize)
//             .setColor(fontColor);

//         this.timeTxt = this.add.text(30, this.ScoreTxt.getBottomRight().y + 10, this.totalTime)
//             .setFontSize(fontSize)
//             .setColor(fontColor);

//         this.timeTxtSec = this.add.text(this.timeTxt.getBottomRight().x + 5, this.ScoreTxt.getBottomRight().y + 10, 's')
//             .setFontSize(fontSize)
//             .setColor(fontColor);

//         this.redBalloonTime = this.add.sprite(this.ScoreTxt.getTopRight().x + 30, (this.ScoreTxt.getTopRight().y + this.ScoreTxt.getBottomRight().y) / 2, 'red_balloon').setScale(0.07);

//         this.gameOverTxt = this.add.text(660, 370, "Game Over!")
//             .setFontSize(50)
//             .setColor('black')
//             .setVisible(false)
//             .setOrigin(0.5);

//         this.LevelThreeTxt = this.add.text(660, 370, "Level Three")
//             .setFontSize(100)
//             .setColor('black')
//             .setOrigin(0.5);

//         this.velocityArrow = new Phaser.Math.Vector2();
//         this.line = new Phaser.Geom.Line();

//         this.physics.velocityFromRotation(0.1, 600, this.velocityArrow);

//         this.add.tween({
//             targets: this.LevelThreeTxt,
//             ease: 'Sine.easeInOuts',
//             duration: 1000,
//             alpha: 0,
//             onComplete: () => {
//                 this.LevelThreeTxt.setText("Level Three");
//                 this.doCountDown(3);
//             }
//         });

//         this.scene.run("UIScene");
//     }

//     startGame() {
//         this.isGameStart = true;
//         this.isArrowReady = true;

//         this.input.on('pointermove', this.bowMovement, this);

//         this.input.on('pointerup', this.shootArrow, this);

//         this.input.on('pointerdown', this.prepairToShoot, this);

//         this.gameOverTimer = this.time.addEvent({
//             delay: 1000,
//             callback: () => {
//                 this.totalTime--;
//                 this.timeTxt.setText(this.totalTime);
//                 if (this.totalTime === 0) {
//                     this.isGameOver = true;
//                     this.gameOverTimer.remove();
//                     this.gameOverTxt.setVisible(true);
//                     this.registry.set('questionNumber', '3');
//                     this.registry.set('totalBalloonMissed', this.totalBalloon - this.totalBalloonBlown);
//                     this.registry.set('totalBalloon', this.totalBalloon);
//                     this.scene.start('ScoreDisplay');
//                     this.registry.set('currentScene', 'LevelThree');
//                 }
//             },
//             callbackScope: this.scene,
//             loop: true
//         });

//         this.freezerBalloonLoop = this.time.addEvent({
//             delay: this.dangerBalloonInterval,
//             callback: this.createFreezeBalloon,
//             callbackScope: this,
//             loop: true
//         });
//     }

//     createFreezeBalloon() {
//         if (this.isGameOver) return;

//         // Danger Balloons are given 0.5 alpha
//         this.dangerBalloon = this.physics.add.sprite(Phaser.Math.Between(600, 1200), 850, 'danger_balloon')
//             .setScale(Phaser.Math.FloatBetween(0.4, 0.7));

//         this.dangerBalloons.add(this.dangerBalloon);
//     }

//     bowMovement(pointer) {
//         if (!this.isGameStart) return;
//         if (this.isGameOver) return;
//         if (this.isFreezed) return;

//         this.bowAngle = Phaser.Math.Angle.BetweenPoints(this.bow, pointer);

//         Phaser.Geom.Line.SetToAngle(this.line, this.arrow.x, this.arrow.y, this.bowAngle, 128);
//         this.physics.velocityFromRotation(this.bowAngle, 600, this.velocityArrow);
//         this.bow.rotation = this.bowAngle;
//         this.bowBend.rotation = this.bowAngle;

//         this.arrow.rotation = this.bowAngle;
//     }

//     prepairToShoot() {
//         if (!this.isGameStart) return;
//         if (this.isGameOver) return;
//         if (this.arrowInAir) return;
//         if (this.isFreezed) return;

//         this.bow.setVisible(false);
//         this.bowBend.setVisible(true);
//         this.arrow.setOrigin(0.27, 0.5);
//     }

//     shootArrow() {
//         if (!this.isGameStart) return;
//         if (this.isGameOver) return;
//         if (this.arrowInAir) return;
//         if (!this.isArrowReady) return;
//         if (this.isFreezed) return;

//         this.arrowInAir = true;
//         this.isArrowReady = false;

//         // Arrow deviates at angle between -5 to 5 (angle is in degree)
//         this.arrow.angle += Phaser.Math.Between(-5, 5);

//         this.arrow.setOrigin(0, 0.5);

//         // For Create second temp arrow
//         var arrowSecond = this.physics.add
//             .sprite(100, 650, "arrow")
//             .setScale(0.1)
//             .setOrigin(0, 0.5)
//             .setGravityY(-400);

//         arrowSecond.angle = this.arrow.angle;

//         this.arrow.setVisible(false);

//         var arrowPointTemp = this.physics.add.sprite(100, 650, null)
//             .setScale(0.1)
//             .setOrigin(0, 0.5)
//             .setGravityY(-400);

//         arrowPointTemp.alpha = 0;

//         arrowPointTemp.x = arrowSecond.getTopRight().x;
//         arrowPointTemp.y = (arrowSecond.getTopRight().y + arrowSecond.getBottomRight().y) / 2;

//         arrowSecond.setVelocity(this.velocityArrow.x, this.velocityArrow.y);
//         arrowPointTemp.setVelocity(this.velocityArrow.x, this.velocityArrow.y);

//         this.bowBend.setVisible(false);
//         this.bow.setVisible(true);

//         arrowPointTemp.arrowProperty = arrowSecond;

//         this.physics.add.collider(arrowPointTemp, this.balloons, this.balloonBlowUp, null, this);

//         this.physics.add.collider(arrowPointTemp, this.dangerBalloons, this.dangerBalloonBlowUp, null, this);

//         this.arrowShootTimer = this.time.delayedCall(this.arrowResetTime * 1000, this.reset, [], this);
//     }

//     balloonBlowUp(arrow, balloon) {
//         balloon.setVelocity(0, 0);
//         balloon.alpha = 0;
//         balloon.disableBody(true, true);

//         this.totalBalloonBlown++;
//         this.ScoreTxt.setText(this.totalBalloonBlown);

//         arrow.destroy();
//         arrow.arrowProperty.destroy();
//         balloon.destroy();
//         this.resetArrow();
//     }

//     dangerBalloonBlowUp(arrow, balloon) {
//         balloon.setVelocity(0, 0);
//         balloon.alpha = 0;
//         balloon.disableBody(true, true);

//         arrow.destroy();
//         arrow.arrowProperty.destroy();
//         balloon.destroy();

//         this.freeze();
//         this.resetArrow();
//         this.freezerTimer = this.time.delayedCall(this.freezeTime, this.unFreeze, null, this);
//     }

//     freeze() {
//         this.isFreezed = true;
//         this.freezeTxt.setVisible(true);
//     }

//     unFreeze() {
//         this.isFreezed = false;
//         this.freezeTxt.setVisible(false);
//     }

//     resetArrow() {
//         this.arrow.setOrigin(0, 0.5);
//         this.arrowPoint.enableBody(true, 100, 650, true, true);
//         this.arrow.enableBody(true, 100, 650, true, true);
//         this.arrowInAir = false;

//         this.arrow.rotation = this.bow.rotation;

//         if (this.input.activePointer.isDown) {
//             this.prepairToShoot();
//         }
//         this.bowMovement(this.input.activePointer);
//     }

//     reset() {
//         this.arrowInAir = false;
//         this.isArrowReady = true;
//         this.arrow.setVisible(true);

//         if (this.input.activePointer.isDown) {
//             if (this.isGameOver) return;

//             this.bow.setVisible(false);
//             this.bowBend.setVisible(true);
//             this.arrow.setOrigin(0.27, 0.5);
//         }
//     }

//     update(time, delta) {
//         if (!this.isGameStart) return;
//         if (this.isGameOver) return;

//         if (time > this.lastFired) {
//             let balloon = this.balloons.get();

//             if (balloon) {
//                 balloon.fire(Phaser.Math.Between(600, 1200), 850);

//                 this.lastFired = time + 1000;
//             }
//         }
//     }

//     doCountDown(count, obj) {
//         if (count === -1) {
//             obj.destroy();
//             // Count Down Complete
//             return;
//         }

//         if (!obj) {
//             obj = this.add.text(1320 / 2, 740 / 2, count.toString(), {
//                 fontFamily: 'Anton-Regular',
//                 fontSize: 190,
//                 fill: '#000000',
//                 align: 'center'
//             });
//             obj.setOrigin(0.5, 0.5);
//         }

//         obj.alpha = 1;

//         this.add.tween({
//             targets: obj,
//             ease: 'Sine.easeInOuts',
//             duration: 500,
//             alpha: 1,
//             scaleX: 0.3,
//             scaleY: 0.3,
//             onComplete: () => {
//                 obj.alpha = 0;
//                 obj.setScale(1);
//                 count--;
//                 if (count === 0) {
//                     obj.setText('GO!');
//                     this.time.delayedCall(1000, function () {
//                         this.startGame();
//                     }, [], this);
//                 }
//                 else {
//                     obj.setText(count.toString());
//                 }
//                 this.doCountDown(count, obj);

//             }
//         });
//     }
// }