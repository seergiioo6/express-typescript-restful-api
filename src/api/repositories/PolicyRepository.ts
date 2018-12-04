import { EntityRepository, Repository } from 'typeorm';

import { Policy } from '../models/Policy';

@EntityRepository(Policy)
export class PolicyRepository extends Repository<Policy> {

    public findByUserName(name: string): Promise<Policy[]> {
        return this.createQueryBuilder()
            .innerJoin('user', 'user', 'user.id = policy.client_id')
            .where(`user.name = :name`, {name})
            .getMany();
    }

}
