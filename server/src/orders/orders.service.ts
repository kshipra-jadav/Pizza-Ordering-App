import { Injectable } from '@nestjs/common'
import { Repository, Sequelize } from "sequelize-typescript"
import { Order } from "./order.model"
import { OrderItemDto } from "./orderItem.dto"

@Injectable()
export class OrdersService {
	repository: Repository<Order>
	
	constructor(sequelize: Sequelize) {
		this.repository = sequelize.getRepository(Order)
	}
	
	async getOrderByUserId(id: number) {
		return await this.repository.findAll({
			where: { UserId: id }
		})
	}
	
	async createOrder(orderItem: OrderItemDto) {
		// @ts-ignore
		return await this.repository.create(orderItem)
	}
}
