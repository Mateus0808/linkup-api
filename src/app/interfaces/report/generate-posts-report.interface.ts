export interface PostsReportsParams {
  userId: string
}

interface PostReport {
  title: string; 
  numberComments: number;
  likes: number; 
}

export interface PostsReportsResponse {
  reports: PostReport[];
}

export interface IGeneratePostsReportService  {
  execute (params: PostsReportsParams): Promise<PostsReportsResponse>
}

export const IGeneratePostsReportToken = 'IGeneratePostsReportToken'