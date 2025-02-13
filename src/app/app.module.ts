import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetorModule } from 'src/setor/setor.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [SetorModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
