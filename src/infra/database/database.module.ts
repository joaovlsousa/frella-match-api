import { SubmissionsRepository } from '@application/repositories/submissions-repository';
import { UsersRepository } from '@application/repositories/users-repository';
import { WorksRepository } from '@application/repositories/works-repository';
import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { PrismaSubmissionsRepository } from './prisma/repositories/prisma-submissions-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';
import { PrismaWorksRepository } from './prisma/repositories/prisma-works-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: WorksRepository,
      useClass: PrismaWorksRepository,
    },
    {
      provide: SubmissionsRepository,
      useClass: PrismaSubmissionsRepository,
    },
  ],
  exports: [UsersRepository],
})
export class DatabaseModule {}
