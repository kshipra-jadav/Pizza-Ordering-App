import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { OrdersService } from "./orders.service"
import { OrderItemDto } from "./orderItem.dto"

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}
	
	@Get('/:id')
	async getOrderByUserId(@Param('id', ParseIntPipe) id: number) {
		return await this.ordersService.getOrderByUserId(id)
	}
	
	@Post('/create')
	async createOrder(@Body() orderItem: OrderItemDto) {
		return await this.ordersService.createOrder(orderItem)
	}
}
