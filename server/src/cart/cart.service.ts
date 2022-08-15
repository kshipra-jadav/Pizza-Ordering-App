import { Injectable } from '@nestjs/common'
import { Repository, Sequelize } from "sequelize-typescript"
import { Cart } from "./cart.model"
import { CartItemDto } from "./cartItem.dto"
import { User } from "../users/user.model"

@Injectable()
export class CartService {
	repository: Repository<Cart>
	
	constructor(sequelize: Sequelize) {
		this.repository = sequelize.getRepository(Cart)
	}
	
	async createCartItem(cartItem: CartItemDto) {
		// @ts-ignore
		return await this.repository.create(cartItem)
	}
	
	async getCartItemByUserId(id: number) {
		return await this.repository.findAll({
			where: { UserId: id },
		})
	}
	
	async deleteCartItemsByUserId(id: number) {
		return await this.repository.destroy({
			where: { UserId: id }
		})
	}
	
	async getAllCartItems() {
		return await this.repository.findAll()
	}
}
