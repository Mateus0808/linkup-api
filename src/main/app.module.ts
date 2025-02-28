import { Module } from '@nestjs/common';
import { UserModule } from './factories/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './factories/post.module';
import { CommentModule } from './factories/comment.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { AuthModule } from './factories/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'minhasenhae?08',
      database: 'linkup-db',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    UserModule,
    PostModule,
    CommentModule
  ],
  controllers: [],
  providers: [ 
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    }
  ],
})
export class AppModule {}
