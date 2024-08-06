/* eslint-disable prettier/prettier */
import {
    CustomerSchema,
    EventSchema,
    EventSectionSchema,
    EventSpotSchema,
    OrderSchema,
    PartnerSchema,
    SpotReservationSchema
} from "./core/events/infra/database/schemas";
import { StoredEventSchema } from "./core/stored-events/infra/database/schema";

    export default {
        entities: [
            PartnerSchema,
            CustomerSchema,
            EventSchema,
            EventSectionSchema,
            EventSpotSchema,
            OrderSchema,
            SpotReservationSchema,
            StoredEventSchema,
        ],
        dbName: 'event',
        user: 'root',
        password: 'root',
        type: 'mysql'
    }
