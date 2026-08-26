import { Test, TestingModule } from '@nestjs/testing';
import { LeasesResolver } from './leases.resolver';
import { LeasesService } from './leases.service';

describe('LeasesResolver', () => {
  let resolver: LeasesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeasesResolver, LeasesService],
    }).compile();

    resolver = module.get<LeasesResolver>(LeasesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
