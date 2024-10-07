import { Recruter } from '@application/entities/recruter';
import { RecrutersRepository } from '@application/repositories/recruters-repository';

export class InMemoryRecrutersRepository implements RecrutersRepository {
  public recruters: Recruter[] = [];

  async create(recruter: Recruter): Promise<void> {
    this.recruters.push(recruter);
  }

  async findById(recruterId: string): Promise<Recruter | null> {
    const recruter = this.recruters.find((item) => item.id === recruterId);

    if (!recruter) {
      return null;
    }

    return recruter;
  }

  async findByEmail(email: string): Promise<Recruter | null> {
    const recruter = this.recruters.find((item) => item.email === email);

    if (!recruter) {
      return null;
    }

    return recruter;
  }

  async save(recruter: Recruter): Promise<void> {
    const recruterIndex = this.recruters.findIndex(
      (item) => item.id === recruter.id,
    );

    if (recruterIndex >= 0) {
      this.recruters[recruterIndex] = recruter;
    }
  }
}
