/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PartnerService } from 'src/core/events/app/partner.service';

@Controller('partners')
export class PartnerController {
    constructor(private partnerService: PartnerService){}

    @Get()
    list(){
       return this.partnerService.list();
    }

    @Post()
    create(@Body() body: {name: string}){
        this.partnerService.create(body);
    }
}
