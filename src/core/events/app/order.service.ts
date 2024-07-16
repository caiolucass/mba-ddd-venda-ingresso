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
    private spotReservationRepo: SpotReservationRepositoryInterface,
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

    const spotReservation = await this.spotReservationRepo.findById(spotId);

    if (spotReservation) {
      throw new Error('Spot already reserved');
    }

    return this.uow.runTransaction(async () =>{
      const spotReservationCreated = SpotReservation.create({
        spot_id: spotId,
        customer_id: customer.id,
      });
  
      this.spotReservationRepo.add(spotReservationCreated);
  
      try{
        await this.uow.commit();
    
        //pagamento
        const section = event.sections.find((section) =>
         section.id.equals(sectionId),
        );
  
        const order = Order.create({
          customer_id: customer.id,
          event_spot_id: spotId,
          amount: section.price,
        });
  
        await this.orderRepo.add(order);
  
         event.markSpotAsReserved({
          section_id: sectionId,
          spot_id: spotId
        });
  
        this.eventRepo.add(event);
        await this.uow.commit();
        return order;
      }catch(e){
        const section = event.sections.find((section) =>
          section.id.equals(sectionId),
         );
  
        const order = Order.create({
          customer_id: customer.id,
          event_spot_id: spotId,
          amount: section.price,
        });
        order.cancel();
        this.orderRepo.add(order);
        await this.uow.commit();
        throw new Error('An error happened when we tried to reserved your spot');
      }
    });
  }
}
