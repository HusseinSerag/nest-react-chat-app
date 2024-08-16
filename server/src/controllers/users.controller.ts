import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UsersService } from '../services';
import { AuthGaurd } from 'src/gaurds/auth.gaurd';
import { User } from 'src/decorators/user.decorator';
import { UserDocument } from 'src/repository';
import { CompleteUserProfileDto, SearchContactsDto } from 'src/dtos/user-dtos';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Patch('/deleteProfilePicture')
  @UseGuards(AuthGaurd)
  async removeProfilePicture(@User() user: UserDocument) {
    await this.userService.removeProfilePhoto(user);
    return {
      status: 'success',
    };
  }
  @Patch('/completeProfile')
  @UseGuards(AuthGaurd)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'profilePicture', maxCount: 1 }]),
  )
  async updateUserProfile(
    @User() user: UserDocument,
    @UploadedFiles() file: { profilePicture?: Express.Multer.File[] },
    @Body() completeUserProfileDto: CompleteUserProfileDto,
  ) {
    const updatedUser = await this.userService.updateUser(
      user.id,
      {
        ...completeUserProfileDto,
        profileSetup: true,
      },
      file.profilePicture?.[0],
    );

    return {
      status: 'success',
      id: updatedUser._id,
    };
  }
  @Get('/searchContacts')
  @UseGuards(AuthGaurd)
  async searchContacts(
    @Query() query: SearchContactsDto,
    @User() user: UserDocument,
  ) {
    const users = await this.userService.searchUsersByNameAndEmail(
      user.id,
      query.searchTerm,
      query.page,
    );

    return {
      status: 'success',
      ...users,
    };
  }
}
