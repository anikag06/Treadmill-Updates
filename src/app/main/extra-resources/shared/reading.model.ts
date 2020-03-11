export class ReadingItem {
  constructor(
    public id: number,
    public title: string,
    public order: number,
    public html_content: string,
    public preview_img: string,
  ) {}
}
