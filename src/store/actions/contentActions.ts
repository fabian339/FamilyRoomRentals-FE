
import axios from 'axios';
import { Room } from './../interfaceTypes'

const requestURI = 'https://parseapi.back4app.com/classes/Room';
axios.defaults.headers.common['X-Parse-Application-Id'] = 'kUx57AUuSOjGF36AotqV2lzjzjREM3mDQfc2a9gn'
axios.defaults.headers.common['X-Parse-REST-API-Key'] = '1B647vsxlJr1SCJ732paCCmXB57dKEqxRL3MFE4w'
axios.defaults.headers.common['Content-Type'] = 'application/json'


export default {
    fetchRooms: (context: any) => {
        context.commit('SET_LOADING_CONTENT', true);
        axios.get(requestURI)
        .then((res) => {
          context.commit('SET_LOADING_CONTENT', false);
          context.commit('SET_ROOMS', res.data.results);
        })
        .catch((err) => {
          context.commit('SET_CONTENT_ERROR', err);
        });
    },
    addRoom: (context: any, roomData: Room) => {
      // console.log('this is a Data', roomData)
      context.commit('SET_LOADING_CONTENT', true);
      axios.post(requestURI, roomData)
      .then((res) => {
        // console.log("Room Response: ", res);
        roomData.createdAt = res.data.createdAt;
        roomData.objectId = res.data.objectId;
        context.commit('SET_LOADING_CONTENT', false);
        context.commit('ADD_ROOM', roomData)
      })
      .catch((err) => {
        context.commit('SET_CONTENT_ERROR', err);
      });
    },
    setRoom: (context: any, id: string) => {
      console.log('HEREEE')
      // context.commit('SET_LOADING_CONTENT', true);
      axios.get(`${requestURI}/${id}`)
      .then((res) => {
        context.commit('SET_LOADING_CONTENT', false);
        context.commit('SET_ROOM', res.data)
      })
      .catch((err) => {
        context.commit('SET_CONTENT_ERROR', err);
      });
    }
  }