import { Request, ResponseToolkit } from '@hapi/hapi';
import { PeriodService } from '../services/PeriodService';
import { Period } from '../models/Period';  // O la ruta correcta donde está definida Period


export class PeriodController {
  private periodService: PeriodService;

  constructor(periodService: PeriodService) {
    this.periodService = periodService;
  }

  async getAll(request: Request, h: ResponseToolkit) {
    try {
      const periods = await this.periodService.getAll();
      return h.response(periods).code(200);
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Error al obtener los periodos' }).code(500);
    }
  }

  async getById(request: Request, h: ResponseToolkit) {
    try {
      const id = parseInt(request.params.id, 10);
      const period = await this.periodService.getById(id);
      if (period) {
        return h.response(period).code(200);
      } else {
        return h.response({ message: 'Periodo no encontrado' }).code(404);
      }
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Error al obtener el periodo' }).code(500);
    }
  }

  async create(request: Request, h: ResponseToolkit) {
    try {
      const period = request.payload as Omit<Period, 'id' | 'created_at' | 'updated_at'>;
      const createdPeriod = await this.periodService.create(period);
      return h.response(createdPeriod).code(201);
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Error al crear el periodo' }).code(500);
    }
  }

  async update(request: Request, h: ResponseToolkit) {
    try {
      const id = parseInt(request.params.id, 10);
      const period = request.payload as Omit<Period, 'id' | 'created_at' | 'updated_at'>;
      const updatedPeriod = await this.periodService.update(id, period);
      if (updatedPeriod) {
        return h.response(updatedPeriod).code(200);
      } else {
        return h.response({ message: 'Periodo no encontrado' }).code(404);
      }
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Error al actualizar el periodo' }).code(500);
    }
  }

  async delete(request: Request, h: ResponseToolkit) {
    try {
      const id = parseInt(request.params.id, 10);
      const deleted = await this.periodService.delete(id);
      if (deleted) {
        return h.response({ message: 'Periodo eliminado' }).code(200);
      } else {
        return h.response({ message: 'Periodo no encontrado' }).code(404);
      }
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Error al eliminar el periodo' }).code(500);
    }
  }
}
