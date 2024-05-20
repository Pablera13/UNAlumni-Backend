/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  
  constructor(@InjectRepository(User) private userRepository:Repository<User>){
  }

  async create(createUserDto: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: { email: createUserDto.email }});
    if (!userFound) {
    const userCreated = this.userRepository.create(createUserDto);
    await this.userRepository.save(userCreated);
    return userCreated;
    } else {
      throw new HttpException(`User with Email ${createUserDto.email} already exists`, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const userFound = await this.userRepository.findOneBy({ id });
    if (!userFound) throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
    return userFound;
}

async update(id: number, updateUserDto: UpdateUserDto) {
    const userFound = await this.userRepository.findOneBy({ id });
    if (!userFound) throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
    
    await this.userRepository.update(id, updateUserDto);
    return updateUserDto;
}

async remove(id: number) {
    const userFound = await this.userRepository.findOneBy({ id });
    if (!userFound) throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
    
    await this.userRepository.delete(id);
    return `The user with the id #${id} was deleted`;
}

}
