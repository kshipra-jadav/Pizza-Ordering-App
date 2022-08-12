import { Body, Controller, Get, Param, ParseIntPipe, Post, Req } from '@nestjs/common'
import { UsersService } from "./users.service"
import { User } from "./user.model"
import { oneUser } from "./oneUser.type"
import { Request } from "express"

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}
	
	@Post('/create')
	async createUser(@Body() user: User) {
		return await this.userService.createUser(user)
	}
	
	@Post('/authUser')
	async authorizeUser(@Req() req: Request, @Body() user: oneUser) {
		return req.body.user
	}
	
	@Get('/id/:id')
	async getUserById(@Param('id', ParseIntPipe) id: number) {
		return await this.userService.findById(id)
	}
	
	
	
	
}
