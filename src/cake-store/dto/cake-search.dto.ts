import { IsNumber, IsString, IsUrl } from 'class-validator';
import { Url } from 'url';

export class CakeSearchDTO {
  @IsString()
  title: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsUrl()
  image: Url;
}
