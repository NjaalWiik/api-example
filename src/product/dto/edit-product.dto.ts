import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class EditProductDto {
  @IsString()
  @IsOptional()
  url?: string;

  @IsNumber()
  @IsOptional()
  pricespyId?: number;
}
