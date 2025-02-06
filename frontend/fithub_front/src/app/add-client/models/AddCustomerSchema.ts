export class AddCustomerSchema {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userName: string;
  password: string;
  constructor(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    userName: string,
    password: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.userName = userName;
    this.password = password;
  }
}
