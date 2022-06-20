import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl
} from 'class-validator';

export class EditOfferDto {
  @IsString()
  @IsUrl()
  @IsOptional()
  rootDomain: string;

  @IsString()
  @IsOptional()
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
  @IsOptional()
  amount: number;

  @IsString()
  @IsOptional()
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
