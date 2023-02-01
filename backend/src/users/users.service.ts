import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from './model/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(findBy: Pick<FindOptionsWhere<User>, 'email' | 'id'>) {
    const user = await this.userRepository.findOneBy(findBy);

    if (!user) {
      throw new NotFoundException();
    }

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  findOneWithPassword(findBy: Pick<FindOptionsWhere<User>, 'email' | 'id'>) {
    return this.userRepository.findOneBy(findBy);
  }

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const foundUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (foundUser) {
      throw new ConflictException('User with given email already exists');
    }

    const createdUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const user = await this.userRepository.save(createdUser);

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(updatePasswordDto.password, salt);

    await this.userRepository.update(
      { id: userId },
      { password: hashedPassword },
    );
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    await this.userRepository.update({ id: userId }, updateProfileDto);
  }
}
