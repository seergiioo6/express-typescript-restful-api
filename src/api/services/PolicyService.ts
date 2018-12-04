import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Policy } from '../models/Policy';
import { PolicyRepository } from '../repositories/PolicyRepository';
import { events } from '../subscribers/events';

@Service()
export class PolicyService {

    constructor(
        @OrmRepository() private policyRepository: PolicyRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(username?: string): Promise<Policy[]> {
        if (username) {
            this.log.info('Find policies by user name');
            return this.policyRepository.findByUserName(username);
        } else {
            this.log.info('Find all policies');
            return this.policyRepository.find();
        }
    }

    public findOne(id: string): Promise<Policy | undefined> {
        this.log.info('Find one');
        return this.policyRepository.findOne({ id });
    }

    public async create(policy: Policy): Promise<Policy> {
        this.log.info('Create a new policy => ', policy.toString());
        policy.id = uuid.v1();
        const newPolicy = await this.policyRepository.save(policy);
        this.eventDispatcher.dispatch(events.policy.created, newPolicy);
        return newPolicy;
    }

    public update(id: string, policy: Policy): Promise<Policy> {
        this.log.info('Update a policy');
        policy.id = id;
        return this.policyRepository.save(policy);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a policy');
        await this.policyRepository.delete(id);
        return;
    }

}
