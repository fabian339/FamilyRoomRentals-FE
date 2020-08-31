import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import ContentActions from './actions/contentActions';
import UserActions from './actions/userActions';
import ContentMutations from './mutations/contentMutations';
import UserMutations from './mutations/userMutations';


axios.defaults.headers.common['X-Parse-Application-Id'] = 'kUx57AUuSOjGF36AotqV2lzjzjREM3mDQfc2a9gn'
axios.defaults.headers.common['X-Parse-REST-API-Key'] = '1B647vsxlJr1SCJ732paCCmXB57dKEqxRL3MFE4w'
axios.defaults.headers.common['Content-Type'] = 'application/json'

interface Room {
    title: string,
    location: Location,
    price: number,
    createdAt: string,
    objectId: string,
    updatedAt: string,
    // propertyOwnerName: string, 
    description: string,
    // propertyType: string,
    images: string[]
  }

  interface Location {
    street1: string,
    street2: string,
    city: string,
    state: string,
    zipCode: number,
    country: string
  }


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
