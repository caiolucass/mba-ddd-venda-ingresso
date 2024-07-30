/* eslint-disable prettier/prettier */
import { CustomerSchema, 
    EventSchema, 
    EventSectionSchema, 
    EventSpotSchema, 
    OrderSchema, 
    PartnerSchema, 
    SpotReservationSchema } from "./core/events/infra/database/schemas";

    export default {
        entities: [
            PartnerSchema,
            CustomerSchema,
            EventSchema,
            EventSectionSchema,
            EventSpotSchema,
            OrderSchema,
            SpotReservationSchema,
        ],
        dbName: 'event',
        user: 'root',
        password: 'root',
        type: 'mysql'
    }
