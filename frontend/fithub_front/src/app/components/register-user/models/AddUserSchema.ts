export class AddUserSchema {
  email: string = '';

  phoneNumber: string = '';

  fullName: string = '';

  userName: string = '';

  password: string = '';

  constructor(
    email: string,
    phoneNumber: string,
    fullName: string,
    userName: string,
    password: string
  ) {
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.fullName = fullName;
    this.userName = userName;
    this.password = password;
  }


}
