import { Controller, Get } from '@nestjs/common'
import { PizzaService } from "./pizza.service"

@Controller('pizza')
export class PizzaController {
	
	constructor(private readonly pizzaService: PizzaService) {
	}
	
	@Get('/all')
	async getAllPizza() {
		return await this.pizzaService.findAll()
	}
}
