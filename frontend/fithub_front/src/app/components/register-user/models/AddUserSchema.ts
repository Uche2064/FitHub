export class AddUserSchema {
  email: string = '';

  phoneNumber: string = '';

  fullName: string = '';

  username: string = '';

  password: string = '';

  constructor(
    email: string,
    phoneNumber: string,
    fullName: string,
    username: string,
    password: string
  ) {
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.fullName = fullName;
    this.username = username;
    this.password = password;
  }
}
