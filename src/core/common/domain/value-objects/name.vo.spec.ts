/* eslint-disable prettier/prettier */
import { Name } from "./name.vo";

test('deve criar um nome váldio', () => {
  const name = new Name('aaaaa');
  expect(name.value).toBe('aaaa');
});
    

