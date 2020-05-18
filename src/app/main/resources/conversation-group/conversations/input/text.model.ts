export class Texting {
  // n1!:number;
  // n2!:number;
  // constructor(data1: number, data2: number) {
  //   this.n1 = data1;
  //   this.n2 = data2;
  // }
  message!: string[];
  dialog!: string[];
  show_avatar_image!: string;

  constructor() {
    this.message = [];
    this.dialog = [];
    //this.show_avatar_image = [];
  }
}
