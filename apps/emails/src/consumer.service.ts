/* eslint-disable prettier/prettier */
import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ConsumerService {
    @RabbitSubscribe({
        exchange: 'amq.direct',
        routingKey: 'PartnerCreatedIntegrationEvent',
        queue: 'emails'
    })

    handle(msg: {event_name: string; [key: string]: any}) {
        // switch(msg.event_name){
        //     case: 'PartnerCreatedIntegrationEvent':
        // }
        console.log('ConsumerService.handle', msg)
    }
}