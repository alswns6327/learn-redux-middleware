import {handleActions} from 'redux-actions';
import * as api from '../lib/api';
import craeteRequestThunk from '../lib/createRequestThunk';

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';



export const getPost = craeteRequestThunk(GET_POST, api.getPost);
export const getUsers = craeteRequestThunk(GET_USERS, api.getUsers);



// 초기 상태 선언

const initialState = {
    post: null,
    users: null
}

const sample = handleActions(
    {
        [GET_POST_SUCCESS] : (state, action) => ({
            ...state,
            post: action.payload
        }),
        [GET_USERS_SUCCESS] : (state, action) => ({
            ...state,
            users : action.payload
        })
    },
    initialState
);

export default sample;