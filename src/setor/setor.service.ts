import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSetorDto } from './dto/setor-dto';
import { Response } from 'express';
import { UpdateSetorDto } from './dto/updateSetor-dto';
import { PaginationDto } from '../dtoGlobal/paginationDto';

/**
 * Serviço para gerenciamento de setores
 */
@Injectable()
export class SetorService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lista setores com paginação
   */
  async getAllSetor(paginationDto?: PaginationDto) {
    try {
      const {limit = 5, offset = 0 } = paginationDto
      const setores = await this.prisma.setor.findMany({
        skip: Number(offset),
        take: Number(limit),
        orderBy: {
          id: 'asc',
        },
      });
      const total = await this.prisma.setor.count();

      return {
        data: setores,
        totalCount: total
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Lista todos setores sem paginação
   */
  async getAllSetorSelect() {
    try {
      const setores = await this.prisma.setor.findMany({
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
   * Busca setor por ID
   */
  async getSetorById(id: number) {
    try {
      return await this.prisma.setor.findFirst({      
        where: {
          id: id, 
        },
      });
    } catch(error){
      console.log(error)
      throw error
    }
  }

  /**
   * Cria novo setor
   */
  async createSetor(createSetorDto: CreateSetorDto) {
    try {
      await this.prisma.setor.create({
        data: {
          sigla: createSetorDto.sigla,
          descricao: createSetorDto.descricao,
          responsavel: createSetorDto.responsavel,
        },
      });

      return { message: 'sucesso' }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Atualiza setor existente
   */
  async updateSetor(id: number, updateSetorDto: UpdateSetorDto) {
    try {
      console.log(id);
      const updatedSetor = await this.prisma.setor.update({
        where: { id: id },
        data: {
          sigla: updateSetorDto.sigla,
          descricao: updateSetorDto.descricao,
          responsavel: updateSetorDto.responsavel,
        },
      });

    } catch (error) {
      console.error('Erro ao atualizar setor:', error);
      throw new Error('Erro ao atualizar setor');
    }
  }

  /**
   * Remove um setor
   */
  async deleteSetor(id: number) {
    try {
      await this.prisma.setor.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error(error);
      return { message: 'erro no servidor' };
    }
  }
}