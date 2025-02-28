import { Inject } from '@nestjs/common'
import { ILoadUserByParamRepository, ILoadUserByParamRepositoryToken } from 'src/app/ports/repositories/user/load-user-by-param-repository.interface'
import { NotFoundError } from 'src/app/errors/not-found-error'
import { CreatePostParams, CreatePostResponse, ICreatePostService } from 'src/app/interfaces/post/create-post-service-interface'
import { ICreatePostRepository, ICreatePostRepositoryToken } from 'src/app/ports/repositories/post/create-post-repository-interface'
import { BadRequestError } from 'src/app/errors/bad-request-error'

export class CreatePostService implements ICreatePostService {
  constructor(
    @Inject(ICreatePostRepositoryToken)
    private readonly createPostRepository: ICreatePostRepository,
    @Inject(ILoadUserByParamRepositoryToken)
    private readonly loadUserRepository: ILoadUserByParamRepository,
  ) {}

  async execute (createPostParams: CreatePostParams): Promise<CreatePostResponse> {
    const { description, userId, title } = createPostParams
  
    const userExists = await this.loadUserRepository.findOne({ id: userId })
    if (!userExists) throw new NotFoundError("Usuário não encontrado")
    
    const postCreated = await this.createPostRepository.create({
      title,
      description,
      user: userExists,
    })
    if (!postCreated) throw new BadRequestError("Erro ao criar postagem")

    return postCreated
  }
}
