
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
    context.commit('SET_NEW_ROOM_BEING_ADDED', true);
    axios.post('/classes/Rooms', roomData)
    .then((res) => {
      let room = {
        ...roomData,
        ...res.data
      }
      context.commit('ADD_ROOM', room)
      context.commit('SET_ROOM', room)

      let content = {loadingType: 'adding-room', roomId: room.objectId}
      context.dispatch('contentLoading', content)
    })
    .catch((err) => {
      context.commit('SET_CONTENT_ERROR', err);
    });
  },

  updateRoom: (context: any, roomData: any) => {
    // console.log('this is a Data22', roomData)
    context.commit('SET_ROOM_UPDATING', true);
    axios.put(`/classes/Rooms/${roomData.objectId}`, roomData)
    .then(() => {
      // console.log("update Room Response: ", res);
      context.commit('UPDATE_ROOM', roomData);
      let content = {loadingType: 'room-updating'}
      context.dispatch('contentLoading', content)
    })
    .catch((err) => {
      context.commit('SET_CONTENT_ERROR', err);
    });
  },

  deleteRoom: async (context: any, id: string) => {
    context.commit('SET_ROOM_BEING_DELETED', true);
    await axios.delete(`/classes/Rooms/${id}`)
    .then((res) => {
      let content = {loadingType: 'deleting-room', roomId: id}
      context.dispatch('contentLoading', content)
    })
    .catch((err) => {
      context.commit('SET_ROOM_BEING_DELETED', false);
      context.commit('SET_CONTENT_ERROR', err);
    });
  },

  postImage: (context: any, formData: any) => {
    axios.post('https://familyroomrentals.b4a.app/hostImage', formData)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log("EROOR:", err)
    })
  },

  contentLoading: (context: any, content: any) => {
    switch (content.loadingType) {
      case 'room-updating':
        setTimeout(() => {
          context.commit('SET_ROOM_UPDATING', false);
          context.commit('SET_ROOM_UPDATED', true);
        }, 2000);
        break;
      case 'deleting-room':
        setTimeout(() => {
          context.commit('DELETE_ROOM', content.roomId);
          context.commit('SET_ROOM_BEING_DELETED', false);
          context.commit('SET_ROOM_DELETED', true);
          if(appRouter.history.current.path !== '/profile'){
            appRouter.push(`/profile`)
          }
        }, 2000);
        break;
      case 'adding-room':
        setTimeout(() => {
          context.commit('SET_NEW_ROOM_BEING_ADDED', false);
          context.commit('SET_NEW_ROOM_ADDED', true);
          appRouter.push(`/room/${content.roomId}`)
        }, 2000);        
        break;
      default:
        console.log(`Sorry, we are out of.`);
    }
    // window.clearTimeout(timerId);

  },
}