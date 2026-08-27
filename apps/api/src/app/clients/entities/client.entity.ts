import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@ObjectType()
@Schema({ timestamps: true, collection: 'clients' })
export class Client {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field()
  @Prop({ required: true, unique: true, trim: true, index: true })
  whatsappNumber: string;

  @Field()
  @Prop({ default: false })
  isVerified: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
