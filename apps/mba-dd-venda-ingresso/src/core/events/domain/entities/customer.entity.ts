/* eslint-disable prettier/prettier */

import { AggregateRoot } from "apps/mba-dd-venda-ingresso/src/core/common/domain/aggregate.root";
import { Cpf } from "apps/mba-dd-venda-ingresso/src/core/common/domain/value-objects/cpf.vo";
import Uuid from "apps/mba-dd-venda-ingresso/src/core/common/domain/value-objects/uuid.vo";

export class CustomerId extends Uuid {}

/* eslint-disable @typescript-eslint/ban-types */
export type CustomerConstructorProps = {
    id?: CustomerId | string;
    cpf: Cpf;
    name: string;
}

export class Customer extends AggregateRoot {
    id: CustomerId;
    cpf: Cpf;
    name: string;
   
  constructor(props: CustomerConstructorProps) {
    super();
     this.id =  
     typeof props.id == 'string' ? new CustomerId(props.id) 
     : props.id ?? new CustomerId()
     this.cpf = props.cpf;
     this.name = props.name;
  }


  static create(command: {name: string; cpf: string}) {
    return new Customer({
      name: command.name,
      cpf: new Cpf(command.cpf),
    });
  }

  changeName(name: string) {
    this.name = name;
}

  toJSON(){
    return {
        id: this.id.value,
        cpf: this.cpf.value,
        name: this.name,
    }
  };
}