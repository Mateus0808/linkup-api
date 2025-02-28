import { Injectable } from "@nestjs/common"
import { IDeletePostRepository } from "src/app/ports/repositories/post/delete-post-repository-interface"
import { Post } from "../pg/post.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreatePostRepositoryParams, ICreatePostRepository } from "src/app/ports/repositories/post/create-post-repository-interface"
import { CreatePostDatabaseModel, PostDatabaseModel } from "src/app/ports/repositories/models/post.model"
import { ILoadPostRepository } from "src/app/ports/repositories/post/load-post-repository.interface"

@Injectable()
export class PostRepository implements 
  ICreatePostRepository, 
  IDeletePostRepository, 
  ILoadPostRepository
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
    console.log("savedpOsr", savedPost)
    return savedPost
  }
  
  async findOne (postId: string): Promise<PostDatabaseModel | null> {
    const post = await this.postRepository.findOne({ 
      where: { id: postId }, relations: ['user']
    })
    if (!post) return null

    return post
  }
  
  async delete(postId: string): Promise<boolean | null> {
    const user = await this.postRepository.delete(postId)
    if (user.affected === 0) return null

    return true
  }
}