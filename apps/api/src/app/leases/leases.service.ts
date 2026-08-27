import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateLeaseInput } from './dto/create-lease.input';
import { UpdateLeaseInput } from './dto/update-lease.input';
import { Lease, LeaseDocument } from './entities/lease.entity';

@Injectable()
export class LeasesService {
  constructor(
    @InjectModel(Lease.name)
    private readonly leaseModel: Model<LeaseDocument>,
  ) {}

  create(clientId: string, input: CreateLeaseInput) {
    return this.leaseModel.create({
      ...input,
      clientId: new Types.ObjectId(clientId),
    });
  }

  findAll() {
    return this.leaseModel.find().sort({ createdAt: -1 }).exec();
  }

  findByClient(clientId: string) {
    return this.leaseModel
      .find({ clientId: new Types.ObjectId(clientId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string) {
    const lease = await this.leaseModel.findById(id).exec();
    if (!lease) {
      throw new NotFoundException(`Lease #${id} not found`);
    }
    return lease;
  }

  async update(id: string, input: UpdateLeaseInput) {
    const { id: _ignored, ...rest } = input;
    const lease = await this.leaseModel
      .findByIdAndUpdate(id, rest, { new: true })
      .exec();

    if (!lease) {
      throw new NotFoundException(`Lease #${id} not found`);
    }
    return lease;
  }

  async remove(id: string) {
    const lease = await this.leaseModel.findByIdAndDelete(id).exec();
    if (!lease) {
      throw new NotFoundException(`Lease #${id} not found`);
    }
    return lease;
  }
}
