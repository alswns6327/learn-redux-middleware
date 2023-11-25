import {combineReducers} from 'redux';
import { all } from 'redux-saga/effects';
import counter from "./counter";
import sample from './sample';
import loading from './loading';
import sagaCounter, {counterSaga} from './sageCounter';
import sagaSample, {sampleSaga} from './sagaSample';

const rootReducer = combineReducers({
    counter,
    sagaCounter,
    sample,
    sagaSample,
    loading
});

export function* rootSaga(){
    // all 함수로 여러 사가를 합쳐준다.
    yield all([counterSaga(), sampleSaga()]);
}

export default rootReducer;