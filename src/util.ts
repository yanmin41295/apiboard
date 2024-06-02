import {glob} from "glob";
import {type ApiParam, type ApiSchema, ParamController, type PathParam, type QueryParam} from "./ApiDef.ts";
import axios from "axios";
import ENV from "./env.ts";


const service = axios.create({
    baseURL: `${ENV.host}:${ENV.port}`,
});

export function parseUrl(url: string, pathParam?: PathParam, queryParam?: QueryParam) {
    if (pathParam) {
        for (let pathParamKey in pathParam) {
            url = url.replace(`:${pathParamKey}`, String(pathParam[pathParamKey]));
        }
    }
    if (queryParam) {
        let query = "";
        for (let pathParamKey in pathParam) {
            query = query + `${pathParamKey}=${pathParam[pathParamKey]}`;
        }
        if (query.length > 0) {
            query = "?" + query;
        }
        url = url + query;
    }
    return url;
}

export function createClient<T>(construct: { new(): T; }): ApiParam<T> {
    let controller = new construct();
    let paramController = new ParamController();
    paramController.origin = controller;
    const prototype = construct.prototype;
    const propertyNames = Object.getOwnPropertyNames(prototype);
    propertyNames.forEach(propertyName => {
        if (propertyName === "constructor") {
            return;
        }
        const propertyDescriptor = Object.getOwnPropertyDescriptor(prototype, propertyName);
        if (propertyDescriptor && typeof propertyDescriptor.value === 'function') {

            // @ts-ignore
            paramController[propertyName] = () => {
                return paramController;
            }
            const originMethod = prototype[propertyName]

            let result: ApiSchema<any, any, any, any, any, any> = originMethod();
            paramController.params.url = result.url;
            paramController.params.method = result.method;
            // @ts-ignore
            paramController[result.method] = async (data) => {
                const response = await service.request({
                    method: result.method,
                    url: parseUrl(result.url, paramController.params.path, paramController.params.query),
                    headers: result.header,
                    data,
                })
                return response.data;
            };
        }
    });

    return paramController as ApiParam<T>;
}

export async function init() {
    const files = await glob("./api/*.ts", {cwd: __dirname});
    for await (const file of files) {
        let controller = await import("./" + file);
        const prototype = controller.default.prototype;
        /* const propertyNames = Object.getOwnPropertyNames(prototype);
         propertyNames.forEach(propertyName => {
             if (propertyName === "constructor") {
                 return;
             }
             const propertyDescriptor = Object.getOwnPropertyDescriptor(prototype, propertyName);
             if (propertyDescriptor && typeof propertyDescriptor.value === 'function') {
                 const originMethod = prototype[propertyName]
                 prototype[propertyName] = async () => {
                     let result: ApiSchema<any, any, any, any, any, any> = originMethod();
                     const response = await service.request({
                         method: result.method,
                         url: parseUrl(result.url, result.path, result.query),
                         headers: result.header,
                         data: result.body,
                     })
                     return response.data;
                 }
             }
         });*/
        console.log(file); // => "index.ts"
    }
}

