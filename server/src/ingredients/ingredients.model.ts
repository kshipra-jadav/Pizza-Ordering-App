import { Column, Model, PrimaryKey, Table } from "sequelize-typescript"

export interface IngredientType {
	id: number
	label: string
	value: string
	additionalCost: number
}

@Table
export class Ingredients extends Model implements IngredientType {
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