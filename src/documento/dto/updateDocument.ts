import { IsNotEmpty, IsString, MinLength, MaxLength, Max } from "class-validator";
 
export class UpdateDocumentDto {
    @MinLength(4)
    @MaxLength(35)
    @IsNotEmpty()
    @IsString()
    readonly titulo?: string

    @MinLength(5)
    @MaxLength(25)
    @IsNotEmpty()
    @IsString()
    readonly descricao? : string
}
