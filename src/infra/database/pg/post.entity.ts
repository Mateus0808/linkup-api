import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { BaseEntity } from './base.entity';

@Entity('posts')
export class Post extends BaseEntity {
  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Column({ type: 'simple-json', nullable: true, default: [] })
  likes: string[];
}
