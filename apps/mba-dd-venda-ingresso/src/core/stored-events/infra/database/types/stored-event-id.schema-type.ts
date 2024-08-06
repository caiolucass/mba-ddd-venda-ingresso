/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { EntityProperty, Platform, Type } from '@mikro-orm/core';
import { StoredEventId } from "apps/mba-dd-venda-ingresso/src/core/events/infra/database/domain/entities/stored-event.entity";

export class StoredEventIdSchemaType extends Type<StoredEventId, string> {
    convertToDatabaseValue(
        valueObject: StoredEventId | undefined | null,
        plataform: Platform,
    ): string {
        return valueObject instanceof StoredEventId
          ? valueObject.value
          : (valueObject as string);
    }

    //não funciona para relacionamentos
    convertToJSValue(value: string, plataform: Platform): StoredEventId {
        return new StoredEventId(value);
    }

    getColumnType(prop: EntityProperty, plataform: Platform){
        return `varchar(255)`;
    }
}