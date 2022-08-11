import { Column, Model, PrimaryKey, Table } from "sequelize-typescript"

@Table
export class Ingredients extends Model {
	@PrimaryKey
	@Column
	id: number
	
	@Column
	label: string
	
	@Column
	value: string
	
	@Column
	additionalCost: number
}