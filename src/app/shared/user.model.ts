export class User {
  constructor(
    public user_id: number,
    public username: string,
    public email: string,
    public avatar: string,
    public is_admin: boolean,
    public is_active: boolean,
    public is_exp: boolean,
  ) {}
}
