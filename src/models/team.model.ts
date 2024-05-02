import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'team model' })
export class TeamModel {
  @Field((type) => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
