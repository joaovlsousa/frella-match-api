import { RecrutersRepository } from '@application/repositories/recruters-repository';
import { FreelancersRepository } from '@application/repositories/users-repository';
import { UserRole } from '@helpers/user-role';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface CreateFreelancerRequest {
  email: string;
}

interface CreateFreelancerResponse {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly freelancersRepository: FreelancersRepository,
    private readonly recrutersRepository: RecrutersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    request: CreateFreelancerRequest,
  ): Promise<CreateFreelancerResponse> {
    const { email } = request;

    const [isFreelancerAlheadyExists, isRecruterAlheadyExists] =
      await Promise.all([
        this.freelancersRepository.findByEmail(email),
        this.recrutersRepository.findByEmail(email),
      ]);

    if (!isFreelancerAlheadyExists && !isRecruterAlheadyExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    let accessToken: string;

    if (isFreelancerAlheadyExists) {
      const payload = {
        id: isFreelancerAlheadyExists.id,
        role: UserRole.FREELANCER,
      };

      accessToken = this.jwtService.sign(payload);
    }

    if (isRecruterAlheadyExists) {
      const payload = {
        id: isRecruterAlheadyExists.id,
        role: UserRole.RECRUTER,
      };

      accessToken = this.jwtService.sign(payload);
    }

    return {
      accessToken,
    };
  }
}
