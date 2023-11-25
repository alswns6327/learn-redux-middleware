import React from 'react';
import {connect} from 'react-redux';
import { increase, decrease, increaseAsync, decreaseAsync } from '../modules/sageCounter';
import SagaCounter from '../components/SagaCounter';

const SagaCounterContainer = ({number, increaseAsync, decreaseAsync}) => {
    return (
        <SagaCounter number={number} onIncrease={increaseAsync} onDecrease={decreaseAsync}/>
    );
};

export default connect(state => 
    (
        {
            number : state.sagaCounter
        }
    ),
    {
        increaseAsync,
        decreaseAsync
    }
)
(SagaCounterContainer)