import { Column, Model, PrimaryKey, Table } from "sequelize-typescript"

@Table
export class Pizza extends Model {
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