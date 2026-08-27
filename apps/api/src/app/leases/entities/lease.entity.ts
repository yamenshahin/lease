import {
  ObjectType,
  Field,
  ID,
  Float,
  Int,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type LeaseDocument = HydratedDocument<Lease>;

export enum ApplicantType {
  OWNER_OR_REP = 'OWNER_OR_REP',
  TENANT = 'TENANT',
}

export enum TenantType {
  INDIVIDUAL = 'INDIVIDUAL',
  ORGANIZATION = 'ORGANIZATION',
}

export enum ContractDuration {
  THREE_MONTHS = 'THREE_MONTHS',
  SIX_MONTHS = 'SIX_MONTHS',
  ONE_YEAR = 'ONE_YEAR',
  TWO_YEARS = 'TWO_YEARS',
}

export enum PaymentFrequency {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  SEMI_ANNUALLY = 'SEMI_ANNUALLY',
  ANNUALLY = 'ANNUALLY',
}

export enum FeePayer {
  OWNER = 'OWNER',
  TENANT = 'TENANT',
  SPLIT_HALF = 'SPLIT_HALF',
  GOV_OWNER_OFFICE_TENANT = 'GOV_OWNER_OFFICE_TENANT',
}

export enum UnitType {
  APARTMENT = 'APARTMENT',
  FLOOR = 'FLOOR',
  DRIVER_ROOM = 'DRIVER_ROOM',
  VILLA = 'VILLA',
}

export enum FloorLevel {
  GROUND = 'GROUND',
  FLOOR_1 = '1',
  FLOOR_2 = '2',
  FLOOR_3 = '3',
  FLOOR_4 = '4',
  FLOOR_5 = '5',
  FLOOR_6 = '6',
  FLOOR_7 = '7',
  FLOOR_8 = '8',
  FLOOR_9 = '9',
  FLOOR_10_PLUS = '10_PLUS',
}

registerEnumType(ApplicantType, { name: 'ApplicantType' });
registerEnumType(TenantType, { name: 'TenantType' });
registerEnumType(ContractDuration, { name: 'ContractDuration' });
registerEnumType(PaymentFrequency, { name: 'PaymentFrequency' });
registerEnumType(FeePayer, { name: 'FeePayer' });
registerEnumType(UnitType, { name: 'UnitType' });
registerEnumType(FloorLevel, { name: 'FloorLevel' });

@ObjectType()
@Schema({ _id: false })
class MapLocation {
  @Field(() => Float, { nullable: true })
  @Prop()
  lat?: number;

  @Field(() => Float, { nullable: true })
  @Prop()
  lng?: number;

  @Field({ nullable: true })
  @Prop({ trim: true })
  address?: string;
}

const MapLocationSchema = SchemaFactory.createForClass(MapLocation);

@ObjectType()
@Schema({ _id: false })
class UnitFeature {
  @Field(() => Boolean)
  @Prop({ default: false })
  exists: boolean;

  @Field(() => Int, { nullable: true })
  @Prop({ min: 0, max: 4 })
  count?: number;
}

const UnitFeatureSchema = SchemaFactory.createForClass(UnitFeature);

@ObjectType()
@Schema({ timestamps: true, collection: 'leases' })
export class Lease {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field(() => ID)
  @Prop({ type: Types.ObjectId, required: true, index: true })
  clientId: Types.ObjectId;

  // --- Step 1: Basic & Legal Info ---
  @Field(() => ApplicantType)
  @Prop({ required: true, enum: ApplicantType })
  applicantType: ApplicantType;

  @Field()
  @Prop({ required: true, trim: true })
  ownerMobile: string;

  @Field()
  @Prop({ required: true, trim: true, maxLength: 10 })
  ownerId: string;

  @Field()
  @Prop({ required: true, trim: true, maxLength: 12 })
  deedNumber: string;

  @Field()
  @Prop({ required: true })
  deedDate: Date;

  @Field(() => MapLocation, { nullable: true })
  @Prop({ type: MapLocationSchema })
  location?: MapLocation;

  // --- Step 2: Tenant Profile ---
  @Field(() => TenantType)
  @Prop({ required: true, enum: TenantType })
  tenantType: TenantType;

  @Field({ nullable: true })
  @Prop({ trim: true })
  tenantIdNumber?: string;

  @Field({ nullable: true })
  @Prop()
  tenantDob?: Date;

  @Field({ nullable: true })
  @Prop({ trim: true })
  tenantMobile?: string;

  @Field({ nullable: true })
  @Prop({ trim: true })
  unifiedNumber?: string;

  @Field({ nullable: true })
  @Prop({ trim: true, maxLength: 10 })
  representativeId?: string;

  @Field({ nullable: true })
  @Prop({ trim: true })
  agencyNumber?: string;

  // --- Step 3: Contract & Financials ---
  @Field()
  @Prop({ required: true })
  contractStartDate: Date;

  @Field(() => ContractDuration)
  @Prop({ required: true, enum: ContractDuration })
  contractDuration: ContractDuration;

  @Field(() => PaymentFrequency)
  @Prop({ required: true, enum: PaymentFrequency })
  paymentFrequency: PaymentFrequency;

  @Field(() => Float)
  @Prop({ required: true, min: 3000 })
  annualRent: number;

  @Field(() => FeePayer)
  @Prop({ required: true, enum: FeePayer })
  feePayer: FeePayer;

  // --- Step 4: Unit Specifications ---
  @Field(() => UnitType)
  @Prop({ required: true, enum: UnitType })
  unitType: UnitType;

  @Field()
  @Prop({ required: true, trim: true })
  unitNumber: string;

  @Field(() => FloorLevel)
  @Prop({ required: true, enum: FloorLevel })
  floor: FloorLevel;

  @Field(() => Float)
  @Prop({ required: true })
  areaSqMeters: number;

  @Field(() => Int)
  @Prop({ required: true, min: 1, max: 4 })
  bedrooms: number;

  @Field(() => Int)
  @Prop({ required: true, min: 1, max: 4 })
  bathrooms: number;

  @Field(() => UnitFeature, { nullable: true })
  @Prop({ type: UnitFeatureSchema })
  kitchen?: UnitFeature;

  @Field(() => UnitFeature, { nullable: true })
  @Prop({ type: UnitFeatureSchema })
  livingRoom?: UnitFeature;

  @Field(() => UnitFeature, { nullable: true })
  @Prop({ type: UnitFeatureSchema })
  receptionRoom?: UnitFeature;

  @Field(() => UnitFeature, { nullable: true })
  @Prop({ type: UnitFeatureSchema })
  splitAc?: UnitFeature;

  @Field(() => UnitFeature, { nullable: true })
  @Prop({ type: UnitFeatureSchema })
  windowAc?: UnitFeature;

  @Field(() => Boolean)
  @Prop({ default: false })
  storageRoom: boolean;

  @Field(() => Boolean)
  @Prop({ default: false })
  maidRoom: boolean;

  @Field()
  @Prop({ required: true, trim: true })
  electricityMeter: string;

  @Field({ nullable: true })
  @Prop({ trim: true })
  waterMeter?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const LeaseSchema = SchemaFactory.createForClass(Lease);
LeaseSchema.index({ clientId: 1, createdAt: -1 });
LeaseSchema.index({ ownerId: 1 }, { sparse: true });
LeaseSchema.index({ tenantIdNumber: 1 }, { sparse: true });
LeaseSchema.index({ unifiedNumber: 1 }, { sparse: true });
