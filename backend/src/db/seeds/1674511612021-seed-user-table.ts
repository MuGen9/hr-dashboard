import { MigrationInterface, QueryRunner } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { User } from 'src/users/model/user.entity';

export class seedUserTable1674511612021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('example', salt);

    await queryRunner.manager.save(
      queryRunner.manager.create<User>('user', {
        email: 'john.doe@example.com',
        password: hashedPassword,
        firstName: 'John',
        lastName: 'Doe',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM user`);
  }
}
