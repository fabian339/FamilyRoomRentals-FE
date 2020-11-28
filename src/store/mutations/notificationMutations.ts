export default {
    //NOTIFICATIONS
    SET_OFFER_SENT_BY_CLIENT: (state: any, offerSentByClient: boolean) => {
        state.notificationState.offerSentByClient = offerSentByClient;
        setTimeout(() => {
          state.notificationState.offerSentByClient = false;
        }, 8000);
    },

    SET_OFFER_ACCEPTED_BY_OWNER: (state: any, offerAcceptedByOwner: boolean) => {
        state.notificationState.offerAcceptedByOwner = offerAcceptedByOwner;
        setTimeout(() => {
          state.notificationState.offerAcceptedByOwner = false;
        }, 8000);
    },
    UPDATE_OFFER: (state: any, updateOfferData: any) => {
        const index = state.notificationState.userNotifications.findIndex((offer:any = {} ) => offer.objectId === updateOfferData.objectId);
        let tempOffer = state.notificationState.userNotifications[index];
        for (const property in updateOfferData) {
          tempOffer[property] = updateOfferData[property]
        }
        state.notificationState.userNotifications[index] = tempOffer;
        state.notificationState.offer = tempOffer;
    },
    SET_OFFER: (state: any, offerData: any) => {
        state.notificationState.offer = offerData;
    },
    SET_OFFER_TOKEN_VERIFIED: (state: any, offerVerified: boolean) => {
        state.notificationState.offerTokenVerified = offerVerified;
    },
    DELETE_NOTIFICATION: (state: any, notificationId: any) => {
        const index = state.notificationState.userNotifications.findIndex((item:any = {} ) => item.objectId === notificationId);
        state.notificationState.userNotifications.splice(index, 1);
        state.notificationState.offerDeleted = true;
        setTimeout(() => {
          state.notificationState.offerDeleted = false;
        }, 5000);
    },
    SET_OFFER_ERROR: (state: any, errors: object) => {
        state.notificationState.errors = errors
    },
    CLEAR_NOTIFICATIONS_ERROR: (state: any) => {
        state.notificationState.errors = {}
    },
}