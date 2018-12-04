import * as nock from 'nock';
import request from 'supertest';
import { runSeed } from 'typeorm-seeding';

import { User } from '../../../src/api/models/User';
import { CreateSergio } from '../utils/createSergio';
import { closeDatabase } from '../../utils/database';
import { BootstrapSettings } from '../utils/bootstrap';
import { prepareServer } from '../utils/server';

describe('/api/users', () => {

    let sergio: User;
    let sergioAuthorization: string;
    let settings: BootstrapSettings;

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    beforeAll(async () => {
        settings = await prepareServer({ migrate: true });
        sergio = await runSeed<User>(CreateSergio); // Password = name
        sergioAuthorization = Buffer.from(`${sergio.name}:${sergio.name}`).toString('base64');
    });

    afterAll(async () => {
        nock.cleanAll();
        await closeDatabase(settings.connection);
    });

    // -------------------------------------------------------------------------
    // Tests
    // -------------------------------------------------------------------------

    test('GET: / should return a list of users', async (done) => {
        const response = await request(settings.app)
            .get('/api/users')
            .set('Authorization', `Basic ${sergioAuthorization}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.length).toBe(1);
        done();
    });

    test('GET: ?name=sergio should return a list of users filtered by name (Sergio)', async (done) => {
        const response = await request(settings.app)
            .get(`/api/users?name=${sergio.name}`)
            .set('Authorization', `Basic ${sergioAuthorization}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.length).toBe(1);
        done();
    });

    test('GET: /:id should return sergio', async (done) => {
        const response = await request(settings.app)
            .get(`/api/users/${sergio.id}`)
            .set('Authorization', `Basic ${sergioAuthorization}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.id).toBe(sergio.id);
        expect(response.body.name).toBe(sergio.name);
        expect(response.body.email).toBe(sergio.email);
        done();
    });

});
