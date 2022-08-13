import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common'
import { UsersService } from "./users.service"
import { User } from "./user.model"
import { oneUser } from "./oneUser.type"
import { Request } from "express"
import { JwtAuthGuard } from "./jwt-auth.guard"

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}
	
	@Post('/create')
	async createUser(@Body() user: User) {
		return await this.userService.createUser(user)
	}
	
	@Post('/authUser')
	async authorizeUser(@Req() req: Request, @Body() user: oneUser) {
		return req.body.access_token
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('/mycart')
	async getMyCart() {
		return {msg: "My Cart"}
	}
	
	@Get('/id/:id')
	async getUserById(@Param('id', ParseIntPipe) id: number) {
		return await this.userService.findById(id)
	}
	
	
	
	
}
