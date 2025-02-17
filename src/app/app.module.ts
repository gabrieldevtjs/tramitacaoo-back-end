import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetorModule } from 'src/setor/setor.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TypeModule } from 'src/type/type.module';
import { DocumentoModule } from 'src/documento/documento.module';
import { TramiteModule } from 'src/tramite/tramite.module';
import { StatusModule } from 'src/status/status.module';
// import { DocumentoModule } from 'src/documento/documento.module';

@Module({
  imports: [SetorModule, PrismaModule, TypeModule, DocumentoModule, TramiteModule, StatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
