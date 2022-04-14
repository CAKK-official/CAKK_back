import { IsArray, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class cakeStore {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  address: string;

  @Column()
  @IsNumber()
  tel: number;

  @Column()
  @IsString()
  notice: string;

  @Column()
  @IsNumber()
  views: number;

  @Column()
  @IsString()
  url: string;

  @Column()
  @IsString()
  menu: string;

  @Column()
  @IsString()
  precautin: string;

  @Column()
  @IsString()
  others: string;

  @Column()
  @IsString()
  opend: string;

  @Column()
  @IsString()
  closed: string;

  @Column()
  @IsArray()
  tag: string[];

  @Column()
  @IsArray()
  picture: string[];

  @Column()
  @IsArray()
  latlng: number[];

  @Column()
  @IsArray()
  category: string[];
}
