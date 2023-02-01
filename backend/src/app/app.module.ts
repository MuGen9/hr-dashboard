import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistModule } from 'src/blacklist/blacklist.module';
import { CandidatesModule } from 'src/candidates/candidates.module';
import { sqliteDataSource } from 'src/db/datasource';
import { JobsModule } from 'src/jobs/jobs.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JobsModule,
    AuthModule,
    UsersModule,
    CandidatesModule,
    BlacklistModule,
    TypeOrmModule.forRoot(sqliteDataSource.options),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
