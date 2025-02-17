import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTramiteDto } from './dto/createTramiteDto';
import { PaginationDto } from 'src/dtoGlobal/paginationDto';

/**
 * Serviço para gerenciamento de trâmites
 */
@Injectable()
export class TramiteService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lista trâmites com paginação
   */
  async getAllTramitePagination(id: number, paginationDto?: PaginationDto) {
    try {
      const { limit = 5, offset = 0 } = paginationDto;
      const tramites = await this.prisma.tramite.findMany({
        skip: Number(offset),
        take: Number(limit),
        where: {
          statusId: id,
        },
        include: {
          setorEnvio: true,
          setorRecebimento: true,
          documento: true,
          status: true,
        },
      });

      const total = await this.prisma.tramite.count();

      return {
        data: tramites,
        totalCount: total
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Busca trâmites por número do documento
   */
  async getAllTramiteByNumeroDocumento(numeroDocumento: string) {
    try {
      return await this.prisma.tramite.findMany({
        where: {
          documento: {
            nmrDocumento: numeroDocumento,
          },
        },
        include: {
          setorEnvio: true,
          setorRecebimento: true,
          documento: true,
          status: true,
        },
        orderBy: {
          dataEnvio: 'desc',
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cria novo trâmite
   */
  async createTramite(createTramiteDto: CreateTramiteDto) {
    try {
      const documento = await this.prisma.documento.findUnique({
        where: { id: createTramiteDto.documentoId },
      });

      if (!documento) {
        throw new Error('Documento não encontrado');
      }

      if (createTramiteDto.setorEnvioId === createTramiteDto.setorRecebimentoId) {
        throw new Error('Setor de envio não pode ser igual ao setor de recebimento');
      }

      const ultimoTramite = await this.prisma.tramite.findFirst({
        where: { documentoId: createTramiteDto.documentoId },
        orderBy: { id: 'desc' },
      });

      if (ultimoTramite && ultimoTramite.statusId !== 1) {
        throw new Error('Documento não pode ser enviado. Último trâmite não foi recebido.');
      }

      const tramite = await this.prisma.tramite.create({
        data: {
          documentoId: createTramiteDto.documentoId,
          setorEnvioId: createTramiteDto.setorEnvioId,
          setorRecebimentoId: createTramiteDto.setorRecebimentoId,
          statusId: 2, // Status inicial: enviado
        },
      });

      return { message: 'Trâmite criado com sucesso', data: tramite };
    } catch (error) {
      console.error('Erro ao criar tramite:', error);
      throw error;
    }
  }

  /**
   * Marca trâmite como recebido
   */
  async receberTramite(id: number) {
    try {
      await this.prisma.tramite.update({
        where: { id: id },
        data: {
          dataHoraRecebimento: new Date(),
          statusId: 1, // Status: recebido
        },
      });

      return { message: 'sucesso' };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Remove um trâmite
   */
  async deleteTramite(id: number) {
    try {
      await this.prisma.tramite.delete({
        where: { id: id },
      });

      return { message: 'sucesso' };
    } catch (error) {
      throw error;
    }
  }
}