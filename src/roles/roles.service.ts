import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private roleRepository : Repository<Role>
  ) {
  }

  async create(createRoleDto: CreateRoleDto) : Promise<string> {
    return this.roleRepository.insert(createRoleDto)
      .then(data => "Created")
      .catch(error => "ERROR");
  }

  findAll() : Promise<Role[]> {
    return this.roleRepository.find();
  }

  findOne(id: number) : Promise<Role>{
    return this.roleRepository.findOne({
      where: { id },
    })
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  async remove(id: number) : Promise<void> {
    const role = await this.roleRepository.findOneBy({ id });
    await role.remove();
  }
}
