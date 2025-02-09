export class RefreshTokenResponseSchema {
  refreshToken!: string;
  accessToken!: string;
  tokenType: string = "Bearer";

  constructor(refreshToken: string, accessToken: string) {
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
  }
}
