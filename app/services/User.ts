import { UserRefreshTokens } from '@models';
import { UserTypes, GlobalErrorsMessage, ResponseType } from '@types';
import { Authentication } from '@services';

import UserType = UserTypes.UserType;
import MutationUserType = UserTypes.MutationUserType;

export const createUser = async (user: UserType): Promise<MutationUserType> => {
    const { login, token: outsideToken } = user;

    if (login && outsideToken) {
        try {          
            const [user, created] = await UserRefreshTokens.findOrCreate({
                where: {
                    login,
                },
                defaults: {
                    token: outsideToken,
                    login,
                }});

            if (!created) {
                return {
                    status: false,
                    error: [GlobalErrorsMessage.isExist],
                }
            }

            return {
                status: true,
            };
        } catch (error) {
            return {
                status: false,
                error,
            };
        }
    }

    return {
        status: false,
        error: [GlobalErrorsMessage.uncknownError],
    };
};

export const checkToken = async (user: UserType): Promise<MutationUserType> =>{
    const { login, token: outsideToken } = user;

    if (login && outsideToken) {
        try {
            const { token } = await UserRefreshTokens.findOne({
                where: {
                    login,
                }
            });
            
            if (token) {
                const result = Authentication.checkRefreshToken(token);

                if (result.name === 'TokenExpiredError' && result.expiredAt) {
                    const newToken = Authentication.getNewRefreshToken(login);

                    return {
                        status: true,
                        token: newToken,
                    }
                }

                return {
                    status: false,
                    error: [GlobalErrorsMessage.wrongToken],
                }
            }

            return {
                status: false,
                error: [GlobalErrorsMessage.notFound],
            };

        } catch (error) {
            return {
                status: false,
                error,
            };
        }
    }

    return {
        status: false,
        error: [GlobalErrorsMessage.uncknownError],
    }
}
