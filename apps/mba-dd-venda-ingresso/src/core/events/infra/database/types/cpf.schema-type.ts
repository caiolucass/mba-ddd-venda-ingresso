/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { EntityProperty, Platform, Type } from "@mikro-orm/core";
import Cpf from "apps/mba-dd-venda-ingresso/src/core/common/domain/value-objects/cpf.vo";

export class CpfIdSchemaType extends Type<Cpf, string> {
    convertToDataBaseValue(
        valueObject: Cpf | undefined | null,
        platform: Platform,
    ): string {
        return valueObject instanceof Cpf
        ? valueObject.value
        : (valueObject as string);
    }

    // nao funciona para relacionamentos
    convertToJsValue(value: string, platform: Platform): Cpf {
        return new Cpf(value);
    }

    getColumnType(prop: EntityProperty, platform: Platform) {
        return `VARCHAR(11)`;
    }
}