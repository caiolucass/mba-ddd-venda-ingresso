/* eslint-disable prettier/prettier */
import { EntityManager } from '@mikro-orm/mysql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { DomainEventManager } from 'apps/mba-dd-venda-ingresso/src/core/common/domain/domain-event-manager';
import { IntegrationEventsPublisher } from 'apps/mba-dd-venda-ingresso/src/domain-events/integration-events.publisher';
import { DomainEventInterface } from '../core/common/domain/domain-event-interface';
import { StoredEvent } from '../core/events/infra/database/domain/entities/stored-event.entity';
import { StoredEventMysqlRepository } from '../core/stored-events/infra/database/repositories/stored-event-mysql.repository';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([StoredEvent])],
  providers: [
    DomainEventManager,
    IntegrationEventsPublisher,
    {
      provide: 'StoredEventRepositoryInterface',
      useFactory: (em) => new StoredEventMysqlRepository(em),
      inject: [EntityManager],
    }
  ],
  exports: [DomainEventManager],
})

export class DomainEventsModule implements OnModuleInit {
  constructor(private readonly domainEventManager: DomainEventManager,
    private moduleRef: ModuleRef,
  ){}
  
  async onModuleInit() {
    this.domainEventManager.register('*', async (event: DomainEventInterface) => {
      const repo = await this.moduleRef.resolve('StoredEventRepositoryInterface');
      await repo.add(event);
    });
  }
}