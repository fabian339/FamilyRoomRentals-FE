// import { Room } from '../validators'

export default {
    SET_ROOMS: (state: any, rooms: []) => {
      state.contentState.rooms = rooms
    },
    ADD_ROOM: (state: any, room: {}) => {
      // console.log("HEREEE", room)
      state.contentState.rooms.push(room)
    },
    SET_LOADING_CONTENT: (state: any, status: boolean) => {
      state.loadingState.content.loadingRooms = status
    },
    SET_ROOM: (state: any, room: {}) => {
      state.contentState.room = room
    },
    DELETE_ROOM: (state: any, id: string) => {
      const index = state.contentState.rooms.findIndex((room:any = {} ) => room.objectId === id);
      state.contentState.rooms.splice(index, 1);
      state.contentState.room = {};
      state.contentState.roomDeleted = true;
      setTimeout(() => {
        state.contentState.roomDeleted = false;
      }, 5000);
    },
    UPDATE_ROOM: (state: any, updatedRoomData: any) => {
      const index = state.contentState.rooms.findIndex((room:any = {} ) => room.objectId === updatedRoomData.objectId);
      let tempRoom = state.contentState.rooms[index];
      for (const property in updatedRoomData) {
        tempRoom[property] = updatedRoomData[property]
      }
      state.contentState.rooms[index] = tempRoom;
      state.contentState.room = tempRoom;
      state.contentState.roomUpdated = true;
      setTimeout(() => {
        state.contentState.roomUpdated = false;
      }, 5000);
    },
    SET_CONTENT_ERROR: (state: any, errors: object) => {
      state.contentState.errors = errors
    }
}