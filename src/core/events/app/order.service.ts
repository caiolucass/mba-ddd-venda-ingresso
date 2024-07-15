/* eslint-disable prettier/prettier */
import { SpotReservation } from './../domain/entities/spot-reservation.entity';
import { UnitOfWorkInterface } from 'src/core/common/app/unit-of-work-.interface';
import { OrderRepositoryInterface } from '../domain/repositories/order-repository.interface';
import { CustomerRepositoryInterface } from '../domain/repositories/customer-repository.interface';
import { EventRepositoryInterface } from '../domain/repositories/event-repository.interface';
import { EventSectionId } from '../domain/entities/event-section.entity';
import { EventSpotId } from '../domain/entities/event-spot.entity';
import { SpotReservationRepositoryInterface } from '../domain/repositories/spot-reservation-repository.interface';
import { Order } from '../domain/entities/order.entity';

export class OrderService {
  constructor(
    private orderRepo: OrderRepositoryInterface,
    private customerRepo: CustomerRepositoryInterface,
    private eventRepo: EventRepositoryInterface,
    private SpotReservationRepo: SpotReservationRepositoryInterface,
    private uow: UnitOfWorkInterface,
  ) {}

  list() {
    return this.orderRepo.findAll();
  }

  async create(input: {
    event_id: string;
    section_id: string;
    spot_id: string;
    customer_id: string;
  }) {
    const customer = await this.customerRepo.findById(input.customer_id);
    if (!customer) {
      throw new Error('Customer not found');
    }

    const event = await this.eventRepo.findById(input.event_id);
    if (!event) {
      throw new Error('Event not found');
    }

    const sectionId = new EventSectionId(input.section_id);
    const spotId = new EventSpotId(input.spot_id);

    if (!event.allowReserveSpot({ section_id: sectionId, spot_id: spotId })) {
      throw new Error('Spot not available');
    }

    const spotReservation = this.SpotReservationRepo.findById(spotId);

    if (spotReservation) {
      throw new Error('Spot already reserved');
    }

    const spotReservationCreated = SpotReservation.create({
      spot_id: spotId,
      customer_id: customer.id,
    });

    this.SpotReservationRepo.add(spotReservationCreated);

    const section = event.sections.find((section) =>
      section.id.equals(sectionId),
    );

    const order = Order.create({
      customer_id: customer.id,
      event_spot_id: spotId,
      amount: section.price,
    });

    await this.orderRepo.add(order);
    this.uow.commit();
    return order;
  }
}
