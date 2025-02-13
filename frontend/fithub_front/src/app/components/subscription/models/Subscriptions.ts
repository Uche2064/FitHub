export class Subscriptions {
  customerId: number;
  packId: number;
  startDate: Date;

  constructor(customerId: number = 0, packId: number = 0, startDate: Date = new Date()) {
    this.customerId = customerId;
    this.packId = packId;
    this.startDate = startDate;
  }
}
