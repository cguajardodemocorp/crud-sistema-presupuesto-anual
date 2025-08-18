import { Module } from '@nestjs/common';
import { AnnualPlansModule } from './annual-plans/annual-plans.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AnnualPlansModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_crud',
      password: 'root',
      database: 'db_crud',
      autoLoadEntities: true,
      synchronize: true,//desactivar en prd
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
