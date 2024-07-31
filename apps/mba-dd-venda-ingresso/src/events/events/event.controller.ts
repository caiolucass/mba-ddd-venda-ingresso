/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EventService } from 'apps/mba-dd-venda-ingresso/src/core/events/app/event.service';
import { EventDto } from './event.dto';

@Controller('events')
export class EventController {
    constructor(private eventService: EventService){}

    @Get()
    async list(){
        return this.eventService.list();
    }

    @Post()
    create(@Body() body: EventDto){
        return this.eventService.create(body);
    }

    @Put(':event_id/publish-all')
    publish(@Param('event_id') event_id: string) {
        return this.eventService.publishAll({event_id: event_id})
    }
}

    const getSizeInBytes = (obj) => {
        let str = null;
        
        if(typeof obj === 'string') {
            str = obj;
        }else{
            str = JSON.stringify(obj);
        }

        const bytes = new TextEncoder().encode(str).length;
        return bytes;
    };

    const logSizeInBytes = (description, obj) => {
        const bytes = getSizeInBytes(obj);
        console.log(`${description} is approximately ${bytes} B`)
    };

