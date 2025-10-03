import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // unbekannte Felder aus DTO entfernen
      forbidNonWhitelisted: true, // und 400 werfen, wenn unbekannte Felder da sind
      transform: true, // Query/Body in DTO-Klassen casten
      transformOptions: { enableImplicitConversion: true },
      stopAtFirstError: false, // true, wenn du die erste Fehlermeldung bevorzugst
    }),
  );
  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
