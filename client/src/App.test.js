import React from 'react';
import ReactDOM from 'react-dom';
import { ReactiveNetworkApp } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReactiveNetworkApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
