export class User {
  accessToken: string;
  refreshToken: string;
  username: string;
  id: number;

  constructor(id: number, accessToken: string, refreshToken: string, username: string) {
    this.id = id;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.username = username;
    this.id = id;


  }

}
