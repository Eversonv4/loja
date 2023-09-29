import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostgresConfigService } from './config/db.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule, 
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
