import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, email } = createUserDto;

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with default role
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      role: UserRole.USER,
    });

    try {
      await this.userRepository.save(user);
      delete user.password; // Remove password from response
      return user;
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto, currentUser: User): Promise<User> {
    // Only admin can update users
    if (currentUser.role !== UserRole.ADMIN) {
      throw new UnauthorizedException('Only administrators can update users');
    }

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    Object.assign(user, updateUserDto);

    await this.userRepository.save(user);
    delete user.password; // Remove password from response
    return user;
  }

  async disableUser(id: number, currentUser: User): Promise<User> {
    // Only admin and librarian can disable users
    if (![UserRole.ADMIN, UserRole.LIBRARIAN].includes(currentUser.role)) {
      throw new UnauthorizedException('Only administrators and librarians can disable users');
    }

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Prevent disabling admin users if current user is librarian
    if (user.role === UserRole.ADMIN && currentUser.role === UserRole.LIBRARIAN) {
      throw new UnauthorizedException('Librarians cannot disable administrator accounts');
    }

    user.isActive = false;
    await this.userRepository.save(user);
    delete user.password; // Remove password from response
    return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    delete user.password;
    return user;
  }

  async updateProfilePicture(userId: number, profilePicturePath: string): Promise<User> {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    user.profilePicture = profilePicturePath;
    return this.userRepository.save(user);
  }
}
