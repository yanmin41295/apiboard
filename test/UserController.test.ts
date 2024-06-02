import {expect, test} from "vitest";
import type {ApiParam} from "../src/ApiDef.ts";
import UserController from "../src/api/UserController.ts";
import {createClient} from "../src/util.ts";

test('adds 1 + 2 to equal 3', async () => {
    let a: ApiParam<UserController> = createClient(UserController);
    let result = await a.getUser("测试用")
        .header({userId: 23}).post({username: ""});
    expect(result.username).toBe("min")
})