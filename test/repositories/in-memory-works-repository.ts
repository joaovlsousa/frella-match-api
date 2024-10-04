import { Work } from '@application/entities/work';
import { WorksRepository } from '@application/repositories/works-repository';

export class InMemoryWorksRepository implements WorksRepository {
  public works: Work[] = [];

  async create(work: Work): Promise<void> {
    this.works.push(work);
  }

  async findById(workId: string): Promise<Work | null> {
    const work = this.works.find((item) => item.id === workId);

    if (!work) {
      return null;
    }

    return work;
  }

  async save(work: Work): Promise<void> {
    const workIndex = this.works.findIndex((item) => item.id === work.id);

    if (workIndex >= 0) {
      this.works[workIndex] = work;
    }
  }

  async findManyByFreelancerId(freelancerId: string): Promise<Work[]> {
    const works = this.works.filter((item) => item.id === freelancerId);

    return works;
  }

  async countManyByFreelancerId(freelancerId: string): Promise<number> {
    const works = this.works.filter((item) => item.id === freelancerId);

    return works.length;
  }

  async findManyByRecruterId(recruterId: string): Promise<Work[]> {
    const works = this.works.filter((item) => item.id === recruterId);

    return works;
  }

  async countManyByRecruterId(recruterId: string): Promise<number> {
    const works = this.works.filter((item) => item.id === recruterId);

    return works.length;
  }
}
