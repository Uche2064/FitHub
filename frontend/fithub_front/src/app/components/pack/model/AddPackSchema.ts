export class AddPackSchema {
  offerName: string;
  durationMonths: number;
  monthlyPrice: number;

  constructor( offerName: string, durationMonths: number, monthlyPrice: number ) {
    this.offerName = offerName;
    this.durationMonths = durationMonths;
    this.monthlyPrice = monthlyPrice;
  }
}
