import { EntityRepository, Repository } from 'typeorm';

import { User } from '../models/User';

@EntityRepository(User)
export class UserRepository extends Repository<User>  {

    public findByPolicyNumber(id: string): Promise<User> {
        return this.createQueryBuilder()
            .innerJoin('policy', 'policy', 'policy.client_id = user.id')
            .where(`policy.id = :id`, { id })
            .getOne();
    }

}
