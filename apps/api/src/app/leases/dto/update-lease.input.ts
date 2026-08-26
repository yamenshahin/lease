import { CreateLeaseInput } from './create-lease.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLeaseInput extends PartialType(CreateLeaseInput) {
  @Field(() => Int)
  id: number;
}
