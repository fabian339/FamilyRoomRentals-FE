
import axios from 'axios';
import router from '../../router';
let appRouter: any = router;

export default {
  
  fetchRooms: (context: any) => {
      context.commit('SET_LOADING_CONTENT', true);
      axios.get('/classes/Room')
      .then((res) => {
        context.commit('SET_ROOMS', res.data.results);
        context.commit('SET_LOADING_CONTENT', false);
      })
      .catch((err) => {
        context.commit('SET_CONTENT_ERROR', err);
      });
  },

  addRoom: (context: any, roomData: any = {}) => {
    context.commit('SET_LOADING_CONTENT', true);
    axios.post('/classes/Room', roomData)
    .then((res) => {
      roomData.createdAt = res.data.createdAt;
      roomData.objectId = res.data.objectId;
      context.commit('ADD_ROOM', roomData)
      context.commit('SET_ROOM', roomData)
      context.commit('SET_LOADING_CONTENT', false);
      appRouter.push(`/room/${roomData.objectId}`)
    })
    .catch((err) => {
      context.commit('SET_CONTENT_ERROR', err);
    });
  },

  updateRoom: (context: any, roomData: any) => {
    // console.log('this is a Data22', roomData)
    context.commit('SET_LOADING_CONTENT', true);
    axios.put(`/classes/Room/${roomData.objectId}`, roomData)
    .then((res) => {
      // console.log("update Room Response: ", res);
      context.commit('UPDATE_ROOM', roomData);
      context.commit('SET_LOADING_CONTENT', false);
    })
    .catch((err) => {
      context.commit('SET_CONTENT_ERROR', err);
    });
  },

  setRoom: (context: any, id: string) => {
    context.commit('SET_LOADING_CONTENT', true);
    axios.get(`/classes/Room/${id}`)
    .then((res) => {
      context.commit('SET_ROOM', res.data)
      context.commit('SET_LOADING_CONTENT', false);
    })
    .catch((err) => {
      context.commit('SET_CONTENT_ERROR', err);
    });
  },

  deleteRoom: (context: any, id: string) => {
    context.commit('SET_LOADING_CONTENT', true);
    axios.delete(`/classes/Room/${id}`)
    .then((res) => {
      context.commit('DELETE_ROOM', id);
      context.commit('SET_LOADING_CONTENT', false);
      if(appRouter.history.current.path !== '/profile'){
        appRouter.push(`/profile`)
      }
    })
    .catch((err) => {
      context.commit('SET_CONTENT_ERROR', err);
    });
  }
}