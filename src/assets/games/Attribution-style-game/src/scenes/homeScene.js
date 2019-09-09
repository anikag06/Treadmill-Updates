// class HomeScene extends Phaser.Scene {
//     constructor() {
//         super({ key: 'HomeScene' })
//     }

//     create() {
//         this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);
//         this.play_btn = this.add.sprite(650, 370, "play_btn").setInteractive();

//         this.play_btn.once('pointerdown', function () {
//             this.scene.stop();
//             this.scene.start('LevelOne');
//             this.registry.set('currentScene', 'LevelOne');
//         }, this);
//     }

//     update() {

//     }
// }