export class LoginResponseSchema {
  accessToken: string;
  refreshToken: string;
  userId: number;
  username: string;
  accessTokenType: string;
  constructor(accessToken: string, refreshToken: string, userId: number, username: string, accessTokenType: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.userId = userId;
    this.username = username;
    this.accessTokenType = accessTokenType;

  }
}
