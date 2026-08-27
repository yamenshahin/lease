import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';

/**
 * Fake Mongoose model that supports the constructor and the chainable query
 * methods used by ClientsService.
 */
interface ClientModelMock {
  new (...args: unknown[]): { save: jest.Mock };
  find: jest.Mock;
  findById: jest.Mock;
  findOne: jest.Mock;
  findOneAndUpdate: jest.Mock;
  findByIdAndUpdate: jest.Mock;
  findByIdAndDelete: jest.Mock;
}

const buildClientModelMock = (): ClientModelMock => {
  const findChain = { sort: jest.fn().mockReturnThis() };
  const Ctor = jest.fn().mockImplementation((dto: unknown) => ({
    save: jest.fn().mockResolvedValue(dto),
  })) as unknown as ClientModelMock;

  return Object.assign(Ctor, {
    find: jest.fn().mockReturnValue(findChain),
    findById: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  }) as ClientModelMock;
};

describe('ClientsService', () => {
  let service: ClientsService;
  let model: ClientModelMock;

  beforeEach(async () => {
    model = buildClientModelMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        { provide: getModelToken(Client.name), useValue: model },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should instantiate the model with the input and save it', async () => {
      const input: CreateClientInput = { whatsappNumber: '0501234567' };
      const saved = { whatsappNumber: '0501234567' };

      (model as unknown as jest.Mock).mockImplementationOnce(() => ({
        save: jest.fn().mockResolvedValue(saved),
      }));

      const result = await service.create(input);

      expect(model as unknown as jest.Mock).toHaveBeenCalledWith(input);
      expect(result).toEqual(saved);
    });
  });

  describe('upsertByWhatsapp', () => {
    it('should call findOneAndUpdate with upsert options and exec', async () => {
      const client = { whatsappNumber: '0501234567' };
      const exec = jest.fn().mockResolvedValue(client);
      model.findOneAndUpdate.mockReturnValue({ exec });

      const result = await service.upsertByWhatsapp('0501234567');

      expect(model.findOneAndUpdate).toHaveBeenCalledWith(
        { whatsappNumber: '0501234567' },
        { whatsappNumber: '0501234567' },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
      expect(exec).toHaveBeenCalled();
      expect(result).toBe(client);
    });
  });

  describe('findAll', () => {
    it('should return clients sorted by createdAt desc', async () => {
      const clients = [{ whatsappNumber: '0501111111' }];
      const exec = jest.fn().mockResolvedValue(clients);
      const sort = jest.fn().mockReturnValue({ exec });
      model.find.mockReturnValue({ sort } as unknown as ReturnType<
        typeof model.find
      >);

      const result = await service.findAll();

      expect(model.find).toHaveBeenCalled();
      expect(sort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(result).toBe(clients);
    });
  });

  describe('findOne', () => {
    it('should return a client when found', async () => {
      const client = { _id: 'mongo-id', whatsappNumber: '0501234567' };
      const exec = jest.fn().mockResolvedValue(client);
      model.findById.mockReturnValue({ exec });

      const result = await service.findOne('mongo-id');

      expect(model.findById).toHaveBeenCalledWith('mongo-id');
      expect(result).toBe(client);
    });

    it('should throw NotFoundException when client is missing', async () => {
      const exec = jest.fn().mockResolvedValue(null);
      model.findById.mockReturnValue({ exec });

      await expect(service.findOne('missing')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByWhatsapp', () => {
    it('should return the matching client', async () => {
      const client = { whatsappNumber: '0501234567' };
      const exec = jest.fn().mockResolvedValue(client);
      model.findOne.mockReturnValue({ exec });

      const result = await service.findByWhatsapp('0501234567');

      expect(model.findOne).toHaveBeenCalledWith({
        whatsappNumber: '0501234567',
      });
      expect(result).toBe(client);
    });

    it('should return null when no client matches', async () => {
      const exec = jest.fn().mockResolvedValue(null);
      model.findOne.mockReturnValue({ exec });

      await expect(service.findByWhatsapp('0500000000')).resolves.toBeNull();
    });
  });

  describe('update', () => {
    it('should strip the id and update the client', async () => {
      const updated = { _id: 'mongo-id', whatsappNumber: '0509999999' };
      const exec = jest.fn().mockResolvedValue(updated);
      model.findByIdAndUpdate.mockReturnValue({ exec });

      const input = {
        id: 'mongo-id',
        whatsappNumber: '0509999999',
      } as UpdateClientInput;

      const result = await service.update('mongo-id', input);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        'mongo-id',
        { whatsappNumber: '0509999999' },
        { new: true },
      );
      expect(result).toBe(updated);
    });

    it('should throw NotFoundException when client is missing', async () => {
      const exec = jest.fn().mockResolvedValue(null);
      model.findByIdAndUpdate.mockReturnValue({ exec });

      await expect(
        service.update('missing', {
          id: 'missing',
          whatsappNumber: '0509999999',
        } as UpdateClientInput),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete and return the client', async () => {
      const removed = { _id: 'mongo-id' };
      const exec = jest.fn().mockResolvedValue(removed);
      model.findByIdAndDelete.mockReturnValue({ exec });

      const result = await service.remove('mongo-id');

      expect(model.findByIdAndDelete).toHaveBeenCalledWith('mongo-id');
      expect(result).toBe(removed);
    });

    it('should throw NotFoundException when client is missing', async () => {
      const exec = jest.fn().mockResolvedValue(null);
      model.findByIdAndDelete.mockReturnValue({ exec });

      await expect(service.remove('missing')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
