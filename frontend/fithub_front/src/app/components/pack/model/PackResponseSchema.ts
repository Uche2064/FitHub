export class PackResponseSchema {
  id?: number;
  offerName: string;
  durationMonths: number;
  monthlyPrice: number;
  addedAt?: Date;

  constructor(offerName: string = '', durationMonths: number=0, monthlyPrice: number =0, id?: number, addedAt?: Date) {
    this.offerName = offerName;
    this.durationMonths = durationMonths;
    this.id = id;
    this.addedAt = addedAt;
    this.monthlyPrice = monthlyPrice;
  }
}
