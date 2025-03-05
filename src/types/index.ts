import { Request } from 'express';

interface User {
  tokenId: string
  sub: string
  username: string
}

declare module 'express' {
  interface Request {
    user?: User;
  }
}