import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateShopDto {
  @IsNumber()
  @IsOptional()
  pricespyId?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  rootDomain?: string;

  @IsString()
  @IsOptional()
  logo176?: string;

  @IsString()
  @IsOptional()
  logo88?: string;

  @IsString()
  @IsOptional()
  favicon?: string;

  @IsString()
  @IsOptional()
  externalUri?: string;

  @IsString()
  @IsOptional()
  information?: string;

  @IsString()
  @IsOptional()
  countryCode?: string;

  @IsString()
  @IsOptional()
  market?: string;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsNumber()
  @IsOptional()
  importance?: number;

  @IsNumber()
  @IsOptional()
  storeLocationCount?: number;
}
