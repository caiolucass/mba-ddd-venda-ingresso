/* eslint-disable prettier/prettier */
import { EntityManager } from '@mikro-orm/mysql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module } from '@nestjs/common';
import { UnitOfWorkMikroOrm } from 'apps/mba-dd-venda-ingresso/src/core/common/infra/unit-of-work-mikro-orm';
import {
    CustomerSchema,
    EventSchema,
    EventSectionSchema,
    EventSpotSchema,
    OrderSchema,
    PartnerSchema,
    SpotReservationSchema
} from 'apps/mba-dd-venda-ingresso/src/core/events/infra/database/schemas';

@Global()
@Module({
    imports:[
        MikroOrmModule.forRoot({
            entities: [
                CustomerSchema,
                PartnerSchema,
                EventSchema,
                EventSectionSchema,
                EventSpotSchema,
                OrderSchema,
                SpotReservationSchema,
            ],
            dbName: 'events',
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root',
            forceEntityConstructor: true
        }),
    ],
    providers: [
        {
            provide: 'UnitOfWorkInterface',
            useFactory(em: EntityManager){
               return new UnitOfWorkMikroOrm(em);
            },
            inject:[EntityManager]
        },
    ],
    exports: ['UnitOfWorkInterface'],
})
export class DatabaseModule {}
