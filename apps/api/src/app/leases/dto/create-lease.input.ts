import { Field, Float, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ApplicantType,
  ContractDuration,
  FeePayer,
  FloorLevel,
  PaymentFrequency,
  TenantType,
  UnitType,
} from '../entities/lease.entity';

@InputType()
export class MapLocationInput {
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  lat?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  lng?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  address?: string;
}

@InputType()
export class UnitFeatureInput {
  @Field(() => Boolean)
  @IsBoolean()
  exists: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(4)
  count?: number;
}

@InputType()
export class CreateLeaseInput {
  // Step 1
  @Field(() => ApplicantType)
  @IsEnum(ApplicantType)
  applicantType: ApplicantType;

  @Field()
  @IsString()
  @MaxLength(10)
  ownerMobile: string;

  @Field()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  ownerId: string;

  @Field()
  @IsString()
  @MaxLength(12)
  deedNumber: string;

  @Field()
  @Type(() => Date)
  @IsDate()
  deedDate: Date;

  @Field(() => MapLocationInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => MapLocationInput)
  location?: MapLocationInput;

  // Step 2
  @Field(() => TenantType)
  @IsEnum(TenantType)
  tenantType: TenantType;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  tenantIdNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  tenantDob?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  tenantMobile?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  unifiedNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  representativeId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  agencyNumber?: string;

  // Step 3
  @Field()
  @Type(() => Date)
  @IsDate()
  contractStartDate: Date;

  @Field(() => ContractDuration)
  @IsEnum(ContractDuration)
  contractDuration: ContractDuration;

  @Field(() => PaymentFrequency)
  @IsEnum(PaymentFrequency)
  paymentFrequency: PaymentFrequency;

  @Field(() => Float)
  @IsNumber()
  @Min(3000)
  annualRent: number;

  @Field(() => FeePayer)
  @IsEnum(FeePayer)
  feePayer: FeePayer;

  // Step 4
  @Field(() => UnitType)
  @IsEnum(UnitType)
  unitType: UnitType;

  @Field()
  @IsString()
  unitNumber: string;

  @Field(() => FloorLevel)
  @IsEnum(FloorLevel)
  floor: FloorLevel;

  @Field(() => Float)
  @IsNumber()
  areaSqMeters: number;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  @Max(4)
  bedrooms: number;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  @Max(4)
  bathrooms: number;

  @Field(() => UnitFeatureInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => UnitFeatureInput)
  kitchen?: UnitFeatureInput;

  @Field(() => UnitFeatureInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => UnitFeatureInput)
  livingRoom?: UnitFeatureInput;

  @Field(() => UnitFeatureInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => UnitFeatureInput)
  receptionRoom?: UnitFeatureInput;

  @Field(() => UnitFeatureInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => UnitFeatureInput)
  splitAc?: UnitFeatureInput;

  @Field(() => UnitFeatureInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => UnitFeatureInput)
  windowAc?: UnitFeatureInput;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  storageRoom: boolean;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  maidRoom: boolean;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(14)
  electricityMeter: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  waterMeter?: string;
}
