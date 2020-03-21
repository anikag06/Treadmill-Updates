export default class QuestionAndAnswer extends Phaser.Scene {
    constructor() {
        super({ key: "QuestionAndAnswer" })
    }

    create() {
        let fontSize = 25;
        let fontColor = 'black';
        this.currentQuestion;
        this.questionNumber = "que1";

        let Title = "Based on your experience in the previous game, answer\nthe questions that follow.";

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
        this.titleRect = this.add.rectangle(200, 200, 950, 70, 0xffffff, 0.50).setOrigin(0, 0);
        this.descRect = this.add.rectangle(200, 200, 950, 330, 0xffffff, 0.50).setOrigin(0, 0);

        this.next_btn = this.add.sprite(1260, 680, "next_btn").setInteractive();
        this.next_btn.setVisible(false);

        this.titleTxt = this.add.text(260, 210, Title)
            .setFontSize(25)
            .setColor('black')
            .setFontStyle('bold');

        this.Question1Txt = this.add.text(280, 320, this.Questions.que1.question)
            .setFontSize(fontSize)
            .setColor(fontColor)
            .setFontStyle('bold');

        this.green_balloon = this.add.sprite(320, this.Question1Txt.getBottomRight().y + 45, "green_balloon");
        this.green_balloon.setScale(0.07);

        let ansConfig = {
            fontSize: fontSize,
            color: fontColor,
            align: 'left',
            fontStyle: 'bold',
            wordWrap: { width: 800 }
        }

        this.Question1Ans1Txt = this.add.text(this.green_balloon.getBottomRight().x + 20, this.Question1Txt.getBottomRight().y + 30, this.Questions.que1.ans1, ansConfig).setOrigin(0, 0).setInteractive();

        this.red_balloon = this.add.sprite(320, this.green_balloon.getBottomRight().y + 40, "red_balloon").setScale(0.07);

        this.Question1Ans2Txt = this.add.text(this.red_balloon.getBottomRight().x + 20, this.green_balloon.getBottomRight().y + 30, this.Questions.que1.ans2, ansConfig).setOrigin(0, 0).setInteractive();

        this.queGrp = this.add.group([this.titleTxt, this.titleRect, this.descRect, this.green_balloon, this.red_balloon, this.Question1Txt, this.Question1Ans1Txt, this.Question1Ans2Txt]);

        this.next_btn.on('pointerdown', function () {
            this.scene.stop();
            if (this.questionNumber === "que3") {
                this.scene.start('UserResult');
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
        this.Question1Txt.setText(queAndAns.question);
        this.Question1Ans1Txt.setText(queAndAns.ans1.ans);
        this.Question1Ans2Txt.setText(queAndAns.ans2.ans);

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