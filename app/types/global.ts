import { Request } from 'express';

export interface RequestType<Body = any, Query = any> extends Request {
    body: Body;
    query: Query;
}

export interface CutomError extends Error {
    number: number;
}

export interface ErrorResponseType {
    status: boolean;
    error: ErrorType | any;
    errorDetail: any;
}

export interface ErrorType {
    message: string;
}

export interface ResponseType {
    status: boolean;
    error?: string[];
    token?: string;
}

export enum HighLevelRoutes {
    all = '*',
    api = '/api',
}

export enum GlobalErrorsMessage {
    notFound = 'not found',
    isExist = 'already exist',
    uncknownError = 'Unknown error',
    wrongToken = 'Token is wrong',
}