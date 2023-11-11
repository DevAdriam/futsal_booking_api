import { Module } from '@nestjs/common';
import { StadiumService } from './stadium.service';
import { StadiumResolver } from './stadium.resolver';

@Module({
  providers: [StadiumResolver, StadiumService],
})
export class StadiumModule {}
