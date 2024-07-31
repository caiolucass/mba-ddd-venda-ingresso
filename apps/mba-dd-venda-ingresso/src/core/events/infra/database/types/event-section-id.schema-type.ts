/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { EntityProperty, Platform, Type } from "@mikro-orm/core";
import { EventSection, EventSectionId } from "apps/mba-dd-venda-ingresso/src/core/events/domain/entities/event-section.entity";

export class EventSectionIdSchemaType extends Type<EventSection, string> {
    convertToDataBaseValue(
        valueObject: EventSectionId | undefined | null,
        platform: Platform,
    ): string {
        return valueObject instanceof EventSectionId
        ? valueObject.value
        : (valueObject as string);
    }

    // nao funciona para relacionamentos
    convertToJsValue(value: string, platform: Platform): EventSectionId {
        return new EventSectionId(value);
    }

    getColumnType(prop: EntityProperty, platform: Platform) {
        return `VARCHAR(36)`;
    }
}