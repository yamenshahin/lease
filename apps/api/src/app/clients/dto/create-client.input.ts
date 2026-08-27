import { InputType, Field } from '@nestjs/graphql';
import { IsString, Matches, Length } from 'class-validator';

@InputType()
export class CreateClientInput {
  @Field()
  @IsString()
  @Length(10, 10)
  @Matches(/^05\d{8}$/, {
    message: 'whatsappNumber must be a valid Saudi mobile (05xxxxxxxx)',
  })
  whatsappNumber: string;
}
