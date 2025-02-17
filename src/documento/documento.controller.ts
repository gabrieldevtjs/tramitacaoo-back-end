import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { PaginationDto } from '../dtoGlobal/paginationDto';
import { CreateDocumentDto } from './dto/createDocumentDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { UpdateDocumentDto } from './dto/updateDocument';

/**
 * Controller para gerenciamento de documentos
 * Rota base: /document
 */
@Controller('document')
export class DocumentoController {
  constructor(private readonly documentService: DocumentoService) {}

  /**
   * Lista todos documentos com paginação
   * GET /document
   */
  @Get()
  GetAllDocuments(@Query() paginationDto: PaginationDto) {
    return this.documentService.getAllDocument(paginationDto);
  }

  /**
   * Lista todos documentos sem paginação
   * GET /document/select
   */
  @Get("select")
  GetAllDocumentsSelect() {
    return this.documentService.getAllDocumentSelect();
  }

  /**
   * Cria novo documento com upload de arquivo
   * POST /document/create
   */
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async CreateDocument(
    @Body() createDocument: CreateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('Body recebido:', createDocument);
    console.log('Tipo documento ID recebido:', createDocument.tipoDocumentoId);

    createDocument.file = file;
    return this.documentService.createDocument(createDocument);
  }

  /**
   * Download de documento específico
   * GET /document/:id/download
   */
  @Get(':id/download')
  async downloadDocument(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      const arquivo = await this.documentService.getDocument(Number(id));

      if (!arquivo || arquivo.length === 0) {
        throw new Error('Arquivo vazio ou inválido');
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=documento_${id}.pdf`,
      );

      return res.send(arquivo);
    } catch (error) {
      console.error('Erro no download:', error);
      return res.status(500).json({
        message: 'Erro ao baixar documento',
        error: error.message,
      });
    }
  }

  /**
   * Atualiza documento existente
   * PUT /document/update/:id
   */
  @Put('update/:id')
  updateDocument(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentService.updateDocumento(id, updateDocumentDto);
  }

  /**
   * Remove um documento
   * DELETE /document/delete/:id
   */
  @Delete('delete/:id')
  deleteSetor(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.deleteDocumento(id);
  }
}