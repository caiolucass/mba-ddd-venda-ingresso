/* eslint-disable prettier/prettier */
import { Customer } from "../customer.entity";

test('deve criar um cliente', () => {
    const customer = Customer.create({
        name: 'Caio',
        cpf: '99346413050'
    });
    customer.cpf.value;
});