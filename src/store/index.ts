import Vue from 'vue'
import Vuex from 'vuex'
import ContentActions from './actions/contentActions';
import UserActions from './actions/userActions';
import ContentMutations from './mutations/contentMutations';
import UserMutations from './mutations/userMutations';
import {Room} from './interfaceTypes'


Vue.use(Vuex)

export default new Vuex.Store({
    // IMPORTANT: state must be a function so the module can be
    // instantiated multiple times
    state: () => ({
      contentState: {
        loadingContent: false,
        rooms: Array<Room>(),
        room: {},
        errors: {},
      },
      userState:{
        user: {},
        loadingUser: false,
        // authenticated: false,
        token: localStorage.getItem('user-token') || '',
        errors: {}
      }
    }),
    getters: {
      // Content
      isContentLoading: state => state.contentState.loadingContent,
      contentRooms: state => state.contentState.rooms,
      contentRoom: state => state.contentState.room,
      contentErrors: state => state.contentState.errors,
      //USER
      isUserLoading: state => state.userState.loadingUser,
      isAuthenticated: state => !!state.userState.token,
      currentUser: state => state.userState.user,
      userErrors: state => state.userState.errors,
    },
    mutations: {...ContentMutations, ...UserMutations},
    actions: { ...ContentActions, ...UserActions }
  });
