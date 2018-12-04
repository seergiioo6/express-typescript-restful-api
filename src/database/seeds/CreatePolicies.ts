import {Factory, Seed, times} from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import fetch from 'node-fetch';

import { Policy } from '../../api/models/Policy';

export class CreatePolicies implements Seed {

    public async fetchPolices(): Promise<Policy[]> {
        const data = await fetch('http://www.mocky.io/v2/580891a4100000e8242b75c5');
        const response = await data.json();
        return response.policies;
    }

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        const policies: Policy[] = await this.fetchPolices();
        await times(policies.length, async (n) => {
            const policy = new Policy();

            policy.id = policies[n].id;
            policy.amountInsured = policies[n].amountInsured;
            policy.email = policies[n].email;
            policy.inceptionDate = policies[n].inceptionDate;
            policy.installmentPayment = policies[n].installmentPayment;
            policy.clientId = policies[n].clientId;

            return await em.save(policy);
        });
    }

}
