/* eslint-disable prettier/prettier */
import { UnitOfWorkInterface } from 'src/core/common/app/unit-of-work-.interface';
import { Customer } from '../domain/entities/customer.entity';
import { CustomerRepositoryInterface } from '../domain/repositories/customer-repository.interface';

export class CustomerService {
  constructor(private customerRepo: CustomerRepositoryInterface, 
    private uow: UnitOfWorkInterface) {}

  list() {
    return this.customerRepo.findAll();
  }

  async register(input: {name: string; cpf: string}) {
    const customer = await Customer.create(input);
    this.customerRepo.add(customer);
    await this.uow.commit();
    return customer;
  }

  async update(id: string, input: {name?: string}) {
    const customer = await this.customerRepo.findById(id);

    if(!customer){
        throw new Error('Customer not found')
    }

    input.name && customer.changeName(input.name);
    this.customerRepo.add(customer);
    await this.uow.commit();
    return customer;
  }
}
