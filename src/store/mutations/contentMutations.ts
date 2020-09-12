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
      state.contentState.loadingContent = status
    },
    SET_ROOM: (state: any, room: {}) => {
      state.contentState.room = room
    },
    DELETE_ROOM: (state: any, id: string) => {
      const index = state.contentState.rooms.findIndex((room:any = {} ) => room.objectId === id);
      state.contentState.rooms.splice(index, 1);
      state.contentState.room = {};
    },
    UPDATE_ROOM: (state: any, updatedRoom: any) => {
      const index = state.contentState.rooms.findIndex((room:any = {} ) => room.objectId === updatedRoom.objectId);
      state.contentState.rooms[index] = updatedRoom;
      state.contentState.room = updatedRoom;
    },
    SET_CONTENT_ERROR: (state: any, errors: object) => {
      state.contentState.errors = errors
    }
}