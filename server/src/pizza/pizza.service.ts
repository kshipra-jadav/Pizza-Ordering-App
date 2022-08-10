import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize"
import { Pizza } from "./pizza.model"

@Injectable()
export class PizzaService {
	constructor(
		@InjectModel(Pizza)
		private pizzaModel: typeof Pizza
	) {}
	
	async findAll(): Promise<Pizza[]> {
		return this.pizzaModel.findAll()
	}
}
