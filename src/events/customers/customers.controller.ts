/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from 'src/core/events/app/customer.service';

@Controller('customers')
export class CustomersController {
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
