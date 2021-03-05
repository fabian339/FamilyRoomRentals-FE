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
        rooms: [],
        room: {},
        roomUpdated: false,
        roomDeleted: false,
        errors: {},
      },
      userState:{
        user: {},
        userUpdated: false,
        userDeleted: false,
        passwordResetEmailSent: false,
        emailVerificationSent: false,
        token: localStorage.getItem('user-token') || '',
        errors: {}
      }, 
      notificationState: {
        offer: {},
        notifications: [],
        offerDeleted: false,
        offerTokenVerified: false,
        offerAcceptedByOwner: false,
        errors: {}
      },
      loadingState: {
        user: {
          userLoggingIn: false,
          userLoggingOut: false, //used for logging-out, and userDeletingAccoutn
          userRegistering: false,
        },
        client: {
          sendingOffer: false
        },
        content: {
          loadingRooms: false
        },
        loadingContent: false,
        loadingUser: false,
        sendingOffer: false
      },
      maintenance: false
    }),
    getters: {
      // Content
      contentRooms: state => state.contentState.rooms.filter((room: any) => (!room.rented && !room.disabled && !room.lockedByAdmin) || (room.rented && new Date() < new Date(new Date(room.rentedDate).setDate(new Date(room.rentedDate).getDate() + 2)))).reverse(),
      contentRoom: state => state.contentState.room,
      contentErrors: state => state.contentState.errors,
      isRoomUpdated: state => state.contentState.roomUpdated,
      isRoomDeleted: state => state.contentState.roomDeleted,
      //USER
      isUserAuthenticated: (state: any) => !!state.userState.token && state.userState.user.emailVerified,
      currentUser: state => state.userState.user,
      isUserUpdated: state => state.userState.userUpdated,
      isUserDeleted: state => state.userState.userDeleted,
      isPasswordResetEmailSent: state => state.userState.passwordResetEmailSent,
      isEmailVerificationSent: state => state.userState.emailVerificationSent,
      currentUserRooms: (state: any) => state.contentState.rooms.filter((room: any) => room.ownerId === state.userState.user.objectId),
      userErrors: state => state.userState.errors,
      //Notifications/Offers
      currentOffer: state => state.notificationState.offer,
      isOfferAcceptedByOwner: state => state.notificationState.offerAcceptedByOwner,
      isOfferDeleted: state => state.notificationState.offerDeleted,
      isOfferTokenVerified: state => state.notificationState.offerTokenVerified,
      currentUserOffers: (state: any) => state.notificationState.notifications.filter((noti: any) => noti.receiverId === state.userState.user.objectId).reverse(),
      meetings: (state: any) => state.notificationState.notifications.filter((noti: any) => (noti.receiverId === state.userState.user.objectId && noti.meetingScheduled)),
      offerErrors: state => state.notificationState.errors,
      //Loading
      userLoading: state => state.loadingState.user,
      clientLoading: state => state.loadingState.client,
      contentLoading: state => state.loadingState.content,
      //maintenance the whole application, implementation missing
      isAppInMaintenance: (state: any) => state.maintenance,
    },
    mutations: {...ContentMutations, ...UserMutations, ...NotificationMutations},
    actions: {...ContentActions, ...UserActions, ...NotificationActions }
  });
