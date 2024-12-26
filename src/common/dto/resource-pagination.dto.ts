import { IsEnum, IsOptional, IsPositive } from 'class-validator';
import { ResourceLimit } from '../enum/resource-limit.enum';
import { Transform, Type } from 'class-transformer';

export class ResourcePaginationDto {
  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  page: number = 1;

  @Transform(({ value }) => parseInt(value, 10))
  @IsEnum(ResourceLimit, {
    message: 'Limit must be one of 20, 50 or 100',
  })
  @IsOptional()
  limit: ResourceLimit = ResourceLimit.TWENTY;
}
