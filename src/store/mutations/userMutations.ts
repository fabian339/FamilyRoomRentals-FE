// import { User } from '../validators'


export default {
    SET_USER: (state: any, user: any) => {
        // console.log("HEREEE", room)
        state.userState.user = user;
    },
    SET_USER_REGISTERING: (state: any, status: boolean) => {
        state.loadingState.user.userRegistering = status
    },
    SET_USER_LOGGING_IN: (state: any, status: boolean) => {
        state.loadingState.user.userLoggingIn = status
    },
    SET_RETRIEVING_USER: (state: any, value: Boolean) => {
        state.loadingState.user.retrievingUser = value;
    },
    SET_USER_LOGGING_OUT: (state: any, status: boolean) => {
        if(status){
            state.loadingState.user.userLoggingOut = status
        } else {
            state.userState.token = '';
            state.userState.user = {};
            state.loadingState.user.userLoggingOut = status
        }
    },
    SET_TOKEN: (state: any, token: string) => {
        state.userState.token = token;
    },
    // Updating USER
    SET_UPDATING_USER: (state: any, value: Boolean) => {
        state.loadingState.user.userUpdating = value;
    },


    UPDATE_USER: (state: any, updatedUserData: any) => {
        let tempUser = state.userState.user;
        for (const property in updatedUserData) {
            tempUser[property] = updatedUserData[property]
        }
        state.userState.tempUser = tempUser;
    },

    SET_USER_UPDATED: (state: any, value: Boolean) => {
        state.userState.userUpdated = value;
    },

    SHOW_USER_UPDATING_DIALOG: (state: any, value: Boolean) => {
        state.userState.showUserUpdatingDialog = value;
    },
    
    // USER DELETION
    SET_USER_BEIN_DELETED: (state: any, value: Boolean) => {
        state.loadingState.user.userBeinDeleted = value;
    },
    SET_CLEAR_USER: (state: any) => {
        state.userState.token = '';
        state.userState.user = {};
    },

    SET_USER_DELETED: (state: any, value: boolean) => {
        state.userState.userDeleted = value;
    },
    PASSWORD_RESET_EMAIL_SENT: (state: any, emailSent: boolean) => {
        state.userState.passwordResetEmailSent = true;
        setTimeout(() => {
          state.userState.passwordResetEmailSent = false;
        }, 5000);
    },
    EMAIL_VERIFICATION_SENT: (state: any, emailSent: boolean) => {
        state.userState.emailVerificationSent = true;
        setTimeout(() => {
          state.userState.emailVerificationSent = false;
        }, 5000);
    },
    SET_USER_ERROR: (state: any, errors: object) => {
        state.userState.errors = errors
    },

    // SET_USER_NOTIFICATIONS: (state: any, notifications: object) => {
    //     state.notificationState.userNotifications = notifications
    // },

    CLEAR_USER_ERROR: (state: any) => {
        state.userState.errors = {}
    }


}