export default class UserResult extends Phaser.Scene {
    constructor() {
        super({ key: "UserResult" })
    }

    create() {

        var fontSize = 19;
        var fontColor = 'black';
        var fontWrapWidth = 1250;
        var space = 15;

        // this is not used to show the results, the results come from the backend. I haven't removed this because I'm afraid it'll break some other code.
        this.result = {
            "que1": {
                "1": "When you believed that you played well in the first part of the game, you owed your success to your good gaming skills.\n\nNow, imagine that you have won a competition. Why do 'you' think you won? \nIs it because you practiced hard and prepared for it for a long time? If your answer is 'Yes', \n\nyou believe that the cause of a good event happening to you is ‘you’. You have an optimistic explanation style in the ‘PERSONALISATION’ aspect.",

                "2": "When you believed that you did not perform well in the first version of the game, you attributed your bad performance to the difficulty of the game.\n\nNow, imagine that you have lost a competition. Why do 'you' think you lost? \nIs it because the competition was tough or that the luck was not in your favour? If your answer is 'Yes', \n\nyou believe that the cause of a bad event happening to you is some external factor. You have an optimistic explanation style in the ‘PERSONALISATION’ aspect.",

                "3": "When you believed that you played well in the first part of the game, you owed your success to the easy gameplay.\n\nNow, imagine that you have won a competition. Why do 'you' think you won? \nIs it because the competition was easy or that the luck was in your favour? If your answer is 'Yes', \n\nyou believe that the cause of a good event happening to you is an external factor. You have a pessimistic explanation style in the ‘PERSONALISATION’ aspect. \n\nHere’s a secret: The game is not as easy as it seemed to be. So, if you think you played well, you’re pretty good at it!",

                "4": "When you believed that you did not perform well in the first version of the game, you also believed you are not good at any such game.\n\nNow, imagine that you have lost a competition. Why do 'you' think you lost? \nIs it because you think that you aren’t good at anything and you will keep failing at anything you do? If your answer is 'Yes', \n\nyou believe that the cause of a bad event happening to you is ‘you’. You have a pessimistic explanation style in the ‘PERSONALISATION’ aspect.\nBut hey, maybe the odds were just not in your favour!"
            },
            "que2": {
                "1": "After the second game, you thought you performed well in the game and that your performance will get better every time you play.\n\nNow, imagine that you have performed well in a job interview. \nDo you always interview well? Are you always confident during interviews? If your answer is 'Yes', \n\nyou believe that the cause of a good event is permanent. You have an optimistic explanation style in the ‘PERMANENCE’ aspect.",

                "2": "After the second game, you thought that your performance was not good and that it will improve with time.\n\nNow, imagine that you have not performed well in a job interview. \nDo you think it will be better next time? If your answer is 'Yes', \n\nyou believe that the cause of a bad event is temporary and will improve with time. You have an optimistic explanation style in the ‘PERMANENCE’ aspect.",

                "3": "After the second game, you thought you performed well in the game, but you also thought it was just a one-time thing and will not happen again.\n\nNow, imagine that you have performed well in a job interview. \nDo you think it was just luck? If your answer is 'Yes', \n\nyou believe that the cause of a good event is temporary. You have a pessimistic explanation style in the ‘PERMANENCE’ aspect.",

                "4": "After the second game, you thought that your performance was not good and it will not improve.\n\nNow, imagine that you have not performed well in a job interview. \nAre you convinced that you'll never do well in any interview? If your answer is 'Yes', \n\nyou believe that the cause of a bad event is permanent. You have a pessimistic explanation style in the ‘PERMANENCE’ aspect."
            },
            "que3": {
                "1": "After the third game, you believed that you have performed well in this game, and you’ll perform well in any other game that is given to you.\n\nNow, imagine that your friend asks you for advice, and you were able to help. \nDo you think you always give useful advice? If your answer is 'Yes', \n\nyou believe that you can be good at anything that you do. You have an optimistic style in the ‘PERVASIVENESS’ aspect.",

                "2": "After the third game, you believed that you didn't perform well in this game, but you’ll perform well in any other game that is given to you.\n\nNow, imagine that your friend asks you for advice, and you were not able to help. \nDo you think it was because you did not know much about the topic he asked advice for? If your answer is 'Yes', \n\nyou believe that if not one, you can do better at another activity. You have an optimistic style in the ‘PERVASIVENESS’ aspect.",

                "3": "After the third game, you believed that you have performed well in this game, but you’ll not perform well in any other game that is given to you.\n\nNow, imagine that your friend asks you for advice, and you were able to help. \nDo you think you were able to help just because, luckily, you were an expert in that narrow field? If your answer is 'Yes', \n\nyou believe that you can be good at only a few things you do. You have a pessimistic style in the ‘PERVASIVENESS’ aspect.",

                "4": "After the third game, you believed that you didn't perform well in this game, and you'll not perform well in any other game that is given to you.\n\nNow, imagine that your friend asks you for advice, and you were not able to help. \nDo you think you’re not good at giving any sort of advice? If your answer is 'Yes', \n\nyou believe that you cannot be good at anything you do. You have a pessimistic style in the ‘PERVASIVENESS’ aspect."
            }
        };

        this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);
        this.titleRect = this.add.rectangle(0, 0, 1330, 740, 0xffffff, 0.50).setOrigin(0, 0);

        this.openLink = this.add.text(10, 700, "Click here")
            .setFontSize(fontSize)
            .setColor(fontColor)
            .setWordWrapWidth(fontWrapWidth)
            .setInteractive();

        this.personalisationTitleTxt = this.add.text(10, 10, "PERSONALISATION")
            .setFontSize(fontSize)
            .setColor(fontColor)
            .setWordWrapWidth(fontWrapWidth);

        this.personalisationDescriptionTxt = this.add.text(50, this.personalisationTitleTxt.getBottomRight().y + space, this.result.que1[this.registry.get('que1')])
            .setFontSize(fontSize)
            .setColor(fontColor)
            .setWordWrapWidth(fontWrapWidth);

        this.permanenceTitleTxt = this.add.text(10, this.personalisationDescriptionTxt.getBottomRight().y + space, 'PERMANENCE')
            .setFontSize(fontSize)
            .setColor(fontColor)
            .setWordWrapWidth(fontWrapWidth);

        this.permanenceDescriptionTxt = this.add.text(50, this.permanenceTitleTxt.getBottomRight().y + space, this.result.que2[this.registry.get('que2')])
            .setFontSize(fontSize)
            .setColor(fontColor)
            .setWordWrapWidth(fontWrapWidth);

        this.pervasivenessTitleTxt = this.add.text(10, this.permanenceDescriptionTxt.getBottomRight().y + space, "PERVASIVENESS")
            .setFontSize(fontSize)
            .setColor(fontColor)
            .setWordWrapWidth(fontWrapWidth);

        this.pervasivenessDescriptionTxt = this.add.text(50, this.pervasivenessTitleTxt.getBottomRight().y + space, this.result.que3[this.registry.get('que3')])
            .setFontSize(fontSize)
            .setColor(fontColor)
            .setWordWrapWidth(fontWrapWidth);

            this.openLink.once("pointerdown",function(){
                this.scene.stop();
                this.scene.start('PERMANENCE');
            },this);

    }

    openWindow() {
        console.log('opening')
        var result = window.open('./assets/EXPLANATORY%20STYLE.pdf', "_self")
        console.log('result', result);
    }

    update() {

    }
}
