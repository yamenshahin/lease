import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { LeasesService } from './leases.service';
import { Lease } from './entities/lease.entity';
import { CreateLeaseInput } from './dto/create-lease.input';
import { UpdateLeaseInput } from './dto/update-lease.input';

/**
 * Fake Mongoose model covering the operations LeasesService actually calls:
 * `create`, `find`, `findById`, `findByIdAndUpdate`, `findByIdAndDelete`.
 * `find` returns a chainable `{ sort, exec }`.
 */
interface LeaseModelMock {
  create: jest.Mock;
  find: jest.Mock;
  findById: jest.Mock;
  findByIdAndUpdate: jest.Mock;
  findByIdAndDelete: jest.Mock;
}

const buildLeaseModelMock = (): LeaseModelMock => ({
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
});

const sampleInput = (): CreateLeaseInput =>
  ({
    applicantType: 'OWNER_OR_REP' as never,
    ownerMobile: '0501111111',
    ownerId: '1234567890',
    deedNumber: 'DEED-1',
    deedDate: new Date('2025-01-01'),
    tenantType: 'INDIVIDUAL' as never,
    contractStartDate: new Date('2025-02-01'),
    contractDuration: 'ONE_YEAR' as never,
    paymentFrequency: 'MONTHLY' as never,
    annualRent: 50000,
    feePayer: 'OWNER' as never,
    unitType: 'APARTMENT' as never,
    unitNumber: 'A-101',
    floor: 'GROUND' as never,
    areaSqMeters: 120,
    bedrooms: 2,
    bathrooms: 2,
    storageRoom: false,
    maidRoom: false,
    electricityMeter: 'EM-12345',
  }) as CreateLeaseInput;

describe('LeasesService', () => {
  let service: LeasesService;
  let model: LeaseModelMock;

  beforeEach(async () => {
    model = buildLeaseModelMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeasesService,
        { provide: getModelToken(Lease.name), useValue: model },
      ],
    }).compile();

    service = module.get<LeasesService>(LeasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call model.create with input and a converted clientId ObjectId', async () => {
      const clientId = new Types.ObjectId().toHexString();
      const input = sampleInput();
      const created = { _id: 'lease-id', ...input };
      model.create.mockResolvedValue(created);

      const result = await service.create(clientId, input);

      expect(model.create).toHaveBeenCalledTimes(1);
      const [payload] = model.create.mock.calls[0];
      expect(payload).toMatchObject({ ...input });
      expect(payload.clientId).toBeInstanceOf(Types.ObjectId);
      expect(payload.clientId.toHexString()).toBe(clientId);
      expect(result).toBe(created);
    });
  });

  describe('findAll', () => {
    it('should return leases sorted by createdAt desc', async () => {
      const leases = [{ _id: 'l1' }];
      const exec = jest.fn().mockResolvedValue(leases);
      const sort = jest.fn().mockReturnValue({ exec });
      model.find.mockReturnValue({ sort } as unknown as ReturnType<
        typeof model.find
      >);

      const result = await service.findAll();

      expect(model.find).toHaveBeenCalled();
      expect(sort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(result).toBe(leases);
    });
  });

  describe('findByClient', () => {
    it('should query by clientId ObjectId and sort by createdAt desc', async () => {
      const clientId = new Types.ObjectId().toHexString();
      const leases = [{ _id: 'l1' }];
      const exec = jest.fn().mockResolvedValue(leases);
      const sort = jest.fn().mockReturnValue({ exec });
      model.find.mockReturnValue({ sort } as unknown as ReturnType<
        typeof model.find
      >);

      const result = await service.findByClient(clientId);

      const [filter] = model.find.mock.calls[0];
      expect(filter).toEqual({
        clientId: expect.any(Types.ObjectId),
      });
      expect(
        (filter as { clientId: Types.ObjectId }).clientId.toHexString(),
      ).toBe(clientId);
      expect(sort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(exec).toHaveBeenCalled();
      expect(result).toBe(leases);
    });
  });

  describe('findOne', () => {
    it('should return the lease when found', async () => {
      const lease = { _id: 'lease-id' };
      const exec = jest.fn().mockResolvedValue(lease);
      model.findById.mockReturnValue({ exec });

      const result = await service.findOne('lease-id');

      expect(model.findById).toHaveBeenCalledWith('lease-id');
      expect(result).toBe(lease);
    });

    it('should throw NotFoundException when lease is missing', async () => {
      const exec = jest.fn().mockResolvedValue(null);
      model.findById.mockReturnValue({ exec });

      await expect(service.findOne('missing')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should strip the id and update the lease', async () => {
      const updated = { _id: 'lease-id', annualRent: 60000 };
      const exec = jest.fn().mockResolvedValue(updated);
      model.findByIdAndUpdate.mockReturnValue({ exec });

      const input = {
        id: 'lease-id',
        annualRent: 60000,
      } as UpdateLeaseInput;

      const result = await service.update('lease-id', input);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        'lease-id',
        { annualRent: 60000 },
        { new: true },
      );
      expect(result).toBe(updated);
    });

    it('should throw NotFoundException when lease is missing', async () => {
      const exec = jest.fn().mockResolvedValue(null);
      model.findByIdAndUpdate.mockReturnValue({ exec });

      await expect(
        service.update('missing', { id: 'missing' } as UpdateLeaseInput),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete and return the lease', async () => {
      const removed = { _id: 'lease-id' };
      const exec = jest.fn().mockResolvedValue(removed);
      model.findByIdAndDelete.mockReturnValue({ exec });

      const result = await service.remove('lease-id');

      expect(model.findByIdAndDelete).toHaveBeenCalledWith('lease-id');
      expect(result).toBe(removed);
    });

    it('should throw NotFoundException when lease is missing', async () => {
      const exec = jest.fn().mockResolvedValue(null);
      model.findByIdAndDelete.mockReturnValue({ exec });

      await expect(service.remove('missing')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
