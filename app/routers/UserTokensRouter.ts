import {
    Router,
    Response,
    NextFunction,
    Express,
} from 'express';
import { createValidator } from 'express-joi-validation';
import { UserTypes, RequestType } from '@types';
import { userCreateScheme, userLoginScheme } from '@validators';
import { createUser, checkToken } from '@services';

import UserRoutes = UserTypes.UserRoutes;
import UserType = UserTypes.UserType;

const validator = createValidator({
    passError: true,
});

class UserTokensRouterClass {
    constructor(router: Router, app: Express) {
        router.post(UserRoutes.create, validator.body(userCreateScheme), this.createUserToken);
        router.post(UserRoutes.login, validator.body(userLoginScheme), this.checkToken);
    }

    async createUserToken(req: RequestType<UserType>, res: Response, next: NextFunction) {
        const result = await createUser(req.body);

        next(result);
    }

    async checkToken(req: RequestType<UserType>, res: Response, next: NextFunction) {
        const result = await checkToken(req.body);

        next(result);
    }
}

export const UserTokensRouter = (router: Router, app: Express) => new UserTokensRouterClass(router, app);
