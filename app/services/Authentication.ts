import * as JWT from 'jsonwebtoken';

class Auth {
    checkRefreshToken(token: string) {
        const sercet = process.env.SECRET || 'REFRESH_SECRET';

        try {
            return JWT.verify(token, sercet);
        } catch(error) {
            return error;
        }
    }

    getNewRefreshToken(login: string) {
        const refreshSecret = process.env.SECRET || 'REFRESH_SECRET';

        return JWT.sign({ login }, refreshSecret, { expiresIn: '1d' });
    }
};

export const Authentication = new Auth();
