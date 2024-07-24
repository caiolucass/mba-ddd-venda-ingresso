/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EventService } from 'src/core/events/app/event.service';

@Controller('events/:event_id/sections')
export class EventSectionsController {
    constructor(private eventService: EventService){}

    @Get()
    async list(@Param('event_id') event_id: string){
        return this.eventService.findSections(event_id);
    }

    @Post()
    create(@Param('event_id') event_id: string,
    @Body() body: {
        name: string;
        description?: string | null;
        total_spots: number;
        price: number;
    },
)  {
    return this.eventService.addSection({
        ...body,
        event_id: event_id,
       });
    }

    @Put(':event_id/publish-all')
    publish(@Param('event_id') event_id: string) {
        return this.eventService.publishAll({event_id: event_id})
    }

    @Put(':section_id')
    update(
        @Param('event_id') event_id: string,
        @Param('section_id') section_id: string,
        @Body()
        body: {
            name: string;
            description?: string | null
        },
    ){
        return this.eventService.updateSection({
            ...body,
            event_id: event_id,
            section_id: section_id,
        });
    }
}

