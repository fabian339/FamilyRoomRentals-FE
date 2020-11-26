import Vue from 'vue'
import Vuex from 'vuex'
import ContentActions from './actions/contentActions';
import UserActions from './actions/userActions';
import NotificationActions from './actions/notificationActions';
import ContentMutations from './mutations/contentMutations';
import UserMutations from './mutations/userMutations';
import NotificationMutations from './mutations/notificationMutations';

// import {Room} from './validators'


Vue.use(Vuex)

export default new Vuex.Store({
    // IMPORTANT: state must be a function so the module can be
    // instantiated multiple times
    state: () => ({
      contentState: {
        loadingContent: false,
        rooms: [],
        room: {},
        roomUpdated: false,
        roomDeleted: false,
        errors: {},
      },
      userState:{
        user: {},
        loadingUser: false,
        userUpdated: false,
        userDeleted: false,
        passwordResetEmailSent: false,
        emailVerificationSent: false,
        token: localStorage.getItem('user-token') || '',
        errors: {}
      }, 
      notificationState: {
        offer: {},
        userNotifications: [],
        offerSentByClient: false,
        offerDeleted: false,
        offerTokenVerified: false,
        paymentSucceededOnOffer: false,
        offerAcceptedByOwner: false,
        showCountDown: false,
        errors: {}
      }
    }),
    getters: {
      // Content
      isContentLoading: state => state.contentState.loadingContent,
      contentRooms: state => state.contentState.rooms.filter((room: any) => (!room.rented && !room.disabled && !room.lockedByAdmin) || (room.rented && new Date() < new Date(new Date(room.rentedDate).setDate(new Date(room.rentedDate).getDate() + 2)))).reverse(),
      contentRoom: state => state.contentState.room,
      contentErrors: state => state.contentState.errors,
      isRoomUpdated: state => state.contentState.roomUpdated,
      isRoomDeleted: state => state.contentState.roomDeleted,
      //USER
      isUserLoading: state => state.userState.loadingUser,
      isAuthenticated: state => !!state.userState.token,
      currentUser: state => state.userState.user,
      isUserUpdated: state => state.userState.userUpdated,
      isUserDeleted: state => state.userState.userDeleted,
      isPasswordResetEmailSent: state => state.userState.passwordResetEmailSent,
      isEmailVerificationSent: state => state.userState.emailVerificationSent,
      currentUserRooms: (state: any) => state.contentState.rooms.filter((room: any) => room.ownerId === state.userState.user.objectId),
      userErrors: state => state.userState.errors,
      //Notifications/Offers
      currentOffer: state => state.notificationState.offer,
      isOfferSent: state => state.notificationState.offerSentByClient,
      isOfferAcceptedByOwner: state => state.notificationState.offerAcceptedByOwner,
      isOfferDeleted: state => state.notificationState.offerDeleted,
      isOfferTokenVerified: state => state.notificationState.offerTokenVerified,
      isCountDownShowing: state => state.notificationState.showCountDown,
      isPaymentSucceededOnOffer: state => state.notificationState.paymentSucceededOnOffer,
      currentUserOffers: state => state.notificationState.userNotifications.reverse(),
      offerErrors: state => state.notificationState.errors,
    },
    mutations: {...ContentMutations, ...UserMutations, ...NotificationMutations},
    actions: {...ContentActions, ...UserActions, ...NotificationActions }
  });
