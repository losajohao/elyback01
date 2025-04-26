import { Section } from '../models/Section';
import { SectionRepository } from '../repositories/SectionRepository';

export class SectionService {
  private sectionRepository: SectionRepository;

  constructor(sectionRepository: SectionRepository) {
    this.sectionRepository = sectionRepository;
  }

  async getAll(): Promise<Section[]> {
    return this.sectionRepository.getAll();
  }

  async getById(id: number): Promise<Section | null> {
    return this.sectionRepository.getById(id);
  }

  async create(section: Omit<Section, 'id' | 'createdAt' | 'updatedAt'>): Promise<Section> {
    return this.sectionRepository.create(section);
  }

  async update(id: number, section: Omit<Section, 'id' | 'createdAt' | 'updatedAt'>): Promise<Section | null> {
    return this.sectionRepository.update(id, section);
  }

  async delete(id: number): Promise<boolean> {
    return this.sectionRepository.delete(id);
  }
}
