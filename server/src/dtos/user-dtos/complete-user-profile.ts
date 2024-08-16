import { IsString } from 'class-validator';

export class CompleteUserProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  color: string;
}
