import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsInt, Min, Max } from "class-validator";

export class PaginationDto {
  @IsOptional() 
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1) 
  @Max(50)
  limit: number;

  @Type(() => Number)
  @IsOptional() 
  @IsInt()
  @Min(0) 
  offset: number;
}