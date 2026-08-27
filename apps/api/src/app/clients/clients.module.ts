import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsService } from './clients.service';
import { ClientsResolver } from './clients.resolver';
import { Client, ClientSchema } from './entities/client.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  providers: [ClientsResolver, ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
