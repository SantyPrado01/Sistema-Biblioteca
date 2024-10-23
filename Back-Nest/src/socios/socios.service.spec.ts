import { Test, TestingModule } from '@nestjs/testing';
import { SociosService } from './socios.service';
import { Socio } from './entities/socio.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common';
import { CreateSocioDto } from './dto/create-socio.dto';
import { PagoService } from 'src/pagos/pagos.service';
import { UpdateSocioDto } from './dto/update-socio.dto';

describe('SociosService (ATDD)', () => {
  let service: SociosService;
  let repository: Repository<Socio>;
  let pagoService: PagoService;

  const mockSocio: Socio = {
    socioId: 1,
    nroDocumento: '12345678',
    nombre: 'Socio 1',
    apellido: 'Apellido 1',
    email: 'socio1@example.com',
    telefono: '1234567890',
    eliminado: false,
    prestamos: [],
    pagos: [],
  };

  const mockSocioDto: CreateSocioDto = {
    nroDocumento: '12345678',
    nombre: 'Nuevo Socio',
    apellido: 'Apellido Nuevo',
    email: 'nuevo@example.com',
    telefono: '0987654321',
  };

  const mockUpdateDto: UpdateSocioDto = {
    nombre: 'Socio Actualizado',
    apellido: 'Apellido Actualizado',
    email: 'actualizado@example.com',
    telefono: '1122334455',
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockSocio),
    findOne: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
  };

  const mockPagoService = {
    crearPagoInicial: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SociosService,
        {
          provide: getRepositoryToken(Socio),
          useValue: mockRepository,
        },
        {
          provide: PagoService,
          useValue: mockPagoService,
        },
      ],
    }).compile();

    service = module.get<SociosService>(SociosService);
    repository = module.get<Repository<Socio>>(getRepositoryToken(Socio));
    pagoService = module.get<PagoService>(PagoService);

    jest.clearAllMocks();
  });

  describe('Crear Socio', () => {
    it('Debería crear un nuevo socio y retornar el socio creado', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null); // Simula que no existe el socio
      mockRepository.save.mockResolvedValueOnce(mockSocio); // Simula que se guarda el nuevo socio
      await service.create(mockSocioDto);
      
      expect(mockRepository.save).toHaveBeenCalledWith(expect.objectContaining(mockSocioDto));
      expect(mockPagoService.crearPagoInicial).toHaveBeenCalledWith({ socioId: expect.any(Number), monto: 1000 });
    });

    it('Debería lanzar una excepción si el socio ya existe', async () => {
      mockRepository.findOne.mockResolvedValueOnce(mockSocio); // Simula que el socio ya existe

      await expect(service.create(mockSocioDto)).rejects.toThrow(
        expect.objectContaining({
          name: 'HttpException',
          message: 'El Socio ya existe. Prueba nuevamente.',
        }),
      );
    });
  });

  describe('Buscar todos los socios', () => {
    it('Debería retornar un array de socios', async () => {
      const result: Socio[] = [mockSocio];
      mockRepository.find.mockResolvedValueOnce(result);
      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('Buscar un socio', () => {
    it('Debería retornar un socio existente', async () => {
      mockRepository.findOneBy.mockResolvedValueOnce(mockSocio);
      expect(await service.findOne(1)).toEqual(mockSocio);
    });

    it('Debería lanzar una excepción si el socio no existe', async () => {
      mockRepository.findOneBy.mockResolvedValueOnce(null);
      await expect(service.findOne(999)).rejects.toThrow(HttpException);
      await expect(service.findOne(999)).rejects.toThrow('Socio no encontrado');
    });
  });

  describe('Actualizar un socio', () => {
    it('Debería actualizar y retornar el socio actualizado', async () => {
      const updatedSocio: Socio = { ...mockSocio, ...mockUpdateDto };
      mockRepository.findOneBy.mockResolvedValueOnce(mockSocio);
      mockRepository.save.mockResolvedValueOnce(updatedSocio);

      const result = await service.update(1, mockUpdateDto);
      expect(result).toEqual(updatedSocio);
    });

    it('Debería lanzar una excepción si el socio no existe', async () => {
      mockRepository.findOneBy.mockResolvedValueOnce(null);
      await expect(service.update(999, mockUpdateDto)).rejects.toThrow(HttpException);
      await expect(service.update(999, mockUpdateDto)).rejects.toThrow('Socio no encontrado');
    });
  });

  describe('Eliminar un socio', () => {
    it('Debería marcar al socio como eliminado', async () => {
      const existingSocio: Socio = { ...mockSocio, eliminado: false };
      mockRepository.findOneBy.mockResolvedValueOnce(existingSocio);

      await service.remove(1);
      expect(mockRepository.save).toHaveBeenCalledWith({ ...existingSocio, eliminado: true });
    });

    it('Debería lanzar una excepción si el socio no existe', async () => {
      mockRepository.findOneBy.mockResolvedValueOnce(null);
      await expect(service.remove(999)).rejects.toThrow(HttpException);
      await expect(service.remove(999)).rejects.toThrow('Socio no encontrado');
    });
  });
});
