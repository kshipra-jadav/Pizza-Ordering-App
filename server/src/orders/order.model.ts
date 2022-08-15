import { User, UserType } from "../users/user.model"
import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript"

export interface OrderType {
	id: number
	UserId: number
	user: UserType
	pizza_price: string
}

@Table({ tableName: "Order" })
export class Order extends Model implements OrderType {
	
	@PrimaryKey
	@AutoIncrement
	@Column
	id: number
	
	@ForeignKey(() => User)
	@Column
	UserId: number
	
	@BelongsTo(() => User)
	public user: User
	
	@Column
	pizza_price: string
	
}