
import axios from 'axios';
import { User } from './../interfaceTypes'

const requestURI = 'https://parseapi.back4app.com/users';
axios.defaults.headers.common['X-Parse-Application-Id'] = 'kUx57AUuSOjGF36AotqV2lzjzjREM3mDQfc2a9gn'
axios.defaults.headers.common['X-Parse-REST-API-Key'] = '1B647vsxlJr1SCJ732paCCmXB57dKEqxRL3MFE4w'
axios.defaults.headers.common['Content-Type'] = 'application/json'


export default {
    registerUser: (context: any, user: User) => {
      console.log('this is a user', user)
      context.commit('SET_LOADING_USER', true);
      axios.post(requestURI, user)
      .then((res) => {
        // console.log("Room Response: ", res);
        user.createdAt = res.data.createdAt;
        user.objectId = res.data.objectId;
        delete user.password;
        delete user.confirmPassword;
        context.commit('SET_USER', user);
        context.commit('SET_USER_AUTHENTICATED', true)
        context.commit('SET_LOADING_USER', false);
      })
      .catch((err) => {
        context.commit('SET_USER_ERROR', err);
      });
    },
    logInUser: (context: any, user: object) => {
        // console.log('this is a user', user)
      context.commit('SET_LOADING_USER', true);
      axios.post('https://parseapi.back4app.com/login', user)
      .then((res) => {
        const token = res.data.sessionToken;
        const user = res.data
        localStorage.setItem('user-token', token);
        axios.defaults.headers.common['Authorization'] = token;
        delete user.confirmPassword;
        delete user.ACL;
        // console.log("user Response: ", res);
        context.commit('AUTH_SUCCESS', token);
        context.commit('SET_USER', user)
        context.commit('SET_LOADING_USER', false);
    })
    .catch((err) => {
        context.commit('SET_USER_ERROR', err);
        localStorage.removeItem('user-token')
      });
    },
    logout(context: any){
        context.commit('USER_LOGOUT')
        localStorage.removeItem('user-token')
        delete axios.defaults.headers.common['Authorization']
      }

  }