import { Module } from '@nestjs/common';
import { TramiteController } from './tramite.controller';
import { TramiteService } from './tramite.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TramiteController],
  providers: [TramiteService]
})
export class TramiteModule {}
