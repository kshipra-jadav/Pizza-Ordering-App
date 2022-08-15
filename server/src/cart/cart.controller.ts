import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common'
import { CartItemDto } from "./cartItem.dto"
import { CartService } from "./cart.service"

@Controller('cart')
export class CartController {
	
	constructor(private readonly cartService: CartService) {}
	
	@Get('/all')
	async getAllCartItems() {
		return this.cartService.getAllCartItems()
	}
	
	@Post('/create')
	async createCartItem(@Body() cartItem: CartItemDto) {
		await this.cartService.createCartItem(cartItem)
		return {msg: "Created", statusCode: HttpStatus.CREATED}
	}
	
	@Get('/:id')
	async getCartItemsByUserId(@Param('id', ParseIntPipe) id: number) {
		return await this.cartService.getCartItemByUserId(id)
	}
}
