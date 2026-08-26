import { Injectable } from '@nestjs/common';
import { CreateLeaseInput } from './dto/create-lease.input';
import { UpdateLeaseInput } from './dto/update-lease.input';

@Injectable()
export class LeasesService {
  create(createLeaseInput: CreateLeaseInput) {
    return 'This action adds a new lease';
  }

  findAll() {
    return `This action returns all leases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lease`;
  }

  update(id: number, updateLeaseInput: UpdateLeaseInput) {
    return `This action updates a #${id} lease`;
  }

  remove(id: number) {
    return `This action removes a #${id} lease`;
  }
}
