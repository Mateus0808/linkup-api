import { Entity, Column, OneToMany, Index } from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { EnumGender } from 'src/domain/enum/user-gender.enum';
import { EnumUserStatus } from 'src/domain/enum/user-status.enum';
import { BaseEntity } from './base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  @Index()
  username: string;

  @Column({ type: 'varchar', length: 191, unique: true })
  @Index()
  email: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  maritalStatus: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: EnumGender, default: EnumGender.OTHER })
  gender: EnumGender;

  @Column({ type: 'text', array: true, default: [] })
  followers: string[];

  @Column({ type: 'text', array: true, default: [] })
  followings: string[];

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: EnumUserStatus, default: EnumUserStatus.ACTIVE })
  status: EnumUserStatus;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
