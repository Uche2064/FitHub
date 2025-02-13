import { PackResponseSchema } from '../../pack/model/PackResponseSchema';
import { CustomerDto } from './../../customer/models/Customer';

export class SubscriptionDto {
  id: number;
  customer: CustomerDto;
  pack: PackResponseSchema;
  startDate = new Date();
  endDate = new Date();
  active: boolean;

  constructor(
    id: number = 0,
    customer: CustomerDto,
    startDate: Date = new Date(),
    endDate: Date = new Date(),
    active: boolean = false,
    pack: PackResponseSchema
  ) {
    this.id = id;
    this.customer = customer;
    this.startDate = startDate;
    this.active = active;
    this.pack = pack;
    this.endDate = endDate;
  }
}
