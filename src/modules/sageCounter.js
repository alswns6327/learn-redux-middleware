import { createAction, handleActions } from "redux-actions";
import {delay, put, takeEvery, takeLatest, select, throttle} from 'redux-saga/effects';

const INCREASE = 'sagaCounter/INCREASE';
const DECREASE = 'sagaCounter/DECREASE';

const INCREASE_ASYNC = 'sagaCounter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'sagaCounter/DECREASE_ASYNC';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);


export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga(){
    // yield delay(1000);
    let number = yield select(state => state.sagaCounter); // state = 스토어의 상태
    console.log(`current : ${number}`);
    yield put(increase());
    // yield delay(1000);
    number = yield select(state => state.sagaCounter); // state = 스토어의 상태
    console.log(`current : ${number}`);
}

function* decreaseSaga(){
    yield delay(1000);
    yield put(decrease());
}

export function* counterSaga(){
    // takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리
    // yield takeEvery(INCREASE_ASYNC, increaseSaga);

    // 3초에는 최대 한 번 실행
    yield throttle(3000, INCREASE_ASYNC, increaseSaga);

    // takeLatest는 기존에 진행 중이던 작업이 있을 경우 최소 처리 후 가장 마지막 실행된 작업만을 수행
    yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

const initialState = 0;


const counter = handleActions(
    {
        [INCREASE]: state => state + 1,
        [DECREASE]: state => state - 1
    },
    initialState
);

export default counter;