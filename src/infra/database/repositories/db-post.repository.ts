import { Injectable } from "@nestjs/common"
import { IDeletePostRepository } from "src/app/ports/repositories/post/delete-post-repository-interface"
import { Post } from "../pg/post.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreatePostRepositoryParams, ICreatePostRepository } from "src/app/ports/repositories/post/create-post-repository-interface"
import { PostDatabaseModel } from "src/app/ports/repositories/models/post.model"
import { ILoadPostRepository } from "src/app/ports/repositories/post/load-post-repository.interface"
import { ILoadUserPostsRepository, LoadUserPostsRepositoryParams, LoadUserPostsRepositoryResponse } from "src/app/ports/repositories/post/load-user-posts-repository.interface"
import { IUpdatePostRepository, UpdatePostRepoParams } from "src/app/ports/repositories/post/update-user-repository.port"
import { ILoadUserPostsWithourPagination } from "src/app/ports/repositories/post/load-user-posts-without-pagination.interface"

@Injectable()
export class PostRepository implements 
  ICreatePostRepository, 
  IDeletePostRepository, 
  ILoadPostRepository,
  ILoadUserPostsRepository,
  IUpdatePostRepository,
  ILoadUserPostsWithourPagination
{
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}

  async create (createPostParams: CreatePostRepositoryParams): Promise<PostDatabaseModel | null> {
    const { user, ...rest } = createPostParams
    const post = this.postRepository.create({ 
      user: { id: user.id },
      ...rest
    })

    const savedPost = await this.postRepository.save(post)
    if (!savedPost) return null

    return savedPost
  }
  
  async findOne (postId: string): Promise<PostDatabaseModel | null> {
    const post = await this.postRepository.findOne({ 
      where: { id: postId }, relations: ['user', 'comments', 'comments.user']
    })
    if (!post) return null

    return post
  }

  async findUserPosts(userId: string): Promise<PostDatabaseModel[]> {
    const posts = await this.postRepository.find({
      where: { user: { id: userId }}, relations: ['comments', 'user']
    })

    return posts
  }

  async loadUserPosts (
    params: LoadUserPostsRepositoryParams
  ): Promise<LoadUserPostsRepositoryResponse> {
    const { userId, page, limit } = params;
    const skip = (page - 1) * limit;

    const [data, total] = await this.postRepository.findAndCount({
      where: { user: { id: userId } },
      skip,
      take: limit,
      order: { createdAt: "DESC" },
      relations: ["user", "comments", "comments.user", "comments.post"],
    });

    return { data, total };
  }

  async update (postId: string, data: UpdatePostRepoParams): Promise<PostDatabaseModel | null> {
    const post = await this.postRepository.update(postId, data)
    if(!post) return null

    return await this.findOne(postId)
  }
  
  async delete(postId: string): Promise<boolean | null> {
    const post = await this.postRepository.delete(postId)
    if (post.affected === 0) return null

    return true
  }
}