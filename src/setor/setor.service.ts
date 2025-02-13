import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSetorDto } from './dto/setor-dto';
import { Response } from "express"
import { UpdateSetorDto } from './dto/updateSetor-dto';

@Injectable()
export class SetorService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllSetor(response: Response) {
    try {
        
        const setores = await this.prisma.setor.findMany({
          orderBy: {
            id: "asc"
          }
        });
        return response.json(setores)

    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  async createSetor(createSetorDto: CreateSetorDto, response: Response) {
    try {
      await this.prisma.setor.create({
        data: {
          sigla: createSetorDto.sigla,
          descricao: createSetorDto.descricao,
          responsavel: createSetorDto.responsavel
        },
      });

      return response.json({message: "sucesso"})

    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  async updateSetor(id: number, updateSetorDto: UpdateSetorDto) {
    try {
      console.log(id)
      const updatedSetor = await this.prisma.setor.update({
        where: { id: id },
        data: {
          sigla: updateSetorDto.sigla,
          descricao: updateSetorDto.descricao,
          responsavel: updateSetorDto.responsavel
        },
      });
  
      return updatedSetor;
    } catch (error) {
      console.error("Erro ao atualizar setor:", error);
      throw new Error("Erro ao atualizar setor"); 
    }
  }

  async deleteSetor(id:number){
    try {
     await this.prisma.setor.delete({
      where: {
        id: id
      }
     })
    } catch(error){
        console.error(error)
        return { message: "erro no servidor"}
    }

  }
}
