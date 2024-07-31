/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { DomainEventManager } from 'apps/mba-dd-venda-ingresso/src/core/common/domain/domain-event-manager';
import { IntegrationEventsPublisher } from 'apps/mba-dd-venda-ingresso/src/domain-events/integration-events.publisher';

@Global()
@Module({
  providers: [
    DomainEventManager,
    IntegrationEventsPublisher,
  ],
  exports: [DomainEventManager],
})

export class DomainEventsModule {}