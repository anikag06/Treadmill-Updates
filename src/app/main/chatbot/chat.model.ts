import { Button } from './chat-window/button.model';

export class Chat {
  constructor(
    public message: string,
    public user: boolean,
    public buttons: Button[],
    public mid: string,
    public sid: string,
    public datetime: Date,
    public waiting: boolean,
    public widgets: string[],
    public embed_links: any,
  ) {}
}
