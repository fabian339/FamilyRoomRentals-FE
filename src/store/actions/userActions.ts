
import axios from 'axios';
// import { User } from '../validators'
import router from '../../router';
let appRouter: any = router;
let jwt = require('jsonwebtoken');

// console.log(router.push("/"))
export default {

  registerUser: (context: any, user: any) => {
    // console.log("trying to register User", user);
    axios.defaults.headers.common['X-Parse-Revocable-Session'] = 1;
    context.commit('SET_USER_REGISTERING', true);
    axios.post(`/users`, user)
    .then((res) => {
      let currentUser = {
        ...user,
        ...res.data,
      };
      delete currentUser.password;
      delete currentUser.confirmPassword;
      context.commit('SET_USER', currentUser)
      console.log(res, currentUser)
      localStorage.setItem('user-token', currentUser.sessionToken);
      context.commit('SET_TOKEN', currentUser.sessionToken);
      //a loading type for loading component
      currentUser.loadingType = 'registering';
      //changing routes and setting timer on loading
      context.dispatch('userLoading', currentUser)
    })
    .catch((error) => {
      // console.log("Error: ", error)
      context.commit('SET_USER_REGISTERING', false);
      const err = {
        responseError: "Account already exists for this username or email address."
      }
      context.commit('SET_USER_ERROR', err);
    });
  },

  getCurrentUser: (context: any, token: string) => {
    context.commit('SET_RETRIEVING_USER', true);
    axios.defaults.headers.common['X-Parse-Session-Token'] = token;
    axios.get(`/users/me`)
    .then((res) => {
      const user = res.data
      const token = user.sessionToken;
      delete user.confirmPassword;
      delete user.ACL;
      context.commit('SET_USER', user)
      // context.commit('SET_TOKEN', token);
      context.dispatch('fetchNotifications')
      // context.dispatch('fetchUserNotifications', user.objectId);
      // console.log('Getting Current User',user)
      context.commit('SET_RETRIEVING_USER', false);
  })
  .catch((err) => {
      context.commit('SET_USER_ERROR', err);
      localStorage.removeItem('user-token')
    });
  },

  logInUser: (context: any, user: object) => {
    axios.defaults.headers.common['X-Parse-Revocable-Session'] = 1;
    context.commit('SET_USER_LOGGING_IN', true);
    axios.post(`/login`, user)
    .then((res) => {
      console.log('loging user', res)
      const user = res.data
      const token = user.sessionToken;
      user.className = "_User";
      delete user.confirmPassword;
      delete user.ACL;
      context.commit('SET_USER', user)
      localStorage.setItem('user-token', token);

      // set user authorization token to local storage, helper function
      context.dispatch('setUserAuthorization', {token, userEmailVerified: user.emailVerified})

      context.commit('SET_TOKEN', token);
      context.dispatch('fetchNotifications')
      //a loading type for loading component
      user.loadingType = 'logging-in';
      //changing routes and setting timer on loading
      context.dispatch('userLoading', user)
  })
  .catch(() => {
    context.commit('SET_USER_LOGGING_IN', false);
    // console.log(error)
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
    context.commit('SET_UPDATING_USER', true);
    axios.put(`/users/${userData.objectId}`, userData)
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

      //a loading type for loading component
      let user = {loadingType: 'user-updating'};
      //changing routes and setting timer on loading
      context.dispatch('userLoading', user)
    })
    .catch(() => {
      context.commit('SET_UPDATING_USER', false);
      const err = {
        responseError: "Account already exists for this username or email address."
      }
      context.commit('SET_USER_ERROR', err);      
    });
  },

  changeUserPassword: (context: any, data: any) => {
    context.commit('SET_LOADING_USER', true);
    axios.post(`/requestPasswordReset`, data)
    .then((res) => {
      // console.log("update password: ", res);
      context.commit('PASSWORD_RESET_EMAIL_SENT', true);
      context.commit('SET_LOADING_USER', false);
    })
    .catch((err) => {
      context.commit('SET_USER_ERROR', err);
    });
  },

  sendEmailVerification: (context: any, data: any) => {
    context.commit('SET_LOADING_USER', true);
    axios.post(`/verificationEmailRequest`, data)
    .then((res) => {
      // console.log("email Sent Again: ", res);
      context.commit('EMAIL_VERIFICATION_SENT', true);
      context.commit('SET_LOADING_USER', false);
    })
    .catch((err) => {
      context.commit('SET_USER_ERROR', err);
    });
  },

  deleteUserAccount: (context: any, userData: any) => {
    console.log(userData)
    //almost same process for logging out, using the same loading
    context.commit('SET_USER_LOGGING_OUT', true)
    axios.delete(`/users/${userData.userId}`)
    .then((res) => {
      if(userData.roomIds.length !== 0) context.dispatch('deleteUserRooms', userData.roomIds);
      if(userData.notificationIds.length !== 0) context.dispatch('deleteUserOffers', userData.notificationIds);
      context.dispatch('logout');
      context.commit('SET_USER_DELETED', true);
      // context.commit('SET_LOADING_USER', false);
    })
    .catch((err) => {
      context.commit('SET_USER_LOGGING_OUT', false)
      context.commit('SET_USER_ERROR', err);
    });
  },

  deleteUserRooms: (context: any, roomIds: []) => {
    roomIds.forEach(id => {
      axios.delete(`/classes/Room/${id}`)
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

  setUserAuthorization(context: any, data: any) {
    let authToken = jwt.sign({
      data: { 
          userToken: data.token,
          emailVerified: data.userEmailVerified
        }
      }, data.token);
  
    localStorage.setItem('AUTHORIZATION', authToken)
  },
  // remove all images within the folder name in localstorage, 
  // this is in case user refreshes page of change tab while 
  // creating a room
  removeResources(context: any, prefix: any){
    axios.post('https://familyroomrentals-be.herokuapp.com/api/delete-resources', {prefix})
    .then(() => { console.log("Resources deleted!") })
    .catch(() => { console.log("Problem while deleting resources!")})
  },

  logout(context: any) {
    if(!context.state.loadingState.user.userLoggingOut){
      context.commit('SET_USER_LOGGING_OUT', true)
    }
      //a loading type for loading component
      let user = {loadingType: 'logging-out'}
      context.dispatch('userLoading', user)
  },

  userLoading: (context: any, user: any) => {
    switch (user.loadingType) {
      case 'logging-in':
        setTimeout(() => {
          console.log('logging-innngggg')
          // check if user's email is verified
          if(!user.emailVerified){
            context.dispatch('sendEmailVerification', {email: user.email})
            appRouter.push(`/email-verification`)
          } else {
            if(appRouter.history.current.path !== '/profile'){
              appRouter.push(`/profile`)
            }
          }
          context.commit('CLEAR_USER_ERROR')
          context.commit('SET_USER_LOGGING_IN', false);
        }, 1500);
        break;
      case 'logging-out':
        console.log("LOGGIN OUTT")
        setTimeout(() => {
          localStorage.removeItem('user-token')
          localStorage.removeItem('AUTHORIZATION')
          var folderName = localStorage.getItem('img-folder-name')
          if(folderName && folderName.length > 0){
            let prefix = `${folderName}/`
            context.dispatch('removeResources', prefix) 
            localStorage.removeItem('img-folder-name')
          }
          if(appRouter.history.current.path !== '/'){
            appRouter.push(`/`)
          }
          context.commit('CLEAR_USER_ERROR')
          context.commit('SET_USER_LOGGING_OUT', false)
        }, 1500);
        break;
      case 'registering':
        setTimeout(() => {
          if(appRouter.history.current.path !== '/email-verification' ) {
            context.dispatch('sendEmailVerification', {email: user.email})
            appRouter.push(`/email-verification`)
          }
          context.commit('CLEAR_USER_ERROR')
          context.commit('SET_USER_REGISTERING', false);
        }, 2000);        // expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      case 'user-updating':
        setTimeout(() => {
          context.commit('SET_UPDATING_USER', false);
          context.commit('SET_USER_UPDATED', true);
          context.commit('CLEAR_USER_ERROR')
        }, 1500);
        break;
      default:
        console.log(`Sorry, we are out of.`);
    }
    // window.clearTimeout(timerId);

  },
}


