import { IsNumber, IsString, IsJSON, IsUrl } from 'class-validator';
export class cakestoreIdDto {
  @IsNumber()
  id: number;
}
