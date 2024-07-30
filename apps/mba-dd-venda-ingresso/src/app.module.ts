/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EventsModule } from './events/events.module';
import { BullModule } from '@nestjs/bull/dist/bull.module';

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
   ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
