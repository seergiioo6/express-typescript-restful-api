import { Action } from 'routing-controllers';
import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { Logger } from '../lib/logger';
import { AuthService } from './AuthService';

export function authorizationChecker(connection: Connection): (action: Action, roles: any[]) => Promise<boolean> | boolean {
    const log = new Logger(__filename);
    const authService = Container.get<AuthService>(AuthService);

    return async function innerAuthorizationChecker(action: Action, authorizedRoles: string[]): Promise<boolean> {
        const credentials = authService.parseBasicAuthFromRequest(action.request);

        if (credentials === undefined) {
            log.warn('No credentials given');
            return false;
        }

        action.request.user = await authService.validateUser(credentials.name, credentials.password);
        if (action.request.user === undefined) {
            log.warn('Invalid credentials given');
            return false;
        }

        if (authorizedRoles && authorizedRoles.some( role => role === action.request.user.role)) {
            log.info('Successfully checked credentials');
            return true;
        } else {
            log.error('Invalid Permissions');
            return false;
        }

    };
}
