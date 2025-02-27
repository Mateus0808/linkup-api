import { Module } from '@nestjs/common';
import { ArgonAdapter } from './argon-adapter.service';
import { IHashComparerToken, IHasherToken } from 'src/app/ports/hasher/hasher.interface';

@Module({
  providers: [
    {
      provide: IHashComparerToken,
      useClass: ArgonAdapter,
    },
    {
      provide: IHasherToken,
      useClass: ArgonAdapter,
    }
  ],
  exports: [IHashComparerToken, IHasherToken],
})
export class ArgonAdapterModule {}