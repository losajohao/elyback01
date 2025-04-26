import { Period } from '../models/Period';
import { PeriodRepository } from '../repositories/PeriodRepository';

export class PeriodService {
  private periodRepository: PeriodRepository;

  constructor(periodRepository: PeriodRepository) {
    this.periodRepository = periodRepository;
  }

  async getAll(): Promise<Period[]> {
    return this.periodRepository.getAll();
  }

  async getById(id: number): Promise<Period | null> {
    return this.periodRepository.getById(id);
  }

  async create(period: Omit<Period, 'id' | 'created_at' | 'updated_at'>): Promise<Period> {
    return this.periodRepository.create(period);
  }

  async update(id: number, period: Omit<Period, 'id' | 'created_at' | 'updated_at'>): Promise<Period | null> {
    return this.periodRepository.update(id, period);
  }

  async delete(id: number): Promise<boolean> {
    return this.periodRepository.delete(id);
  }
}
