export default class LevelOne extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelOne' })
    }

    create() {

        this.lastFired = 0;

        // Total Time given to player
        this.totalTime = 30;

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

        let fontSize = 30;
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

        this.ScoreTxt = this.add.text(30, 30, '0')
            .setFontSize(fontSize)
            .setColor(fontColor);

        this.timeTxt = this.add.text(30, this.ScoreTxt.getBottomRight().y + 10, this.totalTime)
            .setFontSize(fontSize)
            .setColor(fontColor);

        this.timeTxtSec = this.add.text(this.timeTxt.getBottomRight().x + 5, this.ScoreTxt.getBottomRight().y + 10, 's')
            .setFontSize(fontSize)
            .setColor(fontColor);

        this.redBalloonTime = this.add.sprite(this.ScoreTxt.getTopRight().x + 30, (this.ScoreTxt.getTopRight().y + this.ScoreTxt.getBottomRight().y) / 2, 'red_balloon').setScale(0.07);

        this.gameOverTxt = this.add.text(660, 370, "Game Over!")
            .setFontSize(50)
            .setColor('black')
            .setVisible(false)
            .setOrigin(0.5);

        this.LevelOneTxt = this.add.text(660, 370, "Level One")
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
                this.LevelOneTxt.setText("Level One");
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
                this.timeTxt.setText(this.totalTime);
                if (this.totalTime === 0) {
                    this.isGameOver = true;
                    this.gameOverTimer.remove();
                    this.gameOverTxt.setVisible(true);
                    this.scene.stop();
                    this.registry.set('questionNumber', '1');
                    this.registry.set('totalBalloonMissed', 30 - this.totalBalloonBlown);
                    this.registry.set('totalBalloon', 30);
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
        this.ScoreTxt.setText(this.totalBalloonBlown);

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
                fontFamily: 'Anton-Regular',
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
