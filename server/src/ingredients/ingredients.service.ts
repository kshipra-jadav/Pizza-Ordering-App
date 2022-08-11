import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize"
import { Ingredients } from "./ingredients.model"

@Injectable()
export class IngredientsService {
	constructor(
		@InjectModel(Ingredients)
		private ingredientModel: typeof Ingredients
	) {}
	
	async findAll(): Promise<Ingredients[]> {
		return this.ingredientModel.findAll()
	}
	
	async createOne(ingredient: Ingredients): Promise<Ingredients> {
		//@ts-ignore
		return this.ingredientModel.create(ingredient)
	}
}
