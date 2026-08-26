import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Lease {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
