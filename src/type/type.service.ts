import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeDto } from './dto/createTypedto';

/**
 * Serviço para gerenciamento de tipos de documentos
 */
@Injectable()
export class TypeService {
  constructor(private readonly prisma: PrismaService){}

  /**
   * Lista todos os tipos de documentos
   */
  async getAllTypes(){
    try{
      return await this.prisma.tipoDocumento.findMany()
    } catch(error){
      console.log(error)
    }
  }

  /**
   * Cria novo tipo de documento
   */
  async createType(createType: CreateTypeDto){
    try{
      return await this.prisma.tipoDocumento.create({
        data: {
          tipo: createType.tipo
        }
      });
    } catch(error){
      console.log(error)
    }
  }
}