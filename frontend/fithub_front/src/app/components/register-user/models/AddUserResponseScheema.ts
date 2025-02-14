export class AddUserResponseSchema {

  id: number;
  userName: string;
  email: string;
  fullName: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;

  constructor(id: number = 0, userName: string = '', email: string = '', phone: string = '', createdAt: Date = new Date(), updatedAt: Date = new Date(), role: string = '', fullName: string = '',) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.phone = phone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.role = role;
    this.fullName = fullName;
  }
}
