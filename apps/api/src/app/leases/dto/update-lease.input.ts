import { CreateLeaseInput } from './create-lease.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateLeaseInput extends PartialType(CreateLeaseInput) {
  @Field(() => ID)
  @IsMongoId()
  id: string;
}
