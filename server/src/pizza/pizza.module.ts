import { Module } from '@nestjs/common';
import { PizzaController } from './pizza.controller';
import { PizzaService } from './pizza.service';
import { SequelizeModule } from "@nestjs/sequelize"
import { Pizza } from "./pizza.model"

@Module({
  imports: [SequelizeModule.forFeature([Pizza])],
  controllers: [PizzaController],
  providers: [PizzaService]
})
export class PizzaModule {}
