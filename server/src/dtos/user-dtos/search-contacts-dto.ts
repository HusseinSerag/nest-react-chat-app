import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class SearchContactsDto {
  @IsString()
  @IsNotEmpty()
  searchTerm: string;

  @IsNumberString()
  page: number;
}
