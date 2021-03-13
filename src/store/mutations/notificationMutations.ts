export default {
    //NOTIFICATIONS
    SET_NOTIFICATIONS: (state: any, offers: []) => {
        state.notificationState.notifications = offers;
    },

    ADD_NOTIFICATION: (state: any, offers: any) => {
        state.notificationState.notifications.push(offers);
    },

    SET_OFFER_SENDING: (state: any, value: Boolean) => {
        state.loadingState.client.sendingOffer = value;
    },
    SET_OFFER_CANCELED: (state: any, value: Boolean) => {
        state.notificationState.offerCanceled = value;
    },
    SET_OFFER_SENT_BY_CLIENT: (state: any, value: boolean) => {
        state.notificationState.offerSentByClient = value;
    },

    SET_OFFER_ACCEPTED_BY_OWNER: (state: any, value: Boolean) => {
        state.notificationState.offerAcceptedByOwner = value;
    },
    UPDATE_OFFER: (state: any, updateOfferData: any) => {
        const index = state.notificationState.notifications.findIndex((offer:any = {} ) => offer.objectId === updateOfferData.objectId);
        let tempOffer = state.notificationState.notifications[index];
        for (const property in updateOfferData) {
          tempOffer[property] = updateOfferData[property]
        }
        state.notificationState.notifications[index] = tempOffer;
        state.notificationState.offer = tempOffer;
    },
    SET_OFFER: (state: any, offerData: any) => {
        state.notificationState.offer = offerData;
    },
    SET_OFFER_TOKEN_VERIFIED: (state: any, offerVerified: boolean) => {
        state.notificationState.offerTokenVerified = offerVerified;
    },

    //DELETING OFFER

    SHOW_OFFER_DELETING_DIALOG: (state: any, value: any) => {
        state.notificationState.showUserDeletingOfferDialog = value;
    },

    SET_DELETING_OFFER: (state: any, value: boolean) => {
        state.loadingState.user.userOffer.deletingOffer = value;
    },

    DELETE_NOTIFICATION: (state: any, notificationId: any) => {
        const index = state.notificationState.notifications.findIndex((item:any = {} ) => item.objectId === notificationId);
        state.notificationState.notifications.splice(index, 1);
    },

    SET_OFFER_DELETED: (state: any, value: boolean) => {
        state.notificationState.offerDeleted = value;
    },


    SET_OFFER_ERROR: (state: any, errors: object) => {
        state.notificationState.errors = errors
    },
    CLEAR_NOTIFICATIONS_ERROR: (state: any) => {
        state.notificationState.errors = {}
    },
}