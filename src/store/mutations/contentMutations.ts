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

    //ROOM UPDATING
    SHOW_ROOM_UPDATING_DIALOG: (state: any, value: any) => {
      state.contentState.showRoomUpdatingDialog = value;
    },
    SET_ROOM_UPDATING: (state: any, value: any) => {
      state.loadingState.content.contentRoomUpdating = value;
    },
    UPDATE_ROOM: (state: any, updatedRoomData: any) => {
      const index = state.contentState.rooms.findIndex((room:any = {} ) => room.objectId === updatedRoomData.objectId);
      let tempRoom = state.contentState.rooms[index];
      for (const property in updatedRoomData) {
        tempRoom[property] = updatedRoomData[property]
      }
      state.contentState.rooms[index] = tempRoom;
      state.contentState.room = tempRoom;
    },
    SET_ROOM_UPDATED: (state: any, value: any) => {
      state.contentState.roomUpdated = value;
    },

    // ROOM DELETED
    SET_ROOM_BEING_DELETED: (state: any, value: any) => {
      state.loadingState.content.contentRoomBeingDeleted = value;
    },
    
    DELETE_ROOM: (state: any, id: string) => {
      const index = state.contentState.rooms.findIndex((room:any = {} ) => room.objectId === id);
      state.contentState.rooms.splice(index, 1);
      state.contentState.room = {};
    },

    SET_ROOM_DELETED: (state: any, value: any) => {
      state.contentState.roomDeleted = value;
    },

    //ADDING ROOM
    SET_NEW_ROOM_BEING_ADDED: (state: any, value: any) => {
      state.loadingState.content.addingContent = value;
    },

    SET_NEW_ROOM_ADDED: (state: any, value: any) => {
      state.contentState.newRoomAdded = value;
    },
    //ERROR
    SET_CONTENT_ERROR: (state: any, errors: object) => {
      state.contentState.errors = errors
    }
}