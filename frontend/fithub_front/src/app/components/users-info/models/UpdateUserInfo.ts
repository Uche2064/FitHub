export class UpdateUserInfo {
  userName: string;
  email: string;
  fullName: string;
  phone: string;

  constructor(userName: string = '', email: string = '', fullName: string = '', phone: string = '') {
      this.userName = userName;
      this.email = email;
      this.fullName = fullName;
      this.phone = phone;
  }
}
