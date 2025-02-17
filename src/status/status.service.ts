import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Serviço para gerenciamento de status
 */
@Injectable()
export class StatusService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lista todos os status
   */
  async getAllStatus() {
    try {
      return await this.prisma.status.findMany({
        orderBy: {
            id: 'desc'
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Cria nova situação
   */
  async createSituacao(situacao: string) {
    try {
      await this.prisma.status.create({
        data: {
          situacao: situacao,
        },
      });
      return { message: 'sucesso' };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}