import { Body, Controller, Get, Post } from '@nestjs/common'
import { IngredientsService } from "./ingredients.service"
import { Ingredients } from "./ingredients.model"

@Controller('ingredients')
export class IngredientsController {
	constructor(private readonly ingredientService: IngredientsService) {}
	
	@Get('/all')
	async findAll() {
		return this.ingredientService.findAll()
	}
	
	@Post('/create')
	async createIngredient(@Body() ingredient: Ingredients) {
		await this.ingredientService.createOne(ingredient)
	}
}
