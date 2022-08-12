import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript"

@Table
export class User extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	userId: number
	
	@Column
	fullName: string
	
	@Column
	password: string
	
	@Column
	email: string
	
	@Column
	phoneNumber: number
	
	@Column
	address: string
	
}