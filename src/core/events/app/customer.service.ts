/* eslint-disable prettier/prettier */
import { Customer } from '../domain/entities/customer.entity';
import { CustomerRepositoryInterface } from '../domain/repositories/customer-repository.interface';

export class CustomerService {
  constructor(private customerRepo: CustomerRepositoryInterface) {}

  list() {
    return this.customerRepo.findAll();
  }

  register(input: {name: string; cpf: string}) {
    const customer = Customer.create(input);
    this.customerRepo.add(customer);

    return customer;
  }
}
