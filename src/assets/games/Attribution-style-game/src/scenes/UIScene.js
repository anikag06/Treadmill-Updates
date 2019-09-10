//  class UIScene extends Phaser.Scene {
//     constructor() {
//         super({ key: 'UIScene' })
//     }

//     preload() {
//         this.pause_btn;
//         this.play_btn;
//     }

//     create() {
//         this.pause_btn = this.add.sprite(1260, 680, "pause_btn").setInteractive();

//         this.pauseScreen = this.add.group();

//         this.whiteAlphaBg = this.add.rectangle(0, 0, 1320 * 2, 740 * 2, 0xffffff, 0.5);

//         this.play_btn = this.add.sprite(1260, 680, "play_btn").setInteractive();

//         this.home_btn = this.add.sprite(this.play_btn.getTopLeft().x - 80, 680, "home_btn").setInteractive();

//         this.restart_btn = this.add.sprite(this.home_btn.getTopLeft().x - 80, 680, "restart_btn").setInteractive();

//         this.pauseScreen.add(this.whiteAlphaBg);
//         this.pauseScreen.add(this.play_btn);
//         this.pauseScreen.add(this.home_btn);
//         this.pauseScreen.add(this.restart_btn);

//         this.pauseScreen.getChildren().forEach(element => {
//             element.setVisible(false);
//         });

//         this.pause_btn.on('pointerdown', function () {
//             this.pauseAllObject();
//         }, this);


//         this.play_btn.on('pointerdown', function () {
//             this.playAllObject();
//         }, this);

//         this.home_btn.on('pointerdown', function () {
//             this.scene.stop(this.registry.get('currentScene'));
//             this.scene.start('HomeScene');
//             this.registry.set('currentScene','HomeScene');
//         }, this);
        
//         this.restart_btn.on('pointerdown', function () {
//             this.scene.stop(this.registry.get('currentScene'));
//             this.scene.start(this.registry.get('currentScene'));
//         }, this);

//     }

//     pauseAllObject() {
//         this.scene.pause(this.registry.get('currentScene'));
//         this.pauseScreen.getChildren().forEach(element => {
//             element.setVisible(true);
//         });
//     }

//     playAllObject() {
//         this.pauseScreen.getChildren().forEach(element => {
//             element.setVisible(false);
//         });
//         this.scene.resume(this.registry.get('currentScene'));
//     }


//     update() {

//     }
// }