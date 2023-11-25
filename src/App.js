import logo from './logo.svg';
import './App.css';
import CounterContainer from './containers/CounterContainer';
import SampleContainer from './containers/SampleContainer';
import SagaCounterContainer from './containers/SagaCounterContainer';
import SagaSampleContainer from './containers/SagaSampleContainer';

function App() {
  return (
    <div className="App">
      {/* <CounterContainer/> */}
      <SagaCounterContainer/>
      {/* <SampleContainer/> */}
      {/* <SagaSampleContainer/> */}
    </div>
  );
}

export default App;
