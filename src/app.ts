import {createClient} from "./util.ts";
import UserController from "./api/UserController.ts";

function add(a: number, b: number) {
    console.log(a, b)
    return a + b;
}

let userControllerClient = createClient(UserController);
let userController = userControllerClient.getUser()
let user = await userController.post({username: ""})
let age = add(user.age, user.age)
console.log(age)
