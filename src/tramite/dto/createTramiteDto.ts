import { IsNotEmpty, IsString, MinLength, MaxLength, Max } from "class-validator";

 
export class CreateTramiteDto {
  @IsNotEmpty()
  documentoId: number

  @IsNotEmpty()
  setorEnvioId: number;

  @IsNotEmpty()
  setorRecebimentoId: number


}