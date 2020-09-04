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
    SET_CONTENT_ERROR: (state: any, errors: object) => {
      state.contentState.errors = errors
    }
}