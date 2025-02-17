import { IsNotEmpty, IsString, MinLength, MaxLength, Max } from "class-validator";

 
export class CreateDocumentDto {
  @IsNotEmpty()
  nmrDocumento: string;

  @IsNotEmpty()
  titulo: string;

  @IsNotEmpty()
  descricao: string;

  @IsNotEmpty()
  tipoDocumentoId: string;

  file?: Express.Multer.File;
}