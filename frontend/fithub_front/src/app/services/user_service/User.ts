export class User {
  accessToken: string;
  refreshToken: string;
  userName: string;
  id: number;

  constructor(id: number, accessToken: string, refreshToken: string, userName: string) {
    this.id = id;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.userName = userName;
    this.id = id;


  }

}
