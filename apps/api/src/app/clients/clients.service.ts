import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './entities/client.entity';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  async create(createClientInput: CreateClientInput): Promise<Client> {
    const client = new this.clientModel(createClientInput);
    return client.save();
  }

  /** Used by Auth (OTP flow) — upsert by whatsappNumber */
  async upsertByWhatsapp(whatsappNumber: string): Promise<Client> {
    return this.clientModel
      .findOneAndUpdate(
        { whatsappNumber },
        { whatsappNumber },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      )
      .exec();
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientModel.findById(id).exec();
    if (!client) {
      throw new NotFoundException(`Client #${id} not found`);
    }
    return client;
  }

  async findByWhatsapp(whatsappNumber: string): Promise<Client | null> {
    return this.clientModel.findOne({ whatsappNumber }).exec();
  }

  async update(
    id: string,
    updateClientInput: UpdateClientInput,
  ): Promise<Client> {
    const { id: _, ...updateData } = updateClientInput;

    const client = await this.clientModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!client) {
      throw new NotFoundException(`Client #${id} not found`);
    }
    return client;
  }

  async remove(id: string): Promise<Client> {
    const client = await this.clientModel.findByIdAndDelete(id).exec();
    if (!client) {
      throw new NotFoundException(`Client #${id} not found`);
    }
    return client;
  }
}
