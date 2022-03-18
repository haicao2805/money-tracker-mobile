interface AuthControllerConstant {
    /**
     *@description time of cookie when user login
     *@example  1h = 60 * 60 * 1000
     */
    readonly loginCookieTime: number;

    /**
     *@description time of cookie when users register
     *@example  1h = 60 * 60 * 1000
     */
    readonly registerCookieTime: number;
}

interface Constant {
    authController: AuthControllerConstant;
}

export const constant: Constant = {
    authController: {
        loginCookieTime: 1000 * 60 * 60 * 24 * 30,
        registerCookieTime: 1000 * 60 * 60 * 24 * 30,
    },
};
