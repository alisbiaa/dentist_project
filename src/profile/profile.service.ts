import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { IResponse } from '../utils/Interfaces';

@Injectable()
export class ProfileService {
  
  constructor(
    @InjectRepository(Profile)
    private profileRepository : Repository<Profile>
  ) {
  }
  
  async create(createProfileDto: CreateProfileDto) : Promise<IResponse<Profile>> {
    return this.profileRepository.insert(createProfileDto)
      .then(data => {
        return {
          message: 'Profile has been created!',
          success: true,
          data: data.raw,
        };
      })
      .catch(error => {
        return {
          success : false,
          message : 'Could not create profile...',
          error,
          data : null
        }
      });
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
