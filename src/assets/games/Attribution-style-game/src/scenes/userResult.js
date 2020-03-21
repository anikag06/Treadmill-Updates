export default class UserResult extends Phaser.Scene {
    constructor() {
        super({ key: "UserResult" })
    }

    create() {

        var fontSize = 19;
        var fontColor = 'black';
        var fontWrapWidth = 1250;
        var space = 15;

        this.result = {
            "que1": {
                "1": "When you believed that you played well in the first part of the game, you owed your success to your good gaming skills.\n\nNow, imagine that you have won a competition. Why do YOU think you won? \nIs it because you practiced hard? You had prepared for it for a long time? You deserved to win the competition?  Yes?\n\nYou tend to believe that the cause of a good event happening to you is ‘you’. You have an optimistic explanation in the ‘ME’ aspect.",

                "2": "When you believed that you did not perform well in the first version of the game, you attributed your bad performance to the difficulty of the game.\n\nNow, imagine that you have lost a competition. Why do YOU think you lost? \nIs it because the competition was tough? Your opponents were better? Your luck was not in your favour? Yes?\nYou tend to believe that a bad event happening to you is because of some external factor. You have an optimistic explanation in the ‘ME’ aspect.",

                "3": "When you believed that you played well in the first part of the game, you owed your success to the easy gameplay.\n\nNow, imagine that you have won a competition. Why do YOU think you won?\nIs it because the competition was easy? Your opponents did not perform well? Your luck was in your favour? Yes?\n\nYou tend to believe that the cause of a good event happening to you is an external factor. You have a pessimistic explanation in the ‘ME’ aspect. \n\nHere’s a secret: The game is not as easy as it seemed to be. So, if you think you played well, you’re pretty good at it!",

                "4": "When you believed that you did not perform well in the first version of the game, you also believed you are not good at any such game.\n\nNow, imagine that you have lost a competition. Why do YOU think you lost?\nIs it because you aren’t good enough? You aren’t good at anything? You keep failing at anything you do? Yes?\n\nYou tend to believe that the cause of a bad event happening to you is ‘you’. You have a pessimistic explanation in the ‘ME’ aspect.\nBut hey, maybe the odds were just not in your favour!"
            },
            "que2": {
                "1": "After the second game you thought you performed well in the game and that your performance will get better every time you play.\n\nNow, imagine that you have performed well in an interview that you applied for.\nDo you always interview well? Are you always confident during interviews? \n\nYou tend to believe that the cause of a good event is permanent and will always happen. You have an ‘optimistic’ explanation in ‘Time’ aspect.",

                "2": "After the second game when you believed that your performance was not good, you also said that it will improve with time.\n\nNow, imagine that you have not performed well in an interview that you applied for.\nDo you think it will get better next time? Did you mess up just one time?\n\nYou tend to believe that the cause of a bad event is temporary and will improve with time. You have an ‘optimistic’ explanation in ‘Time’ aspect.",

                "3": "After the second game you thought you performed well in the game, but you also thought it was just a one-time thing and might not happen again.\n\nNow, imagine that you have performed well in an interview that you applied for.\nWas it because you somehow felt confident this one-time? Or it was your lucky day? Other interviews will not go well?\n\nYou tend to believe that the cause of a good event is temporary and will not happen again. You have an ‘pessimistic’ explanation in ‘Time’ aspect.",

                "4": "After the second game when you believed that your performance was not good, you also said that it will not improve and can never be good.\n\nNow, imagine that you have not performed well in an interview that you applied for.\nAre you convinced that they’ll always go bad? You cannot interview well? You will always mess up?\n\nYou tend to believe that the cause of a bad event is permanent and will always happen. You have an ‘pessimistic’ explanation in ‘Time’ aspect"
            },
            "que3": {
                "1": "After the third game you believed you have performed well in this game and that you’ll be able to perform well in any other game that is given to you.\n\nNow, imagine that your friend asks you for an advice and you were able to help. Your friend is thankful to you. \nDo you think you always give useful advices? Are you good at that?\n\nYou tend to believe that you can be good at anything that you do. You have an ‘optimistic’ style in ‘Space’ aspect.",

                "2": "After the third game you believed you have performed bad in this game but also that you’ll be able to perform well in any other game that is given to you.\n\nNow, imagine that your friend asks you for an advice and you were not able to help.\nDo you think it was because you did not know much about the topic, he asked advice in? You could have helped if you had some knowledge about it?\n\nYou tend to believe that if not one, you can do better at any other activity. You have an ‘optimistic’ style in ‘Space’ aspect.",

                "3": "After the third game you believed you have performed well in this game but also that you’ll not be able to perform well in any other game that is given to you.\n\nNow, imagine that your friend asks you for an advice and you were able to help. Your friend is thankful to you.\nDo you think you were able to help because you’re an expert in that field? Had it been something else you wouldn’t have been to help?\n\nYou tend to believe that you can be good at only a few things you do. You have an ‘pessimistic’ style in ‘Space’ aspect.",

                "4": "After the third game you believed you have performed bad in this game and will perform bad in any other game that is given to you.\n\nNow, imagine that your friend asks you for an advice and you were not able to help.\nDo you think you’re not good at giving any sort of advice?\n\nYou tend to believe that you cannot be good at anything you do. You have an ‘pessimistic’ style in ‘Space’ aspect."
            }
        };;

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
