import { VideoItem } from '@/main/extra-resources/shared/video.model';

export class MindfulnessVideoItem {
  constructor(
    public id: number,
    public duration: string,
    public type: string,
    public resource_video: VideoItem,
  ) {}
}
