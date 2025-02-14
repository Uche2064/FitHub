export class LoginResponseSchema {
  accessToken: string;
  refreshToken: string;
  userId: number;
  userName: string;
  accessTokenType: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  constructor(accessToken: string = '', refreshToken: string ='', userId: number=0, userName: string='', accessTokenType: string='', fullName: string = '', email: string = '', phoneNumber: string = '') {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.userId = userId;
    this.userName = userName;
    this.accessTokenType = accessTokenType;
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }
}
