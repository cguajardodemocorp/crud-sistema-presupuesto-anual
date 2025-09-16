import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyNameDto } from './create-company-name.dto';

export class UpdateCompanyNameDto extends PartialType(CreateCompanyNameDto) {}
