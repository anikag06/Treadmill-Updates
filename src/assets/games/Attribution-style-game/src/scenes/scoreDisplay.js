export default class ScoreDisplay extends Phaser.Scene {
    constructor() {
        super({ key: "ScoreDisplay" })
    }

    create() {

        var fontSize = 28;
        var fontColor = 'black';
        var totalBalloonText = 'Total Balloons: ';
        var totalBalloonMissedText = 'Balloons Missed: ';
        var SuccessRateText = 'Success Rate: ';

        this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);
        this.titleRect = this.add.rectangle(350, 200, 650, 80, 0xffffff, 0.50).setOrigin(0, 0);
        this.descRect = this.add.rectangle(350, 200, 650, 330, 0xffffff, 0.50).setOrigin(0, 0);

        this.next_btn = this.add.sprite(1260, 680, "next_btn").setInteractive();

        this.timesUpTxt = this.add.text(570, 220, "TIME'S UP!")
            .setFontSize(40)
            .setColor('black');

        this.TotalBalloonTxt = this.add.text(380, 330, 'Total Balloons: 00')
            .setFontSize(fontSize)
            .setColor(fontColor);

        this.balloonMissedTxt = this.add.text(380, this.TotalBalloonTxt.getBottomRight().y + 30, "Balloons Missed: 00")
            .setFontSize(fontSize)
            .setColor(fontColor);

        this.SuccessRateTxt = this.add.text(380, this.balloonMissedTxt.getBottomRight().y + 30, "Success Rate: 00%")
            .setFontSize(fontSize)
            .setColor(fontColor);

        this.next_btn.on('pointerdown', function () {
            this.scene.start('QuestionAndAnswer');
        }, this);

        this.totalBalloonMissed = this.registry.get('totalBalloonMissed');
        this.totalBalloon = this.registry.get('totalBalloon');
        this.successRate = ((this.totalBalloon - this.totalBalloonMissed) * 100) / this.totalBalloon;

        this.successRate = parseFloat((this.successRate).toFixed(2));

        this.TotalBalloonTxt.setText(totalBalloonText + this.totalBalloon);
        this.balloonMissedTxt.setText(totalBalloonMissedText + this.totalBalloonMissed);
        this.SuccessRateTxt.setText(SuccessRateText + this.successRate + "%");

    }

    update() {

    }
}