/* eslint-disable prettier/prettier */
import { EntityManager } from '@mikro-orm/mysql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BullModule } from '@nestjs/bull/dist/bull.module';
import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ApplicationService } from 'apps/mba-dd-venda-ingresso/src/core/common/app/application.service';
import { MyHandlerHandler } from 'apps/mba-dd-venda-ingresso/src/core/common/app/handlers/my-handler.handler';
import { UnitOfWorkInterface } from 'apps/mba-dd-venda-ingresso/src/core/common/app/unit-of-work-.interface';
import { CustomerService } from 'apps/mba-dd-venda-ingresso/src/core/events/app/customer.service';
import { EventService } from 'apps/mba-dd-venda-ingresso/src/core/events/app/event.service';
import { OrderService } from 'apps/mba-dd-venda-ingresso/src/core/events/app/order.service';
import { PartnerService } from 'apps/mba-dd-venda-ingresso/src/core/events/app/partner.service';
import { PaymentGateway } from 'apps/mba-dd-venda-ingresso/src/core/events/app/payment.gateway';
import { CustomerRepositoryInterface } from 'apps/mba-dd-venda-ingresso/src/core/events/domain/repositories/customer-repository.interface';
import { EventRepositoryInterface } from 'apps/mba-dd-venda-ingresso/src/core/events/domain/repositories/event-repository.interface';
import { PartnerRepositoryInterface } from 'apps/mba-dd-venda-ingresso/src/core/events/domain/repositories/partner-repository.interface';
import { OrderMysqlRepository } from 'apps/mba-dd-venda-ingresso/src/core/events/infra/database/repositories/order-mysql.repository';
import { PartnerMysqlRepository } from 'apps/mba-dd-venda-ingresso/src/core/events/infra/database/repositories/partner-mysql.repository';
import {
  CustomerSchema,
  EventSchema,
  EventSectionSchema,
  EventSpotSchema,
  OrderSchema,
  PartnerSchema,
  SpotReservationSchema,
} from 'apps/mba-dd-venda-ingresso/src/core/events/infra/database/schemas';
import { Queue } from 'bull';
import { IntegrationInterfaceEvent } from '../core/common/integration-event';
import { PartnerCreated } from '../core/events/domain/domain-events/partner-created.event';
import { PartnerCreatedIntegrationEvent } from '../core/events/domain/integration-events/partner-created.init-events';
import { DomainEventManager } from './../core/common/domain/domain-event-manager';
import { CustomerMysqlRepository } from './../core/events/infra/database/repositories/customer-mysql.repository';
import { EventMysqlRepository } from './../core/events/infra/database/repositories/event-mysql.repository';
import { SpotReservationMysqlRepository } from './../core/events/infra/database/repositories/spot-reservation-mysql.repository';
import { CustomerController } from './customers/customer.controller';
import { EventController } from './events/event.controller';
import { OrderController } from './orders/order.controller';
import { PartnerController } from './partners/partner.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      CustomerSchema,
      PartnerSchema,
      EventSchema,
      EventSectionSchema,
      EventSpotSchema,
      OrderSchema,
      SpotReservationSchema,
    ]),
    // ApplicationModule,
    BullModule.registerQueue({
      name: 'integration-events',
    }),
  ],
  providers: [
    {
      provide: 'PartnerRepositoryInterface',
      useFactory: (em: EntityManager) => {
        return new PartnerMysqlRepository(em);
      },
      inject: [EntityManager],
    },
    {
      provide: 'CustomerRepositoryInterface',
      useFactory: (em: EntityManager) => {
        return new CustomerMysqlRepository(em);
      },
      inject: [EntityManager],
    },
    {
      provide: 'EventRepositoryInterface',
      useFactory: (em: EntityManager) => {
        return new EventMysqlRepository(em);
      },
      inject: [EntityManager],
    },
    {
      provide: 'OrderRepositoryInterface',
      useFactory: (em: EntityManager) => {
        return new OrderMysqlRepository(em);
      },
      inject: [EntityManager],
    },
    {
      provide: 'SpotReservationRepositoryInterface',
      useFactory: (em: EntityManager) => {
        return new SpotReservationMysqlRepository(em);
      },
      inject: [EntityManager],
    },
    {
      provide: PartnerService,
      useFactory: (partnerRepo: PartnerRepositoryInterface, appService: ApplicationService) => new PartnerService(partnerRepo, appService),
      inject: ['PartnerRepositoryInterface', 'UnitOfWorkInterface'],
    },
    {
      provide: CustomerService,
      useFactory: (customerRepo: CustomerRepositoryInterface, uow: UnitOfWorkInterface) => new CustomerService(customerRepo, uow),
      inject: ['CustomerRepositoryInterface', 'UnitOfWorkInterface'],
    },
    {
      provide: EventService,
      useFactory: (eventRepo: EventRepositoryInterface, partnerRepo: PartnerRepositoryInterface, uow: UnitOfWorkInterface) => new EventService(eventRepo, partnerRepo, uow),
      inject: ['EventRepositoryInterface', 'PartnerRepositoryInterface', 'UnitOfWorkInterface'],
    },
    PaymentGateway,
    {
      provide: OrderService,
      useFactory: (
        orderRepo,
        customerRepo,
        eventRepo,
        spotReservationRepo,
        uow,
        paymentGateway,
      ) =>
        new OrderService(
          orderRepo,
          customerRepo,
          eventRepo,
          spotReservationRepo,
          uow,
          paymentGateway,
        ),
        inject: [
          'OrderRepositoryInterface',
          'CustomerRepositoryInterface',
          'EventRepositoryInterface',
          'SpotReservationRepositoryInterface',
          'UnitOfWorkInterface',
          PaymentGateway,
        ],
    },
    {
      provide: MyHandlerHandler,
      useFactory: (partnerRepo: PartnerRepositoryInterface, domainRepo: DomainEventManager) => new MyHandlerHandler(partnerRepo, domainRepo),
      inject: ['PartnerRepositoryInterface', DomainEventManager],
    }
  ],
  controllers: [PartnerController, CustomerController, EventController, OrderController],
})

export class EventsModule implements OnModuleInit{
  constructor(
    private readonly domainEventManager: DomainEventManager, 
    private moduleRef: ModuleRef,
    private integrationEventQueue: Queue<IntegrationInterfaceEvent>,
    ){}

    onModuleInit() {
      console.log('EventsModule initialized');
      MyHandlerHandler.listenTo().forEach((eventName: string) => {
        this.domainEventManager.register(eventName, async (event) => {
          const handler: MyHandlerHandler = await this.moduleRef.resolve(
            MyHandlerHandler,
          );
          await handler.handle(event);
        });
      });
      this.domainEventManager.register(PartnerCreated.name, async (event) => {
        const integrationEvent = new PartnerCreatedIntegrationEvent(event);
        await this.integrationEventQueue.add(integrationEvent);
      });
    }
}
