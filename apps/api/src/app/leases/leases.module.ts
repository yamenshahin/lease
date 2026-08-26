import { Module } from '@nestjs/common';
import { LeasesService } from './leases.service';
import { LeasesResolver } from './leases.resolver';

@Module({
  providers: [LeasesResolver, LeasesService],
})
export class LeasesModule {}
