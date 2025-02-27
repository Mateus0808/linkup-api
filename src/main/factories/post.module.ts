import { Module } from '@nestjs/common';
import { PostRepositoryModule } from 'src/infra/database/config/post-databse.module';

@Module({
  imports: [PostRepositoryModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class PostModule {}