import { IsNumber, IsString, IsJSON, IsUrl } from 'class-validator';
export class cakestoreIdDto {
  @IsNumber()
  id: number;
}

// @IsNumber()
// id: number;

// @IsString()
// name: string;

// @IsString()
// address: string;

// @IsString()
// tel: string;

// @IsString()
// notice: string;

// @IsUrl()
// url: string;

// @IsString()
// menu: string;

// @IsString()
// beforebuy: string;

// @IsString()
// whenbuy: string;

// @IsString()
// afterbuy: string;

// @IsString()
// others: string;

// @IsString()
// opened: string;

// @IsString()
// closed: string;

// @IsUrl()
// picture: string;

// @IsJSON()
// latlng: object;

// @IsNumber()
// views: number;

// @IsNumber()
// shares: number;
