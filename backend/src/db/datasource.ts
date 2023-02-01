import { DataSource } from 'typeorm';
import { BlacklistedCandidate } from '../blacklist/model/blacklisted-candidate.entity';
import { Candidate } from '../candidates/model/candidate.entity';
import { Job } from '../jobs/models/job.entity';
import { User } from '../users/model/user.entity';

export const sqliteDataSource = new DataSource({
  type: 'sqlite',
  database: 'db',
  entities: [User, Candidate, Job, BlacklistedCandidate],
  migrations: ['dist/db/migrations/*.js'],
});
