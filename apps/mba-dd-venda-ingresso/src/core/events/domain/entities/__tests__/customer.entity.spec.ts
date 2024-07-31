/* eslint-disable prettier/prettier */
import Cpf from "apps/mba-dd-venda-ingresso/src/core/common/domain/value-objects/cpf.vo";
import { Customer, CustomerId } from "../customer.entity";

test('deve criar um cliente', () => {
    const customer = Customer.create({
        name: 'Caio',
        cpf: '99346413050',
    });
    console.log(Customer);
    expect(customer).toBeInstanceOf(Customer);
    expect(customer.id).toBeDefined();
    expect(customer.id).toBeInstanceOf(CustomerId);
    expect(customer.name).toBe('Caio');
    expect(customer.cpf).toBe('99346413050');
    
    const customer2 = new Customer({
        id: new CustomerId(customer.id.value),
        name: 'Ana',
        cpf: new Cpf('993.464.130-40'),
    })

    console.log(customer.equals(customer2));
});