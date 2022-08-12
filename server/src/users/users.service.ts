import { Injectable } from '@nestjs/common';
import { Repository, Sequelize } from "sequelize-typescript"
import { User } from "./user.model"

@Injectable()
export class UsersService {
	repository: Repository<User>
	
	constructor(sequelize: Sequelize) {
		this.repository = sequelize.getRepository(User)
	}
	
	async findById(id: number): Promise<User> {
		return await this.repository.findOne({
			where: {
				id
			}
		})
	}
	
	async createUser(user: User): Promise<User> {
		return await this.repository.create(user)
	}
	
	async findByEmail(email: string): Promise<User> {
		return await this.repository.findOne({
			where: {
				email
			}
		})
	}
}
