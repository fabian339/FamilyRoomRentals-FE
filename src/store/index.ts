import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
// import {setRooms} from './store';

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

  //sample postman Request
//   {
//     "title": "New Room in Yonkeers",
//     "location" : {
//       "street1": "Yonkeers St",
//       "street2": "apt: 5g",
//       "city": "Yonkeer",
//       "state": "NY",
//       "zipCode": 10058,
//       "country": "USA"
//     },
//     "price": "$500/mo",
//     "propertyOwner": true,
//     "description": "this is a description",
//     "images": []
// }

Vue.use(Vuex)

export default new Vuex.Store({
    // IMPORTANT: state must be a function so the module can be
    // instantiated multiple times
    state: () => ({
        loadingContent: false,
        rooms: Array<Room>(),
        room: {},
        errors: {},
    }),
    getters: {
      // getRoomById: (state) => (id: string) => {
      //   return state.rooms.find(room => room.objectId === id)
      // }
    },
    mutations: {
        SET_ROOMS: (state, rooms) => {
          state.rooms = rooms
        },
        ADD_ROOM: (state, room: Room) => {
          // console.log("HEREEE", room)
          state.rooms.push(room)
        },
        SET_LOADING_CONTENT: (state, status: boolean) => {
            state.loadingContent = status
        },
        SET_ROOM: (state, room: Room) => {
          state.room = room
        },
        SET_ERROR: (state, errors: object) => {
            state.errors = errors
        },
    },

    actions: {
      fetchRooms: (context) => {
          context.commit('SET_LOADING_CONTENT', true);
          axios.get('https://parseapi.back4app.com/classes/Room')
          .then((res) => {
            context.commit('SET_LOADING_CONTENT', false);
            context.commit('SET_ROOMS', res.data.results);
          })
          .catch((err) => {
            context.commit('SET_ERROR', err);
          });
      },
      addRoom: (context, roomData) => {
        // console.log('this is a Data', roomData)
        context.commit('SET_LOADING_CONTENT', true);
        axios.post('https://parseapi.back4app.com/classes/Room', roomData)
        .then((res) => {
          // console.log("Room Response: ", res);
          roomData.createdAt = res.data.createdAt;
          roomData.objectId = res.data.objectId;
          context.commit('SET_LOADING_CONTENT', false);
          context.commit('ADD_ROOM', roomData)
        })
        .catch((err) => {
          context.commit('SET_ERROR', err);
        });
      },
      setRoom: (context, id) => {
        console.log('HEREEE')
        // context.commit('SET_LOADING_CONTENT', true);
        axios.get(`https://parseapi.back4app.com/classes/Room/${id}`)
        .then((res) => {
          context.commit('SET_LOADING_CONTENT', false);
          context.commit('SET_ROOM', res.data)
        })
        .catch((err) => {
        });
      }
    },
  });
