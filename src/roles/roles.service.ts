import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { IResponse } from '../utils/Interfaces';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private roleRepository : Repository<Role>
  ) {
  }

  async create(createRoleDto: CreateRoleDto) : Promise<IResponse<Role>> {
    return this.roleRepository.insert(createRoleDto)
      .then(data => {
        return {
          message: 'Role has been created!',
          success: true,
          data: data.raw,
        };
      })
      .catch(error => {
        return {
          success : false,
          message : 'Could not create role...',
          error,
          data : null
        }
      });

  }

  findAll() : Promise<IResponse<Role[]>> {
    return this.roleRepository.find()
      .then(data => {
        return {
          message: data ? 'All the roles!' : 'Database has no roles....',
          success: !!data,
          data: data,
        };
      })
      .catch(error => {
        return {
          success : false,
          message : 'Cannot query all the roles...',
          error,
          data : null
        }
      });
  }

  findOne(id: number) : Promise<IResponse<Role>>{
    return this.roleRepository.findOne({
      where: { id },
    })
      .then(data => {
        return {
          message: data? 'Role has been found!' : 'Role does not exist...',
          success: !!data,
          data: data ,
        };
      })
      .catch(error => {
        return {
          success: false,
          message: 'An error has a occurred...',
          error,
          data: null,
        };
      });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) : Promise<IResponse<Role>> {
    const role = await this.roleRepository.findOneBy({ id });
    if (!role) {
      return {
        message: 'Role does not exist...',
        success: false,
        data: null,
      };
    }
    for (const key in updateRoleDto)
      role[key] = updateRoleDto[key];

    // else
    try {
      const updated_role = await role.save();
      return {
        data: updated_role,
        success: true,
        message: 'Role has been updated!',
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        message: 'Error has occurred...',
        error,
      };
    }
  }

  async remove(id: number) : Promise<IResponse<Role>> {
    const role = await this.roleRepository.findOneBy({ id });
    if (!role) {
      return {
        message: 'Role does not exist...',
        success: false,
        data: null,
      };
    }
    try {
      await role.remove();
      return {
        data: role,
        success: true,
        message: 'Role has been deleted!',
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        message: 'Error has occurred...',
        error,
      };
    }
  }
}
