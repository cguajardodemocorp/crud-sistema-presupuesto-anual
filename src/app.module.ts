import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnnualPlansModule } from './annual-plans/annual-plans.module';
import { DetailPlansModule } from './detail-plans/detail-plans.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3307', 10), //3306 en PRD y 3307 en DEV
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // never use TRUE in production
    }),
    AnnualPlansModule,
    DetailPlansModule,
    HealthModule,
  ],
})
export class AppModule {}