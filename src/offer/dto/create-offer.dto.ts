import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl
} from 'class-validator';

export class CreateOfferDto {
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  rootDomain: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  coupon?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  page?: string;

  @IsString()
  @IsOptional()
  terms?: string;

  @IsString()
  @IsOptional()
  trackinUrl?: string;

  @IsDateString()
  @IsOptional()
  validTo?: Date;

  @IsDateString()
  @IsOptional()
  validFrom?: Date;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  amountType: string;

  @IsBoolean()
  @IsOptional()
  verifiedCoupon?: boolean;

  @IsString()
  @IsOptional()
  status?: string;

  @IsNumber()
  @IsOptional()
  feedbackPositive?: number;

  @IsNumber()
  @IsOptional()
  feedbackNegative?: number;

  @IsNumber()
  @IsOptional()
  clicked?: number;
}
