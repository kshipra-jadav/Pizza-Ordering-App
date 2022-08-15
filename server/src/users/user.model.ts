import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript"

export interface UserType {
	userId: number
	fullName: string
	password: string
	email: string
	phoneNumber: string
	address: string
	imageUrl: string
}

@Table
export class User extends Model implements UserType{
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
	phoneNumber: string
	
	@Column
	address: string
	
	@Column
	imageUrl: string
	
}