import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize"
import { IngredientType, Ingredients } from "./ingredients.model"
import { Repository, Sequelize } from "sequelize-typescript"

@Injectable()
export class IngredientsService {
	repository: Repository<Ingredients>
	constructor(sequelize: Sequelize) {
		this.repository = sequelize.getRepository(Ingredients)
	}
	
	async createOne(ingredient: IngredientType): Promise<Ingredients> {
		return await this.repository.create(ingredient)
	}
	async findAll(): Promise<Ingredients[]> {
		return await this.repository.findAll()
	}
	
}
