
import axios from 'axios';
// import { User } from '../validators'
import router from '../../router';
let appRouter: any = router;
const requestURI = 'https://parseapi.back4app.com';
axios.defaults.headers.common['X-Parse-Application-Id'] = 'kUx57AUuSOjGF36AotqV2lzjzjREM3mDQfc2a9gn'
axios.defaults.headers.common['X-Parse-REST-API-Key'] = '1B647vsxlJr1SCJ732paCCmXB57dKEqxRL3MFE4w'
axios.defaults.headers.common['Content-Type'] = 'application/json'


export default {

    registerUser: (context: any, user: any) => {
      // console.log("trying to register User", user);
      axios.defaults.headers.common['X-Parse-Revocable-Session'] = 1;
      context.commit('SET_LOADING_USER', true);
      axios.post(`${requestURI}/users`, user)
      .then((res) => {
        const token = res.data.sessionToken;
        localStorage.setItem('user-token', token);
        context.commit('AUTH_SUCCESS', token);
        // context.dispatch('fetchUserNotifications', res.data.objectId);
        // console.log('Getting Current User',user)
        let currentUser = user;
        delete currentUser.password;
        delete currentUser.confirmPassword;
        currentUser.createdAt = res.data.createdAt;
        currentUser.updatedAt = res.data.createdAt;
        currentUser.objectId = res.data.objectId;
        currentUser.sessionToken = res.data.sessionToken;
        currentUser.userPhoto = res.data.userPhoto;
        currentUser.className = '_User';
        context.commit('SET_USER', currentUser)
        if(appRouter.history.current.path !== '/profile'){
          appRouter.push(`/profile`)
        }
        context.commit('SET_LOADING_USER', false);
        context.commit('CLEAR_USER_ERROR')
      })
      .catch(() => {
        const err = {
          responseError: "Account already exists for this username or email address."
        }
        context.commit('SET_USER_ERROR', err);
      });
    },

    getCurrentUser: (context: any, token: string) => {
      context.commit('SET_LOADING_USER', true);
      axios.defaults.headers.common['X-Parse-Session-Token'] = token;
      axios.get(`${requestURI}/users/me`)
      .then((res) => {
        const user = res.data
        const token = user.sessionToken;
        delete user.confirmPassword;
        delete user.ACL;
        context.commit('SET_USER', user)
        context.commit('AUTH_SUCCESS', token);
        context.dispatch('fetchUserNotifications', user.objectId);
        // console.log('Getting Current User',user)
        context.commit('SET_LOADING_USER', false);
    })
    .catch((err) => {
        context.commit('SET_USER_ERROR', err);
        localStorage.removeItem('user-token')
      });
    },

    logInUser: (context: any, user: object) => {
      axios.defaults.headers.common['X-Parse-Revocable-Session'] = 1;
      context.commit('SET_LOADING_USER', true);
      axios.post(`${requestURI}/login`, user)
      .then((res) => {
        // console.log('loging user', res)
        const user = res.data
        const token = user.sessionToken;
        localStorage.setItem('user-token', token);
        user.className = "_User";
        delete user.confirmPassword;
        delete user.ACL;
        context.commit('AUTH_SUCCESS', token);
        context.dispatch('fetchUserNotifications', user.objectId);
        context.commit('SET_USER', user)
        if(appRouter.history.current.path !== '/profile'){
          appRouter.push(`/profile`)
        }
        context.commit('SET_LOADING_USER', false);
        context.commit('CLEAR_USER_ERROR')
    })
    .catch(() => {
        const err = {
          responseError: "Invalid email/password."
        }
        context.commit('SET_USER_ERROR', err);
        localStorage.removeItem('user-token')
      });
    },

    updateUser: (context: any, userData: any) => {
      // console.log('this is a Data', userData)
      axios.defaults.headers.common['X-Parse-Session-Token'] = localStorage.getItem('user-token');
      context.commit('SET_LOADING_USER', true);
      axios.put(`${requestURI}/users/${userData.objectId}`, userData)
      .then(() => {
        context.commit('UPDATE_USER', userData);
        //updating the necessary rooms
        if(userData.roomIdsToUpdate){
          console.log("need to update")
            const roomData:any = {};
            if(userData.fName) roomData.ownerFname = userData.fName
            if(userData.lName) roomData.ownerLname = userData.lName
            userData.roomIdsToUpdate.forEach((id: String) => {
              context.dispatch('updateRoom', {
                ...roomData,
                objectId: id
              }) 
            });
        }
        context.commit('SET_LOADING_USER', false);
        context.commit('CLEAR_USER_ERROR')
      })
      .catch(() => {
        const err = {
          responseError: "Account already exists for this username or email address."
        }
        context.commit('SET_USER_ERROR', err);      
      });
    },

    changeUserPassword: (context: any, data: any) => {
      context.commit('SET_LOADING_USER', true);
      axios.post(`${requestURI}/requestPasswordReset`, data)
      .then((res) => {
        // console.log("update password: ", res);
        context.commit('PASSWORD_RESET_EMAIL_SENT', true);
        context.commit('SET_LOADING_USER', false);
      })
      .catch((err) => {
        context.commit('SET_USER_ERROR', err);
      });
    },

    deleteUserAccount: (context: any, userData: any) => {
      console.log(userData)
      context.commit('SET_LOADING_USER', true);
      axios.delete(`${requestURI}/users/${userData.userId}`)
      .then((res) => {
        if(userData.roomIds.length !== 0) context.dispatch('deleteUserRooms', userData.roomIds);
        if(userData.notificationIds.length !== 0) context.dispatch('deleteUserNotifications', userData.notificationIds);
        context.dispatch('logout');
        context.commit('SET_USER_DELETED', true);
        context.commit('SET_LOADING_USER', false);
      })
      .catch((err) => {
        context.commit('SET_USER_ERROR', err);
      });
    },

    deleteUserRooms: (context: any, roomIds: []) => {
      roomIds.forEach(id => {
        axios.delete(`${requestURI}/classes/Room/${id}`)
        .then((res) => {
          context.commit('DELETE_ROOM', id);
          context.commit('CLEAR_USER_ERROR')
        })
        .catch((err) => {
          context.commit('SET_CONTENT_ERROR', err);
        });
      })
      // console.log(roomIds)
    },

    deleteUserNotifications: (context: any, notificationIds: []) => {
      notificationIds.forEach(id => {
        axios.delete(`https://parseapi.back4app.com/classes/Notifications/${id}`)
        .then((res) => {
          context.commit('DELETE_NOTIFICATION', id);
        })
        .catch((err) => {
          context.commit('SET_CONTENT_ERROR', err);
        });
      })
      // console.log(notificationIds)
    },

    logout(context: any) {
        context.commit('USER_LOGOUT')
        localStorage.removeItem('user-token')
        if(appRouter.history.current.path !== '/'){
          appRouter.push(`/`)
        }
        context.commit('CLEAR_USER_ERROR')
      }
  }