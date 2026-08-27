import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { LeasesService } from './leases.service';
import { Lease } from './entities/lease.entity';
import { CreateLeaseInput } from './dto/create-lease.input';
import { UpdateLeaseInput } from './dto/update-lease.input';

@Resolver(() => Lease)
export class LeasesResolver {
  constructor(private readonly leasesService: LeasesService) {}

  @Mutation(() => Lease)
  createLease(
    @Args('clientId', { type: () => ID }) clientId: string, // TODO: from JWT
    @Args('createLeaseInput') createLeaseInput: CreateLeaseInput,
  ) {
    return this.leasesService.create(clientId, createLeaseInput);
  }

  @Query(() => [Lease], { name: 'leases' })
  findAll() {
    return this.leasesService.findAll();
  }

  @Query(() => [Lease], { name: 'leasesByClient' })
  findByClient(@Args('clientId', { type: () => ID }) clientId: string) {
    return this.leasesService.findByClient(clientId);
  }

  @Query(() => Lease, { name: 'lease' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.leasesService.findOne(id);
  }

  @Mutation(() => Lease)
  updateLease(@Args('updateLeaseInput') updateLeaseInput: UpdateLeaseInput) {
    return this.leasesService.update(updateLeaseInput.id, updateLeaseInput);
  }

  @Mutation(() => Lease)
  removeLease(@Args('id', { type: () => ID }) id: string) {
    return this.leasesService.remove(id);
  }
}
