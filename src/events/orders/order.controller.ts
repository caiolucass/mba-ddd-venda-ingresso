/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from 'src/core/events/app/order.service';

@Controller('events/:event_id/orders')
export class OrderController {
  constructor(private ordersService: OrderService) {}

  @Get()
  async list() {
    return this.ordersService.list();
  }

  @Post()
  create(
    @Param('event_id') event_id: string,
    @Body()
    body: {
      section_id: string;
      spot_id: string;
      customer_id: string;
      card_token: string;
    },
  ) {
    return this.ordersService.create({
      ...body,
      event_id: event_id,
    });
  }
}
