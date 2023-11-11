import { Test, TestingModule } from '@nestjs/testing';
import { StadiumResolver } from './stadium.resolver';
import { StadiumService } from './stadium.service';

describe('StadiumResolver', () => {
  let resolver: StadiumResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StadiumResolver, StadiumService],
    }).compile();

    resolver = module.get<StadiumResolver>(StadiumResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
