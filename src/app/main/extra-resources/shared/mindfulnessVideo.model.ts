import {VideoItem} from '@/main/extra-resources/shared/video.model';

export class MindfulnessVideoItem {
  constructor(
    public id: number,
    public duration: string,
    public type: string,
    public resource_video: VideoItem,

    // public title: string,
    // public url: string,
    // public preview_img: string,
  ) {
    // this.id = id;
    // this.title = title;
    // this.url = url;
  }
}
