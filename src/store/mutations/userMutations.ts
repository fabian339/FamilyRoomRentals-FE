import { User } from './../interfaceTypes'


export default {
    SET_USER: (state: any, user: User) => {
        // console.log("HEREEE", room)
        state.userState.user = user;
    },
    SET_LOADING_USER: (state: any, status: boolean) => {
        state.userState.loadingUser = status
    },
    AUTH_SUCCESS: (state: any, token: string) => {
        state.userState.token = token;
    },
    USER_LOGOUT: (state: any) => {
        state.userState.token = '';
        state.userState.user = {};
    },
    SET_USER_ERROR: (state: any, errors: object) => {
        state.userState.errors = errors
    }
}