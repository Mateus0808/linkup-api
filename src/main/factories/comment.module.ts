import { Module } from '@nestjs/common';
import { CommentRepositoryModule } from 'src/infra/database/config/comment-database.module';

@Module({
  imports: [CommentRepositoryModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class CommentModule {}