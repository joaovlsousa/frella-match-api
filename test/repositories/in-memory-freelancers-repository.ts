import { Freelancer } from '@application/entities/freelancer';
import { FreelancersRepository } from '@application/repositories/freelancers-repository';

export class InMemoryFreelancersRepository implements FreelancersRepository {
  public freelancers: Freelancer[] = [];

  async create(freelancer: Freelancer): Promise<void> {
    this.freelancers.push(freelancer);
  }

  async findById(freelancerId: string): Promise<Freelancer | null> {
    const freelancer = this.freelancers.find(
      (item) => item.id === freelancerId,
    );

    if (!freelancer) {
      return null;
    }

    return freelancer;
  }

  async findByEmail(email: string): Promise<Freelancer | null> {
    const freelancer = this.freelancers.find((item) => item.email === email);

    if (!freelancer) {
      return null;
    }

    return freelancer;
  }

  async save(freelancer: Freelancer): Promise<void> {
    const freelancerIndex = this.freelancers.findIndex(
      (item) => item.id === freelancer.id,
    );

    if (freelancerIndex >= 0) {
      this.freelancers[freelancerIndex] = freelancer;
    }
  }
}
