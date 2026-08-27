import { Test, TestingModule } from '@nestjs/testing';
import { ClientsResolver } from './clients.resolver';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';

const makeClient = (overrides: Partial<Client> = {}): Client =>
  ({
    _id: 'mongo-id',
    whatsappNumber: '0501234567',
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }) as Client;

describe('ClientsResolver', () => {
  let resolver: ClientsResolver;
  let service: jest.Mocked<ClientsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsResolver,
        {
          provide: ClientsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            upsertByWhatsapp: jest.fn(),
            findByWhatsapp: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<ClientsResolver>(ClientsResolver);
    service = module.get(ClientsService) as jest.Mocked<ClientsService>;
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createClient', () => {
    it('should delegate to ClientsService.create', async () => {
      const input: CreateClientInput = { whatsappNumber: '0501234567' };
      const created = makeClient();
      service.create.mockResolvedValue(created);

      const result = await resolver.createClient(input);

      expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toBe(created);
    });
  });

  describe('clients (findAll)', () => {
    it('should delegate to ClientsService.findAll', async () => {
      const clients = [makeClient()];
      service.findAll.mockResolvedValue(clients);

      const result = await resolver.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toBe(clients);
    });
  });

  describe('client (findOne)', () => {
    it('should delegate to ClientsService.findOne with the id', async () => {
      const client = makeClient();
      service.findOne.mockResolvedValue(client);

      const result = await resolver.findOne('mongo-id');

      expect(service.findOne).toHaveBeenCalledWith('mongo-id');
      expect(result).toBe(client);
    });
  });

  describe('updateClient', () => {
    it('should delegate to ClientsService.update with id and full input', async () => {
      const input = {
        id: 'mongo-id',
        whatsappNumber: '0509999999',
      } as UpdateClientInput;
      const updated = makeClient({ whatsappNumber: '0509999999' });
      service.update.mockResolvedValue(updated);

      const result = await resolver.updateClient(input);

      expect(service.update).toHaveBeenCalledWith('mongo-id', input);
      expect(result).toBe(updated);
    });
  });

  describe('removeClient', () => {
    it('should delegate to ClientsService.remove with the id', async () => {
      const removed = makeClient();
      service.remove.mockResolvedValue(removed);

      const result = await resolver.removeClient('mongo-id');

      expect(service.remove).toHaveBeenCalledWith('mongo-id');
      expect(result).toBe(removed);
    });
  });
});
