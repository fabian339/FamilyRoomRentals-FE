
import axios from 'axios';
// import { User } from '../validators'
import router from '../../router';
let appRouter: any = router;


const requestURI = 'https://parseapi.back4app.com';
axios.defaults.headers.common['X-Parse-Application-Id'] = 'kUx57AUuSOjGF36AotqV2lzjzjREM3mDQfc2a9gn'
axios.defaults.headers.common['X-Parse-REST-API-Key'] = '1B647vsxlJr1SCJ732paCCmXB57dKEqxRL3MFE4w'
axios.defaults.headers.common['Content-Type'] = 'application/json'


export default {
    registerUser: (context: any, user: object) => {

      console.log("trying to register User", user);
      
      axios.defaults.headers.common['X-Parse-Revocable-Session'] = 1;
      // context.commit('SET_LOADING_USER', true);
      axios.post(`${requestURI}/users`, user)
      .then((res) => {
        console.log("register user Response: ", res);
        const token = res.data.sessionToken;
        localStorage.setItem('user-token', token);
        context.dispatch('getCurrentUser', token);
        if(appRouter.history.current.path !== '/profile'){
          appRouter.push(`/profile`)
        }
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
        // axios.defaults.headers.common['Authorization'] = token;
        delete user.confirmPassword;
        delete user.ACL;
        context.commit('AUTH_SUCCESS', token);
        context.dispatch('fetchUserNotifications', user.objectId);
        // console.log('Getting Current User',user)
        context.commit('SET_USER', user)
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
        const user = res.data
        const token = user.sessionToken;
        // axios.defaults.headers.common['Authorization'] = token;
        localStorage.setItem('user-token', token);
        user.className = "_User";
        delete user.confirmPassword;
        delete user.ACL;
        context.commit('AUTH_SUCCESS', token);
        context.dispatch('fetchUserNotifications', user.objectId);
        context.commit('SET_USER', user)
        context.commit('SET_LOADING_USER', false);
        if(appRouter.history.current.path !== '/profile'){
          appRouter.push(`/profile`)
        }
        context.commit('CLEAR_USER_ERROR')
    })
    .catch(() => {
        const err = {
          responseError: "Invalid email/password.."
        }
        context.commit('SET_USER_ERROR', err);
        localStorage.removeItem('user-token')
      });
    },

    sendNotification: (context: any, notification: object) => {
      axios.post(`https://parseapi.back4app.com/classes/Notifications`, notification)
      .then((res) => {
        context.commit('SET_NOTIFICATION_SENT', true);
        console.log('Notification Sent', res)
    })
    .catch((err) => {
        // const err = {
        //   responseError: "Invalid email/password.."
        // }
        context.commit('SET_USER_ERROR', err);
        // localStorage.removeItem('user-token')
      });
    },

    fetchUserNotifications: (context: any, id: string) => {
      axios.get('https://parseapi.back4app.com/classes/Notifications')
      .then((res) => {
        let myNotifications = res.data.results.filter((item: any) => item.receiverId === id);
        res.data.results
        context.commit('SET_USER_NOTIFICATIONS', myNotifications);
      })
      .catch((err) => {
        context.commit('SET_CONTENT_ERROR', err);
      });
    },

    markNotificationRead: (context: any, notificationId: {}) => {
      axios.put(`https://parseapi.back4app.com/classes/Notifications/${notificationId}`, {readByReceiver: true})
      .then((res) => {
        // console.log("Updating Notifiction",res)
        context.commit('MARK_NOTIFICATION_READ', notificationId);
      })
      .catch((err) => {
        context.commit('SET_CONTENT_ERROR', err);
      });
    },

    deleteNotification: (context: any, id: string) => {
      // context.commit('SET_LOADING_CONTENT', true);
      axios.delete(`https://parseapi.back4app.com/classes/Notifications/${id}`)
      .then((res) => {
        context.commit('DELETE_NOTIFICATION', id);
        // context.commit('SET_LOADING_CONTENT', false);
        // console.log(appRouter)
        if(appRouter.history.current.path !== '/profile'){
          appRouter.push(`/profile`)
        }
      })
      .catch((err) => {
        context.commit('SET_CONTENT_ERROR', err);
      });
    },
    
    logout(context: any) {
        context.commit('USER_LOGOUT')
        localStorage.removeItem('user-token')
        // delete axios.defaults.headers.common['Authorization'];
        appRouter.push('/')
        context.commit('CLEAR_USER_ERROR')
      }
  }