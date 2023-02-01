import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Candidate } from 'src/candidates/model/candidate.entity';
import { CreateCandidateDto } from 'src/candidates/dto/create-candidate.dto';

const createRandomCandidate = (): CreateCandidateDto => ({
  companyName: faker.company.name(),
  name: faker.name.fullName(),
  logo: 'https://picsum.photos/200/300',
  longDescription: faker.lorem.words(5),
  shortDescription: faker.lorem.words(2),
  position: faker.name.jobTitle(),
});

export class seedCandidateTable1674511903444 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const candidates = Array.from({ length: 10 }).map(createRandomCandidate);
    const queries = candidates.map((candidate) =>
      queryRunner.manager.save(
        queryRunner.manager.create<Candidate>('candidate', candidate),
      ),
    );

    await Promise.all(queries);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM candidate`);
  }
}
