import { IsNumber, IsString, IsUrl, IsArray } from 'class-validator';
import { Url } from 'url';
export class CakeDetailDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsNumber()
  tel: number;

  @IsString()
  notice: string;

  @IsNumber()
  views: number;

  @IsUrl()
  url: Url;

  @IsString()
  menu: string;

  @IsString()
  precautin: string;

  @IsString()
  others: string;

  @IsString()
  opend: string;

  @IsString()
  closed: string;

  @IsArray()
  tag: string[];

  @IsArray()
  picture: Url[];

  @IsArray()
  latlng: number[];

  @IsArray()
  category: string[];
}
