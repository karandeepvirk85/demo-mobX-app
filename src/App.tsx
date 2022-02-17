import React from 'react';
import './App.css';
import Home from './components/home';
import { BlockChainStore, StoreProvider } from './store';

const store = new BlockChainStore();

function App() {

  return (
    <div className="App">
      <div className='app-container'>
      <StoreProvider store={store}>
          <Home/>
      </StoreProvider>
      </div>
    </div>
  );
}

export default App;
