/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from 'apps/mba-dd-venda-ingresso/src/core/events/app/customer.service';

@Controller('customers')
export class CustomerController {
    constructor(private customerService: CustomerService){}

    @Get()
    list(){
       return this.customerService.list();
    }

    @Post()
    create(@Body() body: {name: string; cpf: string}){
        this.customerService.register(body);
    }
}
