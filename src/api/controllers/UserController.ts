import {
    Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, Req, QueryParam, Authorized
} from 'routing-controllers';

import { UserNotFoundError } from '../errors/UserNotFoundError';
import { User } from '../models/User';
import { UserService } from '../services/UserService';

@JsonController('/users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Authorized(['user', 'admin'])
    @Get()
    public find(@QueryParam('name') name: string): Promise<User[] | undefined> {
        return this.userService.find(name);
    }

    @Authorized(['user', 'admin'])
    @Get('/me')
    public findMe(@Req() req: any): Promise<User[]> {
        return req.user;
    }

    @Authorized(['admin'])
    @Get('/policy/:id')
    @OnUndefined(UserNotFoundError)
    public oneByPolicyNumber(@Param('id') id: string): Promise<User | undefined> {
        return this.userService.findByPolicyNumber(id);
    }

    @Authorized(['user', 'admin'])
    @Get('/:id')
    @OnUndefined(UserNotFoundError)
    public one(@Param('id') id: string): Promise<User | undefined> {
        return this.userService.findOne(id);
    }

    @Authorized(['admin'])
    @Post()
    public create(@Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

    @Authorized(['admin'])
    @Put('/:id')
    public update(@Param('id') id: string, @Body() user: User): Promise<User> {
        return this.userService.update(id, user);
    }

    @Authorized(['admin'])
    @Delete('/:id')
    public delete(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }

}
