import { Body, Controller, Get, Post } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateSituacaoDto } from './dto/createSituacaoDto';

/**
 * Controller para gerenciamento de status
 * Rota base: /status
 */
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService){}

  /**
   * Lista todos os status
   * GET /status
   */
  @Get()
  getAllTypes(){
    return this.statusService.getAllStatus()
  }

  /**
   * Cria nova situação
   * POST /status/create
   */
  @Post('create')
  createSituacao(@Body() createSituacaoDto: CreateSituacaoDto) {
    return this.statusService.createSituacao(createSituacaoDto.situacao);
  }
}