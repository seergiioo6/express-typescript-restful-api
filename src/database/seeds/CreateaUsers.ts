import {Factory, Seed, times} from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import fetch from 'node-fetch';

import { User } from '../../../src/api/models/User';

export class CreateaUsers implements Seed {

    public async fetchUsers(): Promise<User[]> {
        const data = await fetch('http://www.mocky.io/v2/5808862710000087232b75ac');
        const response = await data.json();
        return response.clients;
    }

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        const users = await this.fetchUsers();
        await times(users.length, async (n) => {
            const user: User = new User();

            user.id = users[n].id;
            user.name = users[n].name;
            user.email = users[n].email;
            user.role = users[n].role;

            return await em.save(user);
        });
    }

}
