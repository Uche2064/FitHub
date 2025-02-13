export class LoginResponseSchema {
  accessToken: string;
  refreshToken: string;
  userId: number;
  userName: string;
  accessTokenType: string;
  constructor(accessToken: string, refreshToken: string, userId: number, userName: string, accessTokenType: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.userId = userId;
    this.userName = userName;
    this.accessTokenType = accessTokenType;

  }
}
