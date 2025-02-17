import { IsNotEmpty, IsString, MinLength, MaxLength, Max } from "class-validator";
 
export class CreateTypeDto {
    @MinLength(4)
    @MaxLength(35)
    @IsNotEmpty()
    @IsString()
    readonly tipo?: string

}
