export class UpdateCustomerSchema {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;

  constructor(
      firstName: string,
      lastName: string,
      phoneNumber: string,
      username: string
  ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.phoneNumber = phoneNumber;
      this.username = username;
  }
}
