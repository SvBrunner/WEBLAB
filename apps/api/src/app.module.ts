import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TechnologiesController } from './technologies/technologies.controller';
import { TechnologiesService } from './technologies/technologies.service';

@Module({
  imports: [],
  controllers: [AppController, TechnologiesController],
  providers: [AppService, TechnologiesService],
})
export class AppModule {}
