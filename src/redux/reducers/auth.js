import * as types from "../actionTypes";
import {
    saveObject
} from "../../utils";

let initialState = {
    userData: {},
    loading: false,
    loadingSignup: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SAVE_LOGIN_USER_INITIATE:
            return {
                ...state,
                loading: true
            }
        case types.SAVE_LOGIN_USER_SUCCESS: {
            saveObject("admin-session", JSON.stringify(action.payload))
            return {
                ...state,
                userData: action.payload && action.payload.data || {},
                loading: false
            }
        }
        case types.LOGIN_FAILED:
            return {
                ...state,
                loading: false
            }
        case types.SAVE_SIGNUP_USER_INITIATE:
            return {
                ...state,
                loadingSignup: true
            }
        case types.SAVE_SIGNUP_USER_SUCCESS: {
            return {
                ...state,
                loadingSignup: false
            }
        }
        case types.SIGNUP_FAILED:
            return {
                ...state,
                loadingSignup: false
            }

        default:
            return state
    }
}