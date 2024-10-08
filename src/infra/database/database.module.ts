import { FreelancersRepository } from '@application/repositories/freelancers-repository';
import { RecrutersRepository } from '@application/repositories/recruters-repository';
import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { PrismaFreelancersRepository } from './prisma/repositories/prisma-freelancers-repository';
import { PrismaRecrutersRepository } from './prisma/repositories/prisma-recruters-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: FreelancersRepository,
      useClass: PrismaFreelancersRepository,
    },
    {
      provide: RecrutersRepository,
      useClass: PrismaRecrutersRepository,
    },
  ],
  exports: [FreelancersRepository],
})
export class DatabaseModule {}
