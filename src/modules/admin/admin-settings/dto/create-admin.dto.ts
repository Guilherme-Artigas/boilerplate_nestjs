import { ApiProperty } from '@nestjs/swagger';
import { AdminPermission, AdminPermissions } from '@prisma/client';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty()
  @IsString()
  @MaxLength(191)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(191)
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(18)
  @IsNotEmpty()
  document: string;

  @ApiProperty({ required: false })
  @MaxLength(191)
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: AdminPermissions, enumName: 'AdminPermissions', type: [AdminPermissions] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsEnum(AdminPermissions, { each: true })
  adminPermissions: AdminPermission[];

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(1500)
  @IsOptional()
  fileUrl?: string;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(1500)
  @IsOptional()
  fileKey?: string;
}
