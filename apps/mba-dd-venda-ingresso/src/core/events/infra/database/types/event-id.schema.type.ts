/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { EntityProperty, Platform, Type } from "@mikro-orm/core";
import { EventId } from "apps/mba-dd-venda-ingresso/src/core/events/domain/entities/event.entity";

export class EventIdSchemaType extends Type<EventId, string> {
    convertToDataBaseValue(
        valueObject: EventId | undefined | null,
        platform: Platform,
    ): string {
        return valueObject instanceof EventId
        ? valueObject.value
        : (valueObject as string);
    }

    // nao funciona para relacionamentos
    convertToJsValue(value: string, platform: Platform): EventId {
        return new EventId(value);
    }

    getColumnType(prop: EntityProperty, platform: Platform) {
        return `VARCHAR(36)`;
    }
}