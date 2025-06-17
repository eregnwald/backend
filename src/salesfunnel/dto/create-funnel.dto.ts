import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateFunnelDto {
  @IsString()
  funnel_name: string;

  @IsNumber()
  @IsOptional() // ✅ Теперь поле не обязательное
  owner_id?: number | null; // ✅ Поддерживает и number, и null
}