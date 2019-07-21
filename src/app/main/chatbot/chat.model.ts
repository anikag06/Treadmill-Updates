export class Chat {
  constructor(
    public message: string,
    public user: boolean,
    public buttons: any[],
    public mid: string,
    public sid: string,
    public datetime: Date,
  ){}
}
