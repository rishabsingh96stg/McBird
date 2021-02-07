import * as types from "../actionTypes";

let initialState = {
    data: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_TEAMS_DETAILS_INITIATE:
            return {
                ...state,
                loading: true
            }
        case types.GET_TEAMS_DETAILS_SUCCESS: {
            return {
                ...state,
                data: action.payload && action.payload.data || [],
                loading: false
            }
        }
        case types.GET_TEAMS_DETAILS_FAIL:
            return {
                ...state,
                loading: false
            }

        default:
            return state
    }
}