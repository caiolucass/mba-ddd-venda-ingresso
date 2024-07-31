/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { EntityProperty, Platform, Type } from "@mikro-orm/core";
import { PartnerId } from "apps/mba-dd-venda-ingresso/src/core/events/domain/entities/partner.entity";

export class PartnerIdSchemaType extends Type<PartnerId, string> {
    convertToDataBaseValue(
        valueObject: PartnerId | undefined | null,
        platform: Platform,
    ): string {
        return valueObject instanceof PartnerId
        ? valueObject.value
        : (valueObject as string);
    }

    // nao funciona para relacionamentos
    convertToJsValue(value: string, platform: Platform): PartnerId {
        return new PartnerId(value);
    }

    getColumnType(prop: EntityProperty, platform: Platform) {
        return `VARCHAR(36)`;
    }
}