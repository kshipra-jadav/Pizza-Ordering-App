import { User, UserType } from "../users/user.model"
import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript"

export interface CartType {
	id: number
	UserId: number
	user: UserType
	pizza: string
	ingredients: string
	pizzaPrice: number
	ingredientsPrice: number
}

@Table({ tableName: "Cart" })
export class Cart extends Model implements CartType {
	
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
	pizza: string
	
	@Column
	ingredients: string
	
	@Column
	pizzaPrice: number
	
	@Column
	ingredientsPrice: number
	
}