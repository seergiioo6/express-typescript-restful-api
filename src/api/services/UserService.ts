import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { events } from '../subscribers/events';

@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(name?: string): Promise<User[]> {
        this.log.info('Find all users by query');
        const query = name ? { name } : {};
        return this.userRepository.find({ relations: ['policies'], where: query });
    }

    public findOne(id: string): Promise<User | undefined> {
        this.log.info('Find one user');
        return this.userRepository.findOne({ relations: ['policies'], where: { id } });
    }

    public findByPolicyNumber(id: string): Promise<User | undefined> {
        this.log.info('Find one user by policy number');
        return this.userRepository.findByPolicyNumber(id);
    }

    public async create(user: User): Promise<User> {
        this.log.info('Create a new user => ', user.toString());
        user.id = uuid.v1();
        const newUser = await this.userRepository.save(user);
        this.eventDispatcher.dispatch(events.user.created, newUser);
        return newUser;
    }

    public update(id: string, user: User): Promise<User> {
        this.log.info('Update a user');
        user.id = id;
        return this.userRepository.save(user);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a user');
        await this.userRepository.delete(id);
        return;
    }

}
