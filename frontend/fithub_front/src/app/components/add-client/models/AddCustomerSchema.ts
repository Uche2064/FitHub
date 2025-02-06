export class AddCustomerSchema {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userName: string;
  registrationDate: Date;
  constructor(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    userName: string,
    registrationDate: Date
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.userName = userName;
    this.registrationDate = registrationDate;
  }
}
