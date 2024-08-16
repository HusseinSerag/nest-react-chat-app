import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './models';
import {
  AnyKeys,
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  getAll() {
    return this.userModel.find();
  }
  async findOne(
    filter?: FilterQuery<UserDocument>,
    projection?: ProjectionType<UserDocument>,
    options?: QueryOptions<UserDocument>,
  ) {
    const user = await this.userModel.findOne(filter, projection, options);
    return user;
  }

  async create(email: string, password: string) {
    const user = await this.userModel.create({
      email,
      password,
    });

    return user;
  }

  async update(
    id: string,
    user: UpdateQuery<User>,
    options?: QueryOptions<User> & { lean: true },
  ) {
    const newUser = await this.userModel.findByIdAndUpdate(id, user, options);
    return newUser;
  }

  async searchUsers(
    filter: FilterQuery<UserDocument>,
    page: number,
    projection?: ProjectionType<UserDocument>,
    options?: QueryOptions<UserDocument>,
  ) {
    const skip = page * 5;
    const query = this.userModel.find(filter, projection, options);

    const output = await query.skip(skip).limit(5);
    const total = output.length;

    return {
      users: output,
      count: total,
    };
  }
}

/*

PAGE SKIP
0     0 -> 4
1     0 -> 10

*/
