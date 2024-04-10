import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ConfigModule } from '@nestjs/config';
import modelConfig from 'src/config/model.config';

@Module({
  imports: [ConfigModule.forFeature(modelConfig)],
  providers: [ModelService],
  exports: [ModelService],
})
export class ModelModule {}
