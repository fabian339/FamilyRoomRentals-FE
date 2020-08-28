import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
// import {setRooms} from './store';

axios.defaults.headers.common['X-Parse-Application-Id'] = 'kUx57AUuSOjGF36AotqV2lzjzjREM3mDQfc2a9gn'
axios.defaults.headers.common['X-Parse-REST-API-Key'] = '1B647vsxlJr1SCJ732paCCmXB57dKEqxRL3MFE4w'
axios.defaults.headers.common['Content-Type'] = 'application/json'
Vue.use(Vuex)

// Assume we have a universal API that returns Promises
// and ignore the implementation details
// import { fetchItem } from './api'

export default new Vuex.Store({
    // IMPORTANT: state must be a function so the module can be
    // instantiated multiple times
    state: () => ({
        loadingContent: false,
        rooms: [],
        errors: {},
        message: "andale guey"
    }),
    mutations: {
        SET_ROOMS(state, rooms){
            state.rooms = rooms
        },
        SET_LOADING_CONTENT(state, status){
            state.loadingContent = status
        },
        SET_ERROR(state, errors){
            state.errors = errors
        },
    },

    actions: {
      fetchRooms(context) {
          context.commit('SET_LOADING_CONTENT', true);
          axios.get('https://parseapi.back4app.com/classes/Room')
          .then((res: any) => {
            context.commit('SET_LOADING_CONTENT', false);
            context.commit('SET_ROOMS', res.data.results);
          })
          .catch((err: Object) => {
            context.commit('SET_ERROR', err);
          });
      }
    },
  });
