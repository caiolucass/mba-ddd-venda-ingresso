/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { EntityProperty, Platform, Type } from "@mikro-orm/core";
import { EventSpotId } from "apps/mba-dd-venda-ingresso/src/core/events/domain/entities/event-spot.entity";
export class EventSpotIdSchemaType extends Type<EventSpotId, string> {
    convertToDataBaseValue(
        valueObject: EventSpotId | undefined | null,
        platform: Platform,
    ): string {
        return valueObject instanceof EventSpotId
        ? valueObject.value
        : (valueObject as string);
    }

    // nao funciona para relacionamentos
    convertToJsValue(value: string, platform: Platform): EventSpotId {
        return new EventSpotId(value);
    }

    getColumnType(prop: EntityProperty, platform: Platform) {
        return `VARCHAR(36)`;
    }
}