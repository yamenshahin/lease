import { Field, Float, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
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
  LeaseType,
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
  @IsNumber({}, { message: 'يجب أن يكون خط العرض رقماً' })
  lat?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber({}, { message: 'يجب أن يكون خط الطول رقماً' })
  lng?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'يجب أن يكون العنوان نصاً' })
  address?: string;
}

@InputType()
export class UnitFeatureInput {
  @Field(() => Boolean)
  @IsBoolean({ message: 'يجب تحديد القيمة بنعم أو لا' })
  exists: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber({}, { message: 'يجب أن يكون العدد رقماً' })
  @Min(0, { message: 'لا يمكن أن يكون العدد أقل من 0' })
  @Max(4, { message: 'الحد الأقصى هو 4' })
  count?: number;
}

@InputType()
export class CreateLeaseInput {
  @Field(() => LeaseType)
  @IsEnum(LeaseType, { message: 'يجب تحديد نوع العقد (سكني أو تجاري)' })
  @IsNotEmpty({ message: 'نوع العقد مطلوب' })
  leaseType: LeaseType;

  // Step 1
  @Field(() => ApplicantType)
  @IsEnum(ApplicantType, { message: 'الرجاء اختيار مقدم الطلب' })
  applicantType: ApplicantType;

  @Field()
  @IsString({ message: 'يجب أن يكون رقم الجوال نصاً' })
  @MaxLength(10, { message: 'يجب ألا يتجاوز رقم الجوال 10 أرقام' })
  ownerMobile: string;

  @Field()
  @IsString({ message: 'يجب أن تكون الهوية نصاً' })
  @MinLength(10, { message: 'يجب أن تتكون هوية المالك من 10 أرقام' })
  @MaxLength(10, { message: 'يجب أن تتكون هوية المالك من 10 أرقام' })
  ownerId: string;

  @Field()
  @IsString({ message: 'رقم الصك يجب أن يكون نصاً' })
  @MaxLength(12, { message: 'يجب ألا يتجاوز رقم الصك 12 رقماً' })
  deedNumber: string;

  @Field()
  @Type(() => Date)
  @IsDate({ message: 'تاريخ الصك غير صالح' })
  deedDate: Date;

  @Field(() => MapLocationInput, { nullable: true })
  @IsOptional()
  @ValidateNested({ message: 'بيانات الموقع غير صالحة' })
  @Type(() => MapLocationInput)
  location?: MapLocationInput;

  // Step 2
  @Field(() => TenantType)
  @IsEnum(TenantType, { message: 'الرجاء اختيار صفة المستأجر' })
  tenantType: TenantType;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'يجب أن تكون الهوية نصاً' })
  @MinLength(10, { message: 'يجب أن تتكون هوية المستأجر من 10 أرقام' })
  @MaxLength(10, { message: 'يجب أن تتكون هوية المستأجر من 10 أرقام' })
  tenantIdNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'تاريخ الميلاد غير صالح' })
  tenantDob?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'يجب أن يكون رقم الجوال نصاً' })
  @MaxLength(10, { message: 'يجب ألا يتجاوز رقم الجوال 10 أرقام' })
  tenantMobile?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'يجب أن يكون الرقم الموحد نصاً' })
  @MinLength(10, { message: 'يجب أن يتكون الرقم الموحد من 10 أرقام' })
  @MaxLength(10, { message: 'يجب أن يتكون الرقم الموحد من 10 أرقام' })
  unifiedNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'يجب أن تكون الهوية نصاً' })
  @MinLength(10, { message: 'يجب أن تتكون هوية الممثل من 10 أرقام' })
  @MaxLength(10, { message: 'يجب أن تتكون هوية الممثل من 10 أرقام' })
  representativeId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'رقم الوكالة يجب أن يكون نصاً' })
  @MaxLength(20, { message: 'يجب ألا يتجاوز رقم الوكالة 20 حرفاً' })
  agencyNumber?: string;

  // Step 3
  @Field()
  @Type(() => Date)
  @IsDate({ message: 'تاريخ بداية العقد غير صالح' })
  contractStartDate: Date;

  @Field(() => ContractDuration)
  @IsEnum(ContractDuration, { message: 'الرجاء اختيار مدة العقد' })
  contractDuration: ContractDuration;

  @Field(() => PaymentFrequency)
  @IsEnum(PaymentFrequency, { message: 'الرجاء اختيار طريقة الدفع' })
  paymentFrequency: PaymentFrequency;

  @Field(() => Float)
  @IsNumber({}, { message: 'الرجاء إدخال أرقام فقط لقيمة الإيجار' })
  @Min(3000, { message: 'الحد الأدنى للإيجار هو 3000 ريال' })
  annualRent: number;

  @Field(() => FeePayer)
  @IsEnum(FeePayer, { message: 'الرجاء تحديد من سيدفع الرسوم' })
  feePayer: FeePayer;

  // Step 4
  @Field(() => UnitType)
  @IsEnum(UnitType, { message: 'الرجاء اختيار نوع الوحدة' })
  unitType: UnitType;

  @Field()
  @IsString({ message: 'رقم الوحدة مطلوب' })
  unitNumber: string;

  @Field(() => FloorLevel)
  @IsEnum(FloorLevel, { message: 'الرجاء اختيار الدور' })
  floor: FloorLevel;

  @Field(() => Float)
  @IsNumber({}, { message: 'الرجاء إدخال أرقام فقط للمساحة' })
  areaSqMeters: number;

  @Field(() => Int)
  @IsNumber({}, { message: 'الرجاء إدخال عدد الغرف كأرقام' })
  @Min(1, { message: 'الرجاء اختيار عدد غرف النوم' })
  @Max(4, { message: 'الحد الأقصى هو 4 غرف' })
  bedrooms: number;

  @Field(() => Int)
  @IsNumber({}, { message: 'الرجاء إدخال عدد الحمامات كأرقام' })
  @Min(1, { message: 'الرجاء اختيار عدد الحمامات' })
  @Max(4, { message: 'الحد الأقصى هو 4 حمامات' })
  bathrooms: number;

  @Field(() => UnitFeatureInput, { nullable: true })
  @IsOptional()
  @ValidateNested({ message: 'بيانات المطبخ غير صالحة' })
  @Type(() => UnitFeatureInput)
  kitchen?: UnitFeatureInput;

  @Field(() => UnitFeatureInput, { nullable: true })
  @IsOptional()
  @ValidateNested({ message: 'بيانات الصالة غير صالحة' })
  @Type(() => UnitFeatureInput)
  livingRoom?: UnitFeatureInput;

  @Field(() => UnitFeatureInput, { nullable: true })
  @IsOptional()
  @ValidateNested({ message: 'بيانات المجلس غير صالحة' })
  @Type(() => UnitFeatureInput)
  receptionRoom?: UnitFeatureInput;

  @Field(() => UnitFeatureInput, { nullable: true })
  @IsOptional()
  @ValidateNested({ message: 'بيانات التكييف غير صالحة' })
  @Type(() => UnitFeatureInput)
  splitAc?: UnitFeatureInput;

  @Field(() => UnitFeatureInput, { nullable: true })
  @IsOptional()
  @ValidateNested({ message: 'بيانات التكييف غير صالحة' })
  @Type(() => UnitFeatureInput)
  windowAc?: UnitFeatureInput;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean({ message: 'يجب تحديد القيمة بنعم أو لا' })
  storageRoom: boolean;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean({ message: 'يجب تحديد القيمة بنعم أو لا' })
  maidRoom: boolean;

  @Field()
  @IsString({ message: 'رقم العداد يجب أن يكون نصاً' })
  @MinLength(3, { message: 'يجب أن يتكون رقم العداد من 3 أرقام على الأقل' })
  @MaxLength(14, { message: 'رقم العداد يجب ألا يتجاوز 14 رقماً' })
  electricityMeter: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'رقم عداد المياه يجب أن يكون نصاً' })
  waterMeter?: string;
}
