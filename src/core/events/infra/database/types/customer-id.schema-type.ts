/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityProperty, Platform, Type } from "@mikro-orm/core";
import { CustomerId } from "src/core/events/domain/entities/customer.entity";

export class CustomerIdSchemaType extends Type<CustomerId, string> {
    convertToDataBaseValue(
        valueObject: CustomerId | undefined | null,
        platform: Platform,
    ): string {
        return valueObject instanceof CustomerId
        ? valueObject.value
        : (valueObject as string);
    }

    // nao funciona para relacionamentos
    convertToJsValue(value: string, platform: Platform): CustomerId {
        return new CustomerId(value);
    }

    getColumnType(prop: EntityProperty, platform: Platform) {
        return `VARCHAR(36)`;
    }
}