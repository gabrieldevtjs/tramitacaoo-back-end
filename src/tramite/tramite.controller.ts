import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateTramiteDto } from './dto/createTramiteDto';
import { TramiteService } from './tramite.service';
import { PaginationDto } from 'src/dtoGlobal/paginationDto';

/**
 * Controller para gerenciamento de trâmites
 * Rota base: /document/tramite
 */
@Controller('document/tramite')
export class TramiteController {
  constructor(private readonly tramiteService: TramiteService){}

  /**
   * Lista trâmites de um documento com paginação
   * GET /document/tramite/:id
   */
  @Get(":id")
  getAllTramitePagination(
    @Param("id", ParseIntPipe) id: number, 
    @Query() paginationDto: PaginationDto
  ) {
    return this.tramiteService.getAllTramitePagination(id, paginationDto);
  }

  /**
   * Busca trâmites por número do documento
   * GET /document/tramite/consulta/:numeroDocumento
   */
  @Get("consulta/:numeroDocumento")
  getAllTramiteById(
    @Param("numeroDocumento") numeroDocumento: string
  ) {
    return this.tramiteService.getAllTramiteByNumeroDocumento(numeroDocumento);
  }

  /**
   * Cria novo trâmite
   * POST /document/tramite/create
   */
  @Post('create')
  createTramite(
    @Body() createTramiteDto: CreateTramiteDto
  ) {
    return this.tramiteService.createTramite(createTramiteDto);
  }

  /**
   * Marca trâmite como recebido
   * PUT /document/tramite/receber/:id
   */
  @Put('receber/:id')
  receberTramite(
    @Param("id", ParseIntPipe) id: number
  ) {
    return this.tramiteService.receberTramite(id);
  }

  /**
   * Remove um trâmite
   * DELETE /document/tramite/delete/:id
   */
  @Delete('delete/:id')
  deletarTramite(
    @Param("id", ParseIntPipe) id: number
  ) {
    return this.tramiteService.deleteTramite(id);
  }
}