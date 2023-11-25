import {call, put} from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export default function createRequestSaga(type, request){
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    
    return function* (action){
        yield put(startLoading(type));
        // 파라미터로 액션을 받아올 경우 액션 정보 조회 가능
        try{
            // call 사용시 Promise를 반환하는 함수 호출 및 대기 가능
            // 첫 번째 파라미터는 함수, 나머지는 해당 함수에 넣을 인수
            const response = yield call(request, action.payload)
            yield put({
                type: SUCCESS,
                payload: response.data
            })
        }catch(e){
            yield put({
                type: FAILURE,
                payload: e,
                error: true
            })
        }
        yield put(finishLoading(type));
    };
}