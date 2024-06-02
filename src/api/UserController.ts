export default class UserController {
    getUser() {
        return {
            url: "/user",
            method: "post" as const,
            description: "Get user",
            headers: {
                userId: 23
            },
            path: {},
            body: {
                username: "user",
            },
            response: {
                username: "user",
                age:23
            }
        }
    }
}


