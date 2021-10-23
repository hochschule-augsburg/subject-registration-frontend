import {createContext} from "react";

/**
 * Saves the credentials of the currently logged in user.
 * @type {React.Context<{user: {}}>}
 */
const userContext = createContext({
    user: {},
    setUser: (user) => {}
});

export default userContext;
