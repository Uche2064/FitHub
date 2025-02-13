export class RefreshTokenResponseSchema {
  accessToken!: string;
  tokenType: string = "Bearer";

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
