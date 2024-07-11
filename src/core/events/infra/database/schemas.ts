/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Cascade, EntitySchema } from "@mikro-orm/core";
import { Partner } from "../../domain/entities/partner.entity";
import { PartnerIdSchemaType } from "./types/partiner-id.schema.type";
import { Customer } from "../../domain/entities/customer.entity";
import { EventIdSchemaType } from "./types/event-id.schema.type";
import { Event } from "../../domain/entities/event.entity";
import { EventSection } from "../../domain/entities/event-section";
import { CustomerIdSchemaType } from "./types/customer-id.schema-type";
import { EventSpot } from "../../domain/entities/event.spot";
import { EventSpotIdSchemaType } from "./types/event-spot-id.schema-type";
import { CpfIdSchemaType } from "./types/cpf.schema-type";
import { inherits } from "util";

export const PartnerSchema = new EntitySchema<Partner>({
    class: Partner,
    properties: {
        id: {primary: true, type: new PartnerIdSchemaType()},
        name: {type: 'string', length: 255},
    },
});

export const CustomerSchema = new EntitySchema<Customer>({
    class: Customer,
    uniques: [{properties: ['cpf']}],
    properties: {
        id: {
        type: new CustomerIdSchemaType(),
        primary: true,
    },
    cpf: {type: new CpfIdSchemaType()},
    name: {type: 'string', length: 255}
  },
});

export const EventSchema = new EntitySchema<Event>({
    class: Event,
    properties: {
        id: {
        type: new EventIdSchemaType(),
        primary: true,
    },
    name: {type: 'string', length: 255},
    description: {type: 'text', nullable: true},
    date: {type: 'date'},
    is_published: {type: 'boolean', default: false},
    total_spots: {type: 'number', default: 0},
    sections: {
        reference: '1:m',
        entity: () => EventSection,
        mappedBy: (section) => section.event_id,
        eager: true,
        cascade: [Cascade.ALL],
    },
    partner_id: {
        reference: 'm:1',
        entity: () => Partner,
        hidden: true,
        mapToPk: true,
        type: new PartnerIdSchemaType(),
    }
  },
});

export const EventSectionSchema = new EntitySchema<EventSection>({
    class: EventSection,
    properties: {
        id: {
        type: new EventIdSchemaType(),
        primary: true,
    },
    name: {type: 'string', length: 255},
    description: {type: 'text', nullable: true},
    is_published: {type: 'boolean', default: false},
    total_spots: {type: 'number', default: 0},
    total_spots_reserved: {type: 'number', default: 0},
    price: {type: 'number', default: 0},
    spots: {
        reference: '1:m',
        entity: () => EventSpot,
        mappedBy: (section) => section.event_section_id,
        eager: true,
        cascade: [Cascade.ALL],
    },
    partner_id: {
        reference: 'm:1',
        entity: () => Event,
        hidden: true,
        mapToPk: true,
        type: new EventIdSchemaType(),
        inherits: true,
    },
  },
});

export const EventSpotSchema = new EntitySchema<EventSpot>({
    class: EventSpot,
    properties: {
        id: {
        type: new EventSpotIdSchemaType(),
        primary: true,
    },
    location: {type: 'string', length: 255, nullable: true},
    is_reserved: {type: 'boolean', default: false},
    is_published: {type: 'boolean', default: false},
    event_section_id: {
        reference: 'm:1',
        hidden: true,
        eager: true,
    },
  },
});