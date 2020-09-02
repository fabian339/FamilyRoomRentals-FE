
import axios from 'axios';
import { User } from './../interfaceTypes'
import router from '../../router';

const requestURI = 'https://parseapi.back4app.com';
axios.defaults.headers.common['X-Parse-Application-Id'] = 'kUx57AUuSOjGF36AotqV2lzjzjREM3mDQfc2a9gn'
axios.defaults.headers.common['X-Parse-REST-API-Key'] = '1B647vsxlJr1SCJ732paCCmXB57dKEqxRL3MFE4w'
axios.defaults.headers.common['Content-Type'] = 'application/json'


export default {
    registerUser: (context: any, user: User) => {
      axios.defaults.headers.common['X-Parse-Revocable-Session'] = 1;
      // context.commit('SET_LOADING_USER', true);
      axios.post(`${requestURI}/users`, user)
      .then((res) => {
        console.log("user Response: ", res);
        const token = res.data.sessionToken;
        localStorage.setItem('user-token', token);
        context.dispatch('getCurrentUser', token);
        router.push(`/profile`)
      })
      .catch((err) => {
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
        axios.defaults.headers.common['Authorization'] = token;
        delete user.confirmPassword;
        delete user.ACL;
        context.commit('AUTH_SUCCESS', token);
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
        axios.defaults.headers.common['Authorization'] = token;
        localStorage.setItem('user-token', token);
        user.className = "_User";
        delete user.confirmPassword;
        delete user.ACL;
        context.commit('AUTH_SUCCESS', token);
        // console.log('Logging User',user)
        context.commit('SET_USER', user)
        context.commit('SET_LOADING_USER', false);
        router.push(`/profile`)
    })
    .catch((err) => {
        context.commit('SET_USER_ERROR', err);
        localStorage.removeItem('user-token')
      });
    },
    
    logout(context: any){
        context.commit('USER_LOGOUT')
        localStorage.removeItem('user-token')
        delete axios.defaults.headers.common['Authorization'];
        router.push('/')
      }
  }