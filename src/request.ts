import UserController from "./api/UserController.ts";
import type {ApiParam} from "./ApiDef.ts";

let userController = new UserController();
userController.getUser();

function getCurrentMethodName(): string {
    return getCurrentMethodName.caller?.name || 'Unknown';
}

export function createClient<T>(construct: { new(): T; }): ApiParam<T> {
    let controller = new construct();
    return controller as ApiParam<T>;
}


