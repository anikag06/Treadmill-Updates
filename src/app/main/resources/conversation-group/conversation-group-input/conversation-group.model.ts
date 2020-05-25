export class ConversationGroup {
  id!: number;
  title!: string;
  description!: string;
  gender!: string;
  expected_time!: number;
  avatar_name!: string;
  occupation!: string;

  constructor(
    id: number,
    title: string,
    description: string,
    gender: string,
    expected_time: number,
    avatar_name: string,
    occupation: string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.gender = gender;
    this.expected_time = expected_time;
    this.avatar_name = avatar_name;
    this.occupation = occupation;
  }
}
