import {createClient} from "./util.ts";
import UserController from "./api/UserController.ts";

function add(a: number, b: number) {
    console.log(a, b)
    return a + b;
}

let userControllerClient = createClient(UserController);
let user = await userControllerClient.getUser().header({userId: 1}).post({username: "min"});
let age = add(user.age, user.age)
console.log(age)
