import { Recruter } from '@application/entities/recruter';
import { FreelancersRepository } from '@application/repositories/freelancers-repository';
import { RecrutersRepository } from '@application/repositories/recruters-repository';
import { UserRole } from '@helpers/user-role';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface CreateRecruterRequest {
  name: string;
  email: string;
  imageUrl?: string;
}

interface CreateRecruterResponse {
  accessToken: string;
}

@Injectable()
export class CreateRecruter {
  constructor(
    private readonly freelancersRepository: FreelancersRepository,
    private readonly recrutersRepository: RecrutersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    request: CreateRecruterRequest,
  ): Promise<CreateRecruterResponse> {
    const { email, name, imageUrl } = request;

    const [isFreelancerAlheadyExists, isRecruterAlheadyExists] =
      await Promise.all([
        this.freelancersRepository.findByEmail(email),
        this.recrutersRepository.findByEmail(email),
      ]);

    if (isFreelancerAlheadyExists || isRecruterAlheadyExists) {
      throw new BadRequestException('Este email já foi cadastrado');
    }

    const recruter = new Recruter({
      name,
      email,
      imageUrl,
    });

    await this.recrutersRepository.create(recruter);

    const payload = {
      id: recruter.id,
      role: UserRole.RECRUTER,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }
}
