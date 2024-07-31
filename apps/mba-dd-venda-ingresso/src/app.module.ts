/* eslint-disable prettier/prettier */
import { BullModule } from '@nestjs/bull/dist/bull.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DomainEventsModule } from './domain-events/domain-events.module';
import { EventsModule } from './events/events.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    DatabaseModule, 
    BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379
    }
  }),
   EventsModule,
   DomainEventsModule,
   RabbitmqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
