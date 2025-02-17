import { IsNotEmpty, IsString, MinLength, MaxLength, Max } from "class-validator";

 
export class ReceberTramiteDto {


  @IsNotEmpty()
  dataHoraRecebimento?: string;

  @IsNotEmpty()
  situacaoId: number

  @IsNotEmpty()
  status: string

}