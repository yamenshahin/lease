import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LeasesService } from './leases.service';
import { Lease } from './entities/lease.entity';
import { CreateLeaseInput } from './dto/create-lease.input';
import { UpdateLeaseInput } from './dto/update-lease.input';

@Resolver(() => Lease)
export class LeasesResolver {
  constructor(private readonly leasesService: LeasesService) {}

  @Mutation(() => Lease)
  createLease(@Args('createLeaseInput') createLeaseInput: CreateLeaseInput) {
    return this.leasesService.create(createLeaseInput);
  }

  @Query(() => [Lease], { name: 'leases' })
  findAll() {
    return this.leasesService.findAll();
  }

  @Query(() => Lease, { name: 'lease' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.leasesService.findOne(id);
  }

  @Mutation(() => Lease)
  updateLease(@Args('updateLeaseInput') updateLeaseInput: UpdateLeaseInput) {
    return this.leasesService.update(updateLeaseInput.id, updateLeaseInput);
  }

  @Mutation(() => Lease)
  removeLease(@Args('id', { type: () => Int }) id: number) {
    return this.leasesService.remove(id);
  }
}
