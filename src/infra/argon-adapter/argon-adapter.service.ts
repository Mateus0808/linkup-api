import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { IHashComparer, IHasher } from 'src/app/ports/hasher/hasher.interface';

@Injectable()
export class ArgonAdapter implements IHashComparer, IHasher {
  async compare(value: string, hashToCompare: string): Promise<boolean> {
    const valuesMatches = await argon.verify(hashToCompare, value);
    return valuesMatches;
  }

  async hash(value: string): Promise<string> {
    const hash = await argon.hash(value);
    return hash;
  }
}