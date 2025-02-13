import { IsNotEmpty, IsString, MinLength, MaxLength, Max } from "class-validator";
 
export class CreateSetorDto {
    @MinLength(4)
    @MaxLength(35)
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @MinLength(5)
    @MaxLength(25)
    @IsNotEmpty()
    @IsString()
    readonly description : string

    @MinLength(4)
    @MaxLength(25)
    @IsNotEmpty()
    @IsString()
    readonly responsavel : string
}
