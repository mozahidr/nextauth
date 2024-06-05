/**
 * An array of routes that are accessible to the public.
 * These routes will be available to all users, even if they are not logged in.
 * @type {string[]}
 */
export const publicRoutes = [
    "/"
];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /settings.
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
];
/**
 * The prefix for API authentication routes
 * Routes that start with the prefix are used for API authentication.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";