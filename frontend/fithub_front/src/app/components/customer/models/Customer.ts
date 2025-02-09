export class CustomerDto {
  id: number;
  lastName: string;
  firstName: string;
  registrationDate: Date;
  phoneNumber: string;
  username: string;
  activeSubscription: boolean;

  constructor(
    id: number,
    lastName: string,
    firstName: string,
    registrationDate: Date,
    phoneNumber: string,
    username: string,
    activeSubscription: boolean
  ) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.registrationDate = registrationDate;
    this.phoneNumber = phoneNumber;
    this.username = username;
    this.activeSubscription = activeSubscription;
  }
}
