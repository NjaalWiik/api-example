import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @IsNotEmpty()
  pricespyId: number;
}
