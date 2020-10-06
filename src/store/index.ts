import Vue from 'vue'
import Vuex from 'vuex'
import ContentActions from './actions/contentActions';
import UserActions from './actions/userActions';
import NotificationActions from './actions/notificationActions';
import ContentMutations from './mutations/contentMutations';
import UserMutations from './mutations/userMutations';
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
        token: localStorage.getItem('user-token') || '',
        errors: {}
      }, 
      notificationState: {
        userNotifications: [],
        offerSent: false,
        offerDeleted: false,
      }
    }),
    getters: {
      // Content
      isContentLoading: state => state.contentState.loadingContent,
      contentRooms: state => state.contentState.rooms.reverse(),
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
      //Notifications
      isOfferSent: state => state.notificationState.offerSent,
      isOfferDeleted: state => state.notificationState.offerDeleted,
      currentUserNotifications: state => state.notificationState.userNotifications.reverse(),
      currentUserRooms: (state: any) => state.contentState.rooms.filter((room: any) => room.ownerId === state.userState.user.objectId),
      userErrors: state => state.userState.errors,
    },
    mutations: {...ContentMutations, ...UserMutations},
    actions: {...ContentActions, ...UserActions, ...NotificationActions }
  });
