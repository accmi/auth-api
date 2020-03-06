import { ResponseType } from '@types';

export namespace UserTypes {
    export interface UserType {
        id?: string;
        login?: string;
        token?: string;
    }

    export interface GetTokenType {
        login?: string;
        token?: string;
    }
    
    export enum UserRoutes {
        create = '/user',
        login = '/login',
    }

    export enum UserErrorMessages {
        wrongLogin = 'Login is wrong',
        tokenIsDeleted = 'The token with this login is deleted or is expired',
    }
    
    export interface MutationUserType extends ResponseType {}
}