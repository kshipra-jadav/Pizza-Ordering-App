import { Module } from '@nestjs/common';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import { SequelizeModule } from "@nestjs/sequelize"
import { Ingredients } from "./ingredients.model"

@Module({
  imports: [SequelizeModule.forFeature([Ingredients])],
  controllers: [IngredientsController],
  providers: [IngredientsService]
})
export class IngredientsModule {}
