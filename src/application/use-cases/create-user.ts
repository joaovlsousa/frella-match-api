import { User, UserRole } from '@application/entities/user';
import { UsersRepository } from '@application/repositories/users-repository';
import { BadRequestException, Injectable } from '@nestjs/common';

interface CreateUserRequest {
  role: UserRole;
  name: string;
  email: string;
  imageUrl?: string;
  password?: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { email, name, imageUrl, role, password } = request;

    const isUserAlheadyExists = await this.usersRepository.findByEmail(email);

    if (isUserAlheadyExists) {
      throw new BadRequestException('Este email já foi cadastrado');
    }

    const user = new User({
      name,
      email,
      role,
      imageUrl,
      password,
    });

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}
