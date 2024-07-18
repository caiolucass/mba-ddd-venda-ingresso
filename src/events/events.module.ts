/* eslint-disable prettier/prettier */
import { SpotReservationMysqlRepository } from './../core/events/infra/database/repositories/spot-reservation-mysql.repository';
import { EventMysqlRepository } from './../core/events/infra/database/repositories/event-mysql.repository';
import { CustomerMysqlRepository } from './../core/events/infra/database/repositories/customer-mysql.repository';
import { EntityManager } from '@mikro-orm/mysql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PartnerMysqlRepository } from 'src/core/events/infra/database/repositories/partner-mysql.repository';
import {
  CustomerSchema,
  EventSchema,
  EventSectionSchema,
  EventSpotSchema,
  OrderSchema,
  PartnerSchema,
  SpotReservationSchema,
} from 'src/core/events/infra/database/schemas';
import { OrderMysqlRepository } from 'src/core/events/infra/database/repositories/order-mysql.repository';
import { PartnerService } from 'src/core/events/app/partner.service';
import { CustomerService } from 'src/core/events/app/customer.service';
import { EventService } from 'src/core/events/app/event.service';
import { PaymentGateway } from 'src/core/events/app/payment.gateway';
import { OrderService } from 'src/core/events/app/order.service';
import { PartnerRepositoryInterface } from 'src/core/events/domain/repositories/partner-repository.interface';
import { UnitOfWorkInterface } from 'src/core/common/app/unit-of-work-.interface';
import { CustomerRepositoryInterface } from 'src/core/events/domain/repositories/customer-repository.interface';
import { EventRepositoryInterface } from 'src/core/events/domain/repositories/event-repository.interface';

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
      useFactory: (partnerRepo: PartnerRepositoryInterface, uow: UnitOfWorkInterface) => new PartnerService(partnerRepo, uow),
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
  ],
})
export class EventsModule {}
