export const constant = Object.freeze({
    authController: {
        loginCookieTime: 1000 * 60 * 60 * 24 * 30,
        registerCookieTime: 1000 * 60 * 60 * 24 * 30,
        googleUserCookieTime: 1000 * 60 * 60 * 24 * 30,
    },
    userController: {
        defaultCurrentPage: 1,
        defaultPageSize: 4,
    },
});
