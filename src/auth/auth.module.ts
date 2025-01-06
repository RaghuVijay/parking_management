import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({ imports: [HttpModule], exports: [], providers: [] })
export class AuthModule {}
