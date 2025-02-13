export class CustomerDto {
  id: number = 0;
  lastName: string;
  firstName: string;
  registrationDate: Date;
  phoneNumber: string;
  userName: string;
  activeSubscription: boolean;

  constructor(
    id: number = 0,
    lastName: string = "",
    firstName: string = "",
    registrationDate: Date = new Date(),
    phoneNumber: string = "",
    userName: string = "",
    activeSubscription: boolean = false,
  ) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.registrationDate = registrationDate;
    this.phoneNumber = phoneNumber;
    this.userName = userName;
    this.activeSubscription = activeSubscription;
  }
}
