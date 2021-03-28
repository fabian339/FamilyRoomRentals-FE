export default {
    //offers
    SET_USER_OFFERS: (state: any, offers: Array<Object>) => {
        state.userState.userOffers = offers;
    },

    SET_USER_MEETINGS: (state: any, meetings: Array<Object>) => {
        state.userState.userMeetings = meetings;
    },
    
    ADD_OFFER: (state: any, offers: any) => {
        state.offerState.offers.push(offers);
    },

    SET_OFFER_SENDING: (state: any, value: Boolean) => {
        state.loadingState.client.sendingOffer = value;
    },
    SET_GEETING_CLIENT_OFFER: (state: any, value: Boolean) => {
        state.loadingState.client.gettingOffer = value;
    },
    SET_OFFER_CANCELED: (state: any, value: Boolean) => {
        state.offerState.offerCanceled = value;
    },
    SET_OFFER_SENT_BY_CLIENT: (state: any, value: boolean) => {
        state.offerState.offerSentByClient = value;
    },

    SET_OFFER_ACCEPTED_BY_OWNER: (state: any, value: Boolean) => {
        state.offerState.offerAcceptedByOwner = value;
    },
    UPDATE_OFFER: (state: any, updateOfferData: any) => {
        const index = state.userState.userOffers.findIndex((offer:any = {} ) => offer.objectId === updateOfferData.objectId);
        let tempOffer = state.userState.userOffers[index];
        for (const property in updateOfferData) {
          tempOffer[property] = updateOfferData[property]
        }
        state.userState.userOffers[index] = tempOffer;
        state.offerState.offer = tempOffer;
    },
    SET_OFFER: (state: any, offerData: any) => {
        state.offerState.offer = offerData;
    },
    SET_OFFER_TOKEN_VERIFIED: (state: any, offerVerified: boolean) => {
        state.offerState.offerTokenVerified = offerVerified;
    },

    //DELETING OFFER

    SHOW_OFFER_DELETING_DIALOG: (state: any, value: any) => {
        state.offerState.showUserDeletingOfferDialog = value;
    },

    SET_DELETING_OFFER: (state: any, value: boolean) => {
        state.loadingState.user.userOffer.deletingOffer = value;
    },

    DELETE_OFFER: (state: any, notificationId: any) => {
        const index = state.offerState.offers.findIndex((item:any = {} ) => item.objectId === notificationId);
        state.offerState.offers.splice(index, 1);
    },

    SET_OFFER_DELETED: (state: any, value: boolean) => {
        state.offerState.offerDeleted = value;
    },


    SET_OFFER_ERROR: (state: any, errors: object) => {
        state.offerState.errors = errors
    },
    CLEAR_OFFER_ERROR: (state: any) => {
        state.offerState.errors = {}
    },
}