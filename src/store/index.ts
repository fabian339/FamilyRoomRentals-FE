import Vue from 'vue'
import Vuex from 'vuex'
import ContentActions from './actions/contentActions';
import UserActions from './actions/userActions';
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
        errors: {},
      },
      userState:{
        user: {},
        loadingUser: false,
        userNotifications: [],
        notificationSent: false,
        notidicationDeleted: false,
        token: localStorage.getItem('user-token') || '',
        errors: {}
      }
    }),
    getters: {
      // Content
      isContentLoading: state => state.contentState.loadingContent,
      contentRooms: state => state.contentState.rooms.reverse(),
      contentRoom: state => state.contentState.room,
      contentErrors: state => state.contentState.errors,
      isRoomUpdated: state => state.contentState.roomUpdated,
      //USER
      isUserLoading: state => state.userState.loadingUser,
      isAuthenticated: state => !!state.userState.token,
      currentUser: state => state.userState.user,
      isNotificationSent: state => state.userState.notificationSent,
      isNotificationDeleted: state => state.userState.notidicationDeleted,
      currentUserNotifications: state => state.userState.userNotifications.reverse(),
      currentUserRooms: (state: any) => state.contentState.rooms.filter((room: any) => room.ownerId === state.userState.user.objectId),
      userErrors: state => state.userState.errors,
    },
    mutations: {...ContentMutations, ...UserMutations},
    actions: {...ContentActions, ...UserActions }
  });
