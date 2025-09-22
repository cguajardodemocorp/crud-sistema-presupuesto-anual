import { Module } from '@nestjs/common';
import { CecoService } from './ceco.service';
import { CecoController } from './ceco.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ceco } from './entities/ceco.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ceco])],
  controllers: [CecoController],
  providers: [CecoService],
  exports: [TypeOrmModule], // Exporta si otro módulo necesita acceder a CECO
})
export class CecoModule {}
