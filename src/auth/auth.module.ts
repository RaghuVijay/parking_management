import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({ imports: [HttpModule, ConfigModule], exports: [], providers: [] })
export class AuthModule {}
