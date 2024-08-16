import { Injectable } from '@nestjs/common';

import { UserRepository } from 'src/repository';

import { User, UserDocument } from 'src/repository/users/models/user.model';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private cloudinaryService: CloudinaryService,
  ) {}

  async removeProfilePhoto(user: UserDocument) {
    if (user.profilePicture) {
      await this.cloudinaryService.deleteFile(user.profilePicture);
      user.profilePicture = '';
      await this.userRepository.update(user.id, user, {
        new: true,
        lean: true,
      });
    }
  }
  async updateUser(
    id: string,
    user: Partial<User>,
    profilePicture?: Express.Multer.File,
  ) {
    if (profilePicture) {
      const updatedUser = await this.userRepository.findOne({
        _id: id,
      });
      await this.cloudinaryService.deleteFile(updatedUser.profilePicture);
      user.profilePicture = '';
      const res = await this.cloudinaryService.uploadFile(profilePicture);
      user.profilePicture = res.secure_url;
    }
    const updatedUser = await this.userRepository.update(id, user, {
      new: true,
      lean: true,
    });

    return updatedUser;
  }
  async searchUsersByNameAndEmail(
    id: string,
    searchTerm: string,
    page: number,
  ) {
    const users = await this.userRepository.searchUsers(
      {
        $and: [
          { _id: { $ne: id }, profileSetup: true },
          {
            $or: [
              { firstName: { $regex: searchTerm, $options: 'i' } },
              { lastName: { $regex: searchTerm, $options: 'i' } },
              { email: { $regex: searchTerm, $options: 'i' } },
            ],
          },
        ],
      },
      page,
      {
        password: false,
        profileSetup: false,
      },
    );
    return users;
  }
}
