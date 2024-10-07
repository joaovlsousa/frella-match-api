import { Freelancer } from '@application/entities/freelancer';
import { FreelancersRepository } from '@application/repositories/freelancers-repository';
import { RecrutersRepository } from '@application/repositories/recruters-repository';
import { UserRole } from '@helpers/user-role';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface CreateFreelancerRequest {
  name: string;
  email: string;
  imageUrl?: string;
}

interface CreateFreelancerResponse {
  accessToken: string;
}

@Injectable()
export class CreateFreelancer {
  constructor(
    private readonly freelancersRepository: FreelancersRepository,
    private readonly recrutersRepository: RecrutersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    request: CreateFreelancerRequest,
  ): Promise<CreateFreelancerResponse> {
    const { email, name, imageUrl } = request;

    const [isFreelancerAlheadyExists, isRecruterAlheadyExists] =
      await Promise.all([
        this.freelancersRepository.findByEmail(email),
        this.recrutersRepository.findByEmail(email),
      ]);

    if (isFreelancerAlheadyExists || isRecruterAlheadyExists) {
      throw new BadRequestException('Este email já foi cadastrado');
    }

    const freelancer = new Freelancer({
      name,
      email,
      imageUrl,
    });

    await this.freelancersRepository.create(freelancer);

    const payload = {
      id: freelancer.id,
      role: UserRole.FREELANCER,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }
}
