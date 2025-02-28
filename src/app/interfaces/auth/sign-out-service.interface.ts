export interface ISignOutService {
  signOut(tokenId: string): Promise<void>
}

export const ISignOutServiceToken = 'ISignOutServiceToken'