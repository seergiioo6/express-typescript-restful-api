import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, QueryParam
} from 'routing-controllers';

import { PolicyNotFoundError } from '../errors/PolicyNotFoundError';
import { Policy } from '../models/Policy';
import { PolicyService } from '../services/PolicyService';

@Authorized(['admin'])
@JsonController('/policies')
export class PolicyController {

    constructor(
        private policyService: PolicyService
    ) { }

    @Get()
    @OnUndefined(PolicyNotFoundError)
    public find(@QueryParam('username') name: string): Promise<Policy[] | undefined> {
        return this.policyService.find(name);
    }

    @Get('/:id')
    @OnUndefined(PolicyNotFoundError)
    public one(@Param('id') id: string): Promise<Policy | undefined> {
        return this.policyService.findOne(id);
    }

    @Post()
    public create(@Body() policy: Policy): Promise<Policy> {
        return this.policyService.create(policy);
    }

    @Put('/:id')
    public update(@Param('id') id: string, @Body() policy: Policy): Promise<Policy> {
        return this.policyService.update(id, policy);
    }

    @Delete('/:id')
    public delete(@Param('id') id: string): Promise<void> {
        return this.policyService.delete(id);
    }

}
