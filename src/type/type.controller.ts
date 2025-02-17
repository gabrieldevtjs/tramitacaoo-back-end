import { Body, Controller, Get, Post } from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/createTypedto';

/**
 * Controller para gerenciamento de tipos de documentos
 * Rota base: /document/type
 */
@Controller('document/type')
export class TypeController {
  constructor(private readonly typeService: TypeService){}

  /**
   * Lista todos os tipos de documentos
   * GET /document/type
   */
  @Get()
  getAllTypes(){
    return this.typeService.getAllTypes()
  }

  /**
   * Cria novo tipo de documento
   * POST /document/type/create
   */
  @Post('create')
  createType(@Body() createType: CreateTypeDto){
    return this.typeService.createType(createType)
  }
}