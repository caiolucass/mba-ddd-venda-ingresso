/* eslint-disable prettier/prettier */
import { MikroORM, MySqlDriver } from "@mikro-orm/mysql"
import { PartnerSchema } from './schemas';
import { Partner } from "../../domain/entities/partner.entity";

test('deve criar um partner', async () => {
    const orm = await MikroORM.init<MySqlDriver>({
        entities: [PartnerSchema],
        dbName: 'events',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        forceEntityConstructor: true,
    });
   
    await orm.schema.refreshDatabase();
    const em = orm.em;
    const partner = Partner.create({name: 'Partner 1'});

    em.persist(partner);
    await em.flush();

    await orm.close()
});