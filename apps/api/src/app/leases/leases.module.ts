import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeasesService } from './leases.service';
import { LeasesResolver } from './leases.resolver';
import { Lease, LeaseSchema } from './entities/lease.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lease.name, schema: LeaseSchema }]),
  ],
  providers: [LeasesResolver, LeasesService],
  exports: [LeasesService],
})
export class LeasesModule {}
