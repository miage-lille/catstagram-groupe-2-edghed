import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import Counter from './counter';

const App = () => (
  <Provider store={store}>
    <>
      <Counter />
      <div>Hello World ! Go to build your Catstagram 💪 !</div>
    </>
  </Provider>
);

export default App;
