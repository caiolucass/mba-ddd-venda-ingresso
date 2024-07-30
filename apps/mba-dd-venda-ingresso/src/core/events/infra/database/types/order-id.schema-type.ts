/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { EntityProperty, Platform, Type } from "@mikro-orm/core";
import { Order, OrderId } from "src/core/events/domain/entities/order.entity";

export class OrderIdSchemaType extends Type<Order, string> {

    convertToDataBaseValue(
        valueObject: OrderId | undefined | null,
        platform: Platform,
    ): string {
        return valueObject instanceof OrderId
        ? valueObject.value
        : (valueObject as string);
    }

    // nao funciona para relacionamentos
    convertToJsValue(value: string, platform: Platform): OrderId {
        return new OrderId(value);
    }

    getColumnType(prop: EntityProperty, platform: Platform) {
        return `VARCHAR(36)`;
    }
}