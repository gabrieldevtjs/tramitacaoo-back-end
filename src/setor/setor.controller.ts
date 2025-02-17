import { Body, Controller, Post, Get, Put, Delete, Param, ParseIntPipe, Query } from '@nestjs/common';
import { SetorService } from './setor.service';
import { CreateSetorDto } from './dto/setor-dto';
import { UpdateSetorDto } from './dto/updateSetor-dto';
import { PaginationDto } from '../dtoGlobal/paginationDto';

/**
 * Controller para gerenciamento de setores
 * Rota base: /setor
 */
@Controller('setor')
export class SetorController {
  constructor(private readonly setorService : SetorService){}

  /**
   * Lista todos setores com paginação
   * GET /setor
   */
  @Get()
  GetAllSetor(@Query() paginationDto: PaginationDto){
    return this.setorService.getAllSetor(paginationDto)
  }

  /**
   * Lista todos setores sem paginação
   * GET /setor/select
   */
  @Get("select")
  GetAllSetorSelect(){
    return this.setorService.getAllSetorSelect()
  }

  /**
   * Busca setor por ID
   * GET /setor/:id
   */
  @Get(":id")
  GetAllSetorById(@Param("id", ParseIntPipe) id: number){
    return this.setorService.getSetorById(id)
  }
  
  /**
   * Cria novo setor
   * POST /setor/create
   */
  @Post('create')
  CreateSetor(@Body() createSetor: CreateSetorDto){
    return this.setorService.createSetor(createSetor)
  }

  /**
   * Atualiza setor existente
   * PUT /setor/update/:id
   */
  @Put("update/:id")
  updateSetor(@Param("id", ParseIntPipe) id: number, @Body() updatesetor : UpdateSetorDto){
    return this.setorService.updateSetor(id, updatesetor)
  }

  /**
   * Remove um setor
   * DELETE /setor/delete/:id
   */
  @Delete("delete/:id")
  deleteSetor(@Param("id", ParseIntPipe) id: number) {
    return this.setorService.deleteSetor(id)
  }
}