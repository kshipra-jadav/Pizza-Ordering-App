import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common'
import { OrdersService } from "./orders.service"
import { OrderItemDto } from "./orderItem.dto"
import { JwtAuthGuard } from "../users/jwt-auth.guard"

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}
	
	@UseGuards(JwtAuthGuard)
	@Get('/:id')
	async getOrderByUserId(@Param('id', ParseIntPipe) id: number) {
		return await this.ordersService.getOrderByUserId(id)
	}
	
	@UseGuards(JwtAuthGuard)
	@Post('/create')
	async createOrder(@Body() orderItem: OrderItemDto) {
		return await this.ordersService.createOrder(orderItem)
	}
}
