import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common'
import { CartItemDto } from "./cartItem.dto"
import { CartService } from "./cart.service"
import { JwtAuthGuard } from "../users/jwt-auth.guard"

@Controller('cart')
export class CartController {
	
	constructor(private readonly cartService: CartService) {}
	
	@UseGuards(JwtAuthGuard)
	@Get('/all')
	async getAllCartItems() {
		return this.cartService.getAllCartItems()
	}
	
	@UseGuards(JwtAuthGuard)
	@Post('/create')
	async createCartItem(@Body() cartItem: CartItemDto) {
		await this.cartService.createCartItem(cartItem)
		return {msg: "Created", statusCode: HttpStatus.CREATED}
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('/:id')
	async getCartItemsByUserId(@Param('id', ParseIntPipe) id: number) {
		return await this.cartService.getCartItemByUserId(id)
	}
}
