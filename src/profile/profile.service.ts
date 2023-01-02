import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  
  constructor(
    @InjectRepository(Profile)
    private profileRepository : Repository<Profile>
  ) {
  }
  
  create(createProfileDto: CreateProfileDto) {
    // this.profileRepository.create({
    //
    // })
    const profile = new Profile();
    profile.active = true;
    profile.save().then(d => console.log(d)).catch(e => console.log(e));
    return `This action adds a new profile ${createProfileDto.active}`;
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
