import { Request, ResponseToolkit } from '@hapi/hapi';
import { SectionService } from '../services/SectionService';
import { Section } from '../models/Section';

export class SectionController {
  private sectionService: SectionService;

  constructor(sectionService: SectionService) {
    this.sectionService = sectionService;
  }

  async getAll(request: Request, h: ResponseToolkit) {
    try {
      const sections = await this.sectionService.getAll();
      return h.response(sections).code(200);
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to get all sections' }).code(500);
    }
  }

  async getById(request: Request, h: ResponseToolkit) {
    try {
      const id = parseInt(request.params.id, 10);
      const section = await this.sectionService.getById(id);
      if (section) {
        return h.response(section).code(200);
      } else {
        return h.response({ message: 'Section not found' }).code(404);
      }
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to get section by id' }).code(500);
    }
  }

  async create(request: Request, h: ResponseToolkit) {
    try {
      const section = request.payload as Omit<Section, 'id' | 'createdAt' | 'updatedAt'>;
      const createdSection = await this.sectionService.create(section);
      return h.response(createdSection).code(201);
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to create section' }).code(500);
    }
  }

  async update(request: Request, h: ResponseToolkit) {
    try {
      const id = parseInt(request.params.id, 10);
      const section = request.payload as Omit<Section, 'id' | 'createdAt' | 'updatedAt'>;
      const updatedSection = await this.sectionService.update(id, section);
      if (updatedSection) {
        return h.response(updatedSection).code(200);
      } else {
        return h.response({ message: 'Section not found' }).code(404);
      }
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to update section' }).code(500);
    }
  }

  async delete(request: Request, h: ResponseToolkit) {
    try {
      const id = parseInt(request.params.id, 10);
      const deleted = await this.sectionService.delete(id);
      if (deleted) {
        return h.response({ message: 'Section deleted' }).code(200);
      } else {
        return h.response({ message: 'Section not found' }).code(404);
      }
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to delete section' }).code(500);
    }
  }
}
