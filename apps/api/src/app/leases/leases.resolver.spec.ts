import { Test, TestingModule } from '@nestjs/testing';
import { LeasesResolver } from './leases.resolver';
import { LeasesService } from './leases.service';
import { CreateLeaseInput } from './dto/create-lease.input';
import { UpdateLeaseInput } from './dto/update-lease.input';

describe('LeasesResolver', () => {
  let resolver: LeasesResolver;
  let service: {
    create: jest.Mock;
    findAll: jest.Mock;
    findByClient: jest.Mock;
    findOne: jest.Mock;
    update: jest.Mock;
    remove: jest.Mock;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeasesResolver,
        {
          provide: LeasesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByClient: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<LeasesResolver>(LeasesResolver);
    service = module.get(LeasesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createLease', () => {
    it('should delegate to LeasesService.create with clientId and input', async () => {
      const input = {} as CreateLeaseInput;
      const created = { _id: 'lease-id' };
      service.create.mockResolvedValue(created);

      const result = await resolver.createLease('client-id', input);

      expect(service.create).toHaveBeenCalledWith('client-id', input);
      expect(result).toBe(created);
    });
  });

  describe('leases (findAll)', () => {
    it('should delegate to LeasesService.findAll', async () => {
      const leases = [{ _id: 'lease-id' }];
      service.findAll.mockResolvedValue(leases);

      const result = await resolver.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toBe(leases);
    });
  });

  describe('leasesByClient (findByClient)', () => {
    it('should delegate to LeasesService.findByClient with clientId', async () => {
      const leases = [{ _id: 'lease-id' }];
      service.findByClient.mockResolvedValue(leases);

      const result = await resolver.findByClient('client-id');

      expect(service.findByClient).toHaveBeenCalledWith('client-id');
      expect(result).toBe(leases);
    });
  });

  describe('lease (findOne)', () => {
    it('should delegate to LeasesService.findOne with the id', async () => {
      const lease = { _id: 'lease-id' };
      service.findOne.mockResolvedValue(lease);

      const result = await resolver.findOne('lease-id');

      expect(service.findOne).toHaveBeenCalledWith('lease-id');
      expect(result).toBe(lease);
    });
  });

  describe('updateLease', () => {
    it('should delegate to LeasesService.update with id and full input', async () => {
      const input = {
        id: 'lease-id',
        annualRent: 60000,
      } as UpdateLeaseInput;
      const updated = { _id: 'lease-id', annualRent: 60000 };
      service.update.mockResolvedValue(updated);

      const result = await resolver.updateLease(input);

      expect(service.update).toHaveBeenCalledWith('lease-id', input);
      expect(result).toBe(updated);
    });
  });

  describe('removeLease', () => {
    it('should delegate to LeasesService.remove with the id', async () => {
      const removed = { _id: 'lease-id' };
      service.remove.mockResolvedValue(removed);

      const result = await resolver.removeLease('lease-id');

      expect(service.remove).toHaveBeenCalledWith('lease-id');
      expect(result).toBe(removed);
    });
  });
});
