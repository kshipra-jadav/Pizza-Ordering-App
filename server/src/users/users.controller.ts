import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { UsersService } from "./users.service"
import { User } from "./user.model"

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}
	
	@Post('/create')
	async createUser(@Body() user: User) {
		return await this.userService.createUser(user)
	}
	
	@Get('/:id')
	async getUserById(@Param('id', ParseIntPipe) id: number) {
		return await this.userService.findById(id)
	}
	
	@Get('/:email')
	async getUserByEmail(@Param('email') email: string) {
		return await this.userService.findByEmail(email)
	}
}
