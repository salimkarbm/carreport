import {
  IsString,
  IsNumber,
  Max,
  Min,
  IsLongitude,
  IsLatitude,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class GetEstimateDto {
  @IsString()
  make: string;
  @IsString()
  model: string;
  @IsNumber()
  @Min(1930)
  @Max(2050)
  @Transform(({ value }) => parseInt(value))
  year: number;
  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number;
  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
