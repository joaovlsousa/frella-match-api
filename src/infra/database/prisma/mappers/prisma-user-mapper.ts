import { User } from '@application/entities/user';
import { User as RawUser } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        imageUrl: raw.imageUrl,
        password: raw.password,
        role: raw.role,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
