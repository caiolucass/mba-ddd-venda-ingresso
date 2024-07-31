/* eslint-disable prettier/prettier */
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { IntegrationInterfaceEvent } from "../core/common/integration-event";

@Processor('integration-events')
export class IntegrationEventsPublisher {
    constructor(private amqpConnection: AmqpConnection){}

    @Process()
    async handle(job: Job<IntegrationInterfaceEvent>){
        console.log('IntegrationEventsPublisher.handle', job.data);
        this.amqpConnection.publish(
            'amq.direct', 
            job.data.event_name, 
            job.data,
        );
        return{};
    }
}