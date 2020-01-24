export class FormMessage {
  constructor(
      public emoji: string,
      public header: string,
      public message: string,
      public quote: string,
      public quotedBy: string,
  ) {}
}
