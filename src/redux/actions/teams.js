import * as types from '../actionTypes';
import axios from 'axios';

const apiUrl = 'https://api.first.org/data/v1/teams'

export function getTeamsDetails() {
    return dispatch => {
        dispatch({
            type: types.GET_TEAMS_DETAILS_INITIATE
        })
        return new Promise((resolve, reject) =>
            axios.get(apiUrl)
                .then(response => {
                    if (response.status && response.status == 200)
                        dispatch({
                            type: types.GET_TEAMS_DETAILS_SUCCESS,
                            payload: response.data
                        })

                    resolve(response);
                })
                .catch(err => {
                    dispatch({
                        type: types.GET_TEAMS_DETAILS_FAIL
                    })
                    reject(err);
                })
        );
    }
}