import { Column, Model, PrimaryKey, Table } from "sequelize-typescript"


export interface PizzaType {
	id: number
	name: string
	veg: boolean
	price: number
	description: string
	quantity: number
	img: string
}

@Table
export class Pizza extends Model implements PizzaType {
	@PrimaryKey
	@Column
	id: number
	
	@Column
	name: string
	
	@Column
	veg: boolean
	
	@Column
	price: number
	
	@Column
	description: string
	
	@Column
	quantity: number
	
	@Column
	img: string

}