import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type ClientDocument = HydratedDocument<Client>;

@ObjectType()
@Schema({ timestamps: true, collection: 'clients' })
export class Client {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field()
  @Prop({ required: true, unique: true, trim: true })
  whatsappNumber: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
