/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { AggregateRoot } from "src/core/common/domain/aggregate.root";
import Uuid from "src/core/common/domain/value-objects/uuid.vo";
import { Event } from "./event.entity";
import { PartnerCreated } from "../domain-events/partner-created.event";
import { PartnerChangedName } from "../domain-events/partner-changed-name.event";

export class PartnerId extends Uuid {}

export type InitEventCommand = {
   name: string;
   description?: string | null;
   date: Date;
}

export type PartnerConstructorProps = {
    id?: PartnerId | string;
    name: string;
};

export class Partner extends AggregateRoot {
    id: PartnerId;
    name: string;

    constructor(props: PartnerConstructorProps, id?: PartnerId) {
        super();
        this.id = 
        typeof props.id === 'string'
        ? new PartnerId(props.id)
        : props.id ?? new PartnerId();
        this.name = props.name;
    }

    static create(command: {name: string}) {
       const partner = new Partner({
            name: command.name,
        });
        partner.addEvent(new PartnerCreated(partner.id, partner.name));
        return partner;
    }

    initEvent(command: InitEventCommand){
       return Event.create({
        ...command,
        partner_id: this.id,
       });
    }

    changeName(name: string) {
        this.name = name;
        this.addEvent(new PartnerChangedName(this.id, this.name));
    }

    toJSON() {
        return {
            id: this.id.value,
            name: this.name,
        }
    }
}
