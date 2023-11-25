import {createAction, handleActions} from 'redux-actions';
import {call, put, takeLatest} from 'redux-saga/effects';
import * as api from '../lib/api';
import { startLoading, finishLoading } from './loading';
import createRequestSaga from '../lib/createRequestSaga';

const GET_POST = 'sagaSample/GET_POST';
const GET_POST_SUCCESS = 'sagaSample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sagaSample/GET_POST_FAILURE';

const GET_USERS = 'sagaSample/GET_USERS';
const GET_USERS_SUCCESS = 'sagaSample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sagaSample/GET_USERS_FAILURE';

export const getPost = createAction(GET_POST, id => id);
export const getUsers = createAction(GET_USERS);


const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

export function* sampleSaga(){
    yield takeLatest(GET_POST, getPostSaga); 
    yield takeLatest(GET_USERS, getUsersSaga);
}

// 초기 상태 선언
const initialState = {
    post: null,
    users: null
}

const sagaSample = handleActions(
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

export default sagaSample;