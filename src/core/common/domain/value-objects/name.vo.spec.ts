/* eslint-disable prettier/prettier */
import { Customer } from "src/core/events/domain/entities/customer.entity";
import { Name } from "./name.vo";

test('deve criar um nome váldio', () => {
  const name = new Name('aaaaa');
  expect(name.value).toBe('aaaa');

const customer = new Customer({
    cpf: '000.000.000-00',
    name,
});   
    
    customer.name = new Name('bbbb')
});

