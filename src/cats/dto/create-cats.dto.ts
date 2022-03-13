import { IsString, IsInt, IsNotEmpty, Min, Max, Matches ,Length} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreateCatDto {
  @ApiProperty({ description: '', required: true })
  @IsString()
  @IsNotEmpty({ message: 'name không được bỏ trống' })
  @Matches(/^([a-zA-Z0-9\s-(){}><;:.,_+`'\""\~=\\\[\]/|])+$/, {message: 'name chỉ được nhập số và chữ không dấu'})
  @Type(() => String)
  name: string;

  //@Transform(value => Number.isNaN(+value) ? 0 : +value) // this field will be parsed to integer when `plainToClass gets called`
  @IsInt({ message: 'age phải là số' })
  @IsNotEmpty()
  @Min(1, { message: 'age phải nằm trong khoảng 1 đến 12' })
  @Max(12, { message: 'age phải nằm trong khoảng 1 đến 12' })
  @Type(() => Number)
  age: number;

  @ApiProperty({ description: '', required: true })
  @IsString()
  @IsNotEmpty({ message: 'breed không được bỏ trống' })
  @Length(4, 10, { message: 'độ dài nằm trong khoảng 4 đến 10 từ' })
  @Type(() => String)
  breed: string;
}

export class UpdateCatDto {
  id: string;

  @ApiProperty({ description: '', required: true })
  @IsString()
  @IsNotEmpty({ message: 'name không được bỏ trống' })
  @Matches(/^([a-zA-Z0-9\s-(){}><;:.,_+`'\""\~=\\\[\]/|])+$/, {message: 'name chỉ được nhập số và chữ không dấu'})
  @Type(() => String)
  name: string;

  //@Transform(value => Number.isNaN(+value) ? 0 : +value) // this field will be parsed to integer when `plainToClass gets called`
  @IsInt({ message: 'age phải là số' })
  @IsNotEmpty()
  @Min(1, { message: 'age phải nằm trong khoảng 1 đến 12' })
  @Max(12, { message: 'age phải nằm trong khoảng 1 đến 12' })
  @Type(() => Number)
  age: number;

  @ApiProperty({ description: '', required: true })
  @IsString()
  @IsNotEmpty({ message: 'breed không được bỏ trống' })
  @Length(4, 10, { message: 'độ dài nằm trong khoảng 4 đến 10 từ' })
  @Type(() => String)
  breed: string;
}

export class ListAllEntities {
  name: string;
  age: number;
  breed: string;
  limit: number;
}