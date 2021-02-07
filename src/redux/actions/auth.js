import * as types from '../actionTypes';
import axios from 'axios';
import config from '../../config';

const apiUrl = config.apiUrl


export function loginUser(payload) {
    return dispatch => {
        dispatch({
            type: types.SAVE_LOGIN_USER_INITIATE
        })
        return new Promise((resolve, reject) =>
            axios.post(`${apiUrl}/users/login`, payload)
                .then(response => {
                    if (response.status && response.status == 200)
                        dispatch({
                            type: types.SAVE_LOGIN_USER_SUCCESS,
                            payload: response
                        })

                    resolve(response);
                })
                .catch(err => {
                    dispatch({
                        type: types.LOGIN_FAILED
                    })
                    reject(err);
                })
        );
    }
}


export function registerUser(payload) {
    return dispatch => {
        dispatch({
            type: types.SAVE_SIGNUP_USER_INITIATE
        })
        return new Promise((resolve, reject) =>
            axios.post(`${apiUrl}/users/register`, payload)
                .then(response => {

                    if (response.status && response.status == 200)
                        dispatch({
                            type: types.SAVE_SIGNUP_USER_SUCCESS
                        })

                    resolve(response);
                })
                .catch(err => {
                    dispatch({
                        type: types.SIGNUP_FAILED
                    })
                    reject(err);
                })
        );
    }
}