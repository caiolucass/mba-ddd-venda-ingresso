/* eslint-disable prettier/prettier */
import { EntitySchema } from "@mikro-orm/mysql";
import { Partner } from "../../domain/entities/partner.entity";

export const PartnerSchema = new EntitySchema<Partner>({
    class: Partner,
    properties: {
        id: {primary: true, type: 'uuid'},
        name: {type: 'string', length: 255},
    },
});