import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cors from 'cors'; // Importando o cors corretamente

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitando CORS corretamente
  app.enableCors()

  await app.listen(4000);
}

bootstrap();
