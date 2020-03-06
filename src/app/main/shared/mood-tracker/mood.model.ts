export class Mood {
  constructor(
    public emotion: string,
    public range = 2,
    public isChecked = false,
  ) {}
}
