import UserController from "./api/UserController.ts";
import {promises} from "node:dns";

export interface HeaderParam {
    [key: string]: string | number | boolean;
}

export interface QueryParam {
    [key: string]: string | number;
}

export interface PathParam {
    [key: string]: string | number;
}

export interface DataObject {
    [key: string]: any
}


export type Method = "get" | "post" | "put" | "delete";


export interface ApiSchema<M extends Method,
    P extends PathParam | undefined, Q extends QueryParam | undefined, H extends HeaderParam | undefined,
    B extends DataObject, R extends DataObject> {
    url: string;
    method: M;
    description?: string;
    path?: P;
    query?: Q;
    headers?: H;
    body?: B;
    response?: R;
}


export class ParamController<T, P extends PathParam | undefined, Q extends QueryParam | undefined, H extends HeaderParam | undefined> {
    origin: T;
    params: ApiSchema<any, any, any, any, any, any>;

    constructor() {
        // @ts-ignore
        this.params = {}
    }


    setPath(param: P) {
        this.params.path = param;
        return this;
    }

    setHeader(param: H) {
        this.params.headers = param;
        return this;
    }

    setQuery(param: Q) {
        this.params.query = param;
        return this;
    }
}


export class PostParamController<T, P extends PathParam | undefined, Q extends QueryParam | undefined, H extends HeaderParam | undefined,
    B extends DataObject, R extends DataObject> extends ParamController<T, P, Q, H> {
    post(body: B): Promise<R> {
        return {} as Promise<R>;
    }
}


interface IPost<B extends DataObject, R extends DataObject> {
    post(body: B): Promise<R>
}


/*
class GetParamController<P extends PathParam, Q extends QueryParam, H extends HeaderParam,
    B extends DataObject, R extends DataObject> extends ParamController<P, Q, H, B> {
    get(): R {
        return {} as R
    }
}

class PutParamController<P extends PathParam, Q extends QueryParam, H extends HeaderParam,
    B extends DataObject, R extends DataObject> extends ParamController<P, Q, H, B> {
    put(body: B): R {
        return {} as R
    }
}

class DeleteParamController<P extends PathParam, Q extends QueryParam, H extends HeaderParam,
    B extends DataObject, R extends DataObject> extends ParamController<P, Q, H, B> {
    delete(body: B): R {
        return {} as R
    }
}*/


export type ApiParam<T> = {
    [key in keyof T]: T[key] extends () => ApiSchema<infer M, infer P, infer Q, infer H, infer B, infer R> ?
        M extends "post" ? (caseDesc?: string) => PostParamController<T, P, Q, H, B, R> :
            /*   M extends "get" ? () => GetParamController<P, Q, H, B, R> :
                   M extends "put" ? () => PutParamController<P, Q, H, B, R> :
                       M extends "delete" ? () => DeleteParamController<P, Q, H, B, R> :*/
            never : never
}



