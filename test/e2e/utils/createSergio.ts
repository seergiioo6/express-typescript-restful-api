import { Connection } from 'typeorm';
import { Factory, Seed } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { User } from '../../../src/api/models/User';

export class CreateSergio implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<User> {

        const em = connection.createEntityManager();

        const user = new User();
        user.id = uuid.v1();
        user.name = 'Sergio';
        user.email = 'sergio.anru@gmail.com';
        user.role = 'admin';
        return await em.save(user);
    }

}
