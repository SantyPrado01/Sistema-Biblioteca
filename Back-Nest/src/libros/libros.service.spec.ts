import { Test, TestingModule } from '@nestjs/testing';
import { LibrosService } from './libros.service';
import { Libro } from './entities/libro.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';

describe('LibrosService', () => {
  let service: LibrosService;
  let repository: Repository<Libro>;

  const mockLibro: Libro = {
    libroId: 1,
    titulo: 'Libro 1',
    autor: 'Autor 1',
    categoria: 'Categoría 1',
    disponible: true,
    prestamos: [],
    eliminado: false,
  };

  const mockLibroDto: CreateLibroDto = {
    titulo: 'Nuevo Libro',
    autor: 'Nuevo Autor',
    categoria: 'Nueva Categoría',
    disponible: true,
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockLibro),
    findOne: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LibrosService,
        {
          provide: getRepositoryToken(Libro),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LibrosService>(LibrosService);
    repository = module.get<Repository<Libro>>(getRepositoryToken(Libro));
    
    // Limpiar mocks antes de cada prueba
    jest.clearAllMocks();
  });

  it('Deberia estar definido el Service:', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Debería lanzar una excepción de conflicto si el libro ya existe', async () => {
      mockRepository.findOne.mockResolvedValueOnce(mockLibro); // Simula que el libro ya existe
  
      await expect(service.create(mockLibroDto)).rejects.toThrow(
        expect.objectContaining({
          name: 'HttpException',
          message: 'El libro ya existe. Prueba nuevamente.',
        }),
      );
    });
  
    it('Deberia crear un nuevo libro si no existe', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null); // Simular que el libro no existe
      mockRepository.save.mockResolvedValueOnce(mockLibro); // Simular que se guarda el nuevo libro
  
      const result = await service.create(mockLibroDto);
      expect(result).toEqual(mockLibro); 
    });
  });
  
  

  describe('findAll', () => {
    it('Deberia devolver un array de libros', async () => {
      const result: Libro[] = [mockLibro];
      mockRepository.find.mockResolvedValueOnce(result);
      expect(await service.findAll()).toEqual(result);
    });

    it('Deberia devolver un array vacio si no existen libros.', async () => {
      mockRepository.find.mockResolvedValueOnce([]);
      const result = await service.findAll();
      expect(result).toEqual([]); 
    });
  });

  describe('findOne', () => {
    it('Deberia devolver un solo libro.', async () => {
      mockRepository.findOneBy.mockResolvedValueOnce(mockLibro);
      expect(await service.findOne(1)).toEqual(mockLibro);
    });

    it('Deberia lanzar un error si no se encuentra el libro.', async () => {
      mockRepository.findOneBy.mockResolvedValueOnce(null);
      await expect(service.findOne(999)).rejects.toThrow(HttpException);
      await expect(service.findOne(999)).rejects.toThrow('Libro no encontrado');
    });
  });

  describe('update', () => {
    it('Deberia actualizar y devolver el libro actualizado', async () => {
      const updatedLibro: Libro = { ...mockLibro, ...mockLibroDto };

      mockRepository.findOneBy.mockResolvedValueOnce(mockLibro);
      mockRepository.save.mockResolvedValueOnce(updatedLibro);

      const result = await service.update(1, mockLibroDto);
      expect(result).toEqual(updatedLibro);
    });

    it('Deberia lanzar un error si el libro no existe', async () => {
      mockRepository.findOneBy.mockResolvedValueOnce(null);
      await expect(service.update(999, mockLibroDto)).rejects.toThrow(HttpException);
      await expect(service.update(999, mockLibroDto)).rejects.toThrow('Libro no encontrado');
    });
  });

  describe('remove', () => {
    it('Deberia actualizar el libro y marcar "eliminado" como verdadero.', async () => {
      const existingLibro: Libro = { ...mockLibro, eliminado: false };

      mockRepository.findOneBy.mockResolvedValueOnce(existingLibro);
      const result = await service.remove(1);
      expect(result).toEqual({ ...existingLibro, eliminado: true });
      expect(mockRepository.save).toHaveBeenCalledWith({ ...existingLibro, eliminado: true });
    });

    it('Deberia lanzar un error si el libro no existe.', async () => {
      mockRepository.findOneBy.mockResolvedValueOnce(null);
      await expect(service.remove(999)).rejects.toThrow(HttpException);
      await expect(service.remove(999)).rejects.toThrow('Libro no encontrado');
    });
  });
});
