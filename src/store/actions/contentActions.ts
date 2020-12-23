
import axios from 'axios';
import router from '../../router';
let appRouter: any = router;

export default {
  
  fetchRooms: (context: any) => {
      context.commit('SET_LOADING_CONTENT', true);
      axios.get('/classes/Rooms')
      .then((res) => {
        res.data.results.forEach((room: any)=> {
            if(appRouter.history.current.path.includes(`/room/${room.objectId}`)) context.commit('SET_ROOM', room);
        })

        context.commit('SET_ROOMS', res.data.results);
        context.commit('SET_LOADING_CONTENT', false);
      })
      .catch((err) => {
        context.commit('SET_CONTENT_ERROR', err);
      });
  },

  shareRoom: (context: any, roomData: any = {}) => {
    context.commit('SET_LOADING_CONTENT', true);
    axios.post('/classes/Rooms', roomData)
    .then((res) => {
      let room = {
        ...roomData,
        ...res.data
      }
      context.commit('ADD_ROOM', room)
      context.commit('SET_ROOM', room)
      context.commit('SET_LOADING_CONTENT', false);
      appRouter.push(`/room/${room.objectId}`)
    })
    .catch((err) => {
      context.commit('SET_CONTENT_ERROR', err);
    });
  },

  updateRoom: (context: any, roomData: any) => {
    // console.log('this is a Data22', roomData)
    context.commit('SET_LOADING_CONTENT', true);
    axios.put(`/classes/Rooms/${roomData.objectId}`, roomData)
    .then((res) => {
      // console.log("update Room Response: ", res);
      context.commit('UPDATE_ROOM', roomData);
      context.commit('SET_LOADING_CONTENT', false);
    })
    .catch((err) => {
      context.commit('SET_CONTENT_ERROR', err);
    });
  },

  deleteRoom: (context: any, id: string) => {
    context.commit('SET_LOADING_CONTENT', true);
    axios.delete(`/classes/Rooms/${id}`)
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