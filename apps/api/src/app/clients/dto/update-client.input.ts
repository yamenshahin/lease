import { CreateClientInput } from './create-client.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateClientInput extends PartialType(CreateClientInput) {
  @Field(() => ID)
  @IsMongoId()
  id: string;
}
