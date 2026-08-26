import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLeaseInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
