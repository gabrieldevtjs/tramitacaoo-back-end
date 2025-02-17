import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './dto/createDocumentDto';
import { PaginationDto } from '../dtoGlobal/paginationDto';
import { UpdateDocumentDto } from './dto/updateDocument';

/**
 * Serviço responsável pelo gerenciamento de documentos
 */
@Injectable()
export class DocumentoService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Busca documentos com paginação
   */
  async getAllDocument(paginationDto?: PaginationDto) {
    try {
      const { limit = 5, offset = 0 } = paginationDto;
      const documento = await this.prisma.documento.findMany({
        skip: Number(offset),
        take: Number(limit),
        orderBy: {
          id: 'desc',
        },
        include: { tipoDocumento: true, tramite: true },
      });
      const total = await this.prisma.documento.count();

      return {
        data: documento,
        totalCount: total,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Busca todos os documentos sem paginação
   */
  async getAllDocumentSelect() {
    try {
      const setores = await this.prisma.documento.findMany({
        orderBy: {
          id: 'asc',
        },
      });

      return setores;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Cria um novo documento
   */
  async createDocument(createDocumentdto: CreateDocumentDto) {
    try {
      console.log('createDocumentdto:', createDocumentdto);
      console.log('Tipo documento ID:', createDocumentdto.tipoDocumentoId);

      const arquivoBuffer = Buffer.from(createDocumentdto.file.buffer);

      if (!createDocumentdto.tipoDocumentoId) {
        throw new Error('tipoDocumentoId é obrigatório');
      }

      const tipoDocumentoId = parseInt(createDocumentdto.tipoDocumentoId);

      if (isNaN(tipoDocumentoId)) {
        throw new Error('tipoDocumentoId inválido');
      }

      const result = await this.prisma.documento.create({
        data: {
          nmrDocumento: String(createDocumentdto.nmrDocumento).padStart(4, '0'),
          titulo: createDocumentdto.titulo,
          descricao: createDocumentdto.descricao,
          arquivo: arquivoBuffer,
          tipoDocumento: {
            connect: {
              id: tipoDocumentoId,
            },
          },
        },
      });

      console.log('Document created:', result);

      return { message: 'Documento criado com sucesso' };
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  }

  /**
   * Recupera um documento específico
   */
  async getDocument(id: number) {
    try {
      const documento = await this.prisma.documento.findUnique({
        where: { id },
      });

      if (!documento || !documento.arquivo) {
        throw new Error('Documento não encontrado');
      }

      const arquivoBuffer = Buffer.from(documento.arquivo);

      console.log('Tipo do arquivo:', typeof arquivoBuffer);
      console.log('É Buffer?', Buffer.isBuffer(arquivoBuffer));
      console.log('Tamanho:', arquivoBuffer.length);

      return arquivoBuffer;
    } catch (error) {
      console.error('Erro ao buscar o documento:', error);
      throw error;
    }
  }

  /**
   * Atualiza um documento existente
   */
  async updateDocumento(id: number, updateDocumentDto: UpdateDocumentDto) {
    try {
      await this.prisma.documento.update({
        where: { id: id },
        data: {
          titulo: updateDocumentDto.titulo,
          descricao: updateDocumentDto.descricao,
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar documento', error);
      throw new Error('Erro ao atualizar setor');
    }
  }
  
  /**
   * Remove um documento e seus trâmites
   */
  async deleteDocumento(id: number) {
    try {
      await this.prisma.tramite.deleteMany({
        where: { documentoId: id }
      });
  
      await this.prisma.documento.delete({
        where: { id }
      });
  
      return { message: 'Documento excluído com sucesso' };
    } catch (error) {
      throw error;
    }
  }
}