import {createAction, handleActions} from 'redux-actions';
import {call, put, takeLatest} from 'redux-saga/effects';
import * as api from '../lib/api';
import { startLoading, finishLoading } from './loading';

const GET_POST = 'sagaSample/GET_POST';
const GET_POST_SUCCESS = 'sagaSample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sagaSample/GET_POST_FAILURE';

const GET_USERS = 'sagaSample/GET_USERS';
const GET_USERS_SUCCESS = 'sagaSample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sagaSample/GET_USERS_FAILURE';

export const getPost = createAction(GET_POST, id => id);
export const getUsers = createAction(GET_USERS);

function* getPostSaga(action) {
    yield put(startLoading(GET_POST))
    // 파라미터로 액션을 받아올 경우 액션 정보 조회 가능
    try{
        // call 사용시 Promise를 반환하는 함수 호출 및 대기 가능
        // 첫 번째 파라미터는 함수, 나머지는 해당 함수에 넣을 인수
        const post = yield call(api.getPost, action.payload); // api.getPost(action.payload) 
        yield put({
            type: GET_POST_SUCCESS,
            payload : post.data
        });
    }catch(e){
        yield put({
            type: GET_POST_FAILURE,
            payload: e,
            error: true
        });
    }
    yield put(finishLoading(GET_POST));
}

function* getUsersSaga(){
    yield put(startLoading(GET_USERS));
    try{
        const users = yield call(api.getUsers);
        yield put({
            type: GET_USERS_SUCCESS,
            payload: users.data
        });
    }catch(e){
        yield put({
            type: GET_USERS_FAILURE,
            payload: e,
            error: true
        });
    }
    yield put(finishLoading(GET_USERS));
}

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