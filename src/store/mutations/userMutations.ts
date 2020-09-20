// import { User } from '../validators'


export default {
    SET_USER: (state: any, user: any) => {
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
    UPDATE_USER: (state: any, updatedUserData: any) => {
        let tempUser = state.userState.user;
        for (const property in updatedUserData) {
            tempUser[property] = updatedUserData[property]
        }
        state.userState.tempUser = tempUser;
        state.userState.userUpdated = true;
        setTimeout(() => {
          state.userState.userUpdated = false;
        }, 5000);
    },
    SET_USER_DELETED: (state: any, value: boolean) => {
        state.userState.userDeleted = true;
        setTimeout(() => {
          state.userState.userDeleted = false;
        }, 8000);
    },
    PASSWORD_RESET_EMAIL_SENT: (state: any, emailSent: boolean) => {
        state.userState.passwordResetEmailSent = true;
        setTimeout(() => {
          state.userState.passwordResetEmailSent = false;
        }, 5000);
    },
    SET_USER_ERROR: (state: any, errors: object) => {
        state.userState.errors = errors
    },
    SET_NOTIFICATION_SENT: (state: any, notificationSent: boolean) => {
        state.userState.notificationSent = notificationSent
    },
    SET_USER_NOTIFICATIONS: (state: any, notifications: object) => {
        state.userState.userNotifications = notifications
    },
    MARK_NOTIFICATION_READ: (state: any, notificationId: any) => {
        const index = state.userState.userNotifications.findIndex((item:any = {} ) => item.objectId === notificationId);
        state.userState.userNotifications[index].readByReceiver = true;
    },
    DELETE_NOTIFICATION: (state: any, notificationId: any) => {
        const index = state.userState.userNotifications.findIndex((item:any = {} ) => item.objectId === notificationId);
        state.userState.userNotifications.splice(index, 1);
        state.userState.notidicationDeleted = true;
        setTimeout(() => {
          state.userState.notidicationDeleted = false;
        }, 5000);
    },
    CLEAR_USER_ERROR: (state: any) => {
        state.userState.errors = {}
    }

}