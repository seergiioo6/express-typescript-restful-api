import { User } from '../../../src/api/models/User';
import { UserService } from '../../../src/api/services/UserService';
import { EventDispatcherMock } from '../lib/EventDispatcherMock';
import { LogMock } from '../lib/LogMock';
import { RepositoryMock } from '../lib/RepositoryMock';

describe('UserService', () => {

    test('Find should return a list of users', async (done) => {
        const log = new LogMock();
        const repo = new RepositoryMock();
        const ed = new EventDispatcherMock();
        const user = new User();
        user.id = '1';
        user.name = 'John';
        user.email = 'john.doe@test.com';
        user.role = 'admin';
        repo.list = [user];
        const userService = new UserService(repo as any, ed as any, log);
        const list = await userService.find();
        expect(list[0].name).toBe(user.name);
        done();
    });

});
