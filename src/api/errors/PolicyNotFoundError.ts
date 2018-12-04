import { HttpError } from 'routing-controllers';

export class PolicyNotFoundError extends HttpError {
    constructor() {
        super(404, 'Policy not found!');
    }
}
